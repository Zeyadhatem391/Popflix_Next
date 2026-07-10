"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import useGetFavoriteMovies from "@/shared/hooks/Favorite/useGetFavoriteMovies";
import FavoritesMoviesSkeleton from "@/shared/components/skeletons/FavoritesMoviesSkeleton";
import MoviesCard from "@/shared/components/molecules/MoviesCard";

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
        <div className="flex flex-col items-center text-center justify-center space-y-6 max-w-md mx-auto">
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
              <MoviesCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                vote_average={movie.vote_average}
                image={movieImage}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default FavoritesClient;
