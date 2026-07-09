import { client } from "@/lib/client";
import type { paths } from "@/schema/tmdb";


export type SearchGenreMovies =
    paths["/3/search/movie"]["get"]["responses"]["200"]["content"]["application/json"];

export type DiscoverQuery = NonNullable<
    paths["/3/discover/movie"]["get"]["parameters"]["query"]
>;

export type SortBy = NonNullable<DiscoverQuery["sort_by"]>;

export const GetGenreMovie = async (
    genreId: number,
    page: number,
    rating: number,
    decade: string,
    language: string,
    sortBy: SortBy,
    debouncedQuery: string
) => {
    if (debouncedQuery) {
        const { data, error } = await client.GET("/3/search/movie", {
            params: {
                query: {
                    query: debouncedQuery,
                    page,
                    include_adult: false,

                },
            },
        });

        if (error) throw error;
        if (!data) throw new Error("No data returned");

        let results: SearchGenreMovies["results"] = data.results;

        if (rating) {
            results = results?.filter(
                (movie) => movie.vote_average >= rating
            );
        }

        if (language) {
            results = results?.filter(
                (movie) => movie.original_language === language
            );
        }

        results = results?.filter((movie) => {
            if (!movie.release_date) return false;

            const year = new Date(movie.release_date).getFullYear();
            return year >= Number(decade);
        });


        if (genreId) {
            results = results?.filter((movie) =>
                movie.genre_ids?.includes(genreId)
            );
        }

        return {
            results,
            total_pages: Math.min(data.total_pages, 500),
        };
    }

    const { data, error } = await client.GET("/3/discover/movie", {
        params: {
            query: {
                page,
                include_adult: false,
                with_genres: genreId.toString(),
                ...(rating && {
                    "vote_average.gte": rating,
                }),
                ...(decade && {
                    "primary_release_date.gte": `${decade}-01-01`,
                }),
                ...(language && {
                    with_original_language: language,
                }),
                ...(sortBy && {
                    sort_by: sortBy,
                }),

            },
        },
    });

    if (error) throw error;
    if (!data) throw new Error("No data returned");

    return {
        results: data.results,
        total_pages: Math.min(data.total_pages, 500),
    };
};
