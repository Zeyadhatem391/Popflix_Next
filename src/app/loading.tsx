import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6 p-6">
      <Skeleton className="h-80 w-full rounded-xl" />

      <div className="space-y-3">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton
            key={index}
            className="aspect-[2/3] rounded-xl"
          />
        ))}
      </div>
    </div>
  );
}