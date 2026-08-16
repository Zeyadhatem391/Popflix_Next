import { Suspense } from "react";

import HeroMoviesSkeleton from "@/shared/components/skeletons/HeroMoviesSkeleton";
import CategoryPageContent from "@/modules/category/components/CategoryPageContent";

export default function Page() {
  return (
    <Suspense fallback={<HeroMoviesSkeleton />}>
      <CategoryPageContent />
    </Suspense>
  );
}
