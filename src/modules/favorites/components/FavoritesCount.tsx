"use client";

import { useFavoritesStore } from "@/modules/favorites/store/favorites.store";

type Props = {
  userId: string;
};

export default function FavoritesCount({ userId }: Props) {
  const favorites = useFavoritesStore((state) => state.favorites);

  const count = favorites.filter(
    (favorite) => favorite.userId === userId
  ).length;

  return <p className="text-sm">{count} Movies</p>;
}