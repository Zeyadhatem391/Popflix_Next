"use client";

import Image from "next/image";
import Link from "next/link";
import DefaultImage from "@/assets/images/default.png";
import { useEffect, useRef } from "react";
import useMovies from "@/hooks/useGetMovies";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

interface CardsMoviesProps {
  genreId: number;
}

const CardsMovies = ({ genreId }: CardsMoviesProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const { data: movies = [], isLoading } = useMovies(genreId);

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    if (!movies.length) return;

    let frameId: number;

    const scroll = () => {
      const slider = sliderRef.current;
      if (!slider) return;

      slider.scrollLeft += 0.7;

      /* infinite loop */
      if (slider.scrollLeft >= slider.scrollWidth / 2) {
        slider.scrollLeft = 0;
      }

      frameId = requestAnimationFrame(scroll);
    };

    frameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(frameId);
  }, [movies]);

  /* duplicate movies for infinite scroll */
  const loopMovies = [...movies, ...movies];

  if (isLoading) {
    return <div className="h-68 w-full" />;
  }

  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <div
        ref={sliderRef}
        className="
          flex
          gap-2.5
          overflow-x-auto no-scrollbar
          w-full
         
        "
      >
        {loopMovies.map((movie, index) => {
          const image = movie.backdrop_path
            ? IMAGE_BASE + movie.backdrop_path
            : movie.poster_path
              ? IMAGE_BASE + movie.poster_path
              : DefaultImage.src;

          return (
            <div
              key={`${movie.id}-${index}`}
              className="
                relative
                min-w-[49%]
                sm:min-w-[45%]
                md:min-w-50
                h-68
                rounded-xl
                overflow-hidden group
                shrink-0
                transition-transform
                md:hover:scale-105
              "
            >
              <Link
                href={`/movies/${movie.id}`}
                className="relative block w-full h-full"
              >
                <Image
                  src={image}
                  alt={movie.title}
                  fill
                  sizes="
                    (max-width:640px) 50vw,
                    (max-width:768px) 45vw,
                    200px
                  "
                  className="object-cover"
                />

                <div className="absolute bottom-0 w-full bg-linear-to-t from-black/80 to-transparent p-2 text-center">
                  <h5 className="text-sm md:text-lg font-medium">
                    {movie.title}
                  </h5>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardsMovies;
