import Link from "next/link";
import DropdownProfile from "./DropdownProfile";
import { cookies } from "next/headers";
import { auth } from "@/auth";

export default async function UserImage() {
  const session = await auth();

  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");

  const user = userCookie ? JSON.parse(userCookie.value) : null;

  if (!session && !user) {
    return (
      <Link
        href="/login"
        className="relative cursor-pointer text-lg font-semibold italic after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-red-500 after:transition-transform after:duration-300 after:content-[''] hover:text-red-500 hover:after:scale-x-100"
      >
        Login
      </Link>
    );
  }

  return (
    <DropdownProfile
      session={session?.user ?? null}
      user={user}
    />
  );
}