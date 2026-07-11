"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { GetGenreMovie, SortBy } from "../api/GetGenreMovie";

type Props = {
  id: number;
  page: number;
  rating: number ;
  decade: string;
  language: string;
  sortBy: SortBy;
  debouncedQuery: string;
};

export default function useGenrePrefetch({
  id,
  page,
  rating,
  decade,
  language,
  sortBy,
  debouncedQuery,
}: Props) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const nextPage = page + 1;

    if (nextPage > 500) return;

    if (debouncedQuery) return;

    queryClient.prefetchQuery({
      queryKey: [
        "genreMovies",
        id,
        nextPage,
        rating,
        decade,
        language,
        sortBy,
      ],
      queryFn: () =>
        GetGenreMovie(id, nextPage, rating, decade, language, sortBy, ""),
    });
  }, [
    page,
    id,
    rating,
    decade,
    language,
    sortBy,
    debouncedQuery,
    queryClient,
  ]);
}