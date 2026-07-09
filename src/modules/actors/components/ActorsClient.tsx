"use client";

import Back from "@/shared/components/common/Back";
import { useRouter, usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import ActorsCards from "./ActorsCards";
import useGetAllActors, {
  GetActors,
} from "@/shared/hooks/Actors/useGetAllActors";

import { PaginationDemo } from "../../home/components/organisms/PaginationGenre";
import InputSearchActors from "./InputSearchActors";
import { useDebounce } from "@/shared/hooks/Search/useDebounce";

type Props = {
  page: number;
  query: string;
};

const ActorsClient = ({ page, query }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const debouncedQuery = useDebounce(query, 800);

  const { data, isLoading } = useGetAllActors(page, debouncedQuery);

  const actors = data?.results || [];
  const totalPages = data?.total_pages || 1;

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > 500) return;

    const params = new URLSearchParams();

    params.set("page", String(newPage));

    if (query.trim()) {
      params.set("query", query);
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const nextPage = page + 1;

    if (nextPage > 500) return;

    queryClient.prefetchQuery({
      queryKey: ["actors", nextPage, debouncedQuery],
      queryFn: () => GetActors(nextPage, debouncedQuery),
    });
  }, [page, debouncedQuery, queryClient]);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex items-center gap-3 w-full my-3">
        <Back />

        <InputSearchActors initialValue={query} />
      </div>

      <div className="my-10">
        <ActorsCards actors={actors} isLoading={isLoading} />
      </div>

      <div className="flex items-center justify-center mt-6">
        <PaginationDemo
          page={page}
          setPage={changePage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default ActorsClient;