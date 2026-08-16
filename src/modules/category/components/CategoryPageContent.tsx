"use client";
import HeroCategory from "@/modules/category/components/HeroCategory";
import MoviesCategory from "@/modules/category/components/MoviesCategory";
import SelectCategory from "@/modules/category/components/SelectCategory";
import useGenrePage from "@/modules/genre/hooks/useGenrePage";
import Link from "next/link";
import { useParams } from "next/navigation";

function CategoryPageContent() {
  const params = useParams();

  const category = String(params.categoryId ?? "");

  const { query } = useGenrePage();

  return (
    <div>
      <HeroCategory category={category} />
      <SelectCategory />
      <MoviesCategory query={query} />
      <div className="mt-10 flex justify-center ">
        <Link href={`/genre/${category}`}>
          <button className="cursor-pointer text-xl font-semibold border p-2 rounded-lg hover:bg-gray-900">
           Watch more <span className="lowercase">{category}</span> movies
          </button>
        </Link>
      </div>
    </div>
  );
}

export default CategoryPageContent;
