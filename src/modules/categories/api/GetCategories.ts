import { client } from "@/lib/client";
import { paths } from "@/schema/tmdb";

type GenresResponse =
    paths["/3/genre/movie/list"]["get"]["responses"]["200"]["content"]["application/json"];

type DiscoverResponse =
    paths["/3/discover/movie"]["get"]["responses"]["200"]["content"]["application/json"];

export interface CategoryWithImage {
    id: number;
    name: string;
    image: string | null;
}

export const GetCategories = async () => {
    const { data, error } = await client.GET("/3/genre/movie/list");

    if (error) throw error;

    const genres = data?.genres;

    if (!genres) {
        throw new Error("Genres not found");
    }

    const categories = await Promise.all(
        genres.map(async (genre) => {
            const genreId = String(genre.id)
            const { data: movies } = await client.GET("/3/discover/movie", {
                params: {
                    query: {
                        with_genres: genreId,
                        page: 1,
                    },
                },
            });

            const movie = (movies as DiscoverResponse)?.results?.[0];

            return {
                id: genre.id,
                name: genre.name,
                image: movie?.backdrop_path
                    ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
                    : movie?.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : null,
            };
        })
    );

    return {
        Categories: categories,
    };
};