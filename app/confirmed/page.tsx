"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Guest = {
  name: string;
  phone: string;
  numberAttending: number;
};

export default function ConfirmedPage() {
  const [guest, setGuest] = useState<Guest | null>(null);

  useEffect(() => {
    const savedGuest = sessionStorage.getItem("weddingGuest");

    if (savedGuest) {
      setGuest(JSON.parse(savedGuest));
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#fffdf9] px-6 py-12 text-slate-800">
      <div className="mx-auto flex min-h-[90vh] w-full max-w-lg items-center justify-center text-center">
        <div>
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-pink-50">
            <span className="text-3xl text-pink-400">✓</span>
          </div>

          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-slate-400">
            Attendance Confirmed
          </p>

          <h1 className="font-serif text-4xl text-slate-900 sm:text-5xl">
            Thank You
          </h1>

          {guest && (
            <p className="mt-5 text-lg text-slate-700">
              Thank you, <strong>{guest.name}</strong>.
            </p>
          )}

          <p className="mx-auto mt-4 max-w-md leading-7 text-slate-600">
            We are delighted to have you join Christianah and Theophilus on
            their special day.
          </p>

          <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-slate-200 bg-white p-6 text-left">
            <p className="text-xs uppercase tracking-widest text-slate-400">
              Event Details
            </p>

            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p>
                <span className="font-medium text-slate-800">Date:</span>{" "}
                12 November 2026
              </p>

              <p>
                <span className="font-medium text-slate-800">Time:</span>{" "}
                10:00 AM
              </p>

              {guest && (
                <p>
                  <span className="font-medium text-slate-800">
                    Attending:
                  </span>{" "}
                  {guest.numberAttending}{" "}
                  {guest.numberAttending === 1 ? "person" : "people"}
                </p>
              )}
            </div>
          </div>

         <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
  <Link
  href="/access-code"
  className="rounded-full bg-slate-900 px-7 py-3.5 text-sm font-medium text-white transition hover:bg-slate-700"
>
  View Access Code
</Link>

  <Link
    href="/wishlist"
    className="rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
  >
    View Wishlist
  </Link>
</div>
        </div>
      </div>
    </main>
  );
}