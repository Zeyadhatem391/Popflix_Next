"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { useState } from "react";

const sortOptions = [
  { label: "Popularity", value: "popularity" },
  { label: "Rating", value: "vote_average" },
  { label: "Release Date", value: "primary_release_date" },
];

const SortButtonGenre = () => {
  const [sortType, setSortType] = useState("popularity");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const currentSort =
    sortOptions.find((s) => s.value === sortType)?.label || "Popularity";

  const toggleOrder = () => {
    setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex items-center gap-2 rounded-md p-5 text-lg font-semibold
          bg-stone-800 text-white border border-stone-800
          hover:bg-stone-700 hover:border-stone-700
          transition-all duration-200"
        >
          <ArrowUpDown size={18} />
          Sort: {currentSort}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 bg-zinc-900 border border-zinc-800 text-white rounded-lg p-4 space-y-4 ml-10"
      >
        {/* title */}
        <h4 className="text-sm font-semibold text-zinc-300">Sort By</h4>

        {/* sort options */}
        <div className="flex flex-col gap-2">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSortType(option.value)}
              className={`text-left px-3 py-2 rounded-md text-sm transition
              ${
                sortType === option.value
                  ? "bg-red-600 text-white"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* divider */}
        <div className="border-t border-zinc-800" />

        {/* order toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-300">Order</span>

          <button
            onClick={toggleOrder}
            className="relative w-20 h-8 bg-zinc-800 border border-zinc-700 rounded-full flex items-center px-1 transition"
          >
            {/* slider */}
            <span
              className={`absolute top-1 w-6 h-6 rounded-full bg-red-600 transition-all duration-300
              ${order === "asc" ? "left-[46px]" : "left-1"}`}
            />

            {/* icons */}
            <div className="flex justify-between w-full px-1 text-white z-10">
              <ArrowDown
                size={14}
                className={order === "desc" ? "opacity-100" : "opacity-40"}
              />
              <ArrowUp
                size={14}
                className={order === "asc" ? "opacity-100" : "opacity-40"}
              />
            </div>
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortButtonGenre;
