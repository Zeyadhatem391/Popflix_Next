"use client";

import Image from "next/image";
import DefaultImage from "@/assets/images/default.png";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function ProfilePage() {
  const user = {
    name: "Zeyad Hatem",
    email: "zeyadhatem151177@example.com",
    phone: "+20 100 000 0000",
    avatar: DefaultImage,
    favorites: 0,
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
        <div className="flex items-center gap-6 border-b border-[#222] pb-6">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border border-[#333]">
            <Image
              src={session?.user?.image || DefaultImage}
              alt="avatar"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <h1 className="text-xl font-semibold tracking-wide capitalize">
              {session?.user?.name || user.name}
            </h1>

            <button className="w-fit mt-1 px-4 py-1.5 text-sm bg-blue-600 hover:bg-blue-500 rounded-md transition cursor-pointer">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Info Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-b border-[#222]">
          <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#262626] min-w-0">
            <p className="text-xs text-gray-400 mb-1">Email</p>
            <p className="text-sm font-medium text-gray-200 break-all tracking-wide">
              {session?.user?.email || user.email}
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
            <p className="text-lg font-medium">{user.favorites} Movies</p>
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
