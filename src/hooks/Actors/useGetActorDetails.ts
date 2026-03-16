import { useQuery } from "@tanstack/react-query";

export type Actor = {
  id: number;
  name: string;
  birthday: string;
  known_for_department: string;
  place_of_birth: string;
  biography: string;
  profile_path: string;
};

const GetActorDetails = async (id: string): Promise<Actor> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/3/person/${id}?api_key=7b8da597ddda3922e0a74cec92c25b67`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie");
  }

  return response.json();
};

const useGetActorDetails = (id: string) => {
  return useQuery({
    queryKey: ["actor", id],
    queryFn: () => GetActorDetails(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
};

export default useGetActorDetails;
