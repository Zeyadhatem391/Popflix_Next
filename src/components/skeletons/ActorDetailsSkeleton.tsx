const ActorDetailsSkeleton = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10 animate-pulse">
      <div className="grid md:grid-cols-3 gap-8">

        {/* ===== Image Skeleton ===== */}
        <div className="flex justify-center">
          <div className="w-87.5 h-112.5 bg-zinc-800 rounded-2xl" />
        </div>

        {/* ===== Info Skeleton ===== */}
        <div className="md:col-span-2 space-y-6">

          {/* Name */}
          <div className="h-10 w-2/3 bg-zinc-800 rounded-lg" />

          {/* Personal Info Card */}
          <div className="bg-zinc-900 rounded-2xl p-6 space-y-6">
            
            <div className="h-6 w-1/3 bg-zinc-800 rounded" />

            <div className="space-y-4">
              <div>
                <div className="h-4 w-32 bg-zinc-800 rounded mb-2" />
                <div className="h-5 w-40 bg-zinc-800 rounded" />
              </div>

              <div>
                <div className="h-4 w-40 bg-zinc-800 rounded mb-2" />
                <div className="h-5 w-56 bg-zinc-800 rounded" />
              </div>

              <div>
                <div className="h-4 w-32 bg-zinc-800 rounded mb-2" />
                <div className="h-5 w-44 bg-zinc-800 rounded" />
              </div>
            </div>
          </div>

          {/* Biography */}
          <div className="bg-zinc-900 rounded-2xl p-6 space-y-3">
            <div className="h-6 w-40 bg-zinc-800 rounded" />

            <div className="space-y-2">
              <div className="h-4 bg-zinc-800 rounded" />
              <div className="h-4 bg-zinc-800 rounded" />
              <div className="h-4 bg-zinc-800 rounded w-5/6" />
              <div className="h-4 bg-zinc-800 rounded w-4/6" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ActorDetailsSkeleton;