"use client";

import GenreCards from "@/modules/genre/components/GenreCards";


type Props = {
  query: any;
};

export default function MoviesCategory({ query }: Props) {
  return (
   <div className="mx-8 my-8">
     <GenreCards
      movies={query.data?.results ?? []}
      isLoading={query.isLoading}
      error={query.data?.error ?? query.error}
    />
   </div>
  );
}
