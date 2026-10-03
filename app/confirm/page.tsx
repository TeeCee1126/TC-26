"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { GuestRecord } from "@/lib/guest";

export default function ConfirmPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [numberAttending, setNumberAttending] = useState("1");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const attending = Number(numberAttending);

    if (!trimmedName) {
      setError("Please enter your full name.");
      return;
    }

    const normalisedPhone = trimmedPhone.replace(/[\s-]/g, "");

    const validPhone =
      /^(0\d{10}|\+234\d{10})$/.test(normalisedPhone);

    if (!validPhone) {
      setError("Please enter a valid Nigerian phone number.");
      return;
    }

    if (attending < 1 || attending > 10) {
      setError("Please select the number of people attending.");
      return;
    }

    setIsSubmitting(true);

    const guest: GuestRecord = {
      name: trimmedName,
      phone: normalisedPhone,
      numberAttending: attending,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/guests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          phone: normalisedPhone,
          numberAttending: attending,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Unable to save your attendance. Please try again.",
        );
        setIsSubmitting(false);
        return;
      }

      // Keep the guest details available for the current invitation flow.
      sessionStorage.setItem(
        "weddingGuest",
        JSON.stringify(guest),
      );

      // Keep localStorage temporarily while the admin section
      // is being migrated to MongoDB.

      router.push("/wishlist?from=confirm");
    } catch (error) {
      console.error("RSVP submission error:", error);

      setError(
        "Unable to save your attendance. Please check your connection and try again.",
      );

      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#fff4f6] px-6 py-12 text-[#172554] transition-colors duration-200 dark:bg-[#0b1f4d] dark:text-slate-200">
      <div className="mx-auto flex min-h-[90vh] w-full max-w-lg items-center">
        <div className="w-full">
          <a
            href="/"
            className="mb-10 inline-block text-sm text-[#4169e1] transition hover:text-[#3157c7] dark:text-[#e9a6b5] dark:hover:text-white"
          >
            ← Back to invitation
          </a>

          <div className="mb-10">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#4169e1] dark:text-[#e9a6b5]">
              RSVP
            </p>

            <h1 className="font-serif text-4xl text-[#172554] dark:text-white sm:text-5xl">
              Confirm Your Attendance
            </h1>

            <p className="mt-5 leading-7 text-[#475569] dark:text-slate-300">
              Please provide your details below to confirm your invitation.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-[#172554] dark:text-slate-200"
              >
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your full name"
                required
                className="w-full rounded-xl border border-[#f0cbd3] bg-white px-4 py-3.5 text-[#172554] outline-none transition placeholder:text-[#94a3b8] focus:border-[#4169e1] focus:ring-2 focus:ring-[#4169e1]/10 dark:border-[#294274] dark:bg-[#10285c] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-[#e9a6b5]"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-[#172554] dark:text-slate-200"
              >
                Phone Number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="e.g. 08012345678"
                required
                className="w-full rounded-xl border border-[#f0cbd3] bg-white px-4 py-3.5 text-[#172554] outline-none transition placeholder:text-[#94a3b8] focus:border-[#4169e1] focus:ring-2 focus:ring-[#4169e1]/10 dark:border-[#294274] dark:bg-[#10285c] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-[#e9a6b5]"
              />
            </div>

            <div>
              <label
                htmlFor="numberAttending"
                className="mb-2 block text-sm font-medium text-[#172554] dark:text-slate-200"
              >
                Number Attending
              </label>

              <select
                id="numberAttending"
                name="numberAttending"
                value={numberAttending}
                onChange={(event) =>
                  setNumberAttending(event.target.value)
                }
                className="w-full rounded-xl border border-[#f0cbd3] bg-white px-4 py-3.5 text-[#172554] outline-none transition focus:border-[#4169e1] focus:ring-2 focus:ring-[#4169e1]/10 dark:border-[#294274] dark:bg-[#10285c] dark:text-white dark:focus:border-[#e9a6b5]"
              >
                <option value="1">1 person</option>
                <option value="2">2 people</option>
                <option value="3">3 people</option>
                <option value="4">4 people</option>
                <option value="5">5 people</option>
                <option value="6">6 people</option>
                <option value="7">7 people</option>
                <option value="8">8 people</option>
                <option value="9">9 people</option>
                <option value="10">10 people</option>
              </select>
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
              >
                {error}
              </div>
            )}

            <div className="rounded-xl border border-[#f0cbd3] bg-white/70 px-4 py-4 text-sm leading-6 text-[#475569] dark:border-[#294274] dark:bg-[#10285c] dark:text-slate-300">
              Your details will only be used for managing this private
              invitation.
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-[#4169e1] px-6 py-4 text-sm font-medium text-white transition hover:bg-[#3157c7] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#4169e1] dark:hover:bg-[#5b7bea]"
            >
              {isSubmitting ? "Confirming..." : "Confirm Attendance"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}