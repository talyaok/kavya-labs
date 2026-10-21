import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { createTask, deleteTask, toggleTask } from "./actions";


export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/");
  }

  const userEmail = session.user.email.trim().toLowerCase();

  const { data: tasks, error } = await supabaseAdmin
    .from("tasks")
    .select("id, title, completed, created_at")
    .eq("user_email", userEmail)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Unable to load your tasks.");
  }

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Kavya Labs Workspace
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              My Tasks
            </h1>

            <p className="mt-2 text-slate-400">
              Welcome back, {session.user.name || session.user.email}.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              Home
            </Link>

            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                Sign out
              </button>
            </form>
          </div>
        </header>

        <section
          aria-label="Task statistics"
          className="mt-10 grid gap-4 sm:grid-cols-3"
        >
          <StatCard label="Total Tasks" value={totalTasks} />
          <StatCard label="Completed Tasks" value={completedTasks} />
          <StatCard label="Pending Tasks" value={pendingTasks} />
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.06] p-6">
          <div>
            <h2 className="text-xl font-semibold">Create Task</h2>
            <p className="mt-1 text-sm text-slate-400">
              Add a new task to your workspace.
            </p>
          </div>

          <form action={createTask} className="mt-5 flex flex-col gap-3 sm:flex-row">
            <label className="flex-1">
              <span className="sr-only">Task title</span>
              <input
                type="text"
                name="title"
                required
                maxLength={200}
                placeholder="What do you need to do?"
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </label>

            <button
              type="submit"
              className="rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Add Task
            </button>
          </form>
        </section>

        <section className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
          <div className="border-b border-white/10 p-6">
            <h2 className="text-xl font-semibold">Task List</h2>
            <p className="mt-1 text-sm text-slate-400">
              Manage your pending and completed tasks.
            </p>
          </div>

          {tasks.length > 0 ? (
            <div className="divide-y divide-white/10">
              {tasks.map((task) => (
                <article
                  key={task.id}
                  className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p
                      className={
                        task.completed
                          ? "break-words font-medium text-slate-500 line-through"
                          : "break-words font-medium text-white"
                      }
                    >
                      {task.title}
                    </p>

                    <div className="mt-2 flex items-center gap-3">
                      <span
                        className={
                          task.completed
                            ? "rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-300"
                            : "rounded-full bg-amber-400/10 px-2.5 py-1 text-xs font-semibold text-amber-300"
                        }
                      >
                        {task.completed ? "Completed" : "Pending"}
                      </span>

                      <span className="text-xs text-slate-500">
                        {new Intl.DateTimeFormat("en", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }).format(new Date(task.created_at))}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <form action={toggleTask}>
                      <input type="hidden" name="taskId" value={task.id} />
                      <input
                        type="hidden"
                        name="completed"
                        value={String(task.completed)}
                      />

                      <button
                        type="submit"
                        className="rounded-lg border border-cyan-400/30 px-3 py-2 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-400/10"
                      >
                        {task.completed
                          ? "Mark Pending"
                          : "Mark Completed"}
                      </button>
                    </form>

                    <form action={deleteTask}>
                      <input type="hidden" name="taskId" value={task.id} />

                      <button
                        type="submit"
                        className="rounded-lg border border-rose-400/30 px-3 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-400/10"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="font-medium text-slate-300">No tasks yet</p>
              <p className="mt-1 text-sm text-slate-500">
                Create your first task above to get started.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function StatCard({ label, value }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.06] p-6">
      <p className="text-sm font-medium text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-bold tracking-tight">{value}</p>
    </article>
  );
}