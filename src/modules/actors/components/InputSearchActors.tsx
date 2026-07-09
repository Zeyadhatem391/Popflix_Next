"use client";

import { Search } from "@/assets/icons/Icons";
import { useEffect, useState } from "react";
import { useDebounce } from "@/shared/hooks/Search/useDebounce";
import { usePathname, useRouter } from "next/navigation";

type InputSearchActorsProps = {
  initialValue: string;
};

const InputSearchActors = ({ initialValue }: InputSearchActorsProps) => {
  const [query, setQuery] = useState(initialValue);

  const debouncedQuery = useDebounce(query, 800);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams();

    params.set("page", "1");

    if (debouncedQuery.trim()) {
      params.set("query", debouncedQuery);
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, [debouncedQuery, pathname, router]);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  return (
    <div className="flex items-center flex-1 bg-[#111] hover:border hover:border-gray-300 rounded-full px-4 h-14">
      <Search className="text-white size-5 mr-2" />

      <input
        type="text"
        placeholder="Search Actors..."
        className="bg-transparent outline-none text-white w-full placeholder:text-gray-400"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default InputSearchActors;
