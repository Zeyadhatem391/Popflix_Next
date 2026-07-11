"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: "/login",
        })
      }
      className="flex w-full gap-2 px-4 py-3 text-left text-red-500 transition-colors hover:bg-red-50 disabled:opacity-50 dark:hover:bg-red-900/30"
    >
      <LogOut size={20} />
      Logout
    </button>
  );
}
