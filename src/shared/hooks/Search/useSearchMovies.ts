// import { useQuery } from "@tanstack/react-query";
// import { Movie } from "@/shared/types/Movie";
// import { getSearchNavBar } from "@/modules/home/api/getSearchNavBar";


// const useSearchMovies = (searchQuery: string) => {
//   return useQuery<Movie[]>({
//     queryKey: ["searchMovies", searchQuery],
//     queryFn: () => getSearchNavBar(searchQuery),
//     enabled: !!searchQuery,
//     staleTime: 1000 * 60 * 5,
//   });
// };

// export default useSearchMovies;