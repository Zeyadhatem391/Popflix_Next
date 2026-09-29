"use client";

import Link from "next/link";
import FavoritesMoviesSkeleton from "@/shared/components/skeletons/FavoritesMoviesSkeleton";
import MoviesCard from "@/shared/components/molecules/MoviesCard";
import useGetFavoriteMovies from "../hooks/useGetFavoriteMovies";
import { useFavoritesStore } from "../store/favorites.store";

type Props = {
  userId?: string;
};

const FavoritesClient = ({ userId }: Props) => {
  const favorites = useFavoritesStore((state) => state.favorites);

  const userFavorites = userId
    ? favorites.filter((favorite) => favorite.userId === userId)
    : [];

  const ids = userFavorites.map((favorite) => Number(favorite.movieId));

  const { data: movies, isLoading } = useGetFavoriteMovies(ids);

  if (isLoading) {
    return <FavoritesMoviesSkeleton />;
  }

  const isEmpty = ids.length === 0;

  return (
    <>
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center mx-auto space-y-6 max-w-md text-center">
          <h1 className="text-3xl font-bold text-white">
            You haven't added anything to your Favorites yet
          </h1>

          <p className="text-gray-300">
            Browse movies and add your favorite ones to see them here.
          </p>

          <Link
            href="/movies"
            className="px-6 py-3 text-gray-900 bg-yellow-500 rounded-lg"
          >
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 mx-auto w-full max-w-6xl md:grid-cols-4">
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
