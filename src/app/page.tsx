import { Suspense } from "react";

import PublicLayout from "@/shared/components/layout/PublicLayout";

import Hero from "./components/Hero";
import ActorPopular from "./components/ActorPopular";
import CategoriesMovies from "./components/CategoriesMovies";
import MoviesSection from "../modules/home/components/organisms/MoviesSection";
import SectionCompany from "../modules/home/components/organisms/SectionCompany";
import SectionDetailsMovies from "./components/SectionDetailsMovies";

import SectionDetailsSkeleton from "@/components/skeletons/SectionDetailsSkeleton";
import ActorPopularSkeleton from "@/components/skeletons/ActorPopularSkeleton";
import CategoriesMoviesSkeleton from "@/components/skeletons/CategoriesMoviesSkeleton";

export default function Home() {
  return (
    <PublicLayout>
      <Hero />
      <SectionCompany />

      <Suspense fallback={<SectionDetailsSkeleton />}>
        <SectionDetailsMovies />
      </Suspense>

      <MoviesSection title="Trending Now" />

      <MoviesSection title="Upcoming" hiddinVote={false} />

      <Suspense fallback={<ActorPopularSkeleton />}>
        <ActorPopular />
      </Suspense>

      <Suspense fallback={<CategoriesMoviesSkeleton />}>
        <CategoriesMovies />
      </Suspense>
      
    </PublicLayout>
  );
}
