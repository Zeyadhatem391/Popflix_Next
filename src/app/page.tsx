import { Suspense } from "react";

import PublicLayout from "@/shared/components/layout/PublicLayout";

import Hero from "../modules/home/components/organisms/Hero";
import ActorPopular from "../modules/home/components/organisms/ActorPopular";
import CategoriesMovies from "../modules/home/components/organisms/CategoriesMovies";
import MoviesSection from "../modules/home/components/organisms/MoviesSection";
import SectionCompany from "../modules/home/components/organisms/SectionCompany";
import SectionDetailsMovies from "../modules/home/components/organisms/SectionDetailsMovies";

import SectionDetailsSkeleton from "@/shared/components/skeletons/SectionDetailsSkeleton";
import ActorPopularSkeleton from "@/shared/components/skeletons/ActorPopularSkeleton";
import CategoriesMoviesSkeleton from "@/shared/components/skeletons/CategoriesMoviesSkeleton";

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
