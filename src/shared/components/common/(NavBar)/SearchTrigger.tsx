"use client";

import { useState } from "react";

import { Search } from "@/assets/icons/Icons";
import SearchNavBar from "./SearchNavBar";
import { Input } from "@/components/ui/input";

type Props = {
  desktop?: boolean;
};

export default function SearchTrigger({ desktop = false }: Props) {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <>
      {desktop ? (
        <div onClick={() => setOpenSearch(true)}>
          <div className="relative w-[250px] md:w-[400px] rounded-2xl cursor-pointer">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <Input
              type="text"
              placeholder="Search movies..."
              readOnly
              className="pl-10 bg-[#111] border-gray-700 text-white placeholder:text-gray-400 rounded-2xl cursor-pointer"
            />
          </div>
        </div>
      ) : (
        <Search
          className="w-4 h-4 cursor-pointer"
          onClick={() => setOpenSearch(true)}
        />
      )}

      {openSearch && (
        <SearchNavBar
          open={openSearch}
          setOpen={setOpenSearch}
        />
      )}
    </>
  );
}