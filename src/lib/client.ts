import { paths } from "@/schema/tmdb";
import createClient from "openapi-fetch";

export const client = createClient<paths>({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
        accept: "application/json",
    },
});

