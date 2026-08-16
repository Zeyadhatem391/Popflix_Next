import { NotFound } from "@/assets/images/images";
import { GetCategories } from "@/modules/categories/api/GetCategories";
import TitleWithViewMore from "@/shared/components/common/TitleWithViewMore";
import HoverPrefetchLink from "@/shared/components/hover-prefetch/HoverPrefetchLink";
import Image from "next/image";

const CATEGORIES = ["Action", "History", "Crime", "War"];

async function Categories() {
  const categories = await GetCategories();

  const selectedCategories = CATEGORIES.map((name) =>
    categories.find((category) => category.name === name),
  ).filter(Boolean);

  const [bigCard, card1, card2, card3] = selectedCategories;

  if (!bigCard || !card1 || !card2 || !card3) {
    return null;
  }

  return (
    <section className="mx-7 my-10">
      <TitleWithViewMore
        genreId={1}
        title="Categories"
        Url="actors"
        ViewMore={true}
        margin={true}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:h-162.5">
        <HoverPrefetchLink key={bigCard.id} href={`/genre/${bigCard.name}`}>
            <div className="relative h-72 lg:h-full overflow-hidden rounded-3xl group cursor-pointer">
            <Image
              src={bigCard?.image || NotFound}
              alt=""
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 backdrop-blur-md bg-black/20">
              <h2 className="text-3xl font-bold text-white">{bigCard?.name}</h2>
            </div>
          </div>
        </HoverPrefetchLink>

        <div className="grid h-full grid-cols-1 grid-rows-3 gap-4 lg:grid-cols-2 lg:grid-rows-2">
          <div className=" lg:col-span-2">
            <HoverPrefetchLink href={`/genre/${card1.name}`}>
              <div className="relative h-56 lg:h-full overflow-hidden rounded-2xl group cursor-pointer">
                <Image
                  src={card1.image || NotFound}
                  alt={card1.name || ""}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-md p-4">
                  <h3 className="text-lg font-semibold text-white">
                    {card1.name}
                  </h3>
                </div>
              </div>
            </HoverPrefetchLink>
          </div>
          {/* Card 2 */}
          <HoverPrefetchLink href={`/genre/${card2.name}`}>
            <div className="relative h-56 lg:h-full overflow-hidden rounded-2xl group cursor-pointer">
              <Image
                src={card2.image || NotFound}
                alt={card2.name || ""}
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-md p-4">
                <h3 className="text-lg font-semibold text-white">
                  {card2.name}
                </h3>
              </div>
            </div>
          </HoverPrefetchLink>

          {/* Card 3 */}
          <HoverPrefetchLink href={`/genre/${card3.name}`}>
            <div className="relative h-56 lg:h-full overflow-hidden rounded-2xl group cursor-pointer">
              <Image
                src={card3.image || NotFound}
                alt={card3.name || ""}
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-md p-4">
                <h3 className="text-lg font-semibold text-white">
                  {card3.name}
                </h3>
              </div>
            </div>
          </HoverPrefetchLink>
        </div>
      </div>
    </section>
  );
}

export default Categories;
