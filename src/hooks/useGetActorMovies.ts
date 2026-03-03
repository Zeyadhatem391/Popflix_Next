import { useQuery } from "@tanstack/react-query";
import { Movie } from "@/lib/types/Movie";

const GetActorMovies = async (id: string) => {
  const res = await fetch(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=7b8da597ddda3922e0a74cec92c25b67`);
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