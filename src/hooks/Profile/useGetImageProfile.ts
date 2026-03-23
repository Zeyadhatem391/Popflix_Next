import { useQuery } from "@tanstack/react-query";

type Profile = {
    profile_picture: string
}

const GetImageProfile = async (token: string): Promise<Profile> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_SING}/api/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    });

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