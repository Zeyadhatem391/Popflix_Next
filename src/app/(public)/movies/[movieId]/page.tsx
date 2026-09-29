import { Suspense } from "react";

import MovieDetailsSkeleton from "@/shared/components/skeletons/MovieDetailsSkeleton";
import MovieDetails from "@/modules/movieDetails/components/MovieDetails";

type Props = {
  params: Promise<{
    movieId: string;
  }>;
};

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
