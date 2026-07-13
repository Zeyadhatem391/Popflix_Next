"use client";

import { Search } from "@/assets/icons/Icons";
import { useEffect, useState } from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

type InputSearchProps = {
  setSearchQuery: (value: string) => void;
  genreName: string;
};

const InputSearch = ({
  setSearchQuery,
  genreName,
}: InputSearchProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("query") ?? "";

  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setQuery(value);
    setSearchQuery(value);

    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("query", value);
    } else {
      params.delete("query");
    }

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="flex items-center flex-1 bg-[#111] hover:border hover:border-gray-300 rounded-full px-4 h-14">
      <Search className="text-white size-5 mr-2" />

      <input
        type="text"
        placeholder={`Search movies in ${genreName}...`}
        className="bg-transparent outline-none text-white w-full placeholder:text-gray-400"
        value={query}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputSearch;