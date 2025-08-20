"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";

export default function ProgressBar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Start when route changes
        NProgress.start();

        // Complete as soon as page fully loads
        const handleLoad = () => {
            NProgress.done();
        };
        window.addEventListener("load", handleLoad);

        // Safety: If load event doesn’t trigger (e.g., cache), still finish after delay
        const timeout = setTimeout(() => {
            NProgress.done();
        }, 300);

        return () => {
            window.removeEventListener("load", handleLoad);
            clearTimeout(timeout);
        };
    }, [pathname, searchParams]);

    return null;
}
