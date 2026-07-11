import Image from "next/image";
import Link from "next/link";

import { Plus } from "@/assets/icons/Icons";
import { GetCategories } from "@/modules/categories/api/GetCategories";
import TitleWithViewMore from "@/shared/components/common/TitleWithViewMore";

const HIDDEN_CATEGORIES = ["Documentary", "TV Movie", "Romance","Drama"];

const CategoriesMovies = async () => {
  const categories = await GetCategories();

  const filteredCategories = categories.filter(
    (category) =>
      !HIDDEN_CATEGORIES.includes(category.name || "") && category.image,
  );

  return (
    <section className="mx-7 my-10">
      <TitleWithViewMore
        genreId={1}
        title="Categories"
        Url="actors"
        ViewMore={false}
        margin
      />

      <div className="no-scrollbar flex gap-6 overflow-x-auto lg:grid lg:grid-cols-4 lg:overflow-visible md:grid-cols-3 sm:grid-cols-2">
        {filteredCategories.map((category) => (
          <Link
            key={category.id}
            href={`/genre/${category.name}`}
            className="w-72 shrink-0 lg:w-auto"
          >
            <div className="group overflow-hidden rounded-xl bg-gray-800 transition hover:bg-gray-900">
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={category.image!}
                  alt={category.name || "category"}
                  fill
                  sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/40" />

                <div className="absolute bottom-5 left-3 rounded-full bg-gray-900/80 p-2 text-white">
                  <Plus size={14} />
                </div>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xl font-semibold text-white">
                  {category.name}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoriesMovies;
