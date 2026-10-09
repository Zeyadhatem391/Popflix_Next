import { getMovieImage } from "@/lib/helpers/getMovieImage";
import Image from "next/image";
import { CalendarDays, Star } from "lucide-react";
import { Suspense } from "react";
import FavoriteButton from "./FavoriteButton";
import WatchTrailerButton from "./WatchTrailerButton";

interface InfoMoviesProps {
  movie: {
    id: number;
    backdrop_path?: string;
    poster_path?: string;
    title?: string;
    overview?: string;
    vote_average: number;
    release_date?: string;
    genres?: { id: number; name?: string }[];
  };
  trailerKey?: string;
}

export default function InfoMovies({ movie, trailerKey }: InfoMoviesProps) {
  const backdropImage = getMovieImage(movie.backdrop_path);
  const posterImage = getMovieImage(movie.poster_path);

  const rating =
    movie.vote_average === 0 ? 3.2 : Number(movie.vote_average.toFixed(1));

  return (
    <div className="relative mb-6 w-full overflow-hidden ">
      <Image
        src={backdropImage}
        alt={movie.title || "Movie"}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex min-h-162.5 flex-col items-center justify-center gap-6 px-4 py-8 sm:px-8 md:min-h-[500px] md:flex-row md:gap-8 lg:gap-12 pt-28">
        <div className="relative h-105 w-70 shrink-0 overflow-hidden rounded-lg shadow-2xl">
          <Image
            src={posterImage}
            alt={movie.title || "Movie poster"}
            fill
            sizes="280px"
            className="object-cover"
          />
        </div>
        <div className="w-full max-w-3xl space-y-4 text-left text-white sm:space-y-5">
          <h1 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            {movie.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-lg text-gray-200">
            <span className="flex items-center gap-1.5">
              <Star className="size-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-white">{rating}</span>
            </span>

            {movie.release_date && (
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-4 shrink-0" />
                {movie.release_date}
              </span>
            )}
          </div>

          {movie.genres && movie.genres.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {movie.genres.map(
                (genre) =>
                  genre.name && (
                    <span
                      key={genre.id}
                      className="rounded-md border border-white/15 bg-black/35 px-2.5 py-1 text-xs backdrop-blur-sm sm:px-3 sm:text-sm"
                    >
                      {genre.name}
                    </span>
                  ),
              )}
            </div>
          )}

          <div className="flex gap-4">
            <WatchTrailerButton trailerKey={trailerKey} />
            <Suspense fallback="loading...">
              <FavoriteButton idMovie={movie.id} />
            </Suspense>
          </div>

          {movie.overview && (
            <p className="max-w-2xl text-sm leading-6 text-gray-100 sm:text-base sm:leading-7 md:text-lg">
              {movie.overview}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
