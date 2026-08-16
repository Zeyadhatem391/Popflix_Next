import PublicLayout from "@/shared/components/layout/PublicLayout";

import Hero from "../modules/home/components/organisms/Hero";
import ActorPopular from "../modules/home/components/organisms/ActorPopular";
import CategoriesMovies from "../modules/home/components/organisms/CategoriesMovies";
import MoviesSection from "../modules/home/components/organisms/MoviesSection";
import SectionCompany from "../modules/home/components/organisms/SectionCompany";

import SectionDetailsMovies from "@/modules/home/components/organisms/SectionDetailsMovies";
import Categories from "@/modules/home/components/organisms/Categories";

export default function Home() {
  return (
    <PublicLayout>
      <Hero />
      <SectionCompany />

      <SectionDetailsMovies />

      <MoviesSection title="Trending Now" />

      <MoviesSection title="Upcoming" hiddinVote={false} />

      <Categories />
      <ActorPopular />

      {/* <CategoriesMovies /> */}
    </PublicLayout>
  );
}
