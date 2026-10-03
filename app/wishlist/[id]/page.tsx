"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const wishlistItems = [
  {
    id: 1,
    name: "Electric Motorcycle",
    description:
      "An electric motorcycle for convenient everyday transportation.",
  },
  {
    id: 2,
    name: "Washing Machine",
    description:
      "A reliable washing machine to help us settle into our new home.",
  },
  {
    id: 3,
    name: "Refrigerator / Freezer",
    description:
      "A spacious refrigerator and freezer for our new home.",
  },
  {
    id: 4,
    name: "Smart TV — 50 or 55 Inches",
    description:
      "A large smart television for our living room.",
  },
  {
    id: 5,
    name: "Big Centre Rug",
    description:
      "A large centre rug to complete our living room.",
  },
  {
    id: 6,
    name: "Air Fryer",
    description:
      "An air fryer for convenient home cooking.",
  },
  {
    id: 7,
    name: "Generator",
    description:
      "A reliable generator for backup power at home.",
  },
  {
    id: 8,
    name: "Solar Set-up",
    description:
      "A complete solar power system with inverter, solar panels and battery.",
  },
  {
    id: 9,
    name: "Kitchen Blender",
    description:
      "A quality blender to help us set up our kitchen.",
  },
  {
    id: 10,
    name: "Microwave Oven",
    description:
      "A microwave oven for our new kitchen.",
  },
  {
    id: 11,
    name: "Standing Fan",
    description:
      "A quality standing fan for our living space.",
  },
];

export default function GiftDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const item = wishlistItems.find(
    (wishlistItem) => wishlistItem.id === Number(params.id),
  );

  if (!item) {
    return (
      <main className="min-h-screen bg-[#fff4f6] px-6 py-12 text-[#172554] transition-colors duration-200 dark:bg-[#0b1f4d] dark:text-slate-200">
        <div className="mx-auto flex min-h-[80vh] max-w-lg items-center justify-center text-center">
          <div>
            <h1 className="font-serif text-4xl text-[#172554] dark:text-white">
              Gift Not Found
            </h1>

            <p className="mt-4 text-[#475569] dark:text-slate-300">
              The selected wishlist item could not be found.
            </p>

            <Link
              href="/wishlist"
              className="mt-8 inline-flex rounded-full bg-[#4169e1] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-[#3157c7] dark:hover:bg-[#5b7bea]"
            >
              Back to Wishlist
            </Link>
          </div>
        </div>
      </main>
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!anonymous && !name.trim()) {
      return;
    }

    setIsSubmitting(true);

    sessionStorage.setItem(
      "selectedGift",
      JSON.stringify({
        type: "physical",
        itemId: item.id,
        itemName: item.name,
        name: anonymous ? "Anonymous" : name.trim(),
        phone: anonymous ? "" : phone.trim(),
        anonymous,
      }),
    );

    router.push("/gift-confirmed");
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
              Your Gift
            </p>

            <h1 className="font-serif text-4xl text-[#172554] dark:text-white sm:text-5xl">
              {item.name}
            </h1>

            <p className="mt-5 leading-7 text-[#475569] dark:text-slate-300">
              {item.description}
            </p>
          </div>

          <div className="mb-8 rounded-2xl border border-[#f0cbd3] bg-white p-5 shadow-sm dark:border-[#294274] dark:bg-[#10285c]">
            <p className="text-xs uppercase tracking-[0.25em] text-[#4169e1] dark:text-[#e9a6b5]">
              Selected Gift
            </p>

            <p className="mt-3 text-lg font-medium text-[#172554] dark:text-white">
              {item.name}
            </p>

            <p className="mt-2 text-sm leading-6 text-[#475569] dark:text-slate-300">
              Thank you for choosing to bless Christianah and Theophilus with
              this gift.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

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
              You can give this gift whether or not you are attending the
              wedding.
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