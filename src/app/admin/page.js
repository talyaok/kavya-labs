import UserManagement from "@/components/admin/UserManagement";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getAdminSession } from "@/lib/admin";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import ActivityLog from "@/components/admin/ActivityLog";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const adminSession = await getAdminSession();

  if (!adminSession) {
    redirect("/dashboard");
  }

  const { data: users, error } = await supabaseAdmin
    .from("users")
    .select("id, name, email, role, status, created_at, last_active_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Unable to load admin analytics.");
  }

  const { data: activities, error: activityError } = await supabaseAdmin
  .from("activity_logs")
  .select("id, action, details, created_at")
  .order("created_at", { ascending: false })
  .limit(8);

  if (activityError) {
    throw new Error("Unable to load recent activity.");
  }

  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === "active").length;

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const signupsThisWeek = users.filter(
    (user) => new Date(user.created_at) >= oneWeekAgo
  ).length;

  const inactiveUsers = totalUsers - activeUsers;
  const churnRate =
    totalUsers === 0 ? 0 : Math.round((inactiveUsers / totalUsers) * 100);

  const stats = [
    { label: "Total Users", value: totalUsers },
    { label: "Active Users", value: activeUsers },
    { label: "Signups This Week", value: signupsThisWeek },
    { label: "Churn Rate", value: `${churnRate}%` },
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Kavya Labs Admin
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-slate-400">
              Monitor users, activity, and platform performance.
            </p>
          </div>

          <Link
            href="/"
            className="text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
          >
            ← Back to Kavya Labs
          </Link>
        </div>

        <section
          aria-label="Platform analytics"
          className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/[0.06] p-6"
            >
              <p className="text-sm font-medium text-slate-400">{stat.label}</p>
              <p className="mt-3 text-3xl font-bold tracking-tight">
                {stat.value}
              </p>
            </article>
          ))}
        </section>

        <UserManagement users={users} />

        <ActivityLog activities={activities} />
      </div>
    </main>
  );
}