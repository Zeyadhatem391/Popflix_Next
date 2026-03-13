import CategoryMovies from "./components/CategoryMovies";
import HeroMovies from "./components/HeroMovies";

const MoviesPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 ">
      <HeroMovies />
      <CategoryMovies genreId={28} title="Action" />
      <CategoryMovies genreId={10752} title="War" />
      <CategoryMovies genreId={37} title="Western" />
      <CategoryMovies genreId={36} title="History" />
      <CategoryMovies genreId={16} title="Animation" />
      <CategoryMovies genreId={18} title="Drama" />
      <CategoryMovies genreId={35} title="Comedy" />
      <CategoryMovies genreId={27} title="Horror" />
      <CategoryMovies genreId={14} title="Fantasy" />
      <CategoryMovies genreId={9648} title="Mystery" />
      <CategoryMovies genreId={99} title="Documentary" />
    </div>
  );
};

export default MoviesPage;
