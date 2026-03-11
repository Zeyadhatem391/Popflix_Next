"use client";

import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

type FilterProps = {
  rating: number;
};

const ratings = [5, 6, 7, 8, 9];

const FilterButtonGenre = ({ rating }: FilterProps) => {
  const [selectedRating, setSelectedRating] = useState<number>(rating);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const applyFilter = () => {
    const params = new URLSearchParams(searchParams);

    if (selectedRating) {
      params.set("rating", selectedRating.toString());
    } else {
      params.delete("rating");
    }

    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  };

  const resetFilter = () => {
    const params = new URLSearchParams(searchParams);

    params.delete("rating");
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-2 rounded-md px-4 py-2 sm:px-5 sm:py-3
          text-sm sm:text-lg font-semibold
          bg-stone-800 text-white border border-stone-800
          hover:bg-stone-700 hover:border-stone-700
          transition-all duration-200"
        >
          <Filter size={18} />
          Filter
        </Button>
      </DialogTrigger>

      <DialogContent
        className="bg-zinc-900 text-white border-zinc-800
        max-w-sm sm:max-w-md
        w-[92%]
        rounded-xl
        p-4 sm:p-6"
      >
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-bold">
            Filter Movies
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-3 sm:mt-4">
          {/* Rating */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 text-zinc-300">
              Rating
            </h3>

            <div className="flex flex-wrap gap-2">
              {ratings.map((rate) => (
                <button
                  key={rate}
                  onClick={() => setSelectedRating(rate)}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2
                  text-xs sm:text-sm rounded-md border transition
                  ${
                    selectedRating === rate
                      ? "bg-red-600 border-red-600"
                      : "bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                  }`}
                >
                  {rate}+
                </button>
              ))}
            </div>
          </div>

          {/* Decade */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 text-zinc-300">
              Decade
            </h3>

            <select
              className="w-full bg-zinc-800 border border-zinc-700
              rounded-md px-2 py-1.5 sm:px-3 sm:py-2
              text-xs sm:text-sm
              focus:outline-none"
            >
              <option>2020 - 2025</option>
              <option>2015 - 2020</option>
              <option>2010 - 2015</option>
              <option>2005 - 2010</option>
              <option>2000 - 2005</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 text-zinc-300">
              Sort Order
            </h3>

            <select
              className="w-full bg-zinc-800 border border-zinc-700
              rounded-md px-2 py-1.5 sm:px-3 sm:py-2
              text-xs sm:text-sm
              focus:outline-none"
            >
              <option>Popularity</option>
              <option>Rating</option>
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>

          {/* Language */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 text-zinc-300">
              Language
            </h3>

            <select
              className="w-full bg-zinc-800 border border-zinc-700
              rounded-md px-2 py-1.5 sm:px-3 sm:py-2
              text-xs sm:text-sm
              focus:outline-none"
            >
              <option>All</option>
              <option>English</option>
              <option>French</option>
              <option>Spanish</option>
              <option>Japanese</option>
              <option>Korean</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
            <Button
              onClick={resetFilter}
              className="flex-1 bg-zinc-800 text-white border border-zinc-700 hover:bg-zinc-700 text-sm"
            >
              Reset
            </Button>

            <Button
              onClick={applyFilter}
              className="flex-1 bg-red-600 text-white hover:bg-red-500 text-sm"
            >
              Apply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterButtonGenre;
