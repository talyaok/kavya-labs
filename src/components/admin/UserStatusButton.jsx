"use client";

import { useState, useTransition } from "react";
import { toggleUserStatus } from "@/app/admin/actions";

export default function UserStatusButton({ userId, status }) {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    setMessage("");

    startTransition(async () => {
      const result = await toggleUserStatus(userId, status);

      if (!result.success) {
        setMessage(result.message);
      }
    });
  }

  const isActive = status === "active";

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        aria-label={`${isActive ? "Disable" : "Enable"} user`}
        className={
          isActive
            ? "rounded-lg border border-rose-400/30 px-3 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-400/10 disabled:cursor-not-allowed disabled:opacity-50"
            : "rounded-lg border border-emerald-400/30 px-3 py-2 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-50"
        }
      >
        {isPending ? "Updating..." : isActive ? "Disable" : "Enable"}
      </button>

      {message && (
        <p role="alert" className="mt-2 max-w-40 text-xs text-rose-300">
          {message}
        </p>
      )}
    </div>
  );
}