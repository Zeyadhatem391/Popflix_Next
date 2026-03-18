"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSignInAlt, FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "sonner";

type FavoriteButtonProps = {
  idMovie: number;
};

const FavoriteButton = ({ idMovie }: FavoriteButtonProps) => {
  const { status } = useSession();
  const [open, setOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("favorites");
      const favorites = stored ? JSON.parse(stored) : [];

      setIsFavorite(favorites.includes(idMovie));
    } catch (error) {
      console.log("Error reading localStorage");
    }
  }, [idMovie]);

  const handleAddToFavorite = (idMovie: number) => {
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
            border: "1px solid #333",
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
            border: "1px solid #333",
          },
        });
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      toast.error("Something went wrong ❌");
    }
  };
  return (
    <>
      {status === "authenticated" ? (
        <button
          onClick={() => handleAddToFavorite(idMovie)}
          className={`flex items-center gap-2 border-2 px-4 py-2 rounded-md transition
          ${
            isFavorite
              ? "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              : "border-white text-white hover:bg-white hover:text-black"
          }`}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
          {isFavorite ? "Remove Favorite" : "Add To Favorite"}
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="border-2 border-gray-500 px-4 py-2 rounded-md transition bg-gray-800 cursor-pointer"
        >
          Add To Favorite
        </button>
      )}

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white text-black p-6 rounded-lg w-[320px] text-center">
            <h2 className="text-lg font-semibold mb-3">You must login first</h2>

            <p className="text-gray-600 mb-5">
              Please login to add movies to your favorites.
            </p>

            <button
              onClick={() => router.push("/login")}
              className="flex items-center justify-center gap-2 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
            >
              <FaSignInAlt />
              Go To Login
            </button>

            <button
              onClick={() => setOpen(false)}
              className="mt-3 text-sm text-gray-500 hover:text-black"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FavoriteButton;
