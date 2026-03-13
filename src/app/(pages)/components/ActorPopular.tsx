"use client";

import Image from "next/image";
import DefaultImage from "@/assets/images/default.png";
import usePopularActors from "@/hooks/Actors/usePopularActors";
import ActorPopularSkeleton from "@/components/skeletons/ActorPopularSkeleton";
import Link from "next/link";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w300";

const ActorPopular = () => {
  const { data, isLoading } = usePopularActors();

  if (isLoading) return <ActorPopularSkeleton />;

  const actors = data?.results.slice(0, 6);

  return (
    <section className="my-10 mx-7">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-semibold  ml-0 lg:ml-10">
          The Most Famous Actors
        </h2>

        <Link
          href="actors"
          className="border border-white px-3 py-1.5 rounded-md text-sm hover:bg-white hover:text-black transition"
        >
          View More
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6  gap-2 justify-items-center">
        {actors?.map((actor) => {
          const actorImage = actor.profile_path
            ? IMAGE_BASE + actor.profile_path
            : DefaultImage.src;

          return (
            <div
              key={actor.id}
              className="flex flex-col items-center group cursor-pointer"
            >
              <Link href={`/actor/${actor.id}`}>
                <div className="relative w-40 h-40  md:w-48 md:h-48  rounded-full overflow-hidden border-2 border-zinc-700 group-hover:border-yellow-400 transition duration-300">
                  <Image
                    src={actorImage}
                    alt={actor.name}
                    fill
                    sizes="(max-width: 768px) 10vw, (max-width: 1024px) 12vw, 6vw"
                    className="object-center group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </Link>

              <p className="text-lg font-medium mt-3 text-center text-gray-300 group-hover:text-yellow-400 transition">
                {actor.name}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ActorPopular;
