"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { User as UserIcon, ChevronDown } from "lucide-react";

export default function Topbar() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        router.push("/sign-in");
    };

    let pageTitle = "Dashboard"; // default title

    switch (pathname) {
        case "/dashboard/users":
            pageTitle = "User Dashboard";
            break;
        case "/dashboard/roles":
            pageTitle = "Roles Dashboard";
            break;
        case "/dashboard/analytics":
            pageTitle = "Analytics Dashboard";
            break;
        case "/dashboard/settings":
            pageTitle = "Settings Dashboard";
            break;
        default:
            pageTitle = "Dashboard";
    }

    return (
        <header className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-200">
            <h1 className="text-lg font-semibold">{pageTitle}</h1>

            <div className="relative">
                {/* Profile button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center space-x-2 px-2 py-1 rounded"
                >
                    <UserIcon className="w-5 h-5 text-gray-700" />
                    <span className="text-sm">{user?.name || "User"}</span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {/* Dropdown menu */}
                {isOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                router.push("/profile");
                            }}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                            Profile
                        </button>
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
