"use client";

import Link from "next/link";
import { FaRegHeart, FaSearch } from "react-icons/fa";
import SearchNavBar from "../common/(NavBar)/SearchNavBar";
import Logo from "../common/(NavBar)/Logo";
import UserImage from "../common/(NavBar)/UserImage";
import MenuPage from "../common/(NavBar)/MenuPage";
import { useState } from "react";
import { Input } from "../ui/input";

const Navbar = () => {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-black px-6 md:px-10 lg:px-24 py-4 flex items-center justify-between text-white">
      {/* Logo */}
      <div className="flex items-center">
        <Logo />
      </div>

      {/* Search / Desktop */}
      <div className="hidden md:flex gap-2">
        <MenuPage />
        <div onClick={() => setOpenSearch(true)}>
          <div className="relative w-[250px] md:w-[400px] rounded-2xl cursor-pointer hidden md:block">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search movies..."
              className="pl-10 bg-[#111] border-gray-700 text-white placeholder:text-gray-400 rounded-2xl cursor-pointer"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">
        {/* Mobile Menu */}
        <div className="md:hidden flex items-center justify-center">
          <MenuPage />
        </div>

        {/* Mobile Search */}
        <div
          className="md:hidden flex items-center justify-center"
          onClick={() => setOpenSearch(true)}
        >
          <FaSearch className="w-5 h-5 cursor-pointer" />
        </div>

        {/* Favorites */}
        <Link href="/favorites">
          <FaRegHeart className="w-6 h-6 hover:text-red-500 transition" />
        </Link>

        <UserImage />
      </div>

      {/* Modal Fullscreen */}
      {openSearch && <SearchNavBar open={openSearch} setOpen={setOpenSearch} />}
    </div>
  );
};

export default Navbar;
