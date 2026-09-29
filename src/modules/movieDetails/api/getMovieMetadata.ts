import { cacheLife } from "next/cache";
import { client } from "@/lib/client";
import type { paths } from "@/schema/tmdb";

type Movie =
  paths["/3/movie/{movie_id}"]["get"]["responses"]["200"]["content"]["application/json"];

export async function getMovieMetadata(movieId: string) {
  "use cache";

  cacheLife({
    stale: 60 * 60 * 24,
    revalidate: 60 * 60 * 12,
    expire: 60 * 60 * 24 * 2,
  });

  const id = Number(movieId);

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid movie ID");
  }

  const { data, error } = await client.GET("/3/movie/{movie_id}", {
    params: {
      path: {
        movie_id: id,
      },
    },
  });

  if (error) {
    throw error;
  }

  return data as Movie;
}
