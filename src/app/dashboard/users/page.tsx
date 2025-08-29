"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Pencil, Trash2, Plus } from "lucide-react";
import axiosInstance from "@/hooks/axiosInstance";

interface User {
    id: number;
    firstName: string;
    email: string;
    phoneNumber: string;
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [open, setOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);

    // Fetch users from API
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const { data }: any = await axiosInstance.get("/api/v1/users");
            // console.log(data, 'data');
            setUsers(data.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAdd = async () => {
        if (!firstName || !email || !phoneNumber) return alert("Please fill all fields");
        const newUser = {
            firstName,
            email,
            phoneNumber,
            lastName: "Doe",
            address: "123 Street",
            zipCode: "12345",
            gender: "male",
            dateOfBirth: "1990-01-01",
            accountPassword: "SecurePass123!",
            main_location: "New York",
            instagram_account: "@johndoe",
            average_day_rate_currency: "$1000",
            interests: "Music, Coding",
            bio: "Experienced dev",
            clients: "Apple, Google",
            role_ids: [1, 2],
        };

        try {
            setLoading(true);
            const res: any = await axiosInstance.post("/api/v1/users", newUser);
            // console.log(res?.data?.data,'res')
            setUsers([...users, res?.data?.data]);
            resetForm();
            setOpen(false);
        } catch (error) {
            console.error("Error adding user:", error);
        }
        finally {
            setLoading(false);
        }
    };

    const handleEdit = async () => {
        if (!editingUser) return;

        const updatedUser = {
            ...editingUser,
            firstName,
            email,
            phoneNumber,
        };

        try {
            setLoading(true);
            const res = await axiosInstance.put(`/users/${editingUser.id}`, updatedUser);
            setUsers(users.map((u) => (u.id === editingUser.id ? updatedUser : u)));
            resetForm();
            setEditingUser(null);
            setOpen(false);
        } catch (error) {
            console.error("Error updating user:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this user?")) return;

        try {
            await axiosInstance.delete(`/users/${id}`);
            setUsers(users.filter((u) => u.id !== id));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const openAddDialog = () => {
        resetForm();
        setEditingUser(null);
        setOpen(true);
    };

    const openEditDialog = (user: User) => {
        setEditingUser(user);
        setFirstName(user.firstName);
        setEmail(user.email);
        setPhoneNumber(user.phoneNumber);
        setOpen(true);
    };

    const resetForm = () => {
        setFirstName("");
        setEmail("");
        setPhoneNumber("");
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={openAddDialog}
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded"
                >
                    <Plus size={18} /> Add User
                </button>
            </div>
            {loading ? (
                <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                <table className="w-full border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2 text-left">Name</th>
                            <th className="border px-4 py-2 text-left">Email</th>
                            <th className="border px-4 py-2 text-left">Role</th>
                            <th className="border px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id}>
                                <td className="border px-4 py-2">{u.firstName}</td>
                                <td className="border px-4 py-2">{u.email}</td>
                                <td className="border px-4 py-2">{u.phoneNumber}</td>
                                <td className="border px-4 py-2 text-center flex justify-center gap-2">
                                    {/* <button
                                    onClick={() => openEditDialog(u)}
                                    className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                >
                                    <Pencil size={16} />
                                </button> */}
                                    {/* <button
                                        onClick={() => handleDelete(u.id)}
                                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        <Trash2 size={16} />
                                    </button> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Radix UI Dialog */}
            <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="bg-black/40 fixed inset-0" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 w-[350px] -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg">
                        <Dialog.Title className="text-lg font-bold mb-4">
                            {editingUser ? "Edit User" : "Add User"}
                        </Dialog.Title>

                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Enter first name"
                            className="border w-full px-3 py-2 mb-3 rounded"
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            className="border w-full px-3 py-2 mb-3 rounded"
                        />
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Enter phone number"
                            className="border w-full px-3 py-2 mb-3 rounded"
                        />

                        <div className="flex justify-end gap-2">
                            <Dialog.Close asChild>
                                <button className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
                                    Cancel
                                </button>
                            </Dialog.Close>
                            <button
                                onClick={editingUser ? handleEdit : handleAdd}
                                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                            >
                                {editingUser ? "Update" : "Add"}
                            </button>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
}
