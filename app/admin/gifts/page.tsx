"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getStoredGifts,
  updateGiftStatus,
} from "@/lib/gift-storage";
import { GiftRecord, GiftStatus } from "@/lib/gift";

export default function AdminGiftsPage() {
  const router = useRouter();
  const [gifts, setGifts] = useState<GiftRecord[]>([]);

  useEffect(() => {
  const authenticated = sessionStorage.getItem(
    "weddingAdminAuthenticated",
  );

  if (authenticated !== "true") {
    router.replace("/admin/login");
    return;
  }

  setGifts(getStoredGifts());
}, [router]);

  function getGiftDetails(gift: GiftRecord) {
    if (gift.type === "physical") {
      return gift.itemName || "Physical Gift";
    }

    if (gift.type === "cash") {
      return gift.amount ? `₦${gift.amount}` : "Cash Gift";
    }

    return gift.description || "Custom Gift";
  }

  function getGiftType(gift: GiftRecord) {
    if (gift.type === "physical") {
      return "Physical Gift";
    }

    if (gift.type === "cash") {
      return "Cash Gift";
    }

    return "Custom Gift";
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleString("en-NG", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  function handleStatusChange(
    index: number,
    status: GiftStatus,
  ) {
    updateGiftStatus(index, status);

    setGifts(getStoredGifts());
  }

  function getStatusClass(status: GiftStatus) {
    if (status === "received") {
      return "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200";
    }

    if (status === "completed") {
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200";
    }

    if (status === "cancelled") {
      return "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200";
    }

    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200";
  }

  return (
    <main className="min-h-screen px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-[#4169E1]">
            Private Admin Area
          </p>

          <h1 className="text-3xl font-semibold text-[#172554] dark:text-white sm:text-4xl">
            Gift Records
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            View and manage gifts submitted through the wedding
            wishlist.
          </p>
        </div>

        {/* Summary */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-[#F0CBD3] bg-white p-5 shadow-sm dark:border-[#294274] dark:bg-[#10285C]">
            <p className="text-sm text-slate-500 dark:text-slate-300">
              Total Gifts
            </p>

            <p className="mt-2 text-3xl font-semibold text-[#172554] dark:text-white">
              {gifts.length}
            </p>
          </div>

          <div className="rounded-2xl border border-[#F0CBD3] bg-white p-5 shadow-sm dark:border-[#294274] dark:bg-[#10285C]">
            <p className="text-sm text-slate-500 dark:text-slate-300">
              Pending
            </p>

            <p className="mt-2 text-3xl font-semibold text-[#172554] dark:text-white">
              {gifts.filter((gift) => gift.status === "pending").length}
            </p>
          </div>

          <div className="rounded-2xl border border-[#F0CBD3] bg-white p-5 shadow-sm dark:border-[#294274] dark:bg-[#10285C]">
            <p className="text-sm text-slate-500 dark:text-slate-300">
              Received
            </p>

            <p className="mt-2 text-3xl font-semibold text-[#172554] dark:text-white">
              {gifts.filter((gift) => gift.status === "received").length}
            </p>
          </div>

          <div className="rounded-2xl border border-[#F0CBD3] bg-white p-5 shadow-sm dark:border-[#294274] dark:bg-[#10285C]">
            <p className="text-sm text-slate-500 dark:text-slate-300">
              Completed
            </p>

            <p className="mt-2 text-3xl font-semibold text-[#172554] dark:text-white">
              {
                gifts.filter(
                  (gift) => gift.status === "completed",
                ).length
              }
            </p>
          </div>
        </div>

        {/* Empty State */}
        {gifts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#F0CBD3] bg-white px-6 py-16 text-center dark:border-[#294274] dark:bg-[#10285C]">
            <h2 className="text-xl font-semibold text-[#172554] dark:text-white">
              No gifts yet
            </h2>

            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Gifts submitted through the wishlist will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-[#F0CBD3] bg-white shadow-sm dark:border-[#294274] dark:bg-[#10285C]">
            <div className="overflow-x-auto">
              <table className="min-w-[1200px] w-full text-left">
                <thead className="border-b border-[#F0CBD3] bg-[#FFF4F6] dark:border-[#294274] dark:bg-[#0B1F4D]">
                  <tr>
                    <th className="px-5 py-4 text-sm font-semibold text-[#172554] dark:text-white">
                      Type
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-[#172554] dark:text-white">
                      Gift / Item
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-[#172554] dark:text-white">
                      Giver
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-[#172554] dark:text-white">
                      Phone
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-[#172554] dark:text-white">
                      Timing
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-[#172554] dark:text-white">
                      Status
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-[#172554] dark:text-white">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {gifts.map((gift, index) => (
                    <tr
                      key={`${gift.createdAt}-${index}`}
                      className="border-b border-[#F0CBD3] last:border-b-0 dark:border-[#294274]"
                    >
                      <td className="px-5 py-5">
                        <span className="inline-flex rounded-full bg-[#E9A6B5]/20 px-3 py-1 text-xs font-medium text-[#172554] dark:text-pink-200">
                          {getGiftType(gift)}
                        </span>
                      </td>

                      <td className="max-w-xs px-5 py-5">
                        <p className="font-medium text-[#172554] dark:text-white">
                          {getGiftDetails(gift)}
                        </p>
                      </td>

                      <td className="px-5 py-5">
                        <p className="font-medium text-[#172554] dark:text-white">
                          {gift.name}
                        </p>

                        {gift.anonymous && (
                          <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">
                            Anonymous gift
                          </p>
                        )}
                      </td>

                      <td className="px-5 py-5 text-sm text-slate-600 dark:text-slate-300">
                        {gift.phone || "—"}
                      </td>

                      <td className="px-5 py-5 text-sm text-slate-600 dark:text-slate-300">
                        {gift.giftTiming}
                      </td>

                      <td className="px-5 py-5">
                        <select
                          value={gift.status}
                          onChange={(event) =>
                            handleStatusChange(
                              index,
                              event.target.value as GiftStatus,
                            )
                          }
                          className={`rounded-full border-0 px-3 py-2 text-xs font-medium outline-none ${getStatusClass(
                            gift.status,
                          )}`}
                        >
                          <option value="pending">
                            Pending
                          </option>

                          <option value="received">
                            Received
                          </option>

                          <option value="completed">
                            Completed
                          </option>

                          <option value="cancelled">
                            Cancelled
                          </option>
                        </select>
                      </td>

                      <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-600 dark:text-slate-300">
                        {formatDate(gift.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}