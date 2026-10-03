"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const ADMIN_PASSWORD = "TC26ADMIN";

export default function AdminLoginPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!password.trim()) {
      setError("Please enter the admin password.");
      return;
    }

    setIsSubmitting(true);

    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("weddingAdminAuthenticated", "true");
      router.replace("/admin");
      return;
    }

    setIsSubmitting(false);
    setError("Incorrect admin password.");
  }

  return (
    <main className="min-h-screen bg-[#fff4f6] px-6 py-12 text-[#172554] dark:bg-[#0b1f4d] dark:text-slate-200">
      <div className="mx-auto flex min-h-[90vh] w-full max-w-md items-center">
        <div className="w-full">
          <a
            href="/"
            className="mb-10 inline-block text-sm text-[#4169e1] transition hover:text-[#3157c7] dark:text-[#e9a6b5] dark:hover:text-white"
          >
            ← Back to invitation
          </a>

          <div className="rounded-3xl border border-[#f0cbd3] bg-white p-7 shadow-sm dark:border-[#294274] dark:bg-[#10285c] sm:p-9">
            <div className="mb-8">
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#4169e1] dark:text-[#e9a6b5]">
                Private Area
              </p>

              <h1 className="font-serif text-4xl text-[#172554] dark:text-white">
                Admin Login
              </h1>

              <p className="mt-4 text-sm leading-6 text-[#475569] dark:text-slate-300">
                Enter the private administrator password to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-[#172554] dark:text-slate-200"
                >
                  Admin Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-[#f0cbd3] bg-white px-4 py-3.5 text-[#172554] outline-none transition placeholder:text-[#94a3b8] focus:border-[#4169e1] focus:ring-2 focus:ring-[#4169e1]/10 dark:border-[#294274] dark:bg-[#10285c] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-[#e9a6b5]"
                />
              </div>

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-[#4169e1] px-6 py-4 text-sm font-medium text-white transition hover:bg-[#3157c7] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#4169e1] dark:hover:bg-[#5b7bea]"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}