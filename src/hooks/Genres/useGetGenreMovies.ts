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
  sortBy: string,
  debouncedQuery: string
): Promise<MoviesResponse> => {

  const params = new URLSearchParams({
    api_key: `${process.env.NEXT_PUBLIC_API_KEY}`,
    page: page.toString(),
  });

  let url = "";

  if (debouncedQuery) {
    params.set("query", debouncedQuery);

    url = `${process.env.NEXT_PUBLIC_API_URL}/3/search/movie?${params.toString()}`;
  }

  else {

    params.set("with_genres", genreId.toString());

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

    url = `${process.env.NEXT_PUBLIC_API_URL}/3/discover/movie?${params.toString()}`;
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await res.json();

  let results: Movie[] = data.results;


  if (debouncedQuery) {

    if (rating) {
      results = results.filter(
        (movie) => movie.vote_average >= rating
      );
    }

    if (language) {
      results = results.filter(
        (movie) => movie.original_language === language
      );
    }

    if (decade) {
      results = results.filter((movie) => {
        const year = new Date(movie.release_date).getFullYear();
        return year >= Number(decade);
      });
    }

    if (genreId) {
      results = results.filter((movie) =>
        movie.genre_ids.includes(genreId)
      );
    }
  }

  return {
    results,
    total_pages: Math.min(data.total_pages, 500),
  };
};

const useGetGenreMovies = (
  genreId: number,
  page: number,
  rating: number,
  decade: string,
  language: string,
  sortBy: string,
  debouncedQuery: string
) => {

  return useQuery<MoviesResponse>({
    queryKey: [
      "genreMovies",
      genreId,
      page,
      rating,
      decade,
      language,
      sortBy,
      debouncedQuery,
    ],

    queryFn: () =>
      GetGenreMovies(
        genreId,
        page,
        rating,
        decade,
        language,
        sortBy,
        debouncedQuery
      ),

    staleTime: 1000 * 60 * 5,

    refetchOnWindowFocus: false,
  });

};

export default useGetGenreMovies;