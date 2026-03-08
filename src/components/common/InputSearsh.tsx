"use client";

import { Search } from "lucide-react";

const InputSearch = () => {
  return (
    <div className="flex items-center flex-1 bg-black border border-black rounded-full px-4 h-14">
      <Search className="text-white size-5 mr-2" />

      <input
        type="text"
        placeholder="Search movies..."
        className="bg-transparent outline-none text-white w-full placeholder:text-gray-400"
      />
    </div>
  );
};

export default InputSearch;
