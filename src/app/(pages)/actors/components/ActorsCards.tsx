"use client";

import useGetAllActors, { Actor } from "@/hooks/useGetAllActors";
import Image from "next/image";
import Link from "next/link";
import DefaultImage from "@/assets/images/default.png";
import ActorCardSkeleton from "@/components/skeletons/ActorCardSkeleton";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w200";

type ActorsCardsProps = {
  page: number;
};

const ActorsCards = ({ page }: ActorsCardsProps) => {
  const { data: actors = [], isLoading, isError } = useGetAllActors(page);

  if (isError) return <div>Failed to load actors.</div>;
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
            <Image
              src={actor.profile_path ? `${IMAGE_BASE}${actor.profile_path}` : DefaultImage}
              alt={actor.name}
              fill
              className="object-cover"
            />
          </div>
          <h3 className="text-center text-lg font-semibold ">
            {actor.name}
          </h3>
        </Link>
      ))}
    </div>
  );
};

export default ActorsCards;