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
      <main className="min-h-screen bg-[#fffdf9] px-6 py-12 text-slate-800">
        <div className="mx-auto flex min-h-[80vh] max-w-lg items-center justify-center text-center">
          <div>
            <h1 className="font-serif text-4xl text-slate-900">
              Gift Not Found
            </h1>

            <p className="mt-4 text-slate-600">
              The selected wishlist item could not be found.
            </p>

            <Link
              href="/wishlist"
              className="mt-8 inline-flex rounded-full bg-slate-900 px-7 py-3.5 text-sm font-medium text-white"
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
              Your Gift
            </p>

            <h1 className="font-serif text-4xl text-slate-900 sm:text-5xl">
              {item.name}
            </h1>

            <p className="mt-5 leading-7 text-slate-600">
              {item.description}
            </p>
          </div>

          <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
              Selected Gift
            </p>

            <p className="mt-3 text-lg font-medium text-slate-900">
              {item.name}
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Thank you for choosing to bless Christianah and Theophilus with
              this gift.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
              You can give this gift whether or not you are attending the
              wedding.
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