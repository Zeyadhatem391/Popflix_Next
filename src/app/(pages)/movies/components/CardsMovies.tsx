import Image from "next/image";
import Link from "next/link";
import DefaultImage from "@/assets/images/default.png";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

type Movie = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
};

interface CardsMoviesProps {
  genreId: number;
}

const CardsMovies = async ({ genreId }: CardsMoviesProps) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=7b8da597ddda3922e0a74cec92c25b67&with_genres=${genreId}`,
    { next: { revalidate: 60 } },
  );

  if (!response.ok) {
    return <div>Failed to load movies</div>;
  }

  const data = await response.json();
  const movies: Movie[] = data?.results?.slice(0, 20) ?? [];
  return (
    <div className="flex gap-2.5 overflow-hidden">
      {[...movies].map((movie) => {
        const image = movie.backdrop_path
          ? IMAGE_BASE + movie.backdrop_path
          : movie.poster_path
            ? IMAGE_BASE + movie.poster_path
            : DefaultImage.src;

        return (
          <div
            key={movie.id}
            className="
              relative
              min-w-[50%]   
              sm:min-w-[45%] 
              md:min-w-50
              h-68
              rounded-xl
              overflow-hidden
              transition-transform
              hover:scale-105
            "
          >
            <Link
              href={`/movie/${movie.id}`}
              className="relative w-full h-full block"
            >
              <Image
                src={image}
                alt={movie.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 45vw, 200px"
                className="object-cover"
              />
              <div className="absolute bottom-0 w-full bg-linear-to-t from-black/80 to-transparent p-2 text-center">
                <h5 className="text-lg font-medium">{movie.title}</h5>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default CardsMovies;
