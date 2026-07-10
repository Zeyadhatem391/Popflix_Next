import { cacheLife } from "next/cache";
import { client } from "@/lib/client";
import type { paths } from "@/schema/tmdb";

type DiscoverResponse =
  paths["/3/discover/movie"]["get"]["responses"]["200"]["content"]["application/json"];

export async function GetCategories() {
  "use cache";

  cacheLife({
    stale: 60 * 60 * 24,
    revalidate: 60 * 60 * 12,
    expire: 60 * 60 * 24 * 2,
  });

  const { data, error } = await client.GET("/3/genre/movie/list");

  if (error) throw error;

  const genres = data?.genres ?? [];

  const categories = await Promise.all(
    genres.map(async (genre) => {
      const { data: movies, error } = await client.GET("/3/discover/movie", {
        params: {
          query: {
            with_genres: String(genre.id),
            page: 1,
          },
        },
      });

      if (error) throw error;

      const movie = (movies as DiscoverResponse)?.results?.[0];

      return {
        id: genre.id,
        name: genre.name,
        image: movie?.backdrop_path
          ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
          : movie?.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : null,
      };
    }),
  );

  return categories;
}