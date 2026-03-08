"use client";

import Link from "next/link";
import { FaRegHeart, FaSearch } from "react-icons/fa";
import SearchNavBar from "../common/(NavBar)/SearchNavBar";
import Logo from "../common/(NavBar)/Logo";
import UserImage from "../common/(NavBar)/UserImage";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 bg-black px-6 py-4 flex items-center justify-between text-white  md:px-24">
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

export default Navbar;
