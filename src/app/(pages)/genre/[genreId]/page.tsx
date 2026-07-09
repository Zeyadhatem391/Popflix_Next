import { Suspense } from "react";
import GenrePageContent from "@/modules/genre/components/GenrePageContent";
import GenreCardsSkeleton from "@/shared/components/skeletons/GenreCardsSkeleton";

export default function Page() {
  return (
    <Suspense fallback={<GenreCardsSkeleton />}>
      <GenrePageContent />
    </Suspense>
  );
}