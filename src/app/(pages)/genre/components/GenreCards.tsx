"use client";

import DefaultImage from "@/assets/images/default.png";
import GenreCardsSkeleton from "@/components/skeletons/GenreCardsSkeleton";
import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/lib/types/Movie";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

type GenreCardsProps = {
  movies: Movie[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  error: Error | null;
};

const GenreCards = ({
  movies,
  isLoading,
  isError,
  refetch,
  error,
}: GenreCardsProps) => {
  if (isLoading) {
    return <GenreCardsSkeleton />;
  }

  if (isError || !movies)
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-lg text-red-500 font-medium">
          Something went wrong while fetching movies 😢
        </p>

        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md transition"
        >
          Try Again
        </button>
      </div>
    );

  return (
    <section>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 pb-2">
        {error && <p className="text-red-500 mt-4">{error.message}</p>}
        {movies.map((movie) => {
          const movieImage = movie.poster_path
            ? IMAGE_BASE + movie.poster_path
            : DefaultImage.src;

          return (
            <div
              key={movie.id}
              className="relative w-full h-[320px] rounded-xl group transition-transform duration-300 hover:scale-105"
            >
              <Link
                href={`/movies/${movie.id}`}
                className="block w-full h-full relative"
              >
                <Image
                  src={movieImage}
                  alt={movie.title}
                  fill
                  sizes="(max-width:768px) 50vw, 200px"
                  className="object-cover"
                />

                <span className="absolute top-2 left-2 bg-black/70 text-yellow-400 text-xs font-semibold px-2 py-1 rounded-md">
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>

                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3">
                  <h5 className="text-lg md:text-base font-medium text-center line-clamp-2">
                    {movie.title}
                  </h5>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default GenreCards;
