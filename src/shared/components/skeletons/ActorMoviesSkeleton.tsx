const ActorMoviesSkeleton = () => {
  const dummy = Array.from({ length: 8 });

  return (
    <section className="md:col-span-3 mt-10 animate-pulse">
      <h2 className="text-2xl font-semibold mb-6 bg-zinc-800 h-8 w-32 rounded"></h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {dummy.map((_, idx) => (
          <div key={idx} className="bg-zinc-800 rounded-xl h-[280px] shadow-md" />
        ))}
      </div>
    </section>
  );
};

export default ActorMoviesSkeleton;