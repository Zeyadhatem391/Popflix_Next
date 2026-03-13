"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSignInAlt } from "react-icons/fa";

const FavoriteButton = () => {
  const { status } = useSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      {status === "authenticated" ? (
        <button className="border-2 border-white px-4 py-2 rounded-md transition hover:bg-white hover:text-black">
          Add To Favorite
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
            <h2 className="text-lg font-semibold mb-3">
              You must login first
            </h2>

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