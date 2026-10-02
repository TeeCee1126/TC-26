"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Gift = {
  type: string;
  itemId?: number;
  itemName?: string;
  name: string;
  phone: string;
  anonymous: boolean;
  amount?: string;
  description?: string;
};

export default function GiftConfirmedPage() {
  const [gift, setGift] = useState<Gift | null>(null);

  useEffect(() => {
    const savedGift = sessionStorage.getItem("selectedGift");

    if (savedGift) {
      setGift(JSON.parse(savedGift));
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
            Gift Details Received
          </p>

          <h1 className="font-serif text-4xl text-slate-900 sm:text-5xl">
            Thank You
          </h1>

          {gift && (
            <p className="mt-5 text-lg text-slate-700">
              Thank you, <strong>{gift.name}</strong>.
            </p>
          )}

          <p className="mx-auto mt-4 max-w-md leading-7 text-slate-600">
            We truly appreciate your thoughtfulness and generosity towards
            Christianah and Theophilus.
          </p>

          {gift && (
            <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-slate-200 bg-white p-6 text-left">
              <p className="text-xs uppercase tracking-widest text-slate-400">
                Gift Details
              </p>

              <div className="mt-4 space-y-3 text-sm text-slate-600">
                {gift.type === "physical" && gift.itemName && (
                  <p>
                    <span className="font-medium text-slate-800">Gift:</span>{" "}
                    {gift.itemName}
                  </p>
                )}

                {gift.type === "cash" && gift.amount && (
                  <p>
                    <span className="font-medium text-slate-800">Amount:</span>{" "}
                    ₦{Number(gift.amount).toLocaleString()}
                  </p>
                )}

                {gift.type === "custom" && gift.description && (
                  <p>
                    <span className="font-medium text-slate-800">Gift:</span>{" "}
                    {gift.description}
                  </p>
                )}

                <p>
                  <span className="font-medium text-slate-800">Given by:</span>{" "}
                  {gift.anonymous ? "Anonymous" : gift.name}
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/wishlist"
              className="rounded-full bg-slate-900 px-7 py-3.5 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Give Another Gift
            </Link>

            <Link
              href="/"
              className="rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Return to Invitation
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}