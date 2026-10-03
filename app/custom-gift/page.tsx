"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { saveGift } from "@/lib/gift-storage";
import { GiftRecord, GiftTiming } from "@/lib/gift";

export default function CustomGiftPage() {
  const router = useRouter();

  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [giftTiming, setGiftTiming] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    const trimmedDescription = description.trim();
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedDescription) {
      setError("Please describe the gift you would like to give.");
      return;
    }

    if (!anonymous && !trimmedName) {
      setError("Please enter your name or choose the anonymous option.");
      return;
    }

    if (!giftTiming) {
      setError("Please select when you plan to give this gift.");
      return;
    }

    const normalisedPhone = trimmedPhone.replace(/[\s-]/g, "");

    if (!anonymous && trimmedPhone) {
      const validPhone =
        /^(0\d{10}|\+234\d{10})$/.test(normalisedPhone);

      if (!validPhone) {
        setError("Please enter a valid Nigerian phone number.");
        return;
      }
    }

    setIsSubmitting(true);

    const gift: GiftRecord = {
      type: "custom",
      description: trimmedDescription,
      name: anonymous ? "Anonymous" : trimmedName,
      phone: anonymous ? "" : normalisedPhone,
      anonymous,
      giftTiming: giftTiming as GiftTiming,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    saveGift(gift);

    sessionStorage.setItem(
      "customGift",
      JSON.stringify(gift),
    );

    router.push("/gift-confirmed?type=custom");
  }

  return (
    <main className="min-h-screen bg-[#fff4f6] px-6 py-12 text-[#172554] transition-colors duration-200 dark:bg-[#0b1f4d] dark:text-slate-200">
      <div className="mx-auto flex min-h-[90vh] w-full max-w-lg items-center justify-center">
        <div className="w-full">
          <Link
            href="/wishlist"
            className="mb-8 inline-block text-sm text-[#4169e1] transition hover:text-[#3157c7] dark:text-[#e9a6b5] dark:hover:text-white"
          >
            ← Back to wishlist
          </Link>

          <div className="rounded-3xl border border-[#f0cbd3] bg-white p-7 shadow-sm dark:border-[#294274] dark:bg-[#10285c] sm:p-9">
            <p className="text-xs uppercase tracking-[0.25em] text-[#4169e1] dark:text-[#e9a6b5]">
              Your Choice
            </p>

            <h1 className="mt-3 font-serif text-3xl text-[#172554] dark:text-white sm:text-4xl">
              Custom Gift
            </h1>

            <p className="mt-4 text-sm leading-6 text-[#475569] dark:text-slate-300">
              Have something else in mind? Tell us about the gift you would
              like to give.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-[#172554] dark:text-white"
                >
                  Gift Description
                </label>

                <textarea
                  id="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  disabled={isSubmitting}
                  placeholder="Describe the gift you would like to give..."
                  rows={5}
                  className="w-full resize-none rounded-xl border border-[#f0cbd3] bg-white px-4 py-3 text-sm text-[#172554] outline-none transition focus:border-[#4169e1] disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-[#294274] dark:bg-[#0b1f4d] dark:text-white dark:disabled:bg-[#16346f]"
                />
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-[#172554] dark:text-white"
                >
                  Your Name
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  disabled={anonymous || isSubmitting}
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-[#f0cbd3] bg-white px-4 py-3 text-sm text-[#172554] outline-none transition focus:border-[#4169e1] disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-[#294274] dark:bg-[#0b1f4d] dark:text-white dark:disabled:bg-[#16346f]"
                />
              </div>

              <label className="flex cursor-pointer items-center gap-3 text-sm text-[#475569] dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={anonymous}
                  onChange={(event) => setAnonymous(event.target.checked)}
                  disabled={isSubmitting}
                  className="h-4 w-4 accent-[#4169e1]"
                />

                Give this gift anonymously
              </label>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-[#172554] dark:text-white"
                >
                  Phone Number

                  <span className="ml-1 font-normal text-[#64748b]">
                    (Optional)
                  </span>
                </label>

                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  disabled={anonymous || isSubmitting}
                  placeholder="08012345678"
                  className="w-full rounded-xl border border-[#f0cbd3] bg-white px-4 py-3 text-sm text-[#172554] outline-none transition focus:border-[#4169e1] disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-[#294274] dark:bg-[#0b1f4d] dark:text-white dark:disabled:bg-[#16346f]"
                />
              </div>

              <div>
                <label
                  htmlFor="giftTiming"
                  className="mb-2 block text-sm font-medium text-[#172554] dark:text-white"
                >
                  When do you plan to give this gift?
                </label>

                <select
                  id="giftTiming"
                  value={giftTiming}
                  onChange={(event) => setGiftTiming(event.target.value)}
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-[#f0cbd3] bg-white px-4 py-3 text-sm text-[#172554] outline-none transition focus:border-[#4169e1] disabled:cursor-not-allowed dark:border-[#294274] dark:bg-[#0b1f4d] dark:text-white"
                >
                  <option value="">Select an option</option>

                  <option value="Before the wedding">
                    Before the wedding
                  </option>

                  <option value="On the wedding day">
                    On the wedding day
                  </option>

                  <option value="After the wedding">
                    After the wedding
                  </option>
                </select>
              </div>
<div className="rounded-2xl border border-[#f0cbd3] bg-[#fff4f6] px-4 py-4 dark:border-[#294274] dark:bg-[#0b1f4d]">
  <p className="text-sm font-medium text-[#172554] dark:text-white">
    Delivery Information
  </p>

  <p className="mt-2 text-sm leading-6 text-[#475569] dark:text-slate-300">
    For delivery arrangements, please reach out to the groom on{" "}
    <a
      href="tel:07068364743"
      className="font-medium text-[#4169e1] hover:underline dark:text-[#e9a6b5]"
    >
      07068364743
    </a>
    .
  </p>
</div>
              {error && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-300">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-[#4169e1] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#3157c7] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Processing..." : "Continue"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}