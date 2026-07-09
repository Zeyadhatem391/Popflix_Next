import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import MovieDetails from "./MovieDetails";
import { getMovieDetails } from "@/modules/movieDetails/api/getMovieDetails";
import { Metadata } from "next";
import { Suspense } from "react";
import MovieDetailsSkeleton from "@/shared/components/skeletons/MovieDetailsSkeleton";

type Props = {
  params: Promise<{
    movieId: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { movieId } = await params;

  const data = await getMovieDetails(movieId);

  const movie = data.movie;

  return {
    title: movie.title,
    description: movie.overview,
    openGraph: {
      title: movie.title,
      description: movie.overview,
      images: [`https://image.tmdb.org/t/p/original${movie.backdrop_path}`],
    },
  };
}

export default async function Page({ params }: Props) {
  const { movieId } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["movie-details", movieId],
    queryFn: () => getMovieDetails(movieId),
  });

  return (
    <Suspense fallback={<MovieDetailsSkeleton />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MovieDetails />
      </HydrationBoundary>
    </Suspense>
  );
}
