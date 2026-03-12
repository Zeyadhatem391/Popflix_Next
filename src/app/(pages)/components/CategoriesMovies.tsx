"use client";

import CategoriesMoviesSkeleton from "@/components/skeletons/CategoriesMoviesSkeleton";
import { useGetCategoriesMovies } from "@/hooks/useGetCategoriesMovies";
import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

const CategoriesMovies = () => {
  const { data: categories, isLoading, isError } = useGetCategoriesMovies();

  if (isLoading) return <CategoriesMoviesSkeleton />;
  if (isError || !categories) return <p>error</p>;

  return (
    <section className="my-10 mx-7">
      {/* Title */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-semibold lg:ml-10">
          Categories
        </h2>
      </div>

      {/* Scrollable container */}
      <div className="flex lg:grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 overflow-x-auto lg:overflow-visible no-scrollbar">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/genre/${cat.name}`}
            className="flex-shrink-0 w-72 lg:w-auto"
          >
            <div className="group rounded-xl overflow-hidden bg-gray-800 cursor-pointer transition duration-300 hover:bg-gray-900">
              <div className="relative w-full h-52 overflow-hidden">
                {cat.image && (
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover"
                  />
                )}

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-300"></div>

                <div className="absolute bottom-5 left-3 rounded-full p-2 bg-gray-900/80 text-white">
                  <FaPlus size={14} />
                </div>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white font-semibold text-xl">
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
