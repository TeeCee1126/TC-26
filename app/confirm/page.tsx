"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function ConfirmPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [numberAttending, setNumberAttending] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !phone.trim()) {
      return;
    }

    setIsSubmitting(true);

    sessionStorage.setItem(
      "weddingGuest",
      JSON.stringify({
        name: name.trim(),
        phone: phone.trim(),
        numberAttending: Number(numberAttending),
      }),
    );

    router.push("/confirmed");
  }

  return (
    <main className="min-h-screen bg-[#fffdf9] px-6 py-12 text-slate-800">
      <div className="mx-auto flex min-h-[90vh] w-full max-w-lg items-center">
        <div className="w-full">
          <a
            href="/"
            className="mb-10 inline-block text-sm text-slate-500 transition hover:text-slate-800"
          >
            ← Back to invitation
          </a>

          <div className="mb-10">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-slate-400">
              RSVP
            </p>

            <h1 className="font-serif text-4xl text-slate-900 sm:text-5xl">
              Confirm Your Attendance
            </h1>

            <p className="mt-5 leading-7 text-slate-600">
              Please provide your details below to confirm your invitation.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-slate-700"
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
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:border-slate-500"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-slate-700"
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
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:border-slate-500"
              />
            </div>

            <div>
              <label
                htmlFor="numberAttending"
                className="mb-2 block text-sm font-medium text-slate-700"
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
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-slate-500"
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

            <div className="rounded-xl bg-blue-50 px-4 py-4 text-sm leading-6 text-slate-600">
              Your details will only be used for managing this private
              invitation.
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-slate-900 px-6 py-4 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Confirming..." : "Confirm Attendance"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}