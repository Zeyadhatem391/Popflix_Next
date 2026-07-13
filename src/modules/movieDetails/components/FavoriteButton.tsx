import { auth } from "@/auth";
import FavoriteButtonClient from "./FavoriteButtonClient";

type FavoriteButtonProps = {
  idMovie: number;
};

export default async function FavoriteButton({ idMovie }: FavoriteButtonProps) {
  const session = await auth();

  return <FavoriteButtonClient idMovie={idMovie} isAuthenticated={!!session} />;
}
