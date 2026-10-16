import PublicLayout from "@/shared/components/layout/PublicLayout";

import Hero from "../modules/home/components/organisms/Hero";
import ActorPopular from "../modules/home/components/organisms/ActorPopular";
import MoviesSection from "../modules/home/components/organisms/MoviesSection";
import SectionCompany from "../modules/home/components/organisms/SectionCompany";
import SectionDetailsMovies from "@/modules/home/components/organisms/SectionDetailsMovies";
import Categories from "@/modules/home/components/organisms/Categories";
import HeroVideo from "@/modules/home/components/organisms/HeroVideo";

export default function Home() {
  return (
    <PublicLayout>
      {/* <Hero /> */}
      <HeroVideo />
      <SectionCompany />

      <main className="mx-auto w-full max-w-6xl space-y-12 px-4 sm:px-6 lg:px-8">
        <SectionDetailsMovies />

        <MoviesSection title="Trending Now" />

        <MoviesSection title="Upcoming" hiddinVote={false} />

        <Categories />

        <ActorPopular />
      </main>
    </PublicLayout>
  );
}
