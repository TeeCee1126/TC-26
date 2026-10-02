// export default function Home() {
//   return (
//     <main className="min-h-screen bg-[#fffdf9] text-slate-800">
//       <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
//         {/* Decorative elements */}
//         <div className="absolute left-[-80px] top-[-80px] h-48 w-48 rounded-full bg-pink-100/60 blur-3xl" />
//         <div className="absolute bottom-[-80px] right-[-80px] h-56 w-56 rounded-full bg-blue-100/60 blur-3xl" />

//         <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
//           <p className="mb-6 text-sm uppercase tracking-[0.3em] text-slate-500">
//             Together with their families
//           </p>

//           <div className="mb-8">
//             <h1 className="font-serif text-5xl leading-tight text-slate-900 sm:text-6xl md:text-7xl">
//               Christianah
//               <br />
//               <span className="text-3xl font-normal text-pink-400 sm:text-4xl">
//                 &
//               </span>
//               <br />
//               Theophilus
//             </h1>
//           </div>

//           <p className="mx-auto mb-10 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
//             Joyfully invite you to join them as they begin their journey
//             together.
//           </p>

//           <div className="mx-auto mb-10 grid max-w-md grid-cols-2 gap-4 border-y border-slate-200 py-6">
//             <div>
//               <p className="text-xs uppercase tracking-widest text-slate-400">
//                 Date
//               </p>
//               <p className="mt-2 font-medium text-slate-800">
//                 12 November 2026
//               </p>
//             </div>

//             <div>
//               <p className="text-xs uppercase tracking-widest text-slate-400">
//                 Time
//               </p>
//               <p className="mt-2 font-medium text-slate-800">10:00 AM</p>
//             </div>
//           </div>

//           <div className="mb-10">
//             <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
//               Church Service
//             </p>

//             <p className="mt-3 text-lg font-medium text-slate-800">
//               A Celebration of Love &amp; Commitment
//             </p>
//           </div>

//           <div className="mb-10">
//             <p className="mb-4 text-xs uppercase tracking-[0.25em] text-slate-400">
//               Dress Code
//             </p>

//             <div className="flex flex-col items-center justify-center gap-3 text-sm text-slate-600 sm:flex-row sm:gap-6">
//               <span>Groomsmen &amp; Bridal Train — White</span>
//               <span className="hidden text-slate-300 sm:inline">•</span>
//               <span>General Public — Pink &amp; Royal Blue</span>
//             </div>
//           </div>

//           <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
//   <a
//     href="/confirm"
//     className="inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-4 text-sm font-medium text-white transition hover:bg-slate-700"
//   >
//     Confirm Your Attendance
//   </a>

//   <a
//     href="/wishlist"
//     className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
//   >
//     View Wedding Wishlist
//   </a>
// </div>
//           <div className="mt-12">
//             <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
//               RSVP
//             </p>

//             <p className="mt-3 text-sm text-slate-600">
//               Victor — 07060629289
//             </p>

//             <p className="mt-1 text-sm text-slate-600">
//               David — 07047093466
//             </p>
//           </div>

//           <p className="mt-12 text-xs text-slate-400">
//             This is a private invitation.
//           </p>
//         </div>
//       </section>
//     </main>
//   );
// }
"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fffdf9] text-slate-800 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-200">
      <div className="mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center px-6 py-16">
        <div className="w-full text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">
            Private Wedding Invitation
          </p>

          <h1 className="font-serif text-4xl leading-tight text-slate-900 dark:text-white sm:text-6xl">
            Christianah Oluwadasola Olaogun
          </h1>

          <p className="my-5 font-serif text-2xl text-slate-400 dark:text-slate-500">
            &
          </p>

          <h2 className="font-serif text-4xl leading-tight text-slate-900 dark:text-white sm:text-6xl">
            Theophilus Abiodun Olutoye
          </h2>

          <div className="mx-auto mt-10 max-w-2xl">
            <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
              We invite you to join us as we celebrate our love and commitment
              in the presence of God, family and friends.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-2xl gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                Date
              </p>
              <p className="mt-2 font-medium text-slate-800 dark:text-slate-100">
                12 November 2026
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                Time
              </p>
              <p className="mt-2 font-medium text-slate-800 dark:text-slate-100">
                10:00 AM
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                Programme
              </p>
              <p className="mt-2 font-medium text-slate-800 dark:text-slate-100">
                Church Service
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
              Venue
            </p>

            <p className="mt-3 leading-7 text-slate-700 dark:text-slate-300">
              Christ Apostolic Church Oke Isoromitan, Gboyii area, Isale
              Ojajango, Ogbomoso.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-2xl rounded-2xl bg-slate-50 px-6 py-6 transition-colors dark:bg-slate-900/70">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
              Dress Code
            </p>

            <p className="mt-3 leading-7 text-slate-700 dark:text-slate-300">
              White for Groomsmen and Bridal Train. Pink and Royal Blue for the
              general public.
            </p>
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/confirm"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-4 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Confirm Your Attendance
            </Link>

            <Link
              href="/wishlist"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              View Wedding Wishlist
            </Link>
          </div>

          <div className="mx-auto mt-12 max-w-xl">
            <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
              For RSVP enquiries, please contact Victor on{" "}
              <span className="font-medium">07060629289</span> or David on{" "}
              <span className="font-medium">07047093466</span>.
            </p>

            <p className="mt-4 text-xs leading-5 text-slate-400 dark:text-slate-500">
              This is a private invitation. Please do not share the invitation
              details publicly.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}