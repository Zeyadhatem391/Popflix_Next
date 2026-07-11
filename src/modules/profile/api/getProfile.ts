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

  if (!session?.user) {
    return null;
  }

  if (session.provider === "credentials") {
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
      throw new Error("Failed to fetch profile");
    }

    return await res.json();
  }

  return {
    id: session.user.id ?? "",
    name: session.user.name ?? "",
    email: session.user.email ?? "",
    image: session.user.image ?? null,
    role: session.role ?? "user",
    provider: session.provider,
  };
}