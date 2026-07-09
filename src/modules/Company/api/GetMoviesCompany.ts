import { cacheLife } from "next/cache";
import { client } from "@/lib/client";
import { paths } from "@/schema/tmdb";

export type Movie =
    paths["/3/discover/movie"]["get"]["responses"]["200"]["content"]["application/json"];

export async function GetMoviesCompany(companyId: number) {
    "use cache";

    cacheLife({
        stale: 5400,
        revalidate: 3600,
        expire: 7200,
    });

    const { data: Movie, error } = await client.GET("/3/discover/movie", {
        params: {
            query: {
                include_adult: false,
                sort_by: "vote_average.desc",
                with_companies: String(companyId),
            },
        },
    });

    if (error) throw error;

    return Movie;
}