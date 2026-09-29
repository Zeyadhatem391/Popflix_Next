"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Heart, LogIn } from "@/assets/icons/Icons";
import { useFavoritesStore } from "@/modules/favorites/store/favorites.store";

type Props = {
  idMovie: number;
  isAuthenticated: boolean;
  userId?: string;
};

export default function FavoriteButtonClient({
  idMovie,
  isAuthenticated,
  userId,
}: Props) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const favorites = useFavoritesStore((state) => state.favorites);
  const addFavorites = useFavoritesStore((state) => state.addFavorites);
  const removeFavorites = useFavoritesStore((state) => state.removeFavorites);

  const movieId = String(idMovie);

  const favorite = favorites.find(
    (item) =>
      item.movieId === movieId &&
      item.userId === userId
  );

  const isFavorite = Boolean(favorite);

  const handleAddToFavorite = () => {
    if (!isAuthenticated || !userId) {
      setOpen(true);
      return;
    }

    if (favorite) {
      removeFavorites(favorite.id);

      toast.error("Removed from favorites 💔", {
        duration: 2000,
        style: {
          background: "red",
          color: "#fff",
        },
      });

      return;
    }

    addFavorites({
      id: crypto.randomUUID(),
      movieId,
      userId,
    });

    toast.success("Added to favorites ❤️", {
      duration: 2000,
      style: {
        background: "green",
        color: "#fff",
      },
    });
  };

return (
  <>
    {isAuthenticated ? (
      <button
        onClick={handleAddToFavorite}
        className={`flex items-center gap-2 border-2 px-4 py-2 rounded-md transition ${
          isFavorite
            ? "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            : "border-white text-white hover:bg-white hover:text-black"
        }`}
      >
        {isFavorite ? <Heart fill="none" /> : <Heart />}

        {isFavorite ? "Remove Favorite" : "Add To Favorite"}
      </button>
    ) : (
      <button
        onClick={() => setOpen(true)}
        className="border-2 border-gray-500 px-4 py-2 rounded-md bg-gray-800"
      >
        Add To Favorite
      </button>
    )}

    {open && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div className="w-[320px] rounded-lg bg-white p-6 text-center text-black">
          <h2 className="mb-3 text-lg font-semibold">
            You must login first
          </h2>

          <p className="mb-5 text-gray-600">
            Please login to add movies to your favorites.
          </p>

          <button
            onClick={() => router.push("/login")}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-black py-2 text-white"
          >
            <LogIn />
            Go To Login
          </button>

          <button
            onClick={() => setOpen(false)}
            className="mt-3 text-sm text-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    )}
  </>
);
}