"use client";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="px-4 py-2 text-red-500 hover:bg-white/10 transition text-left cursor-pointer"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
