import { client } from "@/lib/client";
import { paths } from "@/schema/tmdb";

type SearchPersonResponse =
  paths["/3/search/person"]["get"]["responses"]["200"]["content"]["application/json"];

type PopularPersonResponse =
  paths["/3/person/popular"]["get"]["responses"]["200"]["content"]["application/json"];

export type Actor =
  NonNullable<PopularPersonResponse["results"]>[number];

export type ActorResponse = {
  results: Actor[];
  total_pages: number;
};

export const GetActors = async (
  page: number,
  debouncedQuery: string
): Promise<ActorResponse> => {
  if (debouncedQuery.trim()) {
    const { data, error } = await client.GET("/3/search/person", {
      params: {
        query: {
          query: debouncedQuery,
          page,
        },
      },
    });

    if (error) {
      throw error;
    }

    return {
      results: data.results ?? [],
      total_pages: Math.min(data.total_pages ?? 1, 500),
    };
  }

  const { data, error } = await client.GET("/3/person/popular", {
    params: {
      query: {
        page,
      },
    },
  });

  if (error) {
    throw error;
  }

  return {
    results: data.results ?? [],
    total_pages: Math.min(data.total_pages ?? 1, 500),
  };
};