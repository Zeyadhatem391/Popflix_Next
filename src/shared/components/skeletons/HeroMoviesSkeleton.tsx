"use client";
import { Skeleton } from "@/components/ui/skeleton";

const HeroMoviesSkeleton = () => {
  return (
    <section className="py-6 space-y-4">
      {[0, 1].map((row) => (
        <div
          key={row}
          className="flex flex-col md:flex-row gap-4"
        >
          {/* Big Card Skeleton */}
          <Skeleton className="flex-1 h-56 md:h-140 rounded-lg" />

          {/* Small Grid Skeleton */}
          <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-4">
            {[0, 1, 2, 3].map((col) => (
              <Skeleton
                key={col}
                className="h-28 md:h-32 rounded-lg"
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default HeroMoviesSkeleton;