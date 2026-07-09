"use client";

import TitleWithViewMore from "@/components/common/TitleWithViewMore";
import CategoriesMoviesSkeleton from "@/components/skeletons/CategoriesMoviesSkeleton";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "@/assets/icons/Icons";
import { useGetCategories } from "@/modules/categories/hooks/useGetCategories";

const HIDDEN_CATEGORIES = ["Documentary", "TV Movie"];

const CategoriesMovies = () => {
  const { data, isLoading, isError } = useGetCategories();

  if (isLoading) return <CategoriesMoviesSkeleton />;

  if (isError || !data) {
    return (
      <section className="my-10 mx-7">
        <p className="text-red-500">Something went wrong.</p>
      </section>
    );
  }

  const filteredCategories = data.Categories.filter((cat) => {
    if (!cat.name) return false;

    return !HIDDEN_CATEGORIES.includes(cat.name);
  });

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
        {filteredCategories.map((cat) => (
          <Link
            key={cat.id}
            href={`/genre/${cat.name}`}
            className="shrink-0 w-72 lg:w-auto"
          >
            <div className="group rounded-xl overflow-hidden bg-gray-800 hover:bg-gray-900 transition">
              <div className="relative w-full h-52 overflow-hidden">
                {cat.image && (
                  <Image
                    src={cat.image}
                    alt={cat.name || "image"}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                )}

                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition" />

                <div className="absolute bottom-5 left-3 rounded-full bg-gray-900/80 p-2 text-white">
                  <Plus size={14} />
                </div>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white font-semibold text-xl">
                  {cat.name}
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
