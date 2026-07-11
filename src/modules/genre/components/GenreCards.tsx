"use client";

import GenreCardsSkeleton from "@/shared/components/skeletons/GenreCardsSkeleton";
import MoviesCard from "@/shared/components/molecules/MoviesCard";
import { getMovieImage } from "@/lib/helpers/getMovieImage";
import { GetGenreMovie } from "../api/GetGenreMovie";

type GenreMoviesResponse = Awaited<ReturnType<typeof GetGenreMovie>>;

type GenreCardsProps = {
  movies: GenreMoviesResponse["results"];
  isLoading: boolean;
  error: Error | null;
};

const GenreCards = ({
  movies,
  isLoading,
  error,
}: GenreCardsProps) => {
  if (isLoading) {
    return <GenreCardsSkeleton />;
  }

  

  return (
    <section>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 pb-2">
        {error && <p className="text-red-500 mt-4">{error.message}</p>}
        {movies?.map((movie) => {
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
