"use client";
import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/lib/types/Movie";
import DefaultImage from "@/assets/images/default.png";
import { useGetHeroMovies } from "@/hooks/Movies/useGetHeroMovies";
import HeroMoviesSkeleton from "@/components/skeletons/HeroMoviesSkeleton";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

const HeroMovies = () => {
  const { data: movies, isLoading, isError } = useGetHeroMovies();

  if (isLoading) return <HeroMoviesSkeleton />;
  if (isError || !movies) return <p>error</p>;

  const rows: { big: Movie; smalls: Movie[] }[] = [];

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
            key={index}
            className="flex flex-col md:flex-row h-auto md:h-140"
          >
            {index % 2 === 0 && <BigCard movie={row.big} />}
            <SmallGrid movies={row.smalls} />
            {index % 2 !== 0 && <BigCard movie={row.big} />}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroMovies;

/* ================= BIG CARD ================= */
const BigCard = ({ movie }: { movie: Movie }) => {
  const image = movie.backdrop_path
    ? IMAGE_BASE + movie.backdrop_path
    : DefaultImage.src;

  return (
    <Link
      href={`/movies/${movie.id}`}
      className="relative flex-1 group overflow-hidden block"
    >
      <Image
        src={image}
        alt={movie.title}
        width={1920}
        height={1080}
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
};

/* ================= SMALL GRID ================= */
const SmallGrid = ({ movies }: { movies: Movie[] }) => {
  return (
    <div className="flex-1 grid grid-cols-2 grid-rows-2 ">
      {movies.map((movie) => {
        const image = movie.poster_path
          ? IMAGE_BASE + movie.poster_path
          : DefaultImage.src;

        return (
          <Link
            key={movie.id}
            href={`/movies/${movie.id}`}
            className="relative group overflow-hidden block"
          >
            <Image
              src={image}
              alt={movie.title}
              width={500}
              height={750}
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
};
