"use client";

import Back from "@/components/common/Back";
import InputSearch from "@/components/common/InputSearsh";
import SortButton from "../components/SortButton";
import FilterButton from "../components/FilterButton";
import GenreCards from "../components/GenreCards";
import { useParams } from "next/navigation";
import { PaginationDemo } from "../components/PaginationGenre";
import { useState } from "react";

const genres: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  18: "Drama",
  14: "Fantasy",
  27: "Horror",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  53: "Thriller",
};

const GenrePage = () => {
  const params = useParams();
  const id = Number(params.genreId);

  const [page, setPage] = useState(1);

  const GenreSection = genres[id] || "Movies";

  return (
    <div className="max-w-6xl mx-auto px-4 ">
      <div className="flex items-center gap-3 w-full my-3">
        <Back />
        <InputSearch />
      </div>

      <div className="flex flex-col items-center justify-center gap-4 mt-6">
        <h2 className="text-3xl font-bold text-center">{GenreSection} Movies</h2>

        <div className="flex items-center gap-3">
          <SortButton />
          <FilterButton />
        </div>
      </div>

      <div className="my-10">
        <GenreCards id={id} page={page} />
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <PaginationDemo page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default GenrePage;