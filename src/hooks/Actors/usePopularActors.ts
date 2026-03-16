import { useQuery } from "@tanstack/react-query";
import { PopularActorsResponse } from "@/lib/types/Actor";

const PopularActors = async (): Promise<PopularActorsResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/3/person/popular?api_key=7b8da597ddda3922e0a74cec92c25b67`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch actors");
  }

  return response.json();
};

const usePopularActors = () => {
  return useQuery<PopularActorsResponse>({
    queryKey: ["popular-actors"],
    queryFn: PopularActors,
  });
};

export default usePopularActors;