"use client";
import Link from "next/link";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { useState } from "react";
import { useSession } from "next-auth/react";
import UserImage from "./UserImage";
import Logo from "./Logo";

const MobileButtonNav = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { status } = useSession();
  if (status === "loading") return null;

  return (
    <>
      {/* Top Bar */}
      <div className="md:hidden flex items-center justify-between px-6 pb-4 bg-black">
        <Logo />
        <button
          className="text-white transition-transform duration-300"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <IoMdClose size={30} /> : <IoIosMenu size={30} />}
        </button>
      </div>

      {isMobileOpen && (
        <div
          className={`w-full overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
            isMobileOpen ? "max-h-125 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-8 items-center py-2">
            <li className="link_nav">
              <Link href="/" onClick={() => setIsMobileOpen(false)}>
                Home
              </Link>
            </li>

            <li className="link_nav">
              <Link href="/movies" onClick={() => setIsMobileOpen(false)}>
                Movies
              </Link>
            </li>

            <li className="link_nav">
              <Link href="/favorites" onClick={() => setIsMobileOpen(false)}>
                Favorites
              </Link>
            </li>

            <li className="link_nav">
              <button
                onClick={() => {
                  setIsSearchOpen(true);
                  setIsMobileOpen(false);
                }}
              >
                Search
              </button>
            </li>

            <li className="w-2/3 border-t border-gray-800 flex justify-center pt-4">
              <UserImage />
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default MobileButtonNav;
