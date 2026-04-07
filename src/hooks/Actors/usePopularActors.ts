import { useQuery } from "@tanstack/react-query";
import { PopularActorsResponse } from "@/lib/types/Actor";


const calculateAge = (birthday: string): number => {
  const birthDate = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

const PopularActors = async (): Promise<PopularActorsResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/3/person/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch actors");
  }

  const data = await response.json();

  const actorsWithDetails = await Promise.all(
    data.results.map(async (actor: any) => {
      const detailsRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/3/person/${actor.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );

      const details = await detailsRes.json();

      return {
        ...actor,
        birthday: details.birthday,
      };
    })
  );

  const filteredActors = actorsWithDetails.filter((actor) => {
    if (!actor.birthday) return false;
    return calculateAge(actor.birthday) <= 40;
  });

  return {
    ...data,
    results: filteredActors,
  };
};

const usePopularActors = () => {
  return useQuery<PopularActorsResponse>({
    queryKey: ["popular-actors"],
    queryFn: PopularActors,
  });
};

export default usePopularActors;