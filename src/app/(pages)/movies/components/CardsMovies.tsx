"use client";

import DefaultImage from "@/assets/images/default.png";
import { useEffect, useRef } from "react";
import useMovies from "@/hooks/Movies/useGetMovies";
import MoviesCard from "@/components/molecules/MoviesCard";

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
            <MoviesCard
              key={`${movie.id}-${index}`}
              id={movie.id}
              title={movie.title}
              vote_average={movie.vote_average}
              hiddinName={true}
              image={image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CardsMovies;
