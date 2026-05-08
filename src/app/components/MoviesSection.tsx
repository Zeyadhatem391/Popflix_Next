import DefaultImage from "@/assets/images/default.png";
import TitleWithViewMore from "@/components/common/TitleWithViewMore";
import MoviesCard from "@/components/molecules/MoviesCard";
import { Movie } from "@/lib/types/Movie";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

type MoviesSectionPropes = {
  title: string;
  categories: string;
  hiddinVote?:boolean;
};

const getMovies = async (categories: string): Promise<Movie[]> => {
  const regionQuery = categories === "upcoming" ? "&region=US" : "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/3/movie/${categories}?api_key=${process.env.NEXT_PUBLIC_API_KEY}${regionQuery}`,
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

const MoviesSection = async ({ title, categories,hiddinVote }: MoviesSectionPropes) => {
  const movies = await getMovies(categories);

  return (
    <section className="my-10 mx-7">
      {/* Title */}
      <TitleWithViewMore
        genreId={1}
        title={title}
        Url="actors"
        ViewMore={false}
        margin={true}
      />

      {/* Movies Row */}
      <div className="flex lg:justify-center gap-5 overflow-x-auto no-scrollbar pb-2">
        {movies.map((movie) => {
          const movieImage = movie.poster_path
            ? IMAGE_BASE + movie.poster_path
            : DefaultImage.src;

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
