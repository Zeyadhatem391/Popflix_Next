import Image from "next/image";
import TitleWithViewMore from "@/shared/components/common/TitleWithViewMore";
import { getMovieImage } from "@/lib/helpers/getMovieImage";
import { getPopularActors } from "../../api/getPopularActors";
import HoverPrefetchLink from "@/shared/components/hover-prefetch/HoverPrefetchLink";

const ActorPopular = async () => {
  const actors = await getPopularActors();

  return (
    <section>
      <TitleWithViewMore
        genreId={1}
        title="Actors"
        Url="actors"
        ViewMore={true}
        margin={false}
      />

      <div className="grid grid-cols-2 gap-6 md:grid-cols-6">
        {actors.map((actor) => {
          const actorImage = getMovieImage(actor.profile_path);

          return (
            <HoverPrefetchLink key={actor.id} href={`/actor/${actor.id}`}>
            <div className="group flex h-full w-full flex-col items-center justify-center gap-2 text-center">
  <div className="relative h-30 w-30 shrink-0 overflow-hidden rounded-full">
    <Image
      src={actorImage}
      alt={actor.name || "Unknown Actor"}
      fill
      sizes="120px"
      className="rounded-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
    />
  </div>

  <p className="font-semibold">{actor.name || "Unknown Actor"}</p>
</div>
            </HoverPrefetchLink>
          );
        })}
      </div>
    </section>
  );
};

export default ActorPopular;
