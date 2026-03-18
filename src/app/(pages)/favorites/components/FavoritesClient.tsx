"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useGetFavoriteMovies from "@/hooks/Favorite/useGetFavoriteMovies";
import FavoritesMoviesSkeleton from "@/components/skeletons/FavoritesMoviesSkeleton";

const FavoritesClient = () => {
  const [ids, setIds] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    const favorites = stored ? JSON.parse(stored) : [];
    setIds(favorites);
  }, []);

  const { data: movies, isLoading } = useGetFavoriteMovies(ids);

  if (isLoading) {
    return <FavoritesMoviesSkeleton />;
  }

  const isEmpty = ids.length === 0;

  return (
    <>
      {isEmpty ? (
        <div className="flex flex-col items-center text-center space-y-6 max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-white">
            You haven't added anything to your Favorites yet
          </h1>
          <p className="text-gray-300">
            Browse movies and add your favorite ones to see them here.
          </p>
          <Link
            href="/movies"
            className="px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg"
          >
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="w-full max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {movies?.map((movie: any) => {
            const movieImage = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

            return (
              <div
                key={movie.id}
                className="relative  min-w-[160px] md:min-w-[230px] h-[260px] md:h-[300px]
                rounded-xl overflow-hidden group transition-transform duration-300 hover:scale-105"
              >
                <Link
                  href={`/movies/${movie.id}`}
                  className="block w-full h-full relative"
                >
                  <Image
                    src={movieImage}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />

                  {movie.vote_average && (
                    <span className="absolute top-2 left-2 bg-black/70 text-yellow-400 text-xs px-2 py-1 rounded-md">
                      ⭐ {movie.vote_average.toFixed(1)}
                    </span>
                  )}

                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3">
                    <h5 className="text-lg text-center line-clamp-2">
                      {movie.title}
                    </h5>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default FavoritesClient;
