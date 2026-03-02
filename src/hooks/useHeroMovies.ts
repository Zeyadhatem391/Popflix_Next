"use client";

import { Movie } from "@/lib/types/Movie";
import { useQuery } from "@tanstack/react-query";


const GetHeroMovies = async (): Promise<Movie[]> => {
  const randomPage = Math.floor(Math.random() * 5 + 1);

  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=7b8da597ddda3922e0a74cec92c25b67&page=${randomPage}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await res.json();

  return data.results.slice(0, 10);
};

const useHeroMovies = () => {
  return useQuery<Movie[]>({
    queryKey: ["hero-movies"],
    queryFn: GetHeroMovies,
    staleTime: 1000 * 60 * 5,
  });
};

export default useHeroMovies;