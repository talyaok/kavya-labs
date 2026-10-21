"use client";

export default function AdminError({ reset }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/[0.06] p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-300">
          Something went wrong
        </p>

        <h1 className="mt-3 text-3xl font-bold">
          Unable to load the admin dashboard
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-400">
          We couldn&apos;t load the dashboard data. Please try again.
        </p>

        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}