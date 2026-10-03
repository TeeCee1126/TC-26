"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fff4f6] text-[#172554] transition-colors duration-200 dark:bg-[#0b1f4d] dark:text-slate-200">
      <div className="mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center px-6 py-16">
        <div className="w-full text-center">

          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#4169e1] dark:text-[#e9a6b5]">
            Private Wedding Invitation
          </p>

          <h1 className="font-serif text-4xl leading-tight text-[#172554] dark:text-white sm:text-6xl">
            Christianah Oluwadasola Olaogun
          </h1>

          <p className="my-5 font-serif text-2xl text-[#e9a6b5]">
            &
          </p>

          <h2 className="font-serif text-4xl leading-tight text-[#172554] dark:text-white sm:text-6xl">
            Theophilus Abiodun Olutoye
          </h2>

          <div className="mx-auto mt-10 max-w-2xl">
            <p className="text-lg leading-8 text-[#334155] dark:text-slate-300">
              We invite you to join us as we celebrate our love and commitment
              in the presence of God, family and friends.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-2xl gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#f0cbd3] bg-white px-5 py-6 shadow-sm transition-colors dark:border-[#294274] dark:bg-[#10285c]">
              <p className="text-xs uppercase tracking-[0.2em] text-[#4169e1] dark:text-[#e9a6b5]">
                Date
              </p>

              <p className="mt-2 font-medium text-[#172554] dark:text-white">
                12 November 2026
              </p>
            </div>

            <div className="rounded-2xl border border-[#f0cbd3] bg-white px-5 py-6 shadow-sm transition-colors dark:border-[#294274] dark:bg-[#10285c]">
              <p className="text-xs uppercase tracking-[0.2em] text-[#4169e1] dark:text-[#e9a6b5]">
                Time
              </p>

              <p className="mt-2 font-medium text-[#172554] dark:text-white">
                10:00 AM
              </p>
            </div>

            <div className="rounded-2xl border border-[#f0cbd3] bg-white px-5 py-6 shadow-sm transition-colors dark:border-[#294274] dark:bg-[#10285c]">
              <p className="text-xs uppercase tracking-[0.2em] text-[#4169e1] dark:text-[#e9a6b5]">
                Programme
              </p>

              <p className="mt-2 font-medium text-[#172554] dark:text-white">
                Church Service
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-[#f0cbd3] bg-white p-6 shadow-sm transition-colors dark:border-[#294274] dark:bg-[#10285c]">
            <p className="text-xs uppercase tracking-[0.2em] text-[#4169e1] dark:text-[#e9a6b5]">
              Venue
            </p>

            <p className="mt-3 leading-7 text-[#334155] dark:text-slate-300">
              Christ Apostolic Church Oke Isoromitan, Gboyii area, Isale
              Ojajango, Ogbomoso.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-[#f0cbd3] bg-[#fffafb] px-6 py-6 transition-colors dark:border-[#294274] dark:bg-[#10285c]">
            <p className="text-xs uppercase tracking-[0.2em] text-[#4169e1] dark:text-[#e9a6b5]">
              Dress Code
            </p>

            <p className="mt-3 leading-7 text-[#334155] dark:text-slate-300">
              White for Groomsmen and Bridal Train. Pink and Royal Blue for the
              general public.
            </p>
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/confirm"
              className="inline-flex items-center justify-center rounded-full bg-[#4169e1] px-8 py-4 text-sm font-medium text-white transition hover:bg-[#3157c7] dark:bg-[#4169e1] dark:hover:bg-[#5b7bea]"
            >
              Confirm Your Attendance
            </Link>

            <Link
              href="/wishlist"
              className="inline-flex items-center justify-center rounded-full border border-[#e9a6b5] bg-white px-8 py-4 text-sm font-medium text-[#172554] transition hover:bg-[#fff4f6] dark:border-[#e9a6b5] dark:bg-[#10285c] dark:text-white dark:hover:bg-[#16346f]"
            >
              View Wedding Wishlist
            </Link>
          </div>

          <div className="mx-auto mt-12 max-w-xl">
            <p className="text-sm leading-6 text-[#475569] dark:text-slate-400">
              For RSVP enquiries, please contact Victor on{" "}
              <span className="font-medium text-[#4169e1] dark:text-[#e9a6b5]">
                07060629289
              </span>{" "}
              or David on{" "}
              <span className="font-medium text-[#4169e1] dark:text-[#e9a6b5]">
                07047093466
              </span>
              .
            </p>

            <p className="mt-4 text-xs leading-5 text-[#64748b] dark:text-slate-500">
              This is a private invitation. Please do not share the invitation
              details publicly.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}