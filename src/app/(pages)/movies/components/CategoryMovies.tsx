import CardsMovies from "./CardsMovies";
import Link from "next/link";

interface CategoryMoviesProps {
  genreId: number;
  title: string;
}

const genres: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  18: "Drama",
  14: "Fantasy",
  27: "Horror",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  53: "Thriller",
  99: "Documentary",
  10751: "Family",
  10752: "War",
  37: "Western",
  10770: "TVMovie",
  10402: "Music",
  36: "History",
};

const CategoryMovies = ({ genreId, title }: CategoryMoviesProps) => {
  const GenreUrl = genres[genreId] || "Movies";
  return (
    <section className="my-10  text-white overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>

        <Link
          href={`/genre/${GenreUrl}`}
          className="border border-white px-3 py-1.5 rounded-md text-sm hover:bg-white hover:text-black transition"
        >
          View More
        </Link>
      </div>

      <CardsMovies genreId={genreId} />
    </section>
  );
};

export default CategoryMovies;
