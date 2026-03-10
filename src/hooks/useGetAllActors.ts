import { useQuery } from "@tanstack/react-query";

export type Actor = {
  id: number;
  name: string;
  profile_path: string | null;
};

export const GetActors = async (page: number): Promise<Actor[]> => {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=7b8da597ddda3922e0a74cec92c25b67&page=${page}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch actors");
  }

  const data = await res.json();
  return data.results;
};

const useGetAllActors = (page: number) => {
  return useQuery<Actor[]>({
    queryKey: ["actors", page],
    queryFn: () => GetActors(page),
    staleTime: 1000 * 60 * 5, // 5 دقائق
    refetchOnWindowFocus: false,
  });
};

export default useGetAllActors;