"use client";

import { FormEvent, useState } from "react";

import { useRouter } from "next/navigation";

import Link from "next/link";



import { GiftRecord, GiftTiming } from "@/lib/gift";

export default function CashGiftPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [amount, setAmount] = useState("");
  const [giftTiming, setGiftTiming] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedAmount = amount.trim();

    if (!anonymous && !trimmedName) {
      setError(
        "Please enter your name or choose the anonymous option.",
      );
      return;
    }

    const numericAmount = Number(trimmedAmount);

    if (
      !trimmedAmount ||
      Number.isNaN(numericAmount) ||
      numericAmount <= 0
    ) {
      setError("Please enter a valid cash gift amount.");
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
      type: "cash",
      name: anonymous ? "Anonymous" : trimmedName,
      phone: anonymous ? "" : normalisedPhone,
      anonymous,
      amount: trimmedAmount,
      giftTiming: giftTiming as GiftTiming,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/gifts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "cash",
          name: gift.name,
          phone: gift.phone,
          anonymous: gift.anonymous,
          giftTiming: gift.giftTiming,
          amount: gift.amount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Unable to save your cash gift. Please try again.",
        );

        setIsSubmitting(false);
        return;
      }

      // Keep this temporarily for the gift confirmation page.
      sessionStorage.setItem(
        "cashGift",
        JSON.stringify(gift),
      );

      router.push("/gift-confirmed?type=cash");
    } catch (error) {
      console.error("Cash gift submission error:", error);

      setError(
        "Unable to save your cash gift. Please check your connection and try again.",
      );

      setIsSubmitting(false);
    }
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
              Cash Gift
            </p>

            <h1 className="mt-3 font-serif text-3xl text-[#172554] dark:text-white sm:text-4xl">
              Give a Cash Gift
            </h1>

            <p className="mt-4 text-sm leading-6 text-[#475569] dark:text-slate-300">
              If you would prefer to give a cash gift, you can
              record your intended gift below.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
              <div>
                <label
                  htmlFor="amount"
                  className="mb-2 block text-sm font-medium text-[#172554] dark:text-white"
                >
                  Gift Amount
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#64748b]">
                    ₦
                  </span>

                  <input
                    id="amount"
                    type="number"
                    min="1"
                    step="1"
                    value={amount}
                    onChange={(event) =>
                      setAmount(event.target.value)
                    }
                    disabled={isSubmitting}
                    placeholder="Enter amount"
                    className="w-full rounded-xl border border-[#f0cbd3] bg-white py-3 pl-9 pr-4 text-sm text-[#172554] outline-none transition focus:border-[#4169e1] disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-[#294274] dark:bg-[#0b1f4d] dark:text-white dark:disabled:bg-[#16346f]"
                  />
                </div>
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
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  disabled={anonymous || isSubmitting}
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-[#f0cbd3] bg-white px-4 py-3 text-sm text-[#172554] outline-none transition focus:border-[#4169e1] disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-[#294274] dark:bg-[#0b1f4d] dark:text-white dark:disabled:bg-[#16346f]"
                />
              </div>

              <label className="flex cursor-pointer items-center gap-3 text-sm text-[#475569] dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={anonymous}
                  onChange={(event) =>
                    setAnonymous(event.target.checked)
                  }
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
                  onChange={(event) =>
                    setPhone(event.target.value)
                  }
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
                  onChange={(event) =>
                    setGiftTiming(event.target.value)
                  }
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

              <div className="rounded-2xl border border-[#f0cbd3] bg-[#fff4f6] px-4 py-5 dark:border-[#294274] dark:bg-[#0b1f4d]">
                <p className="text-sm font-medium text-[#172554] dark:text-white">
                  Cash Gift Payment Details
                </p>

                <div className="mt-4 space-y-4 text-sm leading-6 text-[#475569] dark:text-slate-300">
                  <div>
                    <p className="font-medium text-[#172554] dark:text-white">
                      GTBank
                    </p>

                    <p>
                      Account Number:{" "}
                      <span className="font-medium">
                        0261338693
                      </span>
                    </p>

                    <p>
                      Account Name:{" "}
                      <span className="font-medium">
                        Olutoye Abiodun Theophilus
                      </span>
                    </p>
                  </div>

                  <div className="border-t border-[#f0cbd3] pt-4 dark:border-[#294274]">
                    <p className="font-medium text-[#172554] dark:text-white">
                      OPay
                    </p>

                    <p>
                      Account Number:{" "}
                      <span className="font-medium">
                        7068364743
                      </span>
                    </p>

                    <p>
                      Account Name:{" "}
                      <span className="font-medium">
                        Abiodun Olutoye
                      </span>
                    </p>
                  </div>

                  <div className="border-t border-[#f0cbd3] pt-4 dark:border-[#294274]">
                    <p className="font-medium text-[#172554] dark:text-white">
                      Transfer Description
                    </p>

                    <p>
                      Please use{" "}
                      <span className="font-medium text-[#4169e1] dark:text-[#e9a6b5]">
                        Wedding gift
                      </span>{" "}
                      as the transfer description.
                    </p>
                  </div>
                </div>
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
                {isSubmitting
                  ? "Processing..."
                  : "Confirm Cash Gift"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}