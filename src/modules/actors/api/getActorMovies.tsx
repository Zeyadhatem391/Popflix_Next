import { cacheLife } from "next/cache";
import { client } from "@/lib/client";
import type { paths } from "@/schema/tmdb";

type CombinedCreditsResponse =
  paths["/3/person/{person_id}/combined_credits"]["get"]["responses"]["200"]["content"]["application/json"];

export type ActorMovie = NonNullable<CombinedCreditsResponse["cast"]>[number];

export async function getActorMovies(personId: string) {
  "use cache";

  cacheLife({
    stale: 60 * 60 * 24,
    revalidate: 60 * 60 * 12,
    expire: 60 * 60 * 24 * 2,
  });

  const { data, error } = await client.GET(
    "/3/person/{person_id}/combined_credits",
    {
      params: {
        path: {
          person_id: personId,
        },
      },
    },
  );

  if (error) {
    throw error;
  }

  return (data.cast ?? []).slice(0, 15);
}
