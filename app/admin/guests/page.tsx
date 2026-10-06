"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type GuestRecord = {
  _id: string;
  name: string;
  phone: string;
  numberAttending: number;
  createdAt: string;
};

export default function AdminGuestsPage() {
  const router = useRouter();

  const [guests, setGuests] = useState<GuestRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const authenticated = sessionStorage.getItem(
      "weddingAdminAuthenticated",
    );

    if (authenticated !== "true") {
      router.replace("/admin/login");
      return;
    }

    async function loadGuests() {
      try {
        const response = await fetch("/api/guests");

        const data = await response.json();

        if (!response.ok) {
          setError(
            data.message || "Unable to load attendance records.",
          );
          return;
        }

        setGuests(data.guests || []);
      } catch (error) {
        console.error("Guest retrieval error:", error);

        setError(
          "Unable to load attendance records. Please try again.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadGuests();
  }, [router]);

  function formatDate(date: string) {
    return new Date(date).toLocaleString("en-NG", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  const totalPeople = guests.reduce(
    (total, guest) => total + guest.numberAttending,
    0,
  );

  return (
    <main className="min-h-screen px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
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

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-[#4169E1]">
            Private Admin Area
          </p>

          <h1 className="text-3xl font-semibold text-[#172554] dark:text-white sm:text-4xl">
            Attendance Records
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            View guests who have confirmed attendance for the wedding.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </div>
        )}

        {/* Summary */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#F0CBD3] bg-white p-5 shadow-sm dark:border-[#294274] dark:bg-[#10285C]">
            <p className="text-sm text-slate-500 dark:text-slate-300">
              Confirmed Guests
            </p>

            <p className="mt-2 text-3xl font-semibold text-[#172554] dark:text-white">
              {isLoading ? "—" : guests.length}
            </p>
          </div>

          <div className="rounded-2xl border border-[#F0CBD3] bg-white p-5 shadow-sm dark:border-[#294274] dark:bg-[#10285C]">
            <p className="text-sm text-slate-500 dark:text-slate-300">
              Total People Attending
            </p>

            <p className="mt-2 text-3xl font-semibold text-[#172554] dark:text-white">
              {isLoading ? "—" : totalPeople}
            </p>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="rounded-2xl border border-dashed border-[#F0CBD3] bg-white px-6 py-16 text-center dark:border-[#294274] dark:bg-[#10285C]">
            <h2 className="text-xl font-semibold text-[#172554] dark:text-white">
              Loading attendance records...
            </h2>

            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Please wait while the guest records are loaded.
            </p>
          </div>
        ) : guests.length === 0 ? (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-[#F0CBD3] bg-white px-6 py-16 text-center dark:border-[#294274] dark:bg-[#10285C]">
            <h2 className="text-xl font-semibold text-[#172554] dark:text-white">
              No confirmed guests yet
            </h2>

            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Confirmed attendance records will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-[#F0CBD3] bg-white shadow-sm dark:border-[#294274] dark:bg-[#10285C]">
            <div className="overflow-x-auto">
              <table className="min-w-[850px] w-full text-left">
                <thead className="border-b border-[#F0CBD3] bg-[#FFF4F6] dark:border-[#294274] dark:bg-[#0B1F4D]">
                  <tr>
                    <th className="px-5 py-4 text-sm font-semibold text-[#172554] dark:text-white">
                      Guest
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-[#172554] dark:text-white">
                      Phone
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-[#172554] dark:text-white">
                      Number Attending
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-[#172554] dark:text-white">
                      Confirmed On
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {guests.map((guest) => (
                    <tr
                      key={guest._id}
                      className="border-b border-[#F0CBD3] last:border-b-0 dark:border-[#294274]"
                    >
                      <td className="px-5 py-5">
                        <p className="font-medium text-[#172554] dark:text-white">
                          {guest.name}
                        </p>
                      </td>

                      <td className="px-5 py-5 text-sm text-slate-600 dark:text-slate-300">
                        {guest.phone}
                      </td>

                      <td className="px-5 py-5">
                        <span className="inline-flex rounded-full bg-[#E9A6B5]/20 px-3 py-1 text-xs font-medium text-[#172554] dark:text-pink-200">
                          {guest.numberAttending}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-600 dark:text-slate-300">
                        {formatDate(guest.createdAt)}
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
