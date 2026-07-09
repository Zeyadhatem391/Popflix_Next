import TitleWithViewMore from "@/components/common/TitleWithViewMore";
import MoviesCard from "@/components/molecules/MoviesCard";
import { getMovieImage } from "@/app/lib/helpers/getMovieImage";
import { getMovies } from "../../api/getMovies";

type MoviesSectionPropes = {
  title: string;
  hiddinVote?: boolean;
};

const MoviesSection = async ({ title, hiddinVote }: MoviesSectionPropes) => {
  const DataMovies = await getMovies();

  const MoviesNow = DataMovies.moviesNow;
  const MoviesUpcoming = DataMovies.moviesUpcoming;

  const movies = title === "Upcoming" ? MoviesUpcoming : MoviesNow;

  return (
    <section className="my-10 mx-7">
      <TitleWithViewMore
        genreId={1}
        title={title}
        Url="actors"
        ViewMore={false}
        margin={true}
      />

      <div className="flex lg:justify-center gap-5 overflow-x-auto no-scrollbar pb-2">
        {movies.results.map((movie) => {
          const movieImage = getMovieImage(movie.poster_path);
          return (
            <MoviesCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              vote_average={movie.vote_average}
              hiddinVote={hiddinVote}
              image={movieImage}
            />
          );
        })}
      </div>
    </section>
  );
};

export default MoviesSection;
