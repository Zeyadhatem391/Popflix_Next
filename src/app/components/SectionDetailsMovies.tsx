"use client";
import Image from "next/image";
import Link from "next/link";

import DefaultImage from "@/assets/images/default.png";
import { useGetHeroMovies } from "@/hooks/Movies/useGetHeroMovies";
import FavoriteButton from "../(pages)/movies/components/FavoriteButton";
import SectionDetailsSkeleton from "@/components/skeletons/SectionDetailsSkeleton";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

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
  10770: "TVMovie",
  10402: "Music",
  36: "History",
};

const SectionDetailsMovies = () => {
  const { data: movies, isLoading, isError, refetch } = useGetHeroMovies();

  if (isLoading) return <SectionDetailsSkeleton />;

  if (isError)
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-lg text-red-500 font-medium text-center">
          Something went wrong while fetching movies 😢
        </p>

        <button
          onClick={() => refetch()}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-md transition text-white"
        >
          Try Again
        </button>
      </div>
    );

  const movie = movies?.[0];
  if (!movie) return null;
  
  const image =
    movie.backdrop_path && movie.backdrop_path !== "null"
      ? IMAGE_BASE + movie.backdrop_path
      : DefaultImage.src;

  return (
    <section className="my-10 mx-7">
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        <div className="w-full lg:w-1/2">
          <Link
            href={`/movies/${movie.id}`}
            className="relative group overflow-hidden block rounded-2xl"
          >
            <Image
              src={image}
              alt={movie.title}
              width={1920}
              height={1080}
              className="w-full h-[400px] lg:h-[500px] object-cover transition duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300" />
          </Link>
        </div>

        {/* 📝 RIGHT */}
        <div className="w-full lg:w-1/2 text-white space-y-4">
          {/* Title */}
          <h3 className="text-3xl lg:text-4xl font-bold">{movie.title}</h3>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-3 text-sm text-gray-300">
            <span>📅 {movie.release_date}</span>
            <span>🌐 {movie.original_language.toUpperCase()}</span>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {movie.genre_ids?.slice(0, 4).map((id: number) => (
              <span
                key={id}
                className="px-3 py-1 bg-white/10 rounded-full text-sm"
              >
                {genresMap[id] || "Genre"}
              </span>
            ))}
          </div>

          {/* Rating */}
          <p className="text-yellow-400 text-lg">
            ⭐ {movie.vote_average.toFixed(1)} / 10
          </p>

          {/* Overview */}
          <p className="text-gray-300 leading-relaxed pr-0 md:pr-10">
            {movie.overview?.slice(0, 350)}...
          </p>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <Link
              href={`/movies/${movie.id}`}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-semibold transition"
            >
              ▶ Watch Now
            </Link>

            <FavoriteButton idMovie={movie.id} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionDetailsMovies;
