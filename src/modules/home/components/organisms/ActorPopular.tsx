import Image from "next/image";
import TitleWithViewMore from "@/shared/components/common/TitleWithViewMore";
import { getMovieImage } from "@/lib/helpers/getMovieImage";
import { getPopularActors } from "../../api/getPopularActors";
import HoverPrefetchLink from "@/shared/components/hover-prefetch/HoverPrefetchLink";

const ActorPopular = async () => {
  const actors = await getPopularActors();

  return (
    <section className="my-10 mx-7">
      <TitleWithViewMore
        genreId={1}
        title="Actors"
        Url="actors"
        ViewMore={true}
        margin={true}
      />

      <div className="gap-2 justify-items-center flex lg:grid lg:grid-cols-4 overflow-x-auto no-scrollbar mx-2">
        {actors.map((actor) => {
          const actorImage = getMovieImage(actor.profile_path);

          return (
            <div key={actor.id} className="group">
              <HoverPrefetchLink href={`/actor/${actor.id}`}>
                <div className="relative w-67.5 h-90 overflow-hidden rounded-lg  bg-zinc-900 transition-all duration-300 hover:border-yellow-400 hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-500/20">
                  <Image
                    src={actorImage}
                    alt={actor.name || "actor"}
                    fill
                    className="object-center transition-transform duration-500 group-hover:scale-110"
                    sizes="220px"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-ءl font-semibold text-white transition-colors duration-300 group-hover:text-yellow-400 line-clamp-2">
                      {actor.name}
                    </h3>
                  </div>
                </div>
              </HoverPrefetchLink>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ActorPopular;
