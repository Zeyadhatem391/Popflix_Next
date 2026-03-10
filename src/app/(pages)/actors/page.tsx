"use client";
export const dynamic = "force-dynamic";
import Back from "@/components/common/Back";
import InputSearch from "@/components/common/InputSearsh";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import SortButton from "../genre/components/SortButton";
import FilterButton from "../genre/components/FilterButton";
// import ActorsCards from "./components/ActorsCards";
import { GetActors } from "@/hooks/useGetAllActors";
import { PaginationDemo } from "../components/PaginationGenre";

const ActorsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const page = Number(searchParams.get("page")) || 1;

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const nextPage = page + 1;
    if (nextPage > 500) return;

    queryClient.prefetchQuery({
      queryKey: ["actors", nextPage],
      queryFn: () => GetActors(nextPage),
    });
  }, [page, queryClient]);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex items-center gap-3 w-full my-3">
        <Back />
        <InputSearch />
      </div>

      <div className="flex flex-col items-center justify-center gap-4 mt-6">
        <h2 className="text-3xl font-bold text-center">Actors</h2>
        <div className="flex items-center gap-3">
          <SortButton />
          <FilterButton />
        </div>
      </div>

      <div className="my-10">
        {/* <ActorsCards page={page} /> */}
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <PaginationDemo page={page} setPage={changePage} />
      </div>
    </div>
  );
};

export default ActorsPage;