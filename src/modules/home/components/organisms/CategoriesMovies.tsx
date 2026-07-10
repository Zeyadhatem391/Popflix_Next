import Image from "next/image";
import Link from "next/link";

import { Plus } from "@/assets/icons/Icons";
import { GetCategories } from "@/modules/categories/api/GetCategories";
import TitleWithViewMore from "@/shared/components/common/TitleWithViewMore";

const HIDDEN_CATEGORIES = ["Documentary", "TV Movie"];

const CategoriesMovies = async () => {
  const categories = await GetCategories();

  const filteredCategories = categories.filter(
    (category) => !HIDDEN_CATEGORIES.includes(category.name || "category"),
  );

  return (
    <section className="my-10 mx-7">
      <TitleWithViewMore
        genreId={1}
        title="Categories"
        Url="actors"
        ViewMore={false}
        margin
      />

      <div className="flex lg:grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 overflow-x-auto lg:overflow-visible no-scrollbar">
        {filteredCategories.map((category) => (
          <Link
            key={category.id}
            href={`/genre/${category.name}`}
            className="shrink-0 w-72 lg:w-auto"
          >
            <div className="group rounded-xl overflow-hidden bg-gray-800 hover:bg-gray-900 transition">
              <div className="relative w-full h-52 overflow-hidden">
                {category.image && (
                  <Image
                    src={category.image}
                    alt={category.name || "category"}
                    fill
                    sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                )}

                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition" />

                <div className="absolute bottom-5 left-3 rounded-full bg-gray-900/80 p-2 text-white">
                  <Plus size={14} />
                </div>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white font-semibold text-xl">
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
