import CategoryMovies from "./components/CategoryMovies";
import HeroMovies from "./components/HeroMovies";

const MoviesPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 ">
      <HeroMovies />
      <CategoryMovies genreId={28} title="Action" />
      <CategoryMovies genreId={18} title="Drama" />
      <CategoryMovies genreId={35} title="Comedy" />
      <CategoryMovies genreId={27} title="Horror" />
      <CategoryMovies genreId={10749} title="Romance" />
    </div>
  );
};

export default MoviesPage;
