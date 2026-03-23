"use client";
import Link from "next/link";
import Image from "next/image";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

import DefaultImage from "@/assets/images/default.png";
import SignOutButton from "@/features/auth/components/SignOutButton";
import useGetImageProfile from "@/hooks/Profile/useGetImageProfile";
const UserImage = () => {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { data: session, status } = useSession();

  const { data } = useGetImageProfile(session?.accessToken);

  const profileImage =
    data?.profile_picture && data.profile_picture !== ""
      ? data.profile_picture
      : session?.user?.image || DefaultImage;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (status === "loading") {
    <Image
      src={profileImage}
      alt="User"
      width={32}
      height={32}
      className="rounded-full object-cover border-2 border-red-600"
    />;
  }

  return (
    <>
      {status === "authenticated" ? (
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setOpen(!open)} className="w-8 h-8 ">
            <Image
              src={profileImage}
              alt="User"
              fill
              className="object-center rounded-full border-2 border-red-600"
            />
          </button>

          {open && (
            <div className="absolute right-0 top-10 mt-3 w-56 bg-black rounded-xl shadow-xl border border-gray-800 animate-fadeIn z-50">
              <div className="p-4 text-center border-b border-gray-700">
                <Image
                  src={profileImage}
                  alt="User"
                  width={60}
                  height={60}
                  className="object-center rounded-full mx-auto mb-2 border-2 border-red-600"
                />
                <h6 className="text-white font-semibold">
                  {session?.user?.name}
                </h6>
              </div>

              <div className="flex flex-col text-left text-white">
                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 hover:bg-white/10 transition"
                >
                  Profile
                </Link>

                <SignOutButton />
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link href="/login" className="link_nav">
          Login
        </Link>
      )}
    </>
  );
};

export default UserImage;
