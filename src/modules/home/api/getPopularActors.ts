import { cacheLife } from "next/cache";
import { client } from "@/lib/client";
import type { paths } from "@/schema/tmdb";

type PopularResponse =
  paths["/3/person/popular"]["get"]["responses"]["200"]["content"]["application/json"];

export type Actor = NonNullable<PopularResponse["results"]>[number];

export async function getPopularActors() {
  "use cache";

  cacheLife({
    stale: 60 * 60 * 24,
    revalidate: 60 * 60 * 12,
    expire: 60 * 60 * 24 * 2,
  });

  const { data, error } = await client.GET("/3/person/popular");

  if (error) {
    throw error;
  }

  return (data.results ?? []).slice(0, 5);
}