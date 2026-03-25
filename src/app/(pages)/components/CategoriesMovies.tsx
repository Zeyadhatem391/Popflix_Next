"use client";

import TitleWithViewMore from "@/components/common/TitleWithViewMore";
import CategoriesMoviesSkeleton from "@/components/skeletons/CategoriesMoviesSkeleton";
import { useGetCategoriesMovies } from "@/hooks/Movies/useGetCategoriesMovies";
import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

const CategoriesMovies = () => {
  const {
    data: categories,
    isLoading,
    isError,
    refetch,
  } = useGetCategoriesMovies();

  if (isLoading) return <CategoriesMoviesSkeleton />;
  if (isError || !categories)
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-lg text-red-500 font-medium">
          Something went wrong while fetching movies 😢
        </p>

        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md transition"
        >
          Try Again
        </button>
      </div>
    );

  return (
    <section className="my-10 mx-7">
      {/* Title */}
      <TitleWithViewMore
        genreId={1}
        title="Categories"
        Url="actors"
        ViewMore={false}
        margin={true}
      />

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
