"use client";

import { Actor } from "@/lib/types/Actor";
import { useQuery } from "@tanstack/react-query";

type ActorResponse = {
  results: Actor[];
  total_pages: number;
};

export const GetActors = async (
  page: number,
  debouncedQuery: string
): Promise<ActorResponse> => {
  let url = "";

  if (debouncedQuery) {
    url = `${process.env.NEXT_PUBLIC_API_URL}/3/search/person?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${encodeURIComponent(
      debouncedQuery
    )}&page=${page}`;
  } else {
    url = `${process.env.NEXT_PUBLIC_API_URL}/3/person/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`;
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch actors");
  }

  const data = await res.json();

  return {
    results: data.results,
    total_pages: Math.min(data.total_pages, 500),
  };
};

const useGetAllActors = (page: number, debouncedQuery: string) => {
  return useQuery<ActorResponse>({
    queryKey: ["actors", page, debouncedQuery],
    queryFn: () => GetActors(page, debouncedQuery),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export default useGetAllActors;