import { getMovieImage } from "@/lib/helpers/getMovieImage";
import MoviesCard from "@/shared/components/molecules/MoviesCard";
import { getMovies } from "../api/getMovies";

interface CardsMoviesProps {
  genreId: number;
}

const CardsMovies = async ({ genreId }: CardsMoviesProps) => {
  const movies = await getMovies(genreId);

  return (
    <div className="overflow-hidden">
      <div className="marquee-track flex w-max gap-2.5">
        {movies.map((movie) => (
          <div key={movie.id} className="shrink-0">
            <MoviesCard
              id={movie.id}
              title={movie.title}
              vote_average={movie.vote_average}
              hiddinName={true}
              image={getMovieImage(movie.backdrop_path)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsMovies;