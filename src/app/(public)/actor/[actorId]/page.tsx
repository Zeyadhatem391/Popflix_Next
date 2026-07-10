import { Suspense } from "react";

import ActorInfo from "@/modules/actorDetails/components/ActorInfo";
import ActorMovies from "@/modules/actorDetails/components/ActorMovies";

import ActorDetailsSkeleton from "@/shared/components/skeletons/ActorDetailsSkeleton";
import ActorMoviesSkeleton from "@/shared/components/skeletons/ActorMoviesSkeleton";

function Skeleton() {
  return (
    <div className="flex flex-col">
      <ActorDetailsSkeleton />
      <ActorMoviesSkeleton />
    </div>
  );
}

export default function Page({
  params,
}: {
  params: Promise<{ actorId: string }>;
}) {
  return (
    <Suspense fallback={<Skeleton />}>
      <ActorContent params={params} />
    </Suspense>
  );
}

async function ActorContent({
  params,
}: {
  params: Promise<{ actorId: string }>;
}) {
  const { actorId } = await params;

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-3 gap-8">
        <ActorInfo actorId={actorId}/>
        <ActorMovies moviesId={actorId} />
      </div>
    </section>
  );
}
