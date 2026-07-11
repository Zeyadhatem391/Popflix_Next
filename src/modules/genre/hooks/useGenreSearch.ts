"use client";

import { useState } from "react";
import { useDebounce } from "@/shared/hooks/Search/useDebounce";

export default function useGenreSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedQuery = useDebounce(searchQuery, 800);

  return {
    searchQuery,
    setSearchQuery,
    debouncedQuery,
  };
}