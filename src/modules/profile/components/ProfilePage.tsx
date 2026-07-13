"use client";

import DefaultImage from "@/assets/images/default.png";
import Image from "next/image";
import Link from "next/link";
import { Camera } from "lucide-react";
import { Profile } from "../api/getProfile";
import useFavorites from "../hooks/useFavorites";
import LogoutButton from "@/app/(pages)/components/LogoutButton";
type Props = {
  profile: Profile | null;
};

export default function ProfilePage({ profile }: Props) {
  if (!profile) {
    return <div>Profile not found</div>;
  }
  const favoritesCount = useFavorites();
  return (
    <div className="min-h-screen  text-white flex justify-center items-start py-20 px-4">
      <div className="w-full max-w-2xl bg-[#141414] rounded-2xl shadow-2xl p-8 border border-[#222]">
        <div className="flex flex-col items-center gap-4 pb-8 border-b border-[#222]">
          <div className="relative">
            <Image
              src={profile.image || DefaultImage}
              alt={profile.name}
              width={140}
              height={140}
              priority
              className="rounded-full object-cover border border-[#333]"
            />

            <button className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-red-600 hover:bg-red-500 transition flex items-center justify-center border-2 border-[#141414]">
              <Camera size={18} />
            </button>
          </div>

          <h2 className="text-2xl font-semibold">{profile.name}</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 py-6 border-b border-[#222]">
          <div className="bg-[#1a1a1a] rounded-lg p-4 border border-[#262626]">
            <p className="text-xs text-gray-400 mb-1">Email</p>

            <p className="text-sm break-all">{profile.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 py-6 border-b border-[#222]">
          <div className="bg-[#1a1a1a] rounded-lg p-4 border border-[#262626]">
            <p className="text-xs text-gray-400 mb-1">Favorites</p>

            <p className="text-sm">{favoritesCount} Movies</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-6">
          <Link href="/favorites">
            <button className="w-full bg-[#1a1a1a] hover:bg-[#242424] transition px-4 py-2 rounded-lg border border-[#262626] cursor-pointer">
              My Favorites
            </button>
          </Link>

          <LogoutButton className="flex justify-center gap-2 items-center bg-red-700 hover:bg-red-600 transition rounded-lg cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
