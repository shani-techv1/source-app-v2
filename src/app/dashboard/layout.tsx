"use client";

import Sidebar from "@/components/dashboard/sidebar";
import Topbar from "@/components/dashboard/topbar";
import ProgressBar from "./progressbar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { token } = useAuth();
    const router = useRouter();

    // Check login status on mount
    useEffect(() => {
        if (!token) {
            router.replace("/sign-in"); // replace to prevent going back to dashboard
        }
    }, [token, router]);

    // Show loader while checking auth
    if (!token) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <p className="text-gray-700">Redirecting to login...</p>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <ProgressBar />
                <Topbar />
                <main className="flex-1 p-4 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}
