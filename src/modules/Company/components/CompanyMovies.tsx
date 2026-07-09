import MoviesCard from "@/shared/components/molecules/MoviesCard";
import { getMovieImage } from "@/lib/helpers/getMovieImage";
import { GetMoviesCompany } from "../api/GetMoviesCompany";

interface CompanyMoviesProps {
  id: string;
}

const CompanyMovies = async ({ id }: CompanyMoviesProps) => {
  const company = (await GetMoviesCompany(Number(id)))?.results ?? [];

  if (company.length === 0) {
    return (
      <div className="text-gray-400 text-center py-6">No movies found</div>
    );
  }

  return (
    <section className="md:col-span-3 mt-10">
      <h2 className="text-2xl font-semibold mb-6">Best movies</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {company.map((movie) => (
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

export default CompanyMovies;
