import { useQuery } from "@tanstack/react-query";
import { Movie } from "@/lib/types/Movie";

const GetActorMovies = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/3/person/${id}/combined_credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch movies");
  const data = await res.json();
  return data.cast.slice(0, 10); 
};

const useGetActorMovies = (id: string) => {
    return useQuery<Movie[]>({
        queryKey: ["movies", id],
        queryFn: () => GetActorMovies(id),
        staleTime: 1000 * 60 * 5,
        enabled: !!id,
    });
};

export default useGetActorMovies;