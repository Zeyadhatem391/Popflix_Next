import DefaultImage from "@/assets/images/default.png";
import Image from "next/image";
import Link from "next/link";
import { Camera } from "lucide-react";
import LogoutButton from "@/app/(pages)/components/LogoutButton";
import { auth } from "@/auth";
import { cookies } from "next/headers";
import FavoritesCount from "@/modules/favorites/components/FavoritesCount";

type CookieUser = {
  id: string;
  name: string | null;
  email: string | null;
};

export default async function ProfileContent() {
  const session = await auth();

  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");

  const users = userCookie ? JSON.parse(userCookie.value) : null;

  const userId = session?.user?.id ?? users?.id;

  let user: CookieUser | null = null;

  

  if (userCookie) {
    try {
      user = JSON.parse(userCookie.value);
    } catch {
      user = null;
    }
  }

  if (!session && !user) {
    return <div>Profile not found</div>;
  }

  const name = session?.user?.name || user?.name || "User";
  const email = session?.user?.email || user?.email || "";
  const image = session?.user?.image || DefaultImage;

  return (
    <div className="min-h-screen text-white flex justify-center items-start py-20 px-4">
      <div className="w-full max-w-2xl ds-bg-form rounded-2xl shadow-2xl p-8 border border-[#222]">
        <div className="flex flex-col items-center gap-4 pb-8 border-b border-[#222]">
          <div className="relative">
            <Image
              src={image}
              alt={name}
              width={140}
              height={140}
              priority
              className="rounded-full object-cover border border-[#333]"
            />

            <button
              type="button"
              className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-red-600 hover:bg-red-500 transition flex items-center justify-center border-2 border-[#141414]"
            >
              <Camera size={18} />
            </button>
          </div>

          <h2 className="text-2xl font-semibold">{name}</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 py-6 border-b border-[#222]">
          <div className="ds-bg-primary rounded-lg p-4 border border-[#262626]">
            <p className="text-xs text-gray-400 mb-1">Email</p>

            <p className="text-sm break-all">{email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 py-6 border-b border-[#222]">
          <div className="ds-bg-primary rounded-lg p-4 border border-[#262626]">
            <p className="text-xs text-gray-400 mb-1">Favorites</p>

            <FavoritesCount userId={userId} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-6">
          <Link
            href="/favorites"
            className="w-full ds-bg-primary hover:bg-[#242424] transition px-4 py-2 rounded-lg border border-[#262626] cursor-pointer text-center"
          >
            My Favorites
          </Link>

          <LogoutButton className="flex justify-center gap-2 items-center bg-red-700 hover:bg-red-600 transition rounded-lg cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
