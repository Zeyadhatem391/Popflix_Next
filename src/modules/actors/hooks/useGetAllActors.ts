import { useQuery } from "@tanstack/react-query";
import { ActorResponse, GetActors } from "@/modules/actors/api/GetActors";

export default function useGetAllActors(
  page: number,
  query: string
) {
  return useQuery({
    queryKey: ["actors", page, query],
    queryFn: () => GetActors(page, query),
    staleTime: 1000 * 60 * 5,
  });
}