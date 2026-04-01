"use client";

import Back from "@/components/common/Back";
import { useRouter, usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ActorsCards from "../components/ActorsCards";
import useGetAllActors, { GetActors } from "@/hooks/Actors/useGetAllActors";

import { PaginationDemo } from "../../../components/PaginationGenre";
import InputSearchActors from "./InputSearchActors";
import { useDebounce } from "@/hooks/Search/useDebounce";

type Props = {
  page: number;
};

const ActorsClient = ({ page }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 800);
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const { data, isLoading } = useGetAllActors(page, debouncedQuery);

  const actors = data?.results || [];
  const totalPages = data?.total_pages || 1;

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > 500) return;

    router.replace(`${pathname}?page=${newPage}`);
  };

  useEffect(() => {
    const nextPage = page + 1;

    if (nextPage > 500) return;
    if (!debouncedQuery) {
      queryClient.prefetchQuery({
        queryKey: ["actors", nextPage],
        queryFn: () => GetActors(nextPage, ""),
      });
    }
  }, [page, debouncedQuery, queryClient]);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex items-center gap-3 w-full my-3">
        <Back />
        <InputSearchActors setSearchQuery={setSearchQuery} />
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
