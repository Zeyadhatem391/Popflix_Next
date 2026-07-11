import { client } from "@/lib/client";
import { cacheLife } from "next/cache";
import { paths } from "@/schema/tmdb";

export type HeroMovie =
  NonNullable<
    paths["/3/discover/movie"]["get"]["responses"]["200"]["content"]["application/json"]["results"]
  >[number];

export async function getHeroMovies(): Promise<HeroMovie[]> {
  "use cache";

  cacheLife({
    revalidate: 3600,
    expire: 7200,
  });

  const randomPage = Math.floor(Math.random() * 5) + 1;

  const { data, error } = await client.GET("/3/discover/movie", {
    params: {
      query: {
        include_adult: false,
        with_original_language: "ar",
        page: randomPage,
        "primary_release_date.gte": "2020-01-01",
      },
    },
  });

  if (error) throw error;

  return (
    data.results
      ?.filter(
        (movie) =>
          movie.backdrop_path !== null &&
          movie.poster_path !== null
      )
      .slice(0, 10) ?? []
  );
}