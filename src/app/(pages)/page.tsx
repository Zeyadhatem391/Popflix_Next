import Hero from "../components/Hero";
import ActorPopular from "./components/ActorPopular";
import CategoriesMovies from "./components/CategoriesMovies";
import MoviesSection from "./components/MoviesSection";
import SectionCompany from "./components/SectionCompany";
import SectionDetailsMovies from "./components/SectionDetailsMovies";

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
