import { Movie } from "@/lib/types/Movie";
import { useQuery } from "@tanstack/react-query";

type MoviesResponse = {
  results: Movie[];
  total_pages: number;
};

export const GetGenreMovies = async (
  genreId: number,
  page: number,
  rating: number,
  decade: string,
  language: string,
  sortBy:string,
): Promise<MoviesResponse> => {

  const params = new URLSearchParams({
    api_key: "7b8da597ddda3922e0a74cec92c25b67",
    with_genres: genreId.toString(),
    page: page.toString(),
  });

  if (rating) {
    params.set("vote_average.gte", rating.toString());
  }

  if (decade) {
    params.set("primary_release_date.gte", `${decade}-01-01`);
  }

  if (language) {
    params.set("with_original_language", language);
  }

  if (sortBy) {
    params.set("sort_by", sortBy);
  }

  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?${params.toString()}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await res.json();

  return {
    results: data.results,
    total_pages: Math.min(data.total_pages, 500),
  };
};

const useGetGenreMovies = (
  genreId: number,
  page: number,
  rating: number,
  decade: string,
  language: string,
  sortBy:string
) => {
  return useQuery<MoviesResponse>({
    queryKey: ["genreMovies", genreId, page, rating, decade, language,sortBy],
    queryFn: () => GetGenreMovies(genreId, page, rating, decade, language,sortBy),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export default useGetGenreMovies;