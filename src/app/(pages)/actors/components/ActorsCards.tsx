"use client";

import Link from "next/link";

import ActorCardSkeleton from "@/components/skeletons/ActorCardSkeleton";
import { Actor } from "@/shared/types/Actor";
import ActorImage from "@/app/components/ActorImage";

type ActorsCardsProps = {
  actors: Actor[];
  isLoading: boolean;
};
const ActorsCards = ({ actors, isLoading }: ActorsCardsProps) => {
  if (isLoading) return <ActorCardSkeleton count={10} />;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {actors.map((actor: Actor) => (
        <Link
          key={actor.id}
          href={`/actor/${actor.id}`}
          className="flex flex-col items-center gap-2 transform hover:scale-105 hover:shadow-lg transition-all"
        >
          <div className="w-32 h-40 relative rounded-xl overflow-hidden bg-gray-200 shadow-md">
            <ActorImage
              profilePath={actor.profile_path}
              gender={actor.gender}
              name={actor.name}
              
              className="object-cover"
            />
          </div>
          <h3 className="text-center text-lg font-semibold ">{actor.name}</h3>
        </Link>
      ))}
    </div>
  );
};

export default ActorsCards;
