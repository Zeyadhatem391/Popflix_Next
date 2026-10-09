import TitleWithViewMore from "@/shared/components/common/TitleWithViewMore";
import { getMovieImage } from "@/lib/helpers/getMovieImage";
import { getMovies } from "../../api/getMovies";
import HoverPrefetchLink from "@/shared/components/hover-prefetch/HoverPrefetchLink";
import Image from "next/image";

type MoviesSectionPropes = {
  title: string;
  hiddinVote?: boolean;
};

const MoviesSection = async ({
  title,
  hiddinVote = true,
}: MoviesSectionPropes) => {
  const DataMovies = await getMovies();

  const MoviesNow = DataMovies.moviesNow;
  const MoviesUpcoming = DataMovies.moviesUpcoming;

  const movies = title === "Upcoming" ? MoviesUpcoming : MoviesNow;

  return (
    <section className="w-full min-w-0">
      <TitleWithViewMore
        genreId={1}
        title={title}
        Url="actors"
        ViewMore={false}
        margin={false}
      />

      <div className="w-full min-w-0 overflow-x-auto pb-4 no-scrollbar">
        <div className="flex w-max gap-4">
          {movies.results.slice(0, 20).map((movie) => {
            const movieImage = getMovieImage(movie.poster_path);

            return (
              <div
                key={movie.id}
                className="w-[145px] shrink-0 sm:w-[185px] lg:w-[205px]"
              >
                <HoverPrefetchLink href={`/movies/${movie.id}`}>
                  <div className="relative h-[220px] w-full overflow-hidden rounded-lg sm:h-[280px] lg:h-[320px]">
                    <Image
                      src={movieImage}
                      alt={movie.title || "Movie poster"}
                      fill
                      sizes="(max-width: 640px) 145px, (max-width: 1024px) 185px, 200px"
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />

                    {hiddinVote && movie.vote_average > 0 && (
                      <span className="absolute left-2 top-2 rounded-md bg-black/70 px-2 py-1 text-xs font-semibold text-yellow-400">
                        ⭐ {movie.vote_average.toFixed(1)}
                      </span>
                    )}
                  </div>
                </HoverPrefetchLink>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MoviesSection;
