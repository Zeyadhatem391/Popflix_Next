"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export const useGenreFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const rating = Number(searchParams.get("rating")) || 0;
  const decade = searchParams.get("decade") || "";
  const language = searchParams.get("language") || "";
  const sort = searchParams.get("sort") || "popularity.desc";
  const page = Number(searchParams.get("page")) || 1;

  const updateFilter = (key: string, value: string | number) => {
    const params = new URLSearchParams(searchParams);

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value.toString());
    }

    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  };

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  const resetFilters = () => {
    router.push(pathname);
  };

  return {
    rating,
    decade,
    language,
    sort,
    page,
    updateFilter,
    changePage,
    resetFilters,
  };
};