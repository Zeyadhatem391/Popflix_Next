"use client";
import Image from "next/image";
import Link from "next/link";
import DefaultImage from "@/assets/images/default.png";
import ActorMoviesSkeleton from "@/components/skeletons/ActorMoviesSkeleton";
import useGetMoviesCompany from "@/hooks/Company/useGetMoviesCompany";

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
            <Link href={`/movies/${movie.id}`} key={movie.id} className="group">
              <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 relative">
                {/* Image */}
                <div className="relative w-full h-[320px]">
                  <Image
                    src={movieImage}
                    alt={movie.title || "Movie Poster"}
                    fill
                    sizes="(max-width:768px) 50vw, 25vw"
                    className="object-fill group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Rating */}
                  {movie.vote_average !== undefined && (
                    <span className="absolute top-2 left-2 bg-black bg-opacity-70 text-yellow-400 text-xs font-semibold px-2 py-1 rounded-md shadow">
                      ⭐ {movie.vote_average.toFixed(1)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CompanyMovies;
