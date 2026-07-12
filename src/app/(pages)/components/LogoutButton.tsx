"use client";

import { logout } from "@/modules/(auth)/logout/api/logout.ts";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function LogoutButton({ className }: { className: string }) {
  const { data: session } = useSession();

  const handleLogout = async () => {
    try {
      await logout(session);
    } catch (error) {
      console.error(error);
    } finally {
      await signOut({
        callbackUrl: "/login",
      });
    }
  };

  return (
    <button onClick={handleLogout} className={className}>
      <LogOut size={20} />
      Logout
    </button>
  );
}
