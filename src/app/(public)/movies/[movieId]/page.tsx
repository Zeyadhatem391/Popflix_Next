import { Suspense } from "react";
import { Metadata } from "next";

import MovieDetails from "./MovieDetails";
import MovieDetailsSkeleton from "@/shared/components/skeletons/MovieDetailsSkeleton";
import { getMovieDetails } from "@/modules/movieDetails/api/getMovieDetails";

type Props = {
  params: Promise<{
    movieId: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { movieId } = await params;

  const { movie } = await getMovieDetails(movieId);

  return {
    title: movie.title,
    description: movie.overview,
    openGraph: {
      title: movie.title,
      description: movie.overview,
      images: movie.backdrop_path
        ? [`https://image.tmdb.org/t/p/original${movie.backdrop_path}`]
        : [],
    },
  };
}

export default function Page(props: Props) {
  return (
    <Suspense fallback={<MovieDetailsSkeleton />}>
      <MovieContent {...props} />
    </Suspense>
  );
}

async function MovieContent({ params }: Props) {
  const { movieId } = await params;

  return <MovieDetails movieId={movieId} />;
}
