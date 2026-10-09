import { Suspense } from "react";

import Logo from "../common/(NavBar)/Logo";
import MenuPage from "../common/(NavBar)/MenuPage";
import SearchTrigger from "../../../modules/search/components/SearchTrigger";
import UserImage from "../common/(NavBar)/UserImage";
import UserSkeleton from "../skeletons/UserSkeleton";
import NavbarClient from "./NavbarClient";

export default function Navbar() {
  return (
    <NavbarClient>
      <div className="flex items-center">
        <Logo />
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        <div className="flex items-center justify-center ">
          <MenuPage />
        </div>

        <div className="flex items-center justify-center border-l border-gray-50/40 pl-3">
          <SearchTrigger />
        </div>

        <Suspense fallback={<UserSkeleton />}>
          <UserImage />
        </Suspense>
      </div>
    </NavbarClient>
  );
}
