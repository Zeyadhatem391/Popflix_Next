"use client";

import Back from "@/components/common/Back";
import InputSearch from "@/components/common/InputSearsh";
import SortButtonGenre from "../components/SortButtonGenre";
import FilterButtonGenre from "../components/FilterButtonGenre";
import GenreCards from "../components/GenreCards";

import {
  useParams,
  useSearchParams,
  useRouter,
  usePathname,
} from "next/navigation";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { GetGenreMovies } from "@/hooks/useGetGenreMovies";
import { PaginationDemo } from "../../components/PaginationGenre";

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const genreName = params.genreId as string;
  const id = genres[genreName];

  const page = Number(searchParams.get("page")) || 1;
  const rating = Number(searchParams.get("rating")) || 0;

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const nextPage = page + 1;

    if (nextPage > 500) return;

    queryClient.prefetchQuery({
      queryKey: ["genreMovies", id, nextPage, rating],
      queryFn: () => GetGenreMovies(id, nextPage, rating),
    });
  }, [page, id, rating, queryClient]);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex items-center gap-3 w-full my-3">
        <Back />
        <InputSearch />
      </div>

      <div className="flex flex-col items-center justify-center gap-4 mt-6">
        <h2 className="text-3xl font-bold text-center">{genreName} Movies</h2>

        <div className="flex items-center gap-3">
          <SortButtonGenre />
          <FilterButtonGenre rating={rating} />
        </div>
      </div>

      <div className="my-10">
        <GenreCards id={id} page={page} rating={rating} />
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <PaginationDemo page={page} setPage={changePage} />
      </div>
    </div>
  );
};

export default GenrePage;