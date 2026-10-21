"use client";

import { useMemo, useState } from "react";
import UserStatusButton from "./UserStatusButton";

export default function UserManagement({ users }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortDirection, setSortDirection] = useState("desc");

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = users.filter((user) => {
        const matchesSearch =
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query);
      
        const matchesStatus =
          statusFilter === "all" || user.status === statusFilter;
      
        return matchesSearch && matchesStatus;
    });

    return [...result].sort((a, b) => {
      let first = a[sortBy];
      let second = b[sortBy];

      if (sortBy === "created_at") {
        first = new Date(first).getTime();
        second = new Date(second).getTime();
      } else {
        first = String(first).toLowerCase();
        second = String(second).toLowerCase();
      }

      if (first < second) {
        return sortDirection === "asc" ? -1 : 1;
      }

      if (first > second) {
        return sortDirection === "asc" ? 1 : -1;
      }

      return 0;
    });
  }, [users, search, statusFilter, sortBy, sortDirection]);

  function handleSort(column) {
    if (sortBy === column) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }

    setSortBy(column);
    setSortDirection("asc");
  }

  function sortIndicator(column) {
    if (sortBy !== column) {
      return "";
    }

    return sortDirection === "asc" ? " ↑" : " ↓";
  }

  function exportUsers() {
    const headers = ["Name", "Email", "Role", "Status", "Signup Date"];
  
    const rows = filteredUsers.map((user) => [
      user.name,
      user.email,
      user.role,
      user.status,
      new Date(user.created_at).toISOString(),
    ]);
  
    const escapeCell = (value) =>
      `"${String(value).replaceAll('"', '""')}"`;
  
    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCell).join(","))
      .join("\n");
  
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
  
    link.href = url;
    link.download = "kavya-labs-users.csv";
    link.click();
  
    URL.revokeObjectURL(url);
  }

  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
      <div className="flex flex-col gap-4 border-b border-white/10 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">User Management</h2>
          <p className="mt-1 text-sm text-slate-400">
            View, search, sort, and manage Kavya Labs users.
          </p>
        </div>

        <button
            type="button"
            onClick={exportUsers}
            disabled={filteredUsers.length === 0}
            className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
            Export CSV
        </button>


        <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter users by status"
            className="rounded-xl border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
        >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
        </select>

        <label className="w-full sm:max-w-xs">
          <span className="sr-only">Search users</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name or email..."
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
          />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="bg-white/[0.04] text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <SortableHeading
                label="User"
                column="name"
                onSort={handleSort}
                indicator={sortIndicator("name")}
              />

              <SortableHeading
                label="Role"
                column="role"
                onSort={handleSort}
                indicator={sortIndicator("role")}
              />

              <SortableHeading
                label="Status"
                column="status"
                onSort={handleSort}
                indicator={sortIndicator("status")}
              />

              <SortableHeading
                label="Signup Date"
                column="created_at"
                onSort={handleSort}
                indicator={sortIndicator("created_at")}
              />

              <th className="px-6 py-4 font-semibold">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/10">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="transition hover:bg-white/[0.03]">
                <td className="px-6 py-4">
                  <p className="font-semibold text-white">{user.name}</p>
                  <p className="mt-1 text-slate-400">{user.email}</p>
                </td>

                <td className="px-6 py-4">
                  <span className="capitalize text-slate-300">{user.role}</span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={
                      user.status === "active"
                        ? "inline-flex rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300"
                        : "inline-flex rounded-full bg-slate-700 px-3 py-1 text-xs font-semibold text-slate-300"
                    }
                  >
                    {user.status === "active" ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {new Intl.DateTimeFormat("en", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }).format(new Date(user.created_at))}
                </td>

                <td className="px-6 py-4">
                    <UserStatusButton userId={user.id} status={user.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="font-medium text-slate-300">No users found</p>
            <p className="mt-1 text-sm text-slate-500">
              Try a different name or email.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function SortableHeading({ label, column, onSort, indicator }) {
  return (
    <th className="px-6 py-4 font-semibold">
      <button
        type="button"
        onClick={() => onSort(column)}
        className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
      >
        {label}
        {indicator}
      </button>
    </th>
  );
}