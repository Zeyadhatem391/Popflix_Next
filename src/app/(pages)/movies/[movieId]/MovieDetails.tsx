"use client";

import Image from "next/image";
import useGetDetailsMovies from "@/modules/movieDetails/hooks/useGetDetailsMovies";
import MovieDetailsSkeleton from "@/shared/components/skeletons/MovieDetailsSkeleton";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getMovieImage } from "@/lib/helpers/getMovieImage";
import FavoriteButton from "@/modules/movieDetails/components/FavoriteButton";

const MovieDetails = () => {
  const params = useParams();

  const movieId = params.movieId as string;

  const { data, isLoading, isError, refetch } = useGetDetailsMovies(movieId);

  const movie = data?.movie;

  const video = data?.videos.results;

  const credits = data?.credits;

  if (isLoading || !data) {
    return <MovieDetailsSkeleton />;
  }
  if (isError)
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-lg text-red-500 font-medium">
          Something went wrong while fetching movies
        </p>

        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md transition"
        >
          Try Again
        </button>
      </div>
    );

  const moviesImage = getMovieImage(movie?.backdrop_path);

  const director =
    credits?.crew?.find((c) => c.job === "Director")?.name || "-";

  const trailer = video?.find(
    (video) => video.site === "YouTube" && video.type === "Trailer",
  );

  return (
    <div className="max-w-5xl mx-auto p-5 text-white ">
      <h1 className="text-3xl font-bold mb-4">{movie?.title}</h1>

      <div className="w-full h-125 relative rounded-lg overflow-hidden mb-6">
        {trailer ? (
          <iframe
            title="trailer"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <Image
            src={moviesImage}
            alt={movie?.title || "image"}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
      </div>

      <div className="flex items-center gap-5 mb-4">
        <span className="text-lg">⭐ {movie?.vote_average.toFixed(1)}</span>

        {movie && <FavoriteButton idMovie={movie.id} />}
      </div>

      <p className="leading-7 my-6 text-gray-300">{movie?.overview}</p>

      <div className="bg-zinc-800 p-4 rounded-lg mb-6 space-y-3 text-lg font-medium">
        <div>Release Date: {movie?.release_date}</div>

        <div>Director: {director}</div>

        <div className="flex flex-wrap gap-2">
          Genres:
          {movie?.genres?.map((genre) => (
            <span
              key={genre.id}
              className="bg-zinc-700 px-3 py-1 rounded-md text-sm"
            >
              {genre.name}
            </span>
          ))}
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Cast</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {credits?.cast?.slice(0, 12).map((cast) => {
          const actorImage = getMovieImage(cast.profile_path);

          return (
            <div
              key={cast.id}
              className="bg-zinc-800 rounded-lg  p-3 hover:bg-zinc-700 transition"
            >
              <Link
                href={`/actor/${cast.id}`}
                className="w-full h-full flex items-center"
              >
                <div className="relative w-15 h-22.5 mr-3 shrink-0">
                  <Image
                    src={actorImage}
                    alt={cast.original_name || "image"}
                    fill
                    sizes="60px"
                    className="object-cover rounded"
                  />
                </div>

                <div>
                  <p className="font-semibold">{cast.original_name}</p>

                  <p className="text-sm text-gray-300">{cast.character}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieDetails;
