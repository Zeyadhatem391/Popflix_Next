import { NotFound } from "@/assets/images/images";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

export const getMovieImage = (posterPath?: string | null) => {
    return posterPath ? `${IMAGE_BASE}${posterPath}` : NotFound;
};