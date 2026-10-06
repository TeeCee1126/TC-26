"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GiftStatus } from "@/lib/gift";

type AdminGift = {
  _id: string;
  type: "physical" | "cash" | "custom";

  name: string;
  phone: string;
  anonymous: boolean;

  giftTiming:
    | "Before the wedding"
    | "On the wedding day"
    | "After the wedding";

  itemId?: number;
  itemName?: string;

  amount?: string;

  description?: string;

  status: GiftStatus;

  createdAt: string;
};

export default function AdminGiftsPage() {
  const router = useRouter();

  const [gifts, setGifts] = useState<AdminGift[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const authenticated = sessionStorage.getItem(
      "weddingAdminAuthenticated",
    );

    if (authenticated !== "true") {
      router.replace("/admin/login");
      return;
    }

    async function loadGifts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/gifts");

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to load gifts.",
          );
        }

        setGifts(data.gifts);
      } catch (error) {
        console.error("Failed to load gifts:", error);

        setError(
          "Unable to load gift records. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadGifts();
  }, [router]);

  function getGiftDetails(gift: AdminGift) {
    if (gift.type === "physical") {
      return gift.itemName || "Physical Gift";
    }

    if (gift.type === "cash") {
      return gift.amount
        ? `₦${gift.amount}`
        : "Cash Gift";
    }

    return gift.description || "Custom Gift";
  }

  function getGiftType(gift: AdminGift) {
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

  async function handleStatusChange(
    giftId: string,
    status: GiftStatus,
  ) {
    try {
      setError("");

      const response = await fetch("/api/gifts", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: giftId,
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to update gift status.",
        );
      }

      setGifts((currentGifts) =>
        currentGifts.map((gift) =>
          gift._id === giftId
            ? {
                ...gift,
                status: data.gift.status,
              }
            : gift,
        ),
      );
    } catch (error) {
      console.error(
        "Failed to update gift status:",
        error,
      );

      setError(
        "Unable to update the gift status. Please try again.",
      );
    }
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
        {/* Back Button */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="inline-flex items-center gap-2 rounded-xl border border-[#F0CBD3] bg-white px-4 py-2 text-sm font-medium text-[#172554] shadow-sm transition hover:bg-[#FFF4F6] dark:border-[#294274] dark:bg-[#10285C] dark:text-white dark:hover:bg-[#0B1F4D]"
          >
            <span aria-hidden="true">←</span>
            Back to Dashboard
          </button>
        </div>

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

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-200">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="rounded-2xl border border-[#F0CBD3] bg-white px-6 py-16 text-center shadow-sm dark:border-[#294274] dark:bg-[#10285C]">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Loading gift records...
            </p>
          </div>
        ) : (
          <>
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
                  {
                    gifts.filter(
                      (gift) => gift.status === "pending",
                    ).length
                  }
                </p>
              </div>

              <div className="rounded-2xl border border-[#F0CBD3] bg-white p-5 shadow-sm dark:border-[#294274] dark:bg-[#10285C]">
                <p className="text-sm text-slate-500 dark:text-slate-300">
                  Received
                </p>

                <p className="mt-2 text-3xl font-semibold text-[#172554] dark:text-white">
                  {
                    gifts.filter(
                      (gift) => gift.status === "received",
                    ).length
                  }
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
                  Gifts submitted through the wishlist will
                  appear here.
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
                      {gifts.map((gift) => (
                        <tr
                          key={gift._id}
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
                                  gift._id,
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
          </>
        )}
      </div>
    </main>
  );
}

