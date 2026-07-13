import { auth } from "@/auth";

export type Profile = {
  id: string;
  email: string;
  name: string;
  role: string;
  provider: string;
  image: string | null;
};

export async function getProfile(): Promise<Profile | null> {
  const session = await auth();

  if (!session) {
    return null;
  }

  if (session.provider !== "credentials") {
    return null;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_SING}/auth/profile`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return null;
  }

  const profile: Profile = await res.json();

  return profile;
}