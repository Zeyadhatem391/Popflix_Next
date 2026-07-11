import { Suspense } from "react";

import Logo from "../common/(NavBar)/Logo";
import MenuPage from "../common/(NavBar)/MenuPage";
import SearchTrigger from "../../../modules/search/components/SearchTrigger";
import UserImage from "../common/(NavBar)/UserImage";
import UserSkeleton from "../skeletons/UserSkeleton";

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

        <Suspense fallback={<UserSkeleton />}>
          <UserImage />
        </Suspense>
      </div>
    </div>
  );
}