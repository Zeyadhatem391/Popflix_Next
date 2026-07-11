import { auth } from "@/auth";

export type Profile = {
  id: string;
  email: string;
  name: string;
  role: string;
  provider: string;
  image: string | null;
};

export async function getProfile(): Promise<Profile> {

  const session = await auth();


  if (!(session as any)?.accessToken) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_SING}/auth/profile`,
    {
      headers: {
        Authorization: `Bearer ${(session as any).accessToken}`,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }

  return res.json();
}