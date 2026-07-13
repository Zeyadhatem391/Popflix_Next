import { client } from "@/lib/client";
import { paths } from "@/schema/tmdb";
import { containsBlockedWord } from "@/shared/utils/blockedKeywords";
import { cacheLife } from "next/cache";

export type SearchMovies =
    paths["/3/search/movie"]["get"]["responses"]["200"]["content"]["application/json"];

export const getSearchNavBar = async (searchQuery: string) => {
    "use cache";

    cacheLife("minutes")

    if (!searchQuery.trim()) {
        return {
            data: [],
            error: null,
        };
    }

    if (containsBlockedWord(searchQuery)) {
        return {
            data: [],
            error: "This search term is not allowed.",
        };
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
        return {
            data: [],
            error: "Failed to search movies.",
        };
    }

    return {
        data: data?.results ?? [],
        error: null,
    };
};