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
  decade: string;
  language: string;
  reset: () => void;
};

const ratings = [5, 6, 7, 8, 9];

const FilterButtonGenre = ({
  rating,
  decade,
  language,
  reset,
}: FilterProps) => {
  const [selectedRating, setSelectedRating] = useState<number>(rating);
  const [selectedDecade, setSelectedDecade] = useState<string>(decade);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(language);

  const [open, setOpen] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const activeFilters =
    (rating ? 1 : 0) + (decade ? 1 : 0) + (language ? 1 : 0);

  const applyFilter = () => {
    const params = new URLSearchParams(searchParams);

    if (selectedRating) {
      params.set("rating", selectedRating.toString());
    } else {
      params.delete("rating");
    }

    if (selectedDecade) {
      params.set("decade", selectedDecade);
    } else {
      params.delete("decade");
    }

    if (selectedLanguage) {
      params.set("language", selectedLanguage);
    } else {
      params.delete("language");
    }

    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);

    setOpen(false);
  };

  const handleReset = () => {
    setSelectedRating(0);
    setSelectedDecade("");
    setSelectedLanguage("");

    reset();

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={`flex items-center gap-2 rounded-md p-5
  text-lg font-semibold
  border transition-all duration-200
  ${
    activeFilters > 0
      ? "bg-red-600 border-red-600 hover:bg-red-500"
      : "bg-stone-800 border-stone-800 hover:bg-stone-700"
  }`}
        >
          <Filter size={18} />
          Filter {activeFilters > 0 && `(${activeFilters})`}
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
              value={selectedDecade}
              onChange={(e) => setSelectedDecade(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700
              rounded-md px-2 py-1.5 sm:px-3 sm:py-2
              text-xs sm:text-sm
              focus:outline-none"
            >
              <option value="">All</option>
              {[
                "1950",
                "1960",
                "1970",
                "1980",
                "1990",
                "2000",
                "2010",
                "2020",
                "2025",
              ].map((d) => (
                <option key={d} value={d}>
                  {d}s
                </option>
              ))}
            </select>
          </div>

          {/* Language */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 text-zinc-300">
              Language
            </h3>

            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm focus:outline-none"
            >
              <option value="">All</option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="ko">Korean</option>
              <option value="ar">Arabic</option>
              <option value="fr">French</option>
              <option value="ja">Japanese</option>
              <option value="hi">Hindi</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
            <Button
              onClick={handleReset}
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
