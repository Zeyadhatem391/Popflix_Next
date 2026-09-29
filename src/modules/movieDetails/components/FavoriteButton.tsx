import { auth } from "@/auth";
import FavoriteButtonClient from "./FavoriteButtonClient";
import { cookies } from "next/headers";

type FavoriteButtonProps = {
  idMovie: number;
};

export default async function FavoriteButton({ idMovie }: FavoriteButtonProps) {
  const session = await auth();

  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");

  const user = userCookie ? JSON.parse(userCookie.value) : null;

  const isAuthenticated = !!(session || user);

  const userId = session?.user?.id ?? user?.id;

  return (
    <FavoriteButtonClient
      idMovie={idMovie}
      isAuthenticated={isAuthenticated}
      userId={userId}
    />
  );
}
