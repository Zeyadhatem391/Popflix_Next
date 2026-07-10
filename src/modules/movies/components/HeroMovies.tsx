import Image from "next/image";
import Link from "next/link";

import {
  getHeroMovies,
  type HeroMovie,
} from "@/modules/movies/api/getHeroMovies";
import { getMovieImage } from "@/lib/helpers/getMovieImage";

export default async function HeroMovies() {
  const movies = await getHeroMovies();

  const rows: {
    big: HeroMovie;
    smalls: HeroMovie[];
  }[] = [];
  for (let i = 0; i < movies.length; i += 5) {
    const big = movies[i];
    const smalls = movies.slice(i + 1, i + 5);

    if (big && smalls.length === 4) {
      rows.push({ big, smalls });
    }
  }

  return (
    <section className="py-6 mt-2">
      <div className="space-y-0">
        {rows.map((row, index) => (
          <div
            key={row.big.id}
            className="flex flex-col md:flex-row h-auto md:h-[560px]"
          >
            {index % 2 === 0 && (
              <BigCard movie={row.big} priority={index === 0} />
            )}

            <SmallGrid movies={row.smalls} priority={index === 0} />

            {index % 2 !== 0 && <BigCard movie={row.big} priority={false} />}
          </div>
        ))}
      </div>
    </section>
  );
}

function BigCard({ movie, priority }: { movie: HeroMovie; priority: boolean }) {
  const image = getMovieImage(movie.backdrop_path);

  return (
    <Link
      href={`/movies/${movie.id}`}
      className="relative flex-1 overflow-hidden group block"
    >
      <Image
        src={image}
        alt={movie.title || "movies"}
        width={1920}
        height={1080}
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="w-full h-full object-cover scale-105 group-hover:scale-110 transition duration-500"
      />

      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-center text-center p-6">
        <h3 className="text-2xl font-bold text-white">{movie.title}</h3>

        <p className="text-lg text-gray-200 mt-3 max-w-lg">
          {movie.overview?.slice(0, 120)}
        </p>
      </div>
    </Link>
  );
}

function SmallGrid({
  movies,
  priority,
}: {
  movies: HeroMovie[];
  priority: boolean;
}) {
  return (
    <div className="flex-1 grid grid-cols-2 grid-rows-2">
      {movies.map((movie, index) => {
        const image = getMovieImage(movie.poster_path);

        return (
          <Link
            key={movie.id}
            href={`/movies/${movie.id}`}
            className="relative overflow-hidden group block"
          >
            <Image
              src={image}
              alt={movie.title || "movies"}
              width={500}
              height={750}
              priority={priority && index < 2}
              fetchPriority={priority && index < 2 ? "high" : "auto"}
              sizes="(max-width:768px) 50vw, 25vw"
              className="w-full h-full object-cover scale-105 group-hover:scale-110 transition duration-500"
            />

            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-300 flex justify-center items-center text-center">
              <h5 className="text-lg text-white font-semibold px-2">
                {movie.title}
              </h5>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
