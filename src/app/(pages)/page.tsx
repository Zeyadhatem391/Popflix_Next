import Hero from "../components/Hero";
import ActorPopular from "./components/ActorPopular";
import CategoriesMovies from "./components/CategoriesMovies";
import MoviesSection from "./components/MoviesSection";

export default function Home() {
  return (
    <>
      <Hero />
      <MoviesSection categories="now_playing" title="Trending Now" />
      <MoviesSection categories="upcoming" title="Upcoming" />
      <ActorPopular />
      <CategoriesMovies />
    </>
  );
}
