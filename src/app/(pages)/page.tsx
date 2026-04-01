import Hero from "../components/Hero";
import ActorPopular from "../components/ActorPopular";
import SectionDetailsMovies from "../components/SectionDetailsMovies";
import CategoriesMovies from "../components/CategoriesMovies";
import SectionCompany from "../components/SectionCompany";
import MoviesSection from "../components/MoviesSection";

export default function Home() {
  return (
    <>
      <Hero />
      <SectionCompany />
      <SectionDetailsMovies />
      <MoviesSection categories="now_playing" title="Trending Now" />
      <MoviesSection categories="upcoming" title="Upcoming" />
      <ActorPopular />
      <CategoriesMovies />
    </>
  );
}
