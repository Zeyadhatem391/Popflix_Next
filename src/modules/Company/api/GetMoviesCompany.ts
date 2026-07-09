import { client } from "@/lib/client";
import { paths } from "@/schema/tmdb";


export type Movie =
    paths["/3/discover/movie"]["get"]["responses"]["200"]["content"]["application/json"];


export const GetMoviesCompany = async (companyId: number) => {
    const id = String(companyId);
    const [
        { data: Movie, error: MovieError },
    ] = await Promise.all([
        client.GET("/3/discover/movie", {
            params: {
                query: {
                    include_adult: false,
                    sort_by: "vote_average.asc",

                    "vote_average.gte": 100,
                    with_companies: id,

                }
            },
        }),

    ]);
    if (MovieError) throw MovieError;

    return {
        Movie,
    };
};

