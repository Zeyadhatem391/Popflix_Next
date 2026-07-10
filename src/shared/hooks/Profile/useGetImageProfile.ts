import { useQuery } from "@tanstack/react-query";

type Profile = {
  profile_picture: string;
};

const GetImageProfile = async (token: string): Promise<Profile> => {
  const res = await fetch(`/api/profile`, { 
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }

  const data = await res.json();
  return data.data.me;
};

const useGetImageProfile = (token?: string) => {
  return useQuery({
    queryKey: ["ImageProfile"],
    queryFn: () => GetImageProfile(token!),
    enabled: !!token,
  });
};

export default useGetImageProfile;