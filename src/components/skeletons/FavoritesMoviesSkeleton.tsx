import { Skeleton } from "../ui/skeleton"


const FavoritesMoviesSkeleton = () => {
  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="relative min-w-[160px] md:min-w-[230px] h-[260px] md:h-[300px] rounded-xl overflow-hidden"
          >
           
            <Skeleton className="w-full h-full rounded-xl" />

            {/* overlay title */}
            <div className="absolute bottom-0 w-full p-3">
              <Skeleton className="h-4 w-3/4 mx-auto" />
            </div>
          </div>
        ))}
      </div>
  )
}

export default FavoritesMoviesSkeleton