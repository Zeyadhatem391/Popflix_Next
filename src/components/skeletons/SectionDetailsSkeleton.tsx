const SectionDetailsSkeleton = () => {
  return (
    <section className="my-10 mx-7 animate-pulse">
      <div className="flex flex-col lg:flex-row gap-8 items-center">

        {/* Image Skeleton */}
        <div className="w-full lg:w-1/2">
          <div className="w-full h-[400px] lg:h-[500px] bg-gray-800 rounded-2xl" />
        </div>

        {/* Content Skeleton */}
        <div className="w-full lg:w-1/2 space-y-4">

          <div className="h-8 bg-gray-800 rounded w-2/3" />

          <div className="flex gap-2">
            <div className="h-4 w-20 bg-gray-700 rounded" />
            <div className="h-4 w-16 bg-gray-700 rounded" />
          </div>

          <div className="flex gap-2">
            <div className="h-6 w-16 bg-gray-700 rounded-full" />
            <div className="h-6 w-20 bg-gray-700 rounded-full" />
            <div className="h-6 w-14 bg-gray-700 rounded-full" />
          </div>

          <div className="h-4 bg-gray-800 rounded w-full" />
          <div className="h-4 bg-gray-800 rounded w-5/6" />
          <div className="h-4 bg-gray-800 rounded w-4/6" />

          <div className="flex gap-4 mt-4">
            <div className="h-10 w-32 bg-gray-700 rounded-xl" />
            <div className="h-10 w-32 bg-gray-700 rounded-xl" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default SectionDetailsSkeleton;