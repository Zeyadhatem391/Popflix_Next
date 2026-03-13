"use client";

import Back from "@/components/common/Back";
import InputSearch from "@/components/common/InputSearsh";
import SortButtonGenre from "../components/SortButtonGenre";
import FilterButtonGenre from "../components/FilterButtonGenre";
import GenreCards from "../components/GenreCards";

import { useParams } from "next/navigation";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import useGetGenreMovies, { GetGenreMovies } from "@/hooks/useGetGenreMovies";
import { PaginationDemo } from "../../components/PaginationGenre";
import { useGenreFilters } from "@/hooks/useGenreFilters";

const genres: Record<string, number> = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Drama: 18,
  Fantasy: 14,
  Horror: 27,
  Mystery: 9648,
  Romance: 10749,
  ScienceFiction: 878,
  Thriller: 53,
  Documentary: 99,
  Family: 10751,
};

const GenrePage = () => {
  const params = useParams();
  const queryClient = useQueryClient();

  const genreName = params.genreId as string;
  const id = genres[genreName];

  const {
    rating,
    decade,
    language,
    page,
    sortBy,
    changePage,
    resetFilters,
    updateFilter,
  } = useGenreFilters();

  const { data, isLoading } = useGetGenreMovies(
    id,
    page,
    rating,
    decade,
    language,
    sortBy,
  );

  const movies = data?.results || [];
  const totalPages = data?.total_pages || 1;

  useEffect(() => {
    const nextPage = page + 1;

    if (nextPage > 500) return;

    queryClient.prefetchQuery({
      queryKey: ["genreMovies", id, nextPage, rating, decade, language, sortBy],
      queryFn: () =>
        GetGenreMovies(id, nextPage, rating, decade, language, sortBy),
    });
  }, [page, id, rating, decade, language, sortBy, queryClient]);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex items-center gap-3 w-full my-3">
        <Back />
        <InputSearch />
      </div>

      <div className="flex flex-col items-center justify-center gap-4 mt-6">
        <h2 className="text-3xl font-bold text-center">{genreName} Movies</h2>

        <div className="flex items-center gap-3">
          <SortButtonGenre sortBy={sortBy} updateFilter={updateFilter} />
          <FilterButtonGenre
            rating={rating}
            decade={decade}
            language={language}
            reset={resetFilters}
          />
        </div>
      </div>

      <div className="my-10">
        <GenreCards movies={movies} isLoading={isLoading} />
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <PaginationDemo
          page={page}
          setPage={changePage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default GenrePage;
