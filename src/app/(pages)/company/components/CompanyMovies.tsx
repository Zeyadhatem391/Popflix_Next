"use client";
import Image from "next/image";
import Link from "next/link";
import DefaultImage from "@/assets/images/default.png";
import ActorMoviesSkeleton from "@/components/skeletons/ActorMoviesSkeleton";
import useGetMoviesCompany from "@/hooks/Company/useGetMoviesCompany";
import MoviesCard from "@/components/molecules/MoviesCard";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

interface CompanyMoviesProps {
  id: string;
}

const CompanyMovies = ({ id }: CompanyMoviesProps) => {
  const companyId = Number(id);
  const { data, isLoading } = useGetMoviesCompany(companyId);

  if (isLoading) return <ActorMoviesSkeleton />;

  if (!data || data.length === 0)
    return (
      <div className="text-gray-400 text-center py-6">No movies found</div>
    );

  const topMovies = [...data]
    .filter((movie) => movie.vote_average !== undefined)
    .sort((a, b) => b.vote_average - a.vote_average);

  return (
    <section className="md:col-span-3 mt-10">
      <h2 className="text-2xl font-semibold mb-6">Best movies</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {topMovies.map((movie) => {
          const movieImage = movie.poster_path
            ? IMAGE_BASE + movie.poster_path
            : DefaultImage.src;

          return (
            <MoviesCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              vote_average={movie.vote_average}
              image={movieImage}
            />
          );
        })}
      </div>
    </section>
  );
};

export default CompanyMovies;
