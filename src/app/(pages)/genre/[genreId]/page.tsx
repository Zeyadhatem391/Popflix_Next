"use client";

import Back from "@/components/common/Back";
import InputSearch from "@/components/common/InputSearsh";
import SortButton from "../components/SortButton";
import FilterButton from "../components/FilterButton";
import GenreCards from "../components/GenreCards";
import { useParams } from "next/navigation";
import { PaginationDemo } from "../components/PaginationGenre";

const GenrePage = () => {
  const params = useParams();

  const id = Number(params.genreId);

  return (
    <div className="mx-7">
      <div className="flex items-center gap-3 w-full my-3">
        <Back />
        <InputSearch />
      </div>

      <div className="flex flex-col items-center justify-center gap-4 mt-6">
        <h2 className="text-3xl font-bold text-center">Action Movies</h2>

        <div className="flex items-center gap-3">
          <SortButton />
          <FilterButton />
        </div>
      </div>

      <div className="my-5">
        <GenreCards id={id} />
      </div>

      <div className="flex  items-center justify-center gap-4 mt-6">
        <PaginationDemo />
      </div>
    </div>
  );
};

export default GenrePage;
