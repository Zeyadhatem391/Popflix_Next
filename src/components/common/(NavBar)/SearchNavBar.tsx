"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { useDebounce } from "@/hooks/Search/useDebounce";
import useSearchMovies from "@/hooks/Search/useSearchMovies";
import Link from "next/link";

type SearchNavBarProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const SearchNavBar = ({ open, setOpen }: SearchNavBarProps) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 800);

  const { data: movies, isLoading } = useSearchMovies(debouncedQuery);

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black z-[100] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-center gap-3 p-6 border-b border-gray-800">
            <div className="flex w-full max-w-3xl gap-2">
              <Input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-[#111] border-gray-700 text-white h-12 text-lg"
              />
              <button
                onClick={() => {}}
                className="px-6 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center"
              >
                <FaSearch />
              </button>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-white text-3xl ml-4"
            >
              <IoClose />
            </button>
          </div>

          {/* Results */}
          <div className="max-w-5xl mx-auto px-6 py-10 space-y-4">
            {isLoading && (
              <p className="text-gray-400 text-center">Loading...</p>
            )}

            {movies?.length === 0 && debouncedQuery && !isLoading && (
              <p className="text-gray-400 text-center">No movies found</p>
            )}

            {movies?.map((movie) => (
              <div
                key={movie.id}
                className=" p-4 hover:bg-[#1a1a1a] rounded-xl transition"
              >
                <Link
                  href={`/movies/${movie.id}`}
                  className=" flex justify-between"
                  onClick={() => setOpen(false)}
                >
                  <div className="flex flex-row items-center gap-4">
                    {movie.poster_path && (
                      <Image
                        src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                        alt={movie.title}
                        width={120}
                        height={180}
                        className="rounded-lg object-cover"
                      />
                    )}
                    <h3 className="text-white text-lg sm:text-xl font-semibold mt-2 sm:mt-0">
                      {movie.title}
                    </h3>
                  </div>
                  ⭐{movie.vote_average.toFixed(1)}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchNavBar;
