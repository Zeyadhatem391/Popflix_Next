import { cacheLife, cacheTag } from "next/cache";
import { client } from "@/lib/client";
import type { paths } from "@/schema/tmdb";

export type Actor =
    paths["/3/person/{person_id}"]["get"]["responses"]["200"]["content"]["application/json"];

export async function GetActorDetails(id: string) {
    "use cache";

    cacheLife("weeks");
    cacheTag(`actor-${id}`);

    const { data, error } = await client.GET("/3/person/{person_id}", {
        params: {
            path: {
                person_id: Number(id),
            },
        },
    });

    if (error) throw error;
    if (!data) throw new Error("Actor not found");

    return data;
}