"use client";

import { useEffect, useRef } from "react";
import useMovies from "@/hooks/Movies/useGetMovies";
import MoviesCard from "@/components/molecules/MoviesCard";
import { getMovieImage } from "@/app/lib/helpers/getMovieImage";

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
          const image = getMovieImage(movie.backdrop_path);

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
