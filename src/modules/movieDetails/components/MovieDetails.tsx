import Image from "next/image";

import FavoriteButton from "@/modules/movieDetails/components/FavoriteButton";
import { getMovieDetails } from "@/modules/movieDetails/api/getMovieDetails";
import { Suspense } from "react";
import TopCast from "./TopCast";
import Trailer from "./Trailer";
import InfoMovies from "./InfoMovies";

interface Props {
  movieId: string;
}

const MovieDetails = async ({ movieId }: Props) => {
  const { movie, videos, credits } = await getMovieDetails(movieId);

  const trailerKey = videos.results?.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer" &&
      Boolean(video.key),
  )?.key;

  return (
    <div>
      <InfoMovies movie={movie} trailerKey={trailerKey} />

      <div className="mx-auto max-w-6xl space-y-10 p-5 text-white">
        <TopCast cast={credits.cast} />

        <Trailer trailerKey={trailerKey} />

        {trailerKey && (
          <Suspense fallback="loading...">
            <FavoriteButton idMovie={movie.id} />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
