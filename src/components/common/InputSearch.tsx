"use client";

import { Search } from "lucide-react";
import { useState } from "react";

type InputSearchProps = {
  setSearchQuery: (value: string) => void;
  genreName: string;
};

const InputSearch = ({ setSearchQuery, genreName }: InputSearchProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSearchQuery(value);
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