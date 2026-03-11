"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

const API_KEY = "7b8da597ddda3922e0a74cec92c25b67";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

type Genre = {
  id: number;
  name: string;
};

type Category = {
  id: number;
  name: string;
  image: string | null;
};

const CategoriesMovies = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
        );

        const data: { genres: Genre[] } = await res.json();

        const categoriesWithImages: Category[] = await Promise.all(
          data.genres.slice(0, 8).map(async (genre: Genre) => {
            const movieRes = await fetch(
              `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre.id}`
            );

            const movieData = await movieRes.json();

            return {
              id: genre.id,
              name: genre.name,
              image: movieData.results?.[0]?.poster_path
                ? IMG_URL + movieData.results[0].poster_path
                : null,
            };
          })
        );

        setCategories(categoriesWithImages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

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
          <Link key={cat.id} href={`/genre/${cat.name}`} className="flex-shrink-0 w-72 lg:w-auto">
            <div className="group rounded-xl overflow-hidden bg-gray-800 cursor-pointer transition duration-300 hover:bg-gray-900">
              
              {/* Image */}
              <div className="relative w-full h-44 overflow-hidden">
                {cat.image && (
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover"
                  />
                )}

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-300"></div>

                <div className="absolute bottom-3 left-3 rounded-full p-2 bg-gray-900/80 text-white">
                  <FaPlus size={14} />
                </div>
              </div>

              {/* Title */}
              <div className="py-3 px-4 text-white font-medium text-lg">
                {cat.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoriesMovies;