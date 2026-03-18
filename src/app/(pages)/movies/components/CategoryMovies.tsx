import TitleWithViewMore from "@/components/common/TitleWithViewMore";
import CardsMovies from "./CardsMovies";

interface CategoryMoviesProps {
  genreId: number ;
  title: string;
}

const CategoryMovies = ({ genreId, title }: CategoryMoviesProps) => {
  return (
    <section className="my-10  text-white overflow-hidden">
      <TitleWithViewMore genreId={genreId} title={title} ViewMore={true}/>

      <CardsMovies genreId={genreId} />
    </section>
  );
};

export default CategoryMovies;
