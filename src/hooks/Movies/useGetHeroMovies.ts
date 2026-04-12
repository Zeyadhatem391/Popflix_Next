import { useQuery } from "@tanstack/react-query";
import { Movie } from "@/lib/types/Movie";


const fetchHeroMovies = async (): Promise<Movie[]> => {
    const randomPage = Math.floor(Math.random() * 5 + 1);
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${randomPage}&include_adult=false`
    );

    if (!res.ok) throw new Error("Failed to fetch movies");

    const data = await res.json();
    return data.results.slice(0, 10);
};

export const useGetHeroMovies = () => {
    return useQuery<Movie[]>({
        queryKey: ["hero-movies"],
        queryFn: fetchHeroMovies,
        staleTime: 1000 * 60 * 5,
    });
};