export default function Home() {
  return (
    <main className="min-h-screen bg-[#fffdf9] text-slate-800">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
        {/* Decorative elements */}
        <div className="absolute left-[-80px] top-[-80px] h-48 w-48 rounded-full bg-pink-100/60 blur-3xl" />
        <div className="absolute bottom-[-80px] right-[-80px] h-56 w-56 rounded-full bg-blue-100/60 blur-3xl" />

        <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
          <p className="mb-6 text-sm uppercase tracking-[0.3em] text-slate-500">
            Together with their families
          </p>

          <div className="mb-8">
            <h1 className="font-serif text-5xl leading-tight text-slate-900 sm:text-6xl md:text-7xl">
              Christianah
              <br />
              <span className="text-3xl font-normal text-pink-400 sm:text-4xl">
                &
              </span>
              <br />
              Theophilus
            </h1>
          </div>

          <p className="mx-auto mb-10 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            Joyfully invite you to join them as they begin their journey
            together.
          </p>

          <div className="mx-auto mb-10 grid max-w-md grid-cols-2 gap-4 border-y border-slate-200 py-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-400">
                Date
              </p>
              <p className="mt-2 font-medium text-slate-800">
                12 November 2026
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-slate-400">
                Time
              </p>
              <p className="mt-2 font-medium text-slate-800">10:00 AM</p>
            </div>
          </div>

          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
              Church Service
            </p>

            <p className="mt-3 text-lg font-medium text-slate-800">
              A Celebration of Love &amp; Commitment
            </p>
          </div>

          <div className="mb-10">
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-slate-400">
              Dress Code
            </p>

            <div className="flex flex-col items-center justify-center gap-3 text-sm text-slate-600 sm:flex-row sm:gap-6">
              <span>Groomsmen &amp; Bridal Train — White</span>
              <span className="hidden text-slate-300 sm:inline">•</span>
              <span>General Public — Pink &amp; Royal Blue</span>
            </div>
          </div>

          <a
            href="/confirm"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-4 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Confirm Your Attendance
          </a>

          <div className="mt-12">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              RSVP
            </p>

            <p className="mt-3 text-sm text-slate-600">
              Victor — 07068364743
            </p>

            <p className="mt-1 text-sm text-slate-600">
              David — 07047093466
            </p>
          </div>

          <p className="mt-12 text-xs text-slate-400">
            This is a private invitation.
          </p>
        </div>
      </section>
    </main>
  );
}