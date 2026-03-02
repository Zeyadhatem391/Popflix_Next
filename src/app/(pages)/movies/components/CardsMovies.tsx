"use client";

import Image from "next/image";
import Link from "next/link";
import DefaultImage from "@/assets/images/default.png";
import { useEffect, useRef, useState } from "react";

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

const CardsMovies = ({ genreId }: CardsMoviesProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=7b8da597ddda3922e0a74cec92c25b67&with_genres=${genreId}`
      );

      const data = await res.json();
      setMovies(data?.results?.slice(0, 20) || []);
    };

    getMovies();
  }, [genreId]);

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    let frameId: number;

    const scroll = () => {
      const slider = sliderRef.current;
      if (!slider) return;

      slider.scrollLeft += 2.2;

   
      if (slider.scrollLeft >= slider.scrollWidth / 2) {
        slider.scrollLeft -= slider.scrollWidth / 2;
      }

      frameId = requestAnimationFrame(scroll);
    };

    frameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(frameId);
  }, []);

  const loopMovies = [...movies, ...movies];

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={sliderRef}
        className="
          flex
          gap-2.5
          overflow-x-hidden
          overflow-y-hidden
          w-full
          no-scrollbar
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
                overflow-hidden
                transition-transform
                md:hover:scale-105
                shrink-0
              "
            >
              <Link
                href={`/movies/${movie.id}`}
                className="relative w-full h-full block"
              >
                <Image
                  src={image}
                  alt={movie.title}
                  fill
                  sizes="(max-width:640px) 50vw,
                         (max-width:768px) 45vw,
                         200px"
                  className="object-cover"
                />

                <div className="absolute bottom-0 w-full bg-linear-to-t from-black/80 to-transparent p-2 text-center">
                  <h5 className="text-lg font-medium">
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