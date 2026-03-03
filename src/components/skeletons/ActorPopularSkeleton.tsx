"use client";

const ActorPopularSkeleton = () => {
  return (
    <section className="mt-10 mx-5 animate-pulse">
      
      {/* Title Skeleton */}
      <div className="h-6 w-48 bg-zinc-800 rounded mb-8 ml-8"></div>

      {/* Actors Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-5">
        
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center"
          >
            {/* Circle Image */}
            <div className="w-40 h-40 rounded-full bg-zinc-800"></div>

            {/* Name */}
            <div className="h-4 w-24 bg-zinc-800 rounded mt-4"></div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default ActorPopularSkeleton;