"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

const wishlistItems = [
  {
    id: 1,
    name: "Electric Motorcycle",
    description:
      "An electric motorcycle for convenient everyday transportation.",
    image:
      "https://images.squarespace-cdn.com/content/v1/63c94d36684e583a7ae37e3b/f3ce2088-8189-4f5a-9867-0c140e866a3d/Captain-Electro-Spiral-Electric-Motorcycle-1.jpg",
  },
  {
    id: 2,
    name: "Washing Machine",
    description:
      "A reliable washing machine to help us settle into our new home.",
    image:
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1",
  },
  {
    id: 3,
    name: "Refrigerator / Freezer",
    description:
      "A spacious refrigerator and freezer for our new home.",
    image:
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5",
  },
  {
    id: 4,
    name: "Smart TV — 50 or 55 Inches",
    description:
      "A large smart television for our living room.",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1",
  },
  {
    id: 5,
    name: "Big Centre Rug",
    description:
      "A large centre rug to complete our living room.",
    image:
      "https://images.unsplash.com/photo-1600166898405-da9535204843",
  },
  {
    id: 6,
    name: "Air Fryer",
    description:
      "An air fryer for convenient home cooking.",
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec",
  },
  {
    id: 7,
    name: "Generator",
    description:
      "A reliable generator for backup power at home.",
    image:
      "https://katakara.com.ng/public/uploads/all/lrhKwyoaT35iTkLPmjY0uQmOsrUlcbynIloVa4F0.jpg",
  },
  {
    id: 8,
    name: "Solar Set-up",
    description:
      "A complete solar power system with inverter, solar panels and battery.",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276",
  },
  {
    id: 9,
    name: "Kitchen Blender",
    description:
      "A quality blender to help us set up our kitchen.",
    image:
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b",
  },
  {
    id: 10,
    name: "Microwave Oven",
    description:
      "A microwave oven for our new kitchen.",
    image:
      "https://images.unsplash.com/photo-1585659722983-3a675dabf23d",
  },
  {
    id: 11,
    name: "Standing Fan",
    description:
      "A quality standing fan for our living space.",
    image:
      "https://uae.geepas.com/cdn/shop/files/GF9605__2_8f997480-22bf-4be9-a1e0-fefbb0d7f699.jpg?crop=center&height=1200&v=1751449634&width=1200",
  },
];

export default function WishlistPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const fromConfirm = searchParams.get("from") === "confirm";

  const [isAttendee, setIsAttendee] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const savedGuest = sessionStorage.getItem("weddingGuest");

    if (fromConfirm) {
      if (!savedGuest) {
        router.replace("/confirm");
        return;
      }

      setIsAttendee(true);
    }

    setIsChecking(false);
  }, [fromConfirm, router]);

  if (isChecking) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#fff4f6] px-6 py-12 text-[#172554] transition-colors duration-200 dark:bg-[#0b1f4d] dark:text-slate-200">
      <div className="mx-auto max-w-6xl">

        <div className="mb-12 text-center">
          <Link
            href="/"
            className="mb-8 inline-block text-sm text-[#4169e1] transition hover:text-[#3157c7] dark:text-[#e9a6b5] dark:hover:text-white"
          >
            ← Back to invitation
          </Link>

          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#4169e1] dark:text-[#e9a6b5]">
            Wedding Wishlist
          </p>

          <h1 className="font-serif text-4xl text-[#172554] dark:text-white sm:text-5xl">
            A Little Something for Our New Beginning
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#475569] dark:text-slate-300">
            Your presence is already a gift to us. If you would like to bless
            us with something special, you may choose from our wishlist below.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border border-[#f0cbd3] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md dark:border-[#294274] dark:bg-[#10285c]"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#fff4f6] dark:bg-[#0f2758]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              <div className="p-5">
                <h2 className="text-xl font-semibold text-[#172554] dark:text-white">
                  {item.name}
                </h2>

                <p className="mt-2 min-h-[48px] text-sm leading-6 text-[#475569] dark:text-slate-300">
                  {item.description}
                </p>

                <Link
                  href={`/wishlist/${item.id}`}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#4169e1] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#3157c7] dark:bg-[#4169e1] dark:hover:bg-[#5b7bea]"
                >
                  Give This Gift
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2">

          <div className="rounded-2xl border border-[#f0cbd3] bg-white p-6 text-center shadow-sm dark:border-[#294274] dark:bg-[#10285c]">
            <p className="text-xs uppercase tracking-[0.25em] text-[#4169e1] dark:text-[#e9a6b5]">
              Monetary Gift
            </p>

            <h2 className="mt-3 font-serif text-2xl text-[#172554] dark:text-white">
              Cash Gift
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#475569] dark:text-slate-300">
              If you would prefer to bless us with a cash gift, you can do so
              here.
            </p>

            <Link
              href="/cash-gift"
              className="mt-5 inline-flex rounded-full bg-[#4169e1] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#3157c7] dark:hover:bg-[#5b7bea]"
            >
              Give a Cash Gift
            </Link>
          </div>

          <div className="rounded-2xl border border-[#f0cbd3] bg-white p-6 text-center shadow-sm dark:border-[#294274] dark:bg-[#10285c]">
            <p className="text-xs uppercase tracking-[0.25em] text-[#4169e1] dark:text-[#e9a6b5]">
              Your Choice
            </p>

            <h2 className="mt-3 font-serif text-2xl text-[#172554] dark:text-white">
              Custom Gift
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#475569] dark:text-slate-300">
              Have something else in mind? You can let us know about your
              custom gift here.
            </p>

            <Link
              href="/custom-gift"
              className="mt-5 inline-flex rounded-full border border-[#e9a6b5] bg-white px-6 py-3 text-sm font-medium text-[#172554] transition hover:bg-[#fff4f6] dark:bg-[#10285c] dark:text-white dark:hover:bg-[#16346f]"
            >
              Give a Custom Gift
            </Link>
          </div>

        </div>

        {isAttendee && (
          <div className="mx-auto mt-12 max-w-lg rounded-2xl border border-[#f0cbd3] bg-white p-6 text-center shadow-sm dark:border-[#294274] dark:bg-[#10285c]">
            <p className="text-sm leading-6 text-[#475569] dark:text-slate-300">
              You have confirmed your attendance. Would you like to choose a
              gift for Christianah and Theophilus?
            </p>

            <button
              type="button"
              onClick={() => router.push("/confirmed")}
              className="mt-5 rounded-full border border-[#e9a6b5] bg-white px-6 py-3 text-sm font-medium text-[#172554] transition hover:bg-[#fff4f6] dark:bg-[#10285c] dark:text-white dark:hover:bg-[#16346f]"
            >
              Skip Wishlist & Continue
            </button>
          </div>
        )}

        <p className="mt-10 text-center text-xs leading-5 text-[#64748b] dark:text-slate-500">
          You do not need to attend the wedding to give a gift.
        </p>

      </div>
    </main>
  );
}