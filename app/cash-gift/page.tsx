"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CashGiftPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!anonymous && !name.trim()) {
      return;
    }

    if (!amount.trim()) {
      return;
    }

    setIsSubmitting(true);

    sessionStorage.setItem(
      "selectedGift",
      JSON.stringify({
        type: "cash",
        name: anonymous ? "Anonymous" : name.trim(),
        phone: anonymous ? "" : phone.trim(),
        anonymous,
        amount: amount.trim(),
      }),
    );

    router.push("/gift-confirmed");
  }

  return (
    <main className="min-h-screen bg-[#fffdf9] px-6 py-12 text-slate-800">
      <div className="mx-auto flex min-h-[90vh] w-full max-w-lg items-center">
        <div className="w-full">
          <Link
            href="/wishlist"
            className="mb-10 inline-block text-sm text-slate-500 transition hover:text-slate-800"
          >
            ← Back to wishlist
          </Link>

          <div className="mb-10">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-slate-400">
              Monetary Gift
            </p>

            <h1 className="font-serif text-4xl text-slate-900 sm:text-5xl">
              Cash Gift
            </h1>

            <p className="mt-5 leading-7 text-slate-600">
              If you would like to bless us with a cash gift, you can provide
              the details below.
            </p>
          </div>

          <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
              A Gift of Love
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Thank you for thinking of Christianah and Theophilus as they
              begin this new chapter together.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="amount"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Gift Amount
              </label>

              <input
                id="amount"
                type="number"
                min="1"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="Enter amount"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:border-slate-500"
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Your Name
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your name"
                disabled={anonymous}
                required={!anonymous}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:border-slate-500 disabled:bg-slate-100"
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
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="Enter your phone number"
                disabled={anonymous}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:border-slate-500 disabled:bg-slate-100"
              />
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-slate-50 p-4">
              <input
                type="checkbox"
                checked={anonymous}
                onChange={(event) => {
                  setAnonymous(event.target.checked);

                  if (event.target.checked) {
                    setName("");
                    setPhone("");
                  }
                }}
                className="mt-1 h-4 w-4"
              />

              <span>
                <span className="block text-sm font-medium text-slate-800">
                  Give anonymously
                </span>

                <span className="mt-1 block text-sm leading-5 text-slate-500">
                  Your name and phone number will not be attached to the gift.
                </span>
              </span>
            </label>

            <div className="rounded-xl bg-blue-50 px-4 py-4 text-sm leading-6 text-slate-600">
              Payment details will be provided after you continue.
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-slate-900 px-6 py-4 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Processing..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}