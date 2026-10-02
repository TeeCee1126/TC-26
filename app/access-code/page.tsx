"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Guest = {
  name: string;
  phone: string;
  numberAttending: number;
};

export default function AccessCodePage() {
  const [guest, setGuest] = useState<Guest | null>(null);
  const [accessCode, setAccessCode] = useState("");

  useEffect(() => {
    const savedGuest = sessionStorage.getItem("weddingGuest");

    if (savedGuest) {
      const parsedGuest = JSON.parse(savedGuest);
      setGuest(parsedGuest);

      let savedCode = sessionStorage.getItem("weddingAccessCode");

      if (!savedCode) {
        savedCode = Math.random()
          .toString(36)
          .substring(2, 8)
          .toUpperCase();

        sessionStorage.setItem("weddingAccessCode", savedCode);
      }

      setAccessCode(savedCode);
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#fffdf9] px-6 py-12 text-slate-800">
      <div className="mx-auto flex min-h-[90vh] w-full max-w-lg items-center justify-center text-center">
        <div className="w-full">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-slate-400">
            Private Invitation
          </p>

          <h1 className="font-serif text-4xl text-slate-900 sm:text-5xl">
            Your Access Code
          </h1>

          {guest && (
            <p className="mx-auto mt-5 max-w-md leading-7 text-slate-600">
              Thank you, {guest.name}. Your invitation has been confirmed.
            </p>
          )}

          <div className="mx-auto mt-10 max-w-sm rounded-2xl border border-slate-200 bg-white p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
              Access Code
            </p>

            <p className="mt-5 text-4xl font-semibold tracking-[0.3em] text-slate-900">
              {accessCode}
            </p>

            <p className="mt-5 text-sm leading-6 text-slate-500">
              Please keep this code safe. It may be used to access your
              invitation details later.
            </p>
          </div>

          <div className="mt-8 rounded-2xl bg-blue-50 px-5 py-4 text-sm leading-6 text-slate-600">
            This code is currently stored privately in your browser. We will
            connect it to your invitation record when the database is added.
          </div>

          <Link
            href="/access-code"
            className="mt-8 inline-flex rounded-full bg-slate-900 px-7 py-3.5 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Return to Invitation
          </Link>
        </div>
      </div>
    </main>
  );
}