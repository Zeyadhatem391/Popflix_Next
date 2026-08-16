"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const genres = {
  Action: "Action",
  Comedy: "Comedy",
  Crime: "Crime",
  Horror: "Horror",
  Family: "Family",
  War: "War",
  Western: "Western",
  History: "History",
} as const;

export default function SelectCategory() {
  const params = useParams();

  const currentCategory = String(params.categoryId ?? "");

  return (
    <div className="mx-4 border-b border-gray-700 py-6 sm:mx-7 sm:py-8">
      <div className="overflow-x-auto scrollbar-hide">
        <ul className="flex w-max items-center gap-2 sm:gap-3">
          {Object.entries(genres).map(([key, value]) => {
            const isActive =
              currentCategory.toLowerCase() === value.toLowerCase();

            return (
              <li key={key}>
                <Link
                  href={`/category/${encodeURIComponent(value)}`}
                  className={`block whitespace-nowrap rounded-full px-4 py-2 text-lg font-semibold transition-all duration-200 sm:px-5 sm:py-2.5 
                    ${isActive ? "bg-gray-500 text-white shadow-md" : " hover:bg-gray-800 "}`}
                >
                  {value}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
