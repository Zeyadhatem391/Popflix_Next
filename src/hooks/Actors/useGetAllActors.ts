import { Actor } from "@/lib/types/Actor";
import { useQuery } from "@tanstack/react-query";



type ActorResponse = {
  results: Actor[];
  total_pages: number;
};

export const GetActors = async (page: number): Promise<ActorResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/3/person/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch actors");
  }

  const data = await res.json();

  return {
    results: data.results,
    total_pages: Math.min(data.total_pages, 500),
  };
};

const useGetAllActors = (page: number) => {
  return useQuery<ActorResponse>({
    queryKey: ["actors", page],
    queryFn: () => GetActors(page),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export default useGetAllActors;