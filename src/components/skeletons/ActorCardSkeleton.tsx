"use client";

type ActorCardSkeletonProps = {
  count?: number; 
};

const ActorCardSkeleton = ({ count = 10 }: ActorCardSkeletonProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="flex flex-col items-center gap-2">
          <div className="w-32 h-40 rounded-xl bg-gray-300 animate-pulse shadow-md"></div>
          <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
        </div>
      ))}
    </div>
  );
};

export default ActorCardSkeleton;