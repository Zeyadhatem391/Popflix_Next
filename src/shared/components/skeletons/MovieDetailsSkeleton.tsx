import { Skeleton } from "@/components/ui/skeleton";

const MovieDetailsSkeleton = () => {
  return (
    <div className="max-w-5xl mx-auto p-5 space-y-6">
      {/* Title */}
      <Skeleton className="h-10 w-2/3" />

      {/* Trailer / Poster */}
      <Skeleton className="w-full h-125 rounded-lg" />

      {/* Rating + Button */}
      <div className="flex gap-5">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-10 w-40 rounded-md" />
      </div>

      {/* Overview */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>

      {/* Info Box */}
      <div className="bg-zinc-800 p-4 rounded-lg space-y-3">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-5 w-1/2" />

        <div className="flex gap-2">
          <Skeleton className="h-7 w-20 rounded-md" />
          <Skeleton className="h-7 w-20 rounded-md" />
          <Skeleton className="h-7 w-20 rounded-md" />
        </div>
      </div>

      {/* Cast Title */}
      <Skeleton className="h-8 w-40" />

      {/* Cast Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-zinc-800 rounded-lg flex items-center p-3 gap-3"
          >
            <Skeleton className="w-15 h-22.5 rounded" />

            <div className="space-y-2 w-full">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetailsSkeleton;