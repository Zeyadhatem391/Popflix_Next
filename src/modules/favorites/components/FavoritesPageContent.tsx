import Link from "next/link";
import FavoritesClient from "@/modules/favorites/components/FavoritesClient";
import { auth } from "@/auth";
import { cookies } from "next/headers";

export default async function FavoritesPageContent() {
  const session = await auth();
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  const isAuthenticated = !!(session || user);

  const userId = session?.user?.id ?? user?.id;

  return (
    <section className="w-full min-h-screen flex justify-center px-4 py-5 ">
      {isAuthenticated ? (
        <FavoritesClient userId={userId}/>
      ) : (
        <div className="flex flex-col items-center text-center space-y-6 max-w-md justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Welcome to Popfliex
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            You must log in to access your Favorites page.
          </p>
          <Link
            href="/login"
            className="px-6 py-3 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition"
          >
            Log In
          </Link>
        </div>
      )}
    </section>
  );
}
