"use client";
import { Skeleton } from "@/components/ui/skeleton";

const CategoriesMoviesSkeleton = () => {
  return (
    <section className="my-10 mx-7">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-6 w-48 rounded-md" />
      </div>

      <div className="flex lg:grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 overflow-x-auto lg:overflow-visible no-scrollbar">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="flex-shrink-0 w-72 lg:w-auto">
            <Skeleton className="rounded-xl h-44 w-full mb-3" />
            <Skeleton className="h-6 w-32 rounded-md" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesMoviesSkeleton;