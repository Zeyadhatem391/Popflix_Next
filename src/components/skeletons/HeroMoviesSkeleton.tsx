"use client";

import { Skeleton } from "@/components/ui/skeleton";

const HeroMoviesSkeleton = () => {
  const rows = [1, 2];

  return (
    <section className="py-6">
      <div className="space-y-0">
        {rows.map((_, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row h-auto md:h-140"
          >
            {index % 2 === 0 && <BigSkeleton />}

            <SmallGridSkeleton />

            {index % 2 !== 0 && <BigSkeleton />}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroMoviesSkeleton;

/* ========= BIG ========= */

const BigSkeleton = () => {
  return (
    <div className="flex-1 relative overflow-hidden">
      <Skeleton className="w-full h-full rounded-none" />

      <div className="absolute inset-0 flex flex-col justify-center items-center gap-4">
        <Skeleton className="h-8 w-60" />
        <Skeleton className="h-4 w-96" />
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>
    </div>
  );
};

/* ========= SMALL GRID ========= */

const SmallGridSkeleton = () => {
  return (
    <div className="flex-1 grid grid-cols-2 grid-rows-2">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="relative">
          <Skeleton className="w-full h-full rounded-none" />

          <div className="absolute inset-0 flex flex-col justify-center items-center gap-3">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
};