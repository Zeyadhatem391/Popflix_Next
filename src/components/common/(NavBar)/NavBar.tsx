"use client";

import Link from "next/link";
import Logo from "./Logo";
import UserImage from "./UserImage";
import { FaRegHeart, FaSearch } from "react-icons/fa";
import SearchNavBar from "./SearchNavBar";

const NavBar = () => {
  return (
    <div className="px-6 py-4 flex items-center justify-between text-white">
      {/* Logo */}
      <div className="flex items-center">
        <Logo />
      </div>

      {/* Search */}
      <SearchNavBar />

      {/* Right Side */}
      <div className="flex items-center gap-6">
        <div className="md:hidden flex items-center justify-center">
          <FaSearch className="w-5 h-5 cursor-pointer" />
        </div>

        <Link href="/favorites">
          <FaRegHeart className="w-6 h-6 hover:text-red-500 transition" />
        </Link>

        <UserImage />
      </div>
    </div>
  );
};

export default NavBar;
