import { Movie } from "@/lib/types/Movie";
import { useQuery } from "@tanstack/react-query"


const GetMoviesCompany = async (companyId: number): Promise<Movie[]> => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_companies=${companyId}&include_adult=false&sort_by=vote_average.desc&vote_count.gte=100`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch movies");
    }

    const data = await res.json();

    return data.results.slice(0, 20);
};

const useGetMoviesCompany = (companyId: number) => {
    return useQuery({
        queryKey: ["movies-company", companyId],
        queryFn: () => GetMoviesCompany(companyId),

    })
}

export default useGetMoviesCompany