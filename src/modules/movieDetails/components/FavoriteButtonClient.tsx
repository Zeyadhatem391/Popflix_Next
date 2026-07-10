"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Heart, LogIn } from "@/assets/icons/Icons";

type Props = {
  idMovie: number;
  isAuthenticated: boolean;
};

export default function FavoriteButtonClient({
  idMovie,
  isAuthenticated,
}: Props) {
  const [open, setOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const router = useRouter();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("favorites");
      const favorites = stored ? JSON.parse(stored) : [];

      setIsFavorite(favorites.includes(idMovie));
    } catch {
      console.log("Error reading localStorage");
    }
  }, [idMovie]);

  const handleAddToFavorite = () => {
    try {
      const stored = localStorage.getItem("favorites");
      let favorites = stored ? JSON.parse(stored) : [];

      if (favorites.includes(idMovie)) {
        favorites = favorites.filter((id: number) => id !== idMovie);

        setIsFavorite(false);

        toast.error("Removed from favorites 💔", {
          duration: 2000,
          style: {
            background: "red",
            color: "#fff",
          },
        });
      } else {
        favorites.push(idMovie);

        setIsFavorite(true);

        toast.success("Added to favorites ❤️", {
          duration: 2000,
          style: {
            background: "green",
            color: "#fff",
          },
        });
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch {
      toast.error("Something went wrong");
    }
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