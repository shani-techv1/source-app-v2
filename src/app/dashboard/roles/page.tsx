"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Pencil, Trash2 } from "lucide-react";
import axiosInstance from "@/hooks/axiosInstance";
import Link from "next/link";

interface Role {
    id: number;
    name: string;
}

interface RolesApiResponse {
    data: Role[];
}

export default function RolesPage() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [editingRole, setEditingRole] = useState<Role | null>(null);
    const [roleName, setRoleName] = useState("");

    // Fetch roles
    const fetchRoles = async () => {
        try {
            setLoading(true);
            const { data } = await axiosInstance.get<RolesApiResponse>("/api/v1/roles");
            setRoles(data.data || []);
        } catch (error) {
            console.error("Failed to fetch roles:", error);
            setRoles([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    // Edit role
    const handleEdit = async () => {
        if (!editingRole) return;
        try {
            const response: any = await axiosInstance.put<Role>(
                `/api/v1/roles/${editingRole.id}`,
                { name: roleName }
            );
            setRoles(
                roles.map((role) =>
                    role.id === editingRole.id ? response.data?.data : role
                )
            );
            setRoleName("");
            setEditingRole(null);
            setOpen(false);
        } catch (error) {
            console.error("Failed to update role:", error);
        }
    };

    // Delete role
    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this role?")) return;
        try {
            await axiosInstance.delete(`/api/v1/roles/${id}`);
            setRoles(roles.filter((role) => role.id !== id));
        } catch (error) {
            console.error("Failed to delete role:", error);
        }
    };

    const openAddDialog = () => {
        setEditingRole(null);
        setRoleName("");
        setOpen(true);
    };

    const openEditDialog = (role: Role) => {
        setEditingRole(role);
        setRoleName(role.name);
        setOpen(true);
    };

    if (loading) {
        return <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        </div>
    }

    return (
        <div className="px-4 py-2">
            <table className="w-full border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2 text-left">Role Name</th>
                        <th className="border px-4 py-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.length > 0 ? (
                        roles.map((role) => (
                            <tr key={role.id}>
                                <td className="border px-4 py-2">
                                    <Link
                                        href={`/dashboard/roles/${role.id}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {role.name}
                                    </Link>
                                </td>
                                <td className="border px-4 py-2 text-center flex justify-center gap-2">
                                    <button
                                        onClick={() => openEditDialog(role)}
                                        className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(role.id)}
                                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={2} className="text-center py-4">
                                No roles found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Radix UI Dialog */}
            <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="bg-black/40 fixed inset-0" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 w-[300px] -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg">
                        <Dialog.Title className="text-lg font-bold mb-4">
                            {editingRole ? "Edit Role" : "Add Role"}
                        </Dialog.Title>
                        <input
                            type="text"
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                            placeholder="Enter role name"
                            className="border w-full px-3 py-2 mb-4 rounded"
                        />
                        <div className="flex justify-end gap-2">
                            <Dialog.Close asChild>
                                <button className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
                                    Cancel
                                </button>
                            </Dialog.Close>
                            <button
                                onClick={handleEdit}
                                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                            >
                                {editingRole ? "Update" : "Add"}
                            </button>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
}
