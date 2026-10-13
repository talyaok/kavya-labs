import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
        >
          ← Back to Kavya Labs
        </Link>

        <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Kavya Workspace
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Welcome, {session.user.name || "there"}.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            You&apos;re securely signed in to Kavya Labs. Your workspace is
            ready.
          </p>

          <div className="mt-10 rounded-2xl border border-white/10 bg-slate-900/70 p-6">
            <p className="text-sm text-slate-400">Signed in as</p>
            <p className="mt-1 font-semibold">
              {session.user.email || "Google account"}
            </p>
          </div>

          <p className="mt-6 text-sm text-slate-500">
            More workspace features are coming next.
          </p>
        </div>
      </div>
    </main>
  );
}