"use client";

import * as Label from "@radix-ui/react-label";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axiosInstance from "@/hooks/axiosInstance";
import { useToast } from "@/components/ui/toast";
import { Eye, EyeOff } from "lucide-react";


export default function SignInPage() {
    const { login, token } = useAuth();
    const router = useRouter();
    const { addToast } = useToast();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (token) {
            router.push("/dashboard");
        }
    }, [token, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            const { data }: any = await axiosInstance.post("/api/v1/auth/login", {
                email,
                password,
            });

            if (data?.message == 'success') {
                login(data?.data?.accessToken, data?.data?.accessToken);
                router.push("/dashboard");
            } else {
                console.log("Invalid response from server");
                addToast({
                    title: "Error",
                    description: "Invalid response from server",
                    variant: "destructive",
                    duration: 5000
                });
            }
        } catch (error: any) {
            const errorMsg = error.response?.data?.error || "Invalid email or password";
            console.log(errorMsg, 'errorMsg');
            addToast({
                title: "Error",
                description: errorMsg,
                variant: "destructive",
                duration: 5000
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white text-black">
            <form
                onSubmit={handleSubmit}
                className="bg-white border border-gray-300 p-8 rounded-lg shadow-lg w-96"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>

                <div className="mb-4">
                    <Label.Root htmlFor="email" className="block mb-1 font-medium">
                        Email
                    </Label.Root>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 rounded border border-gray-400 focus:outline-none focus:border-black"
                        required
                    />
                </div>

                <div className="mb-4 relative">
                    <Label.Root htmlFor="password" className="block mb-1 font-medium">
                        Password
                    </Label.Root>
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 rounded border border-gray-400 focus:outline-none focus:border-black pr-10"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-[50px] transform -translate-y-1/2 text-gray-500 hover:text-black"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
}
