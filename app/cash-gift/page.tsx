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
      "cashGift",
      JSON.stringify({
        type: "cash",
        name: anonymous ? "Anonymous" : name.trim(),
        phone: anonymous ? "" : phone.trim(),
        anonymous,
        amount: amount.trim(),
      }),
    );

    router.push("/gift-confirmed?type=cash");
  }

  return (
    <main className="min-h-screen bg-[#fff4f6] px-6 py-12 text-[#172554] transition-colors duration-200 dark:bg-[#0b1f4d] dark:text-slate-200">
      <div className="mx-auto flex min-h-[90vh] w-full max-w-lg items-center">
        <div className="w-full">

          <Link
            href="/wishlist"
            className="mb-10 inline-block text-sm text-[#4169e1] transition hover:text-[#3157c7] dark:text-[#e9a6b5] dark:hover:text-white"
          >
            ← Back to wishlist
          </Link>

          <div className="mb-10">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#4169e1] dark:text-[#e9a6b5]">
              Monetary Gift
            </p>

            <h1 className="font-serif text-4xl text-[#172554] dark:text-white sm:text-5xl">
              Cash Gift
            </h1>

            <p className="mt-5 leading-7 text-[#475569] dark:text-slate-300">
              If you would like to bless us with a cash gift, you can provide
              the details below.
            </p>
          </div>

          <div className="mb-8 rounded-2xl border border-[#f0cbd3] bg-white p-5 shadow-sm dark:border-[#294274] dark:bg-[#10285c]">
            <p className="text-xs uppercase tracking-[0.25em] text-[#4169e1] dark:text-[#e9a6b5]">
              A Gift of Love
            </p>

            <p className="mt-3 text-sm leading-6 text-[#475569] dark:text-slate-300">
              Thank you for thinking of Christianah and Theophilus as they
              begin this new chapter together.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label
                htmlFor="amount"
                className="mb-2 block text-sm font-medium text-[#172554] dark:text-slate-200"
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
                className="w-full rounded-xl border border-[#f0cbd3] bg-white px-4 py-3.5 text-[#172554] outline-none transition placeholder:text-[#94a3b8] focus:border-[#4169e1] focus:ring-2 focus:ring-[#4169e1]/10 dark:border-[#294274] dark:bg-[#10285c] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-[#e9a6b5]"
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-[#172554] dark:text-slate-200"
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
                className="w-full rounded-xl border border-[#f0cbd3] bg-white px-4 py-3.5 text-[#172554] outline-none transition placeholder:text-[#94a3b8] focus:border-[#4169e1] focus:ring-2 focus:ring-[#4169e1]/10 disabled:bg-slate-100 dark:border-[#294274] dark:bg-[#10285c] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-[#e9a6b5] dark:disabled:bg-[#0f2758]"
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
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="Enter your phone number"
                disabled={anonymous}
                className="w-full rounded-xl border border-[#f0cbd3] bg-white px-4 py-3.5 text-[#172554] outline-none transition placeholder:text-[#94a3b8] focus:border-[#4169e1] focus:ring-2 focus:ring-[#4169e1]/10 disabled:bg-slate-100 dark:border-[#294274] dark:bg-[#10285c] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-[#e9a6b5] dark:disabled:bg-[#0f2758]"
              />
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#f0cbd3] bg-white p-4 dark:border-[#294274] dark:bg-[#10285c]">
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
                className="mt-1 h-4 w-4 accent-[#4169e1]"
              />

              <span>
                <span className="block text-sm font-medium text-[#172554] dark:text-white">
                  Give anonymously
                </span>

                <span className="mt-1 block text-sm leading-5 text-[#475569] dark:text-slate-300">
                  Your name and phone number will not be attached to the gift.
                </span>
              </span>
            </label>

            <div className="rounded-xl border border-[#f0cbd3] bg-white/70 px-4 py-4 text-sm leading-6 text-[#475569] dark:border-[#294274] dark:bg-[#10285c] dark:text-slate-300">
              Payment details will be provided after you continue.
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-[#4169e1] px-6 py-4 text-sm font-medium text-white transition hover:bg-[#3157c7] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#4169e1] dark:hover:bg-[#5b7bea]"
            >
              {isSubmitting ? "Processing..." : "Continue"}
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}