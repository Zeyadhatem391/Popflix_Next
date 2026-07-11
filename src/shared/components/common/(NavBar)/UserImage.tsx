import Link from "next/link";
import DropdownProfile from "./DropdownProfile";
import { auth } from "@/auth";
import { getProfile } from "@/modules/profile/api/getProfile";

export default async function UserImage() {
  const session = await auth();

  const profile = await getProfile();

  return session ? (
    <DropdownProfile profile={profile} />
  ) : (
    <Link
      href="/login"
      className="relative text-lg font-semibold italic cursor-pointer after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-red-500 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-red-500"
    >
      Login
    </Link>
  );
}
