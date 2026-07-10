import { client } from "@/lib/client";
import { cacheLife } from "next/cache";
import { paths } from "@/schema/tmdb";

export type Movie =
    NonNullable<
        paths["/3/discover/movie"]["get"]["responses"]["200"]["content"]["application/json"]["results"]
    >[number];

export async function getMovies(genreId: number): Promise<Movie[]> {
    "use cache";

    cacheLife({
        revalidate: 3600,
        expire: 7200,
    });


    const { data, error } = await client.GET("/3/discover/movie", {
        params: {
            query: {
                include_adult: false,
                "with_genres": String(genreId)
            },
        },
    });

    if (error) throw error;

    return data.results?.slice(0, 20) ?? [];
}
