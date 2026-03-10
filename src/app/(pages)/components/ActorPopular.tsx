"use client";

import Image from "next/image";
import DefaultImage from "@/assets/images/default.png";
import { FaArrowRight } from "react-icons/fa";
import usePopularActors from "@/hooks/usePopularActors";
import ActorPopularSkeleton from "@/components/skeletons/ActorPopularSkeleton";
import Link from "next/link";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w300";


const ActorPopular = () => {
  const { data, isLoading } = usePopularActors();

  if (isLoading) return <ActorPopularSkeleton />;

  const actors = data?.results.slice(0, 9);

  return (
    <section className="my-10 mx-7">
      <h2 className="text-2xl font-semibold mb-6 ">The Most Famous Actors</h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5  gap-5 justify-items-center">
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
                <div className="relative w-36 h-36  md:w-40 md:h-40  rounded-full overflow-hidden border-2 border-zinc-700 group-hover:border-yellow-400 transition duration-300">
                  <Image
                    src={actorImage}
                    alt={actor.name}
                    fill
                    sizes="144px"
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

        {/* MORE BUTTON */}
       <Link href="actors">
        <div className="flex flex-col items-center group cursor-pointer">
          <div
            className="w-36 h-36 rounded-full flex items-center justify-center
            border-2 border-dashed border-zinc-600
            bg-zinc-900
            group-hover:border-yellow-400
            group-hover:bg-yellow-400/10
            transition-all duration-300
            group-hover:scale-105"
          >
            <FaArrowRight
              size={28}
              className="text-gray-300 group-hover:text-yellow-400
              transition-transform duration-300 group-hover:translate-x-1"
            />
          </div>

          <p className="text-lg font-medium mt-3 text-gray-400 group-hover:text-yellow-400 transition">
            View More
          </p>
        </div>
       </Link>
      </div>
    </section>
  );
};

export default ActorPopular;
