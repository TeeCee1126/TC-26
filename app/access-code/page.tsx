"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Guest = {
  name: string;
  phone: string;
  numberAttending: number;
};

export default function AccessCodePage() {
  const router = useRouter();

  const [guest, setGuest] = useState<Guest | null>(null);
  const [accessCode, setAccessCode] = useState("");

  useEffect(() => {
    const savedGuest = sessionStorage.getItem("weddingGuest");

    if (!savedGuest) {
      router.replace("/");
      return;
    }

    const parsedGuest = JSON.parse(savedGuest);
    setGuest(parsedGuest);

    let savedCode = sessionStorage.getItem("weddingAccessCode");

    if (!savedCode) {
      const randomPart = Math.random()
        .toString(36)
        .substring(2, 7)
        .toUpperCase();

      savedCode = `TC${randomPart}`;

      sessionStorage.setItem("weddingAccessCode", savedCode);
    }

    setAccessCode(savedCode);
  }, [router]);

  if (!guest) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#fff4f6] px-6 py-12 text-[#172554] transition-colors duration-200 dark:bg-[#0b1f4d] dark:text-slate-200">
      <div className="mx-auto flex min-h-[90vh] w-full max-w-lg items-center justify-center text-center">
        <div className="w-full">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#4169e1] dark:text-[#e9a6b5]">
            Private Invitation
          </p>

          <h1 className="font-serif text-4xl text-[#172554] dark:text-white sm:text-5xl">
            Your Access Code
          </h1>

          <p className="mx-auto mt-5 max-w-md leading-7 text-slate-600 dark:text-slate-300">
            Thank you, {guest.name}. Your invitation has been confirmed.
          </p>

          <div className="mx-auto mt-10 max-w-sm rounded-2xl border border-[#f0cbd3] bg-white p-8 shadow-sm dark:border-[#294274] dark:bg-[#10285c]">
            <p className="text-xs uppercase tracking-[0.25em] text-[#4169e1] dark:text-[#e9a6b5]">
              Access Code
            </p>

            <p className="mt-5 text-4xl font-semibold tracking-[0.3em] text-[#172554] dark:text-white">
              {accessCode}
            </p>

            <p className="mt-5 text-sm leading-6 text-slate-500 dark:text-slate-300">
              Please keep this code safe. It may be used to access your
              invitation details later.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-[#f0cbd3] bg-[#fff0f3] px-5 py-4 text-sm leading-6 text-slate-600 dark:border-[#294274] dark:bg-[#10285c] dark:text-slate-300">
            This code is currently stored privately in your browser. We will
            connect it to your invitation record when the database is added.
          </div>

          <Link
            href="/"
            className="mt-8 inline-flex rounded-full bg-[#4169e1] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-[#3158c7]"
          >
            Return to Invitation
          </Link>
        </div>
      </div>
    </main>
  );
}