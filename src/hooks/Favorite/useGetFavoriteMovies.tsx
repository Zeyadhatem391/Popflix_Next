import { useQuery } from "@tanstack/react-query";
import { Movie } from "@/lib/types/Movie";

const GetMovies = async (ids: number[]): Promise<Movie[]> => {
  if (!ids.length) return [];

  const requests = ids.map((id) =>
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    ).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch movie");
      return res.json();
    }),
  );

  const movies = await Promise.all(requests);

  return movies;
};

const useGetFavoriteMovies = (ids: number[]) => {
  return useQuery<Movie[]>({
    queryKey: ["favoriteMovies", ids],
    queryFn: () => GetMovies(ids),
    enabled: ids.length > 0, 
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export default useGetFavoriteMovies;
