"use client";

import { useParams } from "next/navigation";
import useGetGenreMovies from "./useGetGenreMovies";
import { useGenreFilters } from "@/shared/hooks/Genres/useGenreFilters";
import useGenrePrefetch from "./useGenrePrefetch";
import useGenreSearch from "./useGenreSearch";
import { genres } from "../data/genres";

export default function useGenrePage() {
    const params = useParams();

    const genreName = params.genreId as string;

    const id = genres[genreName];

    const search = useGenreSearch();

    const filters = useGenreFilters();

    const query = useGetGenreMovies(
        id,
        filters.page,
        filters.rating,
        filters.decade,
        filters.language,
        filters.sortBy,
        search.debouncedQuery,
    );

    useGenrePrefetch({
        id,
        page: filters.page,
        rating: filters.rating,
        decade: filters.decade,
        language: filters.language,
        sortBy: filters.sortBy,
        debouncedQuery: search.debouncedQuery,
    });

    return {
        genreName,
        id,
        search,
        filters,
        query,
    };
}