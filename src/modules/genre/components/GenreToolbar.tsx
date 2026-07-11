"use client";

import { SortBy } from "../api/GetGenreMovie";
import FilterButtonGenre from "./FilterButtonGenre";
import SortButtonGenre from "./SortButtonGenre";

type Props = {
  rating: number;
  decade: string;
  language: string;
  sortBy: SortBy;
  updateFilter: (key: any, value: any) => void;
  resetFilters: () => void;
};

export default function GenreToolbar({
  rating,
  decade,
  language,
  sortBy,
  updateFilter,
  resetFilters,
}: Props) {
  return (
    <>
      <div className="flex items-center gap-3">
        <SortButtonGenre
          sortBy={sortBy}
          updateFilter={updateFilter}
        />

        <FilterButtonGenre
          rating={rating}
          decade={decade}
          language={language}
          reset={resetFilters}
        />
      </div>
    </>
  );
}