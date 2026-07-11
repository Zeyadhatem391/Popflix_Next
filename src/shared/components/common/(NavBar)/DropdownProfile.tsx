"use client";

import DefaultImage from "@/assets/images/default.png";
import { ChevronDown, Heart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "../LogoutButton";
import { useEffect, useRef, useState } from "react";

type DropdownProfileProps = {
  profile: {
    name: string | null;
    email: string | null;
    image: string | null;
  };
};

export default function DropdownProfile({
  profile,
}: DropdownProfileProps) {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const name = profile.name || "User";
  const image = profile.image || DefaultImage;

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex cursor-pointer items-center gap-2 rounded-xl p-1.5 transition-all duration-200 hover:bg-white/10"
      >
        <Image
          src={image}
          alt={name}
          width={30}
          height={30}
          className="h-8 w-8 rounded-full border border-zinc-700 object-cover"
        />

        <p className="hidden max-w-28 truncate text-sm font-medium text-white md:block">
          {name}
        </p>

        <ChevronDown
          size={18}
          className={`text-zinc-400 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 top-full z-50 mt-3 w-56 overflow-hidden rounded-xl border border-zinc-800 bg-[#161616] shadow-2xl transition-all duration-200 ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-zinc-800 p-4">
          <Image
            src={image}
            alt={name}
            width={44}
            height={44}
            className="rounded-full border border-zinc-700 object-cover"
          />

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              {name}
            </p>

            <p className="truncate text-xs text-zinc-400">
              {profile.email}
            </p>
          </div>
        </div>

        {/* Menu */}
        <div className="py-2">
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-200 transition-colors hover:bg-red-600/10 hover:text-red-500"
          >
            <User size={18} />
            <span>Profile</span>
          </Link>

          <Link
            href="/favorites"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-200 transition-colors hover:bg-red-600/10 hover:text-red-500"
          >
            <Heart size={18} />
            <span>Favorites</span>
          </Link>
        </div>

        <div className="border-t border-zinc-800">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}