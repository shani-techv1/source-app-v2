"use client";

import { useEffect, useState } from "react";
import { useParams ,useRouter  } from "next/navigation";
import axiosInstance from "@/hooks/axiosInstance";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "@hello-pangea/dnd";
import { SquareArrowLeft } from "lucide-react";

interface Field {
    id?: number;
    role_id?: number;
    field_label: string;
    field_type:
    | "text"
    | "textarea"
    | "select"
    | "radio"
    | "checkbox"
    | "file"
    | "date";
    field_options?: string[] | null;
    field_placeholder?: string | null;
    is_multiple?: boolean;
    allowed_file_types?: string | null;
    order?: number;
    deletedAt?: string | null;
}

// Sidebar options
const fieldOptions: Field[] = [
    { field_label: "Short Text", field_type: "text", field_placeholder: "Enter text" },
    { field_label: "Long Text", field_type: "textarea", field_placeholder: "Enter details" },
    { field_label: "File Upload", field_type: "file", field_placeholder: "Upload file" },
    {
        field_label: "Dropdown",
        field_type: "select",
        field_options: ["Option 1", "Option 2"],
        field_placeholder: "Choose option",
    },
    {
        field_label: "Gender",
        field_type: "radio",
        field_options: ["Male", "Female", "Other"],
    },
    {
        field_label: "Skills",
        field_type: "checkbox",
        field_options: ["JavaScript", "Python", "Java"],
        is_multiple: true,
    },
    {
        field_label: "Date of Birth",
        field_type: "date",
        field_placeholder: "Select date",
    },
];

const availableFieldTypes = ["text", "textarea", "select", "radio", "checkbox", "file", "date"];

export default function RoleDetailPage() {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [fields, setFields] = useState<Field[]>([]);
    const router = useRouter();


    // Edit modal state
    const [editingField, setEditingField] = useState<Field | null>(null);
    const [editLabel, setEditLabel] = useState("");
    const [editPlaceholder, setEditPlaceholder] = useState("");
    const [editOptions, setEditOptions] = useState<string>("");
    const [editType, setEditType] = useState<Field["field_type"]>("text");

    // Fetch fields
    useEffect(() => {
        if (!params?.id) return;
        const fetchRoleFields = async () => {
            try {
                setLoading(true);
                const { data }: any = await axiosInstance.get(
                    `/api/v1/role-fields/role/${params.id}`
                );
                setFields(data?.data || []);
            } catch (err) {
                console.error("Failed to fetch role fields:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRoleFields();
    }, [params?.id]);

    // Add new field
    const handleAddField = async (field: Field) => {
        const payload = {
            role_id: Number(params?.id),
            field_label: field.field_label,
            field_type: field.field_type,
            field_placeholder: field.field_placeholder || "",
            field_options: field.field_options || [],
            is_multiple: field.is_multiple || false,
            allowed_file_types: field.allowed_file_types || null,
        };
        try {
            const { data }: any = await axiosInstance.post("/api/v1/role-fields", payload);
            setFields((prev) => [...prev, data?.data]);
        } catch (err) {
            console.error("Error adding field:", err);
        }
    };

    // Start editing field
    const handleEditClick = (field: Field) => {
        setEditingField(field);
        setEditLabel(field.field_label || "");
        setEditPlaceholder(field.field_placeholder || "");
        setEditOptions(field.field_options?.join(",") || "");
        setEditType(field.field_type);
    };

    // Save updated field
    const handleUpdateField = async () => {
        if (!editingField?.id) return;

        const payload: any = {
            field_label: editLabel,
            field_type: editType,
            field_placeholder: editPlaceholder,
        };

        if (["select", "radio", "checkbox"].includes(editType)) {
            payload.field_options = editOptions.split(",").map((opt) => opt.trim());
        } else {
            payload.field_options = null;
        }

        if (editType === "checkbox" && editingField.field_type !== "checkbox") {
            payload.is_multiple = true;
        }

        if (editType === "file") {
            payload.allowed_file_types =
                editingField.allowed_file_types || "image/png, image/jpeg";
        }

        try {
            const { data }: any = await axiosInstance.patch(
                `/api/v1/role-fields/${editingField.id}`,
                payload
            );
            setFields((prev) =>
                prev.map((f) => (f.id === editingField.id ? { ...f, ...data?.data?.data } : f))
            );
            setEditingField(null);
        } catch (err) {
            console.error("Failed to update field:", err);
        }
    };

    // ✅ Handle drag and drop reorder
    const handleDragEnd = async (result: DropResult) => {
        if (!result.destination) return;

        const reordered = Array.from(fields);
        const [moved] = reordered.splice(result.source.index, 1);
        reordered.splice(result.destination.index, 0, moved);

        setFields(reordered);

        // Prepare payload
        const payload = reordered.map((field, index) => ({
            field_id: field.id,
            order: index + 1,
        }));

        try {
            await axiosInstance.put(`/api/v1/role-fields/reorder/${params.id}`, payload);
        } catch (err) {
            console.error("Failed to reorder fields:", err);
        }
    };

    if (loading)
        return (
            <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
            </div>
        );

    return (
        <div className="flex h-[calc(100vh-120px)]">
            {/* LEFT SIDEBAR */}
            <div className="w-1/4 bg-gray-100 border-r p-4">
                <h2 className="font-bold text-lg mb-4">Add Fields</h2>
                <div className="space-y-2">
                    {fieldOptions.map((field, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleAddField(field)}
                            className="w-full text-left px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-200"
                        >
                            ➕ {field.field_label}
                        </button>
                    ))}
                </div>
            </div>

            {/* RIGHT SIDE FORM PREVIEW */}
            <div className="flex-1 p-6 overflow-y-auto h-[calc(100vh-94px)]">
                <SquareArrowLeft className="mb-3 cursor-pointer" onClick={() => router.back()} />
                <h2 className="font-bold text-lg mb-4">Form Preview</h2>
                {fields.length === 0 && (
                    <p className="text-gray-500">No fields found. Add new from left.</p>
                )}

                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="fields">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="space-y-4"
                            >
                                {fields.map((field, index) => (
                                    <Draggable
                                        key={field.id || field.field_label}
                                        draggableId={String(field.id || field.field_label)}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <div
                                                className="p-4 border rounded-lg bg-white shadow-sm relative"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <button
                                                    className="absolute top-2 right-2 text-blue-500 hover:underline"
                                                    onClick={() => handleEditClick(field)}
                                                >
                                                    Edit
                                                </button>

                                                <label className="block font-semibold mb-2">
                                                    {field.field_label}
                                                </label>

                                                {/* PREVIEW ELEMENTS */}
                                                {field.field_type === "text" && (
                                                    <input
                                                        type="text"
                                                        placeholder={field.field_placeholder || ""}
                                                        className="w-full border px-3 py-2 rounded"
                                                        disabled
                                                    />
                                                )}
                                                {field.field_type === "textarea" && (
                                                    <textarea
                                                        placeholder={field.field_placeholder || ""}
                                                        className="w-full border px-3 py-2 rounded"
                                                        disabled
                                                    />
                                                )}
                                                {field.field_type === "file" && (
                                                    <input
                                                        type="file"
                                                        multiple={field.is_multiple}
                                                        accept={field.allowed_file_types || "*"}
                                                        className="w-full border px-3 py-2 rounded"
                                                        disabled
                                                    />
                                                )}
                                                {field.field_type === "select" && (
                                                    <select className="w-full border px-3 py-2 rounded" disabled>
                                                        {field.field_options?.map((opt, i) => (
                                                            <option key={i}>{opt}</option>
                                                        ))}
                                                    </select>
                                                )}
                                                {field.field_type === "radio" &&
                                                    field.field_options?.map((opt, i) => (
                                                        <label key={i} className="flex items-center space-x-2">
                                                            <input type="radio" name={field.field_label} disabled />
                                                            <span>{opt}</span>
                                                        </label>
                                                    ))}
                                                {field.field_type === "checkbox" &&
                                                    field.field_options?.map((opt, i) => (
                                                        <label key={i} className="flex items-center space-x-2">
                                                            <input type="checkbox" disabled />
                                                            <span>{opt}</span>
                                                        </label>
                                                    ))}
                                                {field.field_type === "date" && (
                                                    <input
                                                        type="date"
                                                        placeholder={field.field_placeholder || ""}
                                                        className="w-full border px-3 py-2 rounded"
                                                        disabled
                                                    />
                                                )}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>

            {/* EDIT MODAL */}
            {editingField && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h3 className="font-bold text-lg mb-4">Edit Field</h3>
                        <div className="space-y-3">
                            <input
                                type="text"
                                value={editLabel}
                                onChange={(e) => setEditLabel(e.target.value)}
                                placeholder="Field Label"
                                className="w-full border px-3 py-2 rounded"
                            />

                            <select
                                value={editType}
                                onChange={(e) =>
                                    setEditType(e.target.value as Field["field_type"])
                                }
                                className="w-full border px-3 py-2 rounded"
                            >
                                {availableFieldTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>

                            {["text", "textarea", "select", "radio", "checkbox", "date", "file"].includes(editType) && (
                                <input
                                    type="text"
                                    value={editPlaceholder}
                                    onChange={(e) => setEditPlaceholder(e.target.value)}
                                    placeholder="Field Placeholder"
                                    className="w-full border px-3 py-2 rounded"
                                />
                            )}

                            {["select", "radio", "checkbox"].includes(editType) && (
                                <input
                                    type="text"
                                    value={editOptions}
                                    onChange={(e) => setEditOptions(e.target.value)}
                                    placeholder="Options (comma separated)"
                                    className="w-full border px-3 py-2 rounded"
                                />
                            )}

                            <div className="flex justify-end space-x-2 mt-4">
                                <button
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                    onClick={() => setEditingField(null)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    onClick={handleUpdateField}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
