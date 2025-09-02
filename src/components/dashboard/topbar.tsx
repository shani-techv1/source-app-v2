"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Topbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { name: "Roles", path: "/dashboard/roles" },
        { name: "Users", path: "/dashboard/users" },
        // { name: "Settings", path: "/dashboard/settings" },
    ];

    return (
        <header className="bg-white px-4 py-4 border-b border-gray-200">
            <nav className="flex justify-center space-x-6">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={`flex items-center px-4 py-2 rounded hover:bg-gray-200 transition ${pathname === item.path ? "bg-gray-200 font-lighter" : ""
                            }`}
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>
        </header>
    );
}
