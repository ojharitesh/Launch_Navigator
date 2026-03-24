"use client";

import { useEffect, useState } from "react";

export type DashboardTheme = "dark" | "light";

const STORAGE_KEY = "dashboard-theme";

export function useDashboardTheme() {
    const [theme, setTheme] = useState<DashboardTheme>("dark");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored === "dark" || stored === "light") {
            setTheme(stored);
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        window.localStorage.setItem(STORAGE_KEY, theme);
    }, [theme, mounted]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return { theme, setTheme, toggleTheme, mounted };
}
