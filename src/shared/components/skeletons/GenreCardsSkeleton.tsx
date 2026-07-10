import { Skeleton } from "@/components/ui/skeleton";

const GenreCardsSkeleton = () => {
  return (
    <section className="my-10 mx-7">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-5 pb-2">
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={index}
            className="relative w-full h-[260px] md:h-[300px] rounded-xl overflow-hidden"
          >
            <Skeleton className="w-full h-full rounded-xl" />

            <Skeleton className="absolute top-2 left-2 w-10 h-5 rounded-md" />

            <Skeleton className="absolute bottom-3 left-3 right-3 h-4 rounded-md" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default GenreCardsSkeleton;