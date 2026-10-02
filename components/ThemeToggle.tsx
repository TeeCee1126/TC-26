"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("weddingTheme");

    if (savedTheme === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  function toggleTheme() {
    const newDark = !dark;

    setDark(newDark);

    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("weddingTheme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("weddingTheme", "light");
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="fixed right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-lg text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
    >
      {dark ? "☀" : "☾"}
    </button>
  );
}