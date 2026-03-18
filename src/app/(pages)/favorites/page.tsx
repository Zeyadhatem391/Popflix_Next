import { authOptions } from "@/app/lib/nextAuth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import FavoritesClient from "./components/FavoritesClient";

const FavoritesPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <section className="w-full min-h-screen flex justify-center px-4 py-5 bg-[#111]">
      {session ? (
        <FavoritesClient />
      ) : (
        <div className="flex flex-col items-center text-center space-y-6 max-w-md">
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
};

export default FavoritesPage;