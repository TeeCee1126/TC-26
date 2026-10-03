"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStoredGuests } from "@/lib/guest-storage";
import { getStoredGifts } from "@/lib/gift-storage";
import { GuestRecord } from "@/lib/guest";
import { GiftRecord } from "@/lib/gift";

export default function AdminPage() {
  const router = useRouter();

  const [guests, setGuests] = useState<GuestRecord[]>([]);
  const [gifts, setGifts] = useState<GiftRecord[]>([]);

  useEffect(() => {
    const authenticated = sessionStorage.getItem(
      "weddingAdminAuthenticated",
    );

    if (authenticated !== "true") {
      router.replace("/admin/login");
      return;
    }

    setGuests(getStoredGuests());
    setGifts(getStoredGifts());
  }, [router]);

  function handleLogout() {
    sessionStorage.removeItem("weddingAdminAuthenticated");
    router.replace("/admin/login");
  }

  const totalPeople = guests.reduce(
    (total, guest) => total + guest.numberAttending,
    0,
  );

  const physicalGifts = gifts.filter(
    (gift) => gift.type === "physical",
  ).length;

  const cashGifts = gifts.filter(
    (gift) => gift.type === "cash",
  ).length;

  const customGifts = gifts.filter(
    (gift) => gift.type === "custom",
  ).length;

  const pendingGifts = gifts.filter(
    (gift) => gift.status === "pending",
  ).length;

  return (
    <main className="min-h-screen px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-[#4169E1]">
            Private Admin Area
          </p>

          <h1 className="text-3xl font-semibold text-[#172554] dark:text-white sm:text-4xl">
            Wedding Dashboard
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            Manage attendance and gifts submitted through the private
            wedding invitation.
          </p>

          <div className="mt-5">
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-[#f0cbd3] bg-white px-5 py-2.5 text-sm font-medium text-[#172554] transition hover:bg-[#fff4f6] dark:border-[#294274] dark:bg-[#10285c] dark:text-white dark:hover:bg-[#16336f]"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Attendance Summary */}
        <section className="mb-10">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-[#172554] dark:text-white">
              Attendance
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#F0CBD3] bg-white p-6 shadow-sm dark:border-[#294274] dark:bg-[#10285C]">
              <p className="text-sm text-slate-500 dark:text-slate-300">
                Confirmed Guests
              </p>

              <p className="mt-2 text-3xl font-semibold text-[#172554] dark:text-white">
                {guests.length}
              </p>
            </div>

            <div className="rounded-2xl border border-[#F0CBD3] bg-white p-6 shadow-sm dark:border-[#294274] dark:bg-[#10285C]">
              <p className="text-sm text-slate-500 dark:text-slate-300">
                Total People Attending
              </p>

              <p className="mt-2 text-3xl font-semibold text-[#172554] dark:text-white">
                {totalPeople}
              </p>
            </div>
          </div>
        </section>

        {/* Gift Summary */}
        <section className="mb-10">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-[#172554] dark:text-white">
              Gifts
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-[#F0CBD3] bg-white p-6 shadow-sm dark:border-[#294274] dark:bg-[#10285C]">
              <p className="text-sm text-slate-500 dark:text-slate-300">
                Total Gifts
              </p>

              <p className="mt-2 text-3xl font-semibold text-[#172554] dark:text-white">
                {gifts.length}
              </p>
            </div>

            <div className="rounded-2xl border border-[#F0CBD3] bg-white p-6 shadow-sm dark:border-[#294274] dark:bg-[#10285C]">
              <p className="text-sm text-slate-500 dark:text-slate-300">
                Physical Gifts
              </p>

              <p className="mt-2 text-3xl font-semibold text-[#172554] dark:text-white">
                {physicalGifts}
              </p>
            </div>

            <div className="rounded-2xl border border-[#F0CBD3] bg-white p-6 shadow-sm dark:border-[#294274] dark:bg-[#10285C]">
              <p className="text-sm text-slate-500 dark:text-slate-300">
                Cash Gifts
              </p>

              <p className="mt-2 text-3xl font-semibold text-[#172554] dark:text-white">
                {cashGifts}
              </p>
            </div>

            <div className="rounded-2xl border border-[#F0CBD3] bg-white p-6 shadow-sm dark:border-[#294274] dark:bg-[#10285C]">
              <p className="text-sm text-slate-500 dark:text-slate-300">
                Custom Gifts
              </p>

              <p className="mt-2 text-3xl font-semibold text-[#172554] dark:text-white">
                {customGifts}
              </p>
            </div>
          </div>
        </section>

        {/* Gift Status */}
        <section className="mb-10">
          <div className="rounded-2xl border border-[#F0CBD3] bg-white p-6 shadow-sm dark:border-[#294274] dark:bg-[#10285C]">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-semibold text-[#172554] dark:text-white">
                  Gift Status
                </h2>

                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Gifts currently awaiting processing.
                </p>
              </div>

              <div className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200">
                {pendingGifts} Pending
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-[#172554] dark:text-white">
            Manage Records
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/admin/guests"
              className="group rounded-2xl border border-[#F0CBD3] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-[#294274] dark:bg-[#10285C]"
            >
              <h3 className="text-lg font-semibold text-[#172554] dark:text-white">
                Attendance Records
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                View confirmed guests, phone numbers and the number of
                people attending.
              </p>

              <span className="mt-5 inline-block text-sm font-medium text-[#4169E1] group-hover:underline dark:text-[#E9A6B5]">
                View attendance →
              </span>
            </Link>

            <Link
              href="/admin/gifts"
              className="group rounded-2xl border border-[#F0CBD3] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-[#294274] dark:bg-[#10285C]"
            >
              <h3 className="text-lg font-semibold text-[#172554] dark:text-white">
                Gift Records
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                View physical, cash and custom gifts and manage their
                status.
              </p>

              <span className="mt-5 inline-block text-sm font-medium text-[#4169E1] group-hover:underline dark:text-[#E9A6B5]">
                View gifts →
              </span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}