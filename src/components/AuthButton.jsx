import Link from "next/link";
import Image from "next/image";
import { auth, signIn, signOut } from "@/auth";

export default async function AuthButton() {
  const session = await auth();

  if (session?.user) {
    return (
        <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="text-sm font-medium text-slate-300 transition hover:text-white"
        >
          Dashboard
        </Link>
      
        {session.user.image && (
          <Image
          src={session.user.image}
          alt={`${session.user.name || "User"} profile`}
          width={36}
          height={36}
          className="h-9 w-9 rounded-full border border-white/20"
        />
        )}

        <span className="hidden text-sm font-medium text-slate-300 sm:block">
          {session.user.name || "Account"}
        </span>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            Sign out
          </button>
        </form>
      </div>
    );
  }

  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
    >
      <button
        type="submit"
        className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
      >
        Sign in with Google
      </button>
    </form>
  );
}