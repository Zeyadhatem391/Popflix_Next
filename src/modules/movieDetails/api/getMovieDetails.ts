import { client } from "@/lib/client";
import type { paths } from "@/schema/tmdb";

export type MovieDetails =
  paths["/3/movie/{movie_id}"]["get"]["responses"]["200"]["content"]["application/json"];

export async function getMovieDetails(movieId: string) {
  

  const id = Number(movieId);

  const [
    { data: movie, error: movieError },
    { data: videos, error: videosError },
    { data: credits, error: creditsError },
  ] = await Promise.all([
    client.GET("/3/movie/{movie_id}", {
      params: {
        path: {
          movie_id: id,
        },
      },
    }),

    client.GET("/3/movie/{movie_id}/videos", {
      params: {
        path: {
          movie_id: id,
        },
      },
    }),

    client.GET("/3/movie/{movie_id}/credits", {
      params: {
        path: {
          movie_id: id,
        },
      },
    }),
  ]);

  if (movieError) throw movieError;
  if (videosError) throw videosError;
  if (creditsError) throw creditsError;

  return {
    movie,
    videos,
    credits,
  };
}