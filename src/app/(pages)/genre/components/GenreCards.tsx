"use client";

import GenreCardsSkeleton from "@/components/skeletons/GenreCardsSkeleton";
import MoviesCard from "@/components/molecules/MoviesCard";
import { getMovieImage } from "@/app/lib/helpers/getMovieImage";
import { GenreMovies } from "@/modules/genre/api/GetGenreMovie";

type GenreCardsProps = {
  movies: GenreMovies["results"];
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
          const movieImage = getMovieImage(movie.poster_path);

          return (
            <MoviesCard
              key={movie.id}
              id={movie.id}
              title={movie.title || "movie name"}
              vote_average={movie.vote_average}
              image={movieImage}
            />
          );
        })}
      </div>
    </section>
  );
};

export default GenreCards;
