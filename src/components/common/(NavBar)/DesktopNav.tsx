"use client";
import Link from "next/link";
import { useState } from "react";
import UserImage from "./UserImage";
import Logo from "./Logo";

const DesktopNav = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="px-6 py-4 flex items-center justify-between">
      <div className="hidden md:flex">
        <Logo />
      </div>
      <div className="hidden md:flex items-center gap-10 text-white">
        <ul className="flex gap-8 items-center">
          <li className="link_nav">
            <Link href="/">Home</Link>
          </li>

          <li className="link_nav">
            <Link href="/movies">Movies</Link>
          </li>

          <li className="link_nav">
            <Link href="/favorites">Favorites</Link>
          </li>

          <li className="link_nav">
            <button onClick={() => setIsSearchOpen(true)}>Search</button>
          </li>

          <li>
            <UserImage />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DesktopNav;
