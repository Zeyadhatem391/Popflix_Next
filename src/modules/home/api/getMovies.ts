import { client } from "@/lib/client";
import { paths } from "@/schema/tmdb";
import { cacheLife } from "next/cache";

export type MoviesNow = paths["/3/movie/now_playing"]["get"]["responses"]["200"]["content"]["application/json"];
export type MoviesUpcoming = paths["/3/movie/upcoming"]["get"]["responses"]["200"]["content"]["application/json"];

export async function getMovies() {
    "use cache";

    cacheLife({
        stale: 5400,
        revalidate: 3600,
        expire: 7200,
    });

    const [
        { data: moviesNow, error: moviesNowError },
        { data: moviesUpcoming, error: moviesUpcomingError },
    ] = await Promise.all([
        client.GET("/3/movie/now_playing"),
        client.GET("/3/movie/upcoming"),
    ]);

    if (moviesNowError) throw moviesNowError;
    if (moviesUpcomingError) throw moviesUpcomingError;

    return {
        moviesNow: {
            ...moviesNow,
            results: moviesNow?.results?.slice(0, 5) ?? [],
        },

        moviesUpcoming: {
            ...moviesUpcoming,
            results: moviesUpcoming?.results?.slice(0, 5) ?? [],
        },
    };
}