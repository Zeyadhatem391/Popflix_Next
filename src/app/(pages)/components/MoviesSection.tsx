import DefaultImage from "@/assets/images/default.png";
import TitleWithViewMore from "@/components/common/TitleWithViewMore";
import { Movie } from "@/lib/types/Movie";
import Image from "next/image";
import Link from "next/link";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

type MoviesSectionPropes = {
  title: string;
  categories: string;
};

const getMovies = async (categories: string): Promise<Movie[]> => {
  const regionQuery = categories === "upcoming" ? "&region=US" : "";

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${categories}?api_key=${process.env.NEXT_PUBLIC_API_KEY}${regionQuery}`,
    {
      next: { revalidate: 60 },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await res.json();
  return data.results.slice(0, 5);
};

const MoviesSection = async ({ title, categories }: MoviesSectionPropes) => {
  const movies = await getMovies(categories);

  return (
    <section className="my-10 mx-7">
      {/* Title */}
      <TitleWithViewMore genreId={1} title={title} Url="actors" ViewMore={false}/>

      {/* Movies Row */}
      <div className="flex lg:justify-center gap-5 overflow-x-auto no-scrollbar pb-2">
        {movies.map((movie) => {
          const movieImage = movie.poster_path
            ? IMAGE_BASE + movie.poster_path
            : DefaultImage.src;

          return (
            <div
              key={movie.id}
              className="relative min-w-[160px] md:min-w-[230px] h-[260px] md:h-[300px]
              rounded-xl overflow-hidden group
              transition-transform duration-300 hover:scale-105"
            >
              <Link
                href={`/movies/${movie.id}`}
                className="block w-full h-full relative"
              >
                {/* Movie Image */}
                <Image
                  src={movieImage}
                  alt={movie.title}
                  fill
                  sizes="(max-width:768px) 50vw, 200px"
                  className="object-cover"
                />

                {/* Rating */}
                {categories !== "upcoming" && movie.vote_average && (
                  <span className="absolute top-2 left-2 bg-black/70 text-yellow-400 text-xs font-semibold px-2 py-1 rounded-md">
                    ⭐ {movie.vote_average.toFixed(1)}
                  </span>
                )}

                {/* Gradient + Title */}
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3">
                  <h5 className="text-lg md:text-base font-medium text-center line-clamp-2">
                    {movie.title}
                  </h5>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MoviesSection;
