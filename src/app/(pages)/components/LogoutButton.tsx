"use client";

import { logout } from "@/modules/(auth)/logout/api/logout.ts";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function LogoutButton({ className }: { className: string }) {
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = async () => {
    try {
      if (session) {
        await logout(session);

        await signOut({
          callbackUrl: "/login",
        });

        return;
      }

      Cookies.remove("user");

      router.push("/login");
      router.refresh();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleLogout} className={className}>
      <LogOut size={20} />
      Logout
    </button>
  );
}
