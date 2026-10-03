"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Gift = {
  type: string;
  itemName?: string;
  name: string;
  phone: string;
  anonymous: boolean;
  amount?: string;
  description?: string;
};

export default function GiftConfirmedPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const [gift, setGift] = useState<Gift | null>(null);
  const [isAttendee, setIsAttendee] = useState(false);

  useEffect(() => {
    let storageKey = "selectedGift";

    if (type === "custom") {
      storageKey = "customGift";
    }

    if (type === "cash") {
      storageKey = "cashGift";
    }

    const savedGift = sessionStorage.getItem(storageKey);

    if (savedGift) {
      setGift(JSON.parse(savedGift));
    }

    const savedGuest = sessionStorage.getItem("weddingGuest");

    if (savedGuest) {
      setIsAttendee(true);
    }
  }, [type]);

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
            Gift Details Received
          </p>

          <h1 className="font-serif text-4xl text-[#172554] dark:text-white sm:text-5xl">
            Thank You
          </h1>

          {gift && (
            <p className="mt-5 text-lg text-[#475569] dark:text-slate-300">
              Thank you,{" "}
              <strong className="text-[#172554] dark:text-white">
                {gift.name}
              </strong>
              .
            </p>
          )}

          <p className="mx-auto mt-4 max-w-md leading-7 text-[#475569] dark:text-slate-300">
            We truly appreciate your thoughtfulness and generosity towards
            Christianah and Theophilus.
          </p>

          {gift && (
            <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-[#f0cbd3] bg-white p-6 text-left shadow-sm dark:border-[#294274] dark:bg-[#10285c]">
              <p className="text-xs uppercase tracking-widest text-[#4169e1] dark:text-[#e9a6b5]">
                Gift Details
              </p>

              <div className="mt-4 space-y-3 text-sm leading-6 text-[#475569] dark:text-slate-300">
                {gift.type === "physical" && gift.itemName && (
                  <p>
                    <span className="font-medium text-[#172554] dark:text-white">
                      Gift:
                    </span>{" "}
                    {gift.itemName}
                  </p>
                )}

                {gift.type === "cash" && gift.amount && (
                  <p>
                    <span className="font-medium text-[#172554] dark:text-white">
                      Amount:
                    </span>{" "}
                    ₦{Number(gift.amount).toLocaleString()}
                  </p>
                )}

                {gift.type === "custom" && gift.description && (
                  <p>
                    <span className="font-medium text-[#172554] dark:text-white">
                      Gift:
                    </span>{" "}
                    {gift.description}
                  </p>
                )}

                <p>
                  <span className="font-medium text-[#172554] dark:text-white">
                    Given by:
                  </span>{" "}
                  {gift.anonymous ? "Anonymous" : gift.name}
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/wishlist"
              className="rounded-full bg-[#4169e1] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-[#3157c7] dark:bg-[#4169e1] dark:hover:bg-[#5b7bea]"
            >
              Give Another Gift
            </Link>

            {isAttendee ? (
              <Link
                href="/confirmed"
                className="rounded-full border border-[#e9a6b5] bg-white px-7 py-3.5 text-sm font-medium text-[#172554] transition hover:bg-[#fff4f6] dark:border-[#294274] dark:bg-[#10285c] dark:text-white dark:hover:bg-[#16346f]"
              >
                Continue to Confirmation
              </Link>
            ) : (
              <Link
                href="/"
                className="rounded-full border border-[#e9a6b5] bg-white px-7 py-3.5 text-sm font-medium text-[#172554] transition hover:bg-[#fff4f6] dark:border-[#294274] dark:bg-[#10285c] dark:text-white dark:hover:bg-[#16346f]"
              >
                Return to Invitation
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}