"use client";

import Image from "next/image";
import DefaultImage from "@/assets/images/default.png";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ImageProfile from "./components/ImageProfile";

export default function ProfilePage() {
  const [ids, setIds] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    const favorites = stored ? JSON.parse(stored) : [];
    setIds(favorites);
  }, []);

  const user = {
    phone: "+20 100 000 0000",
    avatar: DefaultImage,
    memberSince: "2026",
  };

  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#0b0b0b]">
        <Image
          src={DefaultImage}
          alt="User"
          width={160}
          height={160}
          className="rounded-full border border-[#333]"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex justify-center items-start py-20 px-4">
      <div className="w-full max-w-2xl bg-[#141414] rounded-2xl shadow-2xl p-8 border border-[#222]">
        {/* Header */}
        <ImageProfile session={session} />
        {/* Info Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-b border-[#222]">
          <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#262626] min-w-0">
            <p className="text-xs text-gray-400 mb-1">Email</p>
            <p className="text-sm font-medium text-gray-200 break-all tracking-wide">
              {session?.user?.email}
            </p>
          </div>

          <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#262626] min-w-0">
            <p className="text-xs text-gray-400 mb-1">Phone</p>
            <p className="text-sm font-medium text-gray-200 tracking-wide">
              {session?.phone || user.phone}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 py-6 border-b border-[#222]">
          <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#262626]">
            <p className="text-xs text-gray-400">Favorites</p>
            <p className="text-lg font-medium">{ids.length} Movies</p>
          </div>

          <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#262626]">
            <p className="text-xs text-gray-400">Member Since</p>
            <p className="text-lg font-medium">{user.memberSince}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 pt-6">
          <Link href="/favorites">
            <button className="w-full bg-[#1a1a1a] hover:bg-[#242424] transition px-4 py-2 text-sm rounded-lg border border-[#262626] cursor-pointer">
              My Favorites
            </button>
          </Link>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full bg-red-700 hover:bg-red-600 transition px-4 py-2 text-sm rounded-lg cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
