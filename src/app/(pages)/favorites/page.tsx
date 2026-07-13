import { Suspense } from "react";
import FavoritesMoviesSkeleton from "@/shared/components/skeletons/FavoritesMoviesSkeleton";
import FavoritesPageContent from "@/modules/favorites/components/FavoritesPageContent";

export default function Page() {
  return (
    <Suspense fallback={<FavoritesMoviesSkeleton />}>
      <FavoritesPageContent />
    </Suspense>
  );
}
