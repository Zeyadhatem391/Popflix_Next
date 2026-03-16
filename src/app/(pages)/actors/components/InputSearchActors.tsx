"use client";

import { Search } from "lucide-react";
import { useState } from "react";

type InputSearchActorsProps = {
  setSearchQuary: (value: string) => void;
};

const InputSearchActors = ({ setSearchQuary }: InputSearchActorsProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSearchQuary(value);
  };

  return (
    <div className="flex items-center flex-1 bg-[#111] hover:border hover:border-gray-300 rounded-full px-4 h-14">
      <Search className="text-white size-5 mr-2" />

      <input
        type="text"
        placeholder="Search Actors..."
        className="bg-transparent outline-none text-white w-full placeholder:text-gray-400"
        value={query}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputSearchActors;
