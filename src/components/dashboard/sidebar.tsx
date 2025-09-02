"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

const menuItems = [
    // { name: "Dashboard", path: "/dashboard" },
    { name: "Roles", path: "/dashboard/roles" },
    { name: "Users", path: "/dashboard/users" },
    { name: "Settings", path: "/dashboard/settings" },
];

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const pathname = usePathname();

    return (
        <aside
            className={`bg-white  transition-all duration-300 ${isOpen ? "w-64" : "w-16"
                }`}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
                {isOpen && <span className="font-bold text-lg">Sourced Admin</span>}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-1 rounded hover:bg-gray-200"
                >
                    <Menu size={20} />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col space-y-1 mt-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={`flex items-center px-4 py-2 rounded hover:bg-gray-200 transition ${pathname === item.path ? "bg-gray-200 font-lighter" : ""
                            }`}
                    >
                        {isOpen ? item.name : item.name.charAt(0)}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
