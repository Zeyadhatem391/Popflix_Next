"use client";

import { PaginationDemo } from "@/modules/home/components/organisms/PaginationGenre";
import GenreHeader from "./GenreHeader";
import GenreMovies from "./GenreMovies";
import GenreToolbar from "./GenreToolbar";
import useGenrePage from "../hooks/useGenrePage";

export default function GenrePageContent() {
  const { genreName, search, filters, query } = useGenrePage();

  return (
    <div className="max-w-7xl mx-auto px-4">
      <GenreHeader
        genreName={genreName}
        setSearchQuery={search.setSearchQuery}
      />

      <div className="flex flex-col items-center justify-center gap-4 mt-6">
        <h2 className="text-3xl font-bold text-center">{genreName} Movies</h2>

        <GenreToolbar
          rating={filters.rating}
          decade={filters.decade}
          language={filters.language}
          sortBy={filters.sortBy}
          updateFilter={filters.updateFilter}
          resetFilters={filters.resetFilters}
        />
      </div>

      <div className="my-10">
        <GenreMovies query={query} />
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <PaginationDemo
          page={filters.page}
          setPage={filters.changePage}
          totalPages={query.data?.total_pages || 1}
        />
      </div>
    </div>
  );
}
