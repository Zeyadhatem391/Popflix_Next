"use client";

import Image from "next/image";
import DefaultImage from "@/assets/images/default.png";
import usePopularActors from "@/hooks/Actors/usePopularActors";
import ActorPopularSkeleton from "@/components/skeletons/ActorPopularSkeleton";
import Link from "next/link";
import TitleWithViewMore from "@/components/common/TitleWithViewMore";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w300";

const ActorPopular = () => {
  const { data, isLoading, isError, refetch } = usePopularActors();

  if (isLoading) return <ActorPopularSkeleton />;
  if (isError)
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-lg text-red-500 font-medium">
          Something went wrong while fetching Actor 😢
        </p>

        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md transition"
        >
          Try Again
        </button>
      </div>
    );

  const actors = data?.results.slice(0, 5);

  return (
    <section className="my-10 mx-7">
      <TitleWithViewMore
        genreId={1}
        title="Actors"
        Url="actors"
        ViewMore={true}
         margin={true}
      />

      <div className=" gap-2 justify-items-center flex lg:grid lg:grid-cols-5 overflow-x-auto no-scrollbar">
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
