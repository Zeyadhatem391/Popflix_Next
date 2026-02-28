import CardsMovies from "./CardsMovies";
import MoviesSlider from "./MoviesSlider";
import Link from "next/link";

interface CategoryMoviesProps {
  genreId: number;
  title: string;
}

const CategoryMovies = ({ genreId, title }: CategoryMoviesProps) => {
  return (
    <section className="my-10  text-white overflow-hidden">
      
  
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-semibold">
          {title}
        </h2>

        <Link
          href={`/genre/${genreId}`}
          className="border border-white px-3 py-1.5 rounded-md text-sm hover:bg-white hover:text-black transition"
        >
          View More
        </Link>
      </div>

    
      <MoviesSlider>
        <CardsMovies genreId={genreId} />
      </MoviesSlider>

    </section>
  );
};

export default CategoryMovies;