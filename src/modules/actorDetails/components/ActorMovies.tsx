import MoviesCard from "@/shared/components/molecules/MoviesCard";
import { getMovieImage } from "@/lib/helpers/getMovieImage";
import { getActorMovies } from "@/modules/actors/api/getActorMovies";

interface ActorMoviesProps {
  moviesId: string;
}

const ActorMovies = async ({ moviesId }: ActorMoviesProps) => {
  const data = await getActorMovies(moviesId);

  const topMovies = data
    .filter(
      (movie): movie is typeof movie & {
        vote_average: number;
        title: string;
        poster_path: string | null;
        id: number;
      } =>
        movie.media_type === "movie" &&
        movie.vote_average != null &&
        movie.title != null,
    )
    .sort((a, b) => b.vote_average - a.vote_average);

  return (
    <section className="md:col-span-3 mt-10">
      <h2 className="text-2xl font-semibold mb-6">Best Movies</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {topMovies.map((movie) => (
          <MoviesCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            vote_average={movie.vote_average}
            image={getMovieImage(movie.poster_path)}
          />
        ))}
      </div>
    </section>
  );
};

export default ActorMovies;