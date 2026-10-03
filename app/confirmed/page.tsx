"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Guest = {
  name: string;
  phone: string;
  numberAttending: number;
};

export default function ConfirmedPage() {
  const router = useRouter();
  const [guest, setGuest] = useState<Guest | null>(null);

  useEffect(() => {
    const savedGuest = sessionStorage.getItem("weddingGuest");

    if (!savedGuest) {
      router.replace("/");
      return;
    }

    const parsedGuest = JSON.parse(savedGuest);
    setGuest(parsedGuest);
  }, [router]);

  if (!guest) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#fff4f6] px-6 py-12 text-[#172554] transition-colors duration-200 dark:bg-[#0b1f4d] dark:text-slate-200">
      <div className="mx-auto flex min-h-[90vh] w-full max-w-lg items-center justify-center text-center">
        <div className="w-full">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-[#f0cbd3] bg-white shadow-sm dark:border-[#294274] dark:bg-[#10285c]">
            <span className="text-3xl font-medium text-[#4169e1] dark:text-[#e9a6b5]">
              ✓
            </span>
          </div>

          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#4169e1] dark:text-[#e9a6b5]">
            Attendance Confirmed
          </p>

          <h1 className="font-serif text-4xl text-[#172554] dark:text-white sm:text-5xl">
            Thank You
          </h1>

          <p className="mx-auto mt-5 max-w-md leading-7 text-slate-600 dark:text-slate-300">
            Thank you, {guest.name}. Your attendance has been successfully
            confirmed.
          </p>

          <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-[#f0cbd3] bg-white p-6 text-left shadow-sm dark:border-[#294274] dark:bg-[#10285c]">
            <p className="text-xs uppercase tracking-widest text-[#4169e1] dark:text-[#e9a6b5]">
              Your Details
            </p>

            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              <p>
                <span className="font-medium text-[#172554] dark:text-white">
                  Name:
                </span>{" "}
                {guest.name}
              </p>

              <p>
                <span className="font-medium text-[#172554] dark:text-white">
                  Attending:
                </span>{" "}
                {guest.numberAttending}{" "}
                {guest.numberAttending === 1 ? "person" : "people"}
              </p>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-[#f0cbd3] bg-white p-6 text-left shadow-sm dark:border-[#294274] dark:bg-[#10285c]">
            <p className="text-xs uppercase tracking-widest text-[#4169e1] dark:text-[#e9a6b5]">
              Event Details
            </p>

            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              <p>
                <span className="font-medium text-[#172554] dark:text-white">
                  Date:
                </span>{" "}
                12 November 2026
              </p>

              <p>
                <span className="font-medium text-[#172554] dark:text-white">
                  Time:
                </span>{" "}
                10:00 AM
              </p>

              <p>
                <span className="font-medium text-[#172554] dark:text-white">
                  Programme:
                </span>{" "}
                Church Service
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/access-code"
              className="rounded-full bg-[#4169e1] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-[#3158c7]"
            >
              View Access Code
            </Link>

            <Link
              href="/wishlist"
              className="rounded-full border border-[#e9a6b5] bg-white px-7 py-3.5 text-sm font-medium text-[#172554] transition hover:bg-[#fff4f6] dark:border-[#294274] dark:bg-[#10285c] dark:text-white dark:hover:bg-[#16346f]"
            >
              View Wishlist
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}