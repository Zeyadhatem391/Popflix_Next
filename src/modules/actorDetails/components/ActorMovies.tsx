"use client";

import useGetActorMovies from "@/shared/hooks/Actors/useGetActorMovies";
import ActorMoviesSkeleton from "@/shared/components/skeletons/ActorMoviesSkeleton";
import MoviesCard from "@/shared/components/molecules/MoviesCard";
import { Film } from "@/assets/icons/Icons";
import { getMovieImage } from "@/lib/helpers/getMovieImage";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

interface ActorMoviesProps {
  moviesId: string;
}

const ActorMovies = ({ moviesId }: ActorMoviesProps) => {
  const { data, isLoading } = useGetActorMovies(moviesId);

  if (isLoading) return <ActorMoviesSkeleton />;

  if (!data || data.length === 0)
    return (
      <section className="md:col-span-3 mt-10">
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-[#014162]/30 blur-3xl rounded-full" />

            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#014162]/30 to-[#014162]/10 border border-[#014162]/30 flex items-center justify-center">
              <Film className="w-10 h-10 text-[#4DA8DA]" />
            </div>
          </div>

          <h3 className="text-3xl font-bold text-white mb-3">
            No Movies Found
          </h3>

          <p className="text-zinc-400 max-w-lg leading-relaxed">
            This actor currently has no movie credits available in our database.
          </p>

          <div className="mt-8 h-0.5 w-32 rounded-full bg-gradient-to-r from-transparent via-[#4DA8DA] to-transparent" />
        </div>
      </section>
    );

  const topMovies = [...data]
    .filter((movie) => movie.vote_average !== undefined)
    .sort((a, b) => b.vote_average - a.vote_average);

  return (
    <section className="md:col-span-3 mt-10">
      <h2 className="text-2xl font-semibold mb-6">Best Movies</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {topMovies.map((movie) => {
          const movieImage = getMovieImage(movie.poster_path);

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
    </section>
  );
};

export default ActorMovies;
