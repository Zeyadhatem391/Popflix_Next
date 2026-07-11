"use client";

import GenreCards from "./GenreCards";

type Props = {
  query: any;
};

export default function GenreMovies({ query }: Props) {
  return (
    <GenreCards
      movies={query.data?.results ?? []}
      isLoading={query.isLoading}
      error={query.data?.error ?? query.error}
    />
  );
}
