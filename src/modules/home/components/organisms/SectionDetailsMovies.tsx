import Image from "next/image";
import Link from "next/link";

import FavoriteButton from "@/modules/movieDetails/components/FavoriteButton";
import { getMovieImage } from "@/lib/helpers/getMovieImage";
import { getHeroMovies } from "@/modules/movies/api/getHeroMovies";
import { Suspense } from "react";

const genresMap: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  18: "Drama",
  14: "Fantasy",
  27: "Horror",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  53: "Thriller",
  99: "Documentary",
  10751: "Family",
  10752: "War",
  37: "Western",
  10770: "TV Movie",
  10402: "Music",
  36: "History",
};

const SectionDetailsMovies = async () => {
  const movies = await getHeroMovies();

  if (movies.length === 0) {
    return null;
  }

  const movie = movies[4];

  const movieImage = getMovieImage(movie.backdrop_path);

  const rating =
    movie.vote_average === 0 ? 3.2 : Number(movie.vote_average.toFixed(1));

  return (
    <section className="my-10 mx-7">
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        <div className="w-full lg:w-1/2">
          <Link
            href={`/movies/${movie.id}`}
            className="relative group overflow-hidden block rounded-2xl"
          >
            <Image
              src={movieImage}
              alt={movie.title || "movie"}
              width={1920}
              height={1080}
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="w-full h-[400px] lg:h-[500px] object-cover transition duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300" />
          </Link>
        </div>

        <div className="w-full lg:w-1/2 text-white space-y-4">
          <h3 className="text-3xl lg:text-4xl font-bold">{movie.title}</h3>

          <div className="flex flex-wrap gap-3 text-sm text-gray-300">
            {movie.release_date && <span>📅 {movie.release_date}</span>}

            {movie.original_language && (
              <span>🌐 {movie.original_language.toUpperCase()}</span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {movie.genre_ids?.slice(0, 4).map((id) => (
              <span
                key={id}
                className="px-3 py-1 bg-white/10 rounded-full text-sm"
              >
                {genresMap[id] ?? "Genre"}
              </span>
            ))}
          </div>

          <p className="text-yellow-400 text-lg">⭐ {rating} / 10</p>

          <p className="text-gray-300 leading-relaxed pr-0 md:pr-10">
            {movie.overview?.slice(0, 350)}
            {movie.overview && movie.overview.length > 350 ? "..." : ""}
          </p>

          <div className="flex gap-4 mt-4">
            <Link
              href={`/movies/${movie.id}`}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-semibold transition"
            >
              ▶ Watch Now
            </Link>

            <Suspense fallback="login..">
              <FavoriteButton idMovie={movie.id} />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionDetailsMovies;
