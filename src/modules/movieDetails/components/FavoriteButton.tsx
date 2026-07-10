"use client";

import FavoriteButtonClient from "./FavoriteButtonClient";

type FavoriteButtonProps = {
  idMovie: number;
};

export default function FavoriteButton({
  idMovie,
}: FavoriteButtonProps) {
  return (
    <FavoriteButtonClient
      idMovie={idMovie}
      isAuthenticated={false}
    />
  );
}