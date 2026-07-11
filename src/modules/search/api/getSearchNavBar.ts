import { client } from "@/lib/client";
import { paths } from "@/schema/tmdb";
import { Movie } from "@/shared/types/Movie";
import { containsBlockedWord } from "@/shared/utils/blockedKeywords";
import { cacheLife } from "next/cache";

export type SearchMovies =
    paths["/3/search/movie"]["get"]["responses"]["200"]["content"]["application/json"];

export const getSearchNavBar = async (
    searchQuery: string
) => {
    "use cache";

    cacheLife({
        stale: 60 * 60 * 24,
        revalidate: 60 * 60 * 12,
        expire: 60 * 60 * 24 * 2,
    });

    if (!searchQuery.trim()) {
        return [];
    }

    if (containsBlockedWord(searchQuery)) {
        throw new Error("This search term is not allowed.");
    }

    const { data, error } = await client.GET("/3/search/movie", {
        params: {
            query: {
                query: searchQuery,
                include_adult: false,
            },
        },
    });

    if (error) {
        throw error;
    }

    return (data?.results ?? []);
};