import { getMovieImage } from "@/lib/helpers/getMovieImage";
import HoverPrefetchLink from "@/shared/components/hover-prefetch/HoverPrefetchLink";
import Image from "next/image";

interface CastMember {
  id: number;
  original_name?: string;
  character?: string;
  profile_path?: string | null;
}

interface TopCastProps {
  cast?: CastMember[];
}

export default function TopCast({ cast }: TopCastProps) {
  if (!cast?.length) {
    return <p className="py-8 text-center text-gray-400">No cast available.</p>;
  }

  return (
    <section>
      <h2 className="mb-4 border-l-6 border-red-800 pl-2 text-xl font-semibold md:text-2xl">
        Top Cast
      </h2>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-6">
        {cast.slice(0, 6).map((actor) => {
          const actorImage = getMovieImage(actor.profile_path);

          return (
            <HoverPrefetchLink key={actor.id} href={`/actor/${actor.id}`}>
              <div className="group flex h-full w-full flex-col items-center justify-center gap-2 text-center">
                <div className="relative h-25 w-25 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={actorImage}
                    alt={actor.original_name || "Unknown Actor"}
                    fill
                    sizes="100px"
                    className="rounded-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                </div>

                <div className="w-full">
                  <p className="font-semibold">
                    {actor.original_name || "Unknown Actor"}
                  </p>
                  <p className="text-sm text-gray-300">
                    {actor.character || "Unknown Role"}
                  </p>
                </div>
              </div>
            </HoverPrefetchLink>
          );
        })}
      </div>
    </section>
  );
}
