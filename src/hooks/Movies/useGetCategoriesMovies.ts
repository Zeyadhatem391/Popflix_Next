"use client";
import { useQuery } from "@tanstack/react-query";

const IMG_URL = "https://image.tmdb.org/t/p/w500";

export type Genre = {
    id: number;
    name: string;
};

export type Category = {
    id: number;
    name: string;
    image: string | null;
};

const fetchCategoriesMovies = async (): Promise<Category[]> => {
    const res = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&include_adult=false`
    );

    if (!res.ok) throw new Error("Failed to fetch categories");

    const data: { genres: Genre[] } = await res.json();

    const categoriesWithImages: Category[] = await Promise.all(
        data.genres.slice(0, 12).map(async (genre: Genre) => {
            const movieRes = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=${genre.id}&include_adult=false`
            );

            const movieData = await movieRes.json();

            return {
                id: genre.id,
                name: genre.name,
                image: movieData.results?.[0]?.poster_path
                    ? IMG_URL + movieData.results[0].poster_path
                    : null,
            };
        })
    );

    return categoriesWithImages;
};

export const useGetCategoriesMovies = () => {
    return useQuery<Category[]>({
        queryKey: ["categories-movies"],
        queryFn: fetchCategoriesMovies,
        staleTime: 60 * 1000 * 5,
    });
};

