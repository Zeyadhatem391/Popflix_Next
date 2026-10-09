interface TrailerProps {
  trailerKey?: string;
}

export default function Trailer({ trailerKey }: TrailerProps) {
  if (!trailerKey) return null;

  return (
    <section id="movie-trailer" className="scroll-mt-24">
      <h2 className="mb-4 border-l-6 border-red-800 pl-2 text-xl font-semibold md:text-2xl">
        Official Trailer
      </h2>

      <div className="aspect-video w-full overflow-hidden rounded-lg">
        <iframe
          title="Official Trailer"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    </section>
  );
}
