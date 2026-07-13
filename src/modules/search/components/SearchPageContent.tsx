import Image from "next/image";
import Link from "next/link";

import { getSearchNavBar } from "@/modules/search/api/getSearchNavBar";
import SearchInput from "./SearchInput";

type Props = {
  searchParams: Promise<{
    query?: string;
  }>;
};

export default async function SearchPageContent({
  searchParams,
}: Props) {
  const { query = "" } = await searchParams;

  const result = await getSearchNavBar(query);

  const movies = result.data;
  const error = result.error;

  return (
    <div className="min-h-screen bg-black text-white pt-10">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <SearchInput initialValue={query} />

        <div className="mt-8 space-y-4">
          {error && (
            <p className="text-center text-red-500">
              {error}
            </p>
          )}

          {!error && query && movies.length === 0 && (
            <p className="text-center text-gray-400">
              No movies found.
            </p>
          )}

          {!error &&
            movies.map((movie) => (
              <Link
                key={movie.id}
                href={`/movies/${movie.id}`}
                className="flex items-center justify-between rounded-xl p-4 transition hover:bg-zinc-900"
              >
                <div className="flex items-center gap-4">
                  {movie.poster_path && (
                    <Image
                      src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                      alt={movie.title || "Movie"}
                      width={120}
                      height={180}
                      className="rounded-lg object-cover"
                    />
                  )}

                  <h2 className="text-xl font-semibold">
                    {movie.title}
                  </h2>
                </div>

                <span>⭐ {movie.vote_average.toFixed(1)}</span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}