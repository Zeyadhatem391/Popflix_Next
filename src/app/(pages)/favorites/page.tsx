import { authOptions } from "@/app/lib/nextAuth";
import { getServerSession } from "next-auth";
import Link from "next/link";

const FavoritesPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <section className="w-full min-h-screen flex items-center justify-center px-4 ">
      {session ? (
        <div className="flex flex-col items-center text-center space-y-6 max-w-md">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            You haven't added anything to your Favorites yet
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            Browse movies and add your favorite ones to see them here.
          </p>
          <Link
            href="/movies"
            className="px-6 py-3 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-300"
          >
            Browse Movies
          </Link>
        </div>
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
            className="px-6 py-3 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-300"
          >
            Log In
          </Link>
        </div>
      )}
    </section>
  );
};

export default FavoritesPage;