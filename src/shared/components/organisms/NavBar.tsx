import Link from "next/link";

import Logo from "../common/(NavBar)/Logo";
import MenuPage from "../common/(NavBar)/MenuPage";
import UserImage from "../common/(NavBar)/UserImage";
import { Heart } from "@/assets/icons/Icons";
import SearchTrigger from "../common/(NavBar)/SearchTrigger";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 bg-black px-6 md:px-10 lg:px-24 py-4 flex items-center justify-between text-white">
      <div className="flex items-center">
        <Logo />
      </div>

      <div className="hidden md:flex gap-2">
        <MenuPage />
        <SearchTrigger desktop />
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        <div className="md:hidden flex items-center justify-center">
          <MenuPage />
        </div>

        <div className="md:hidden flex items-center justify-center">
          <SearchTrigger />
        </div>

        <Link href="/favorites">
          <Heart className="w-4 h-4 md:w-6 md:h-6 hover:text-red-500 transition" />
        </Link>

        {/* <UserImage /> */}
      </div>
    </div>
  );
}