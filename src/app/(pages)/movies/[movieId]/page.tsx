import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";

import MovieDetails from "./MovieDetails";
import { getMovieDetails } from "@/modules/movieDetails/api/getMovieDetails";

type Props = {
  params: Promise<{
    movieId: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
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

export default async function Page({ params }: Props) {
  const { movieId } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["movie-details", movieId],
    queryFn: () => getMovieDetails(movieId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MovieDetails />
    </HydrationBoundary>
  );
}