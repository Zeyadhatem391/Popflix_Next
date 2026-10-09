"use client";

import { Play } from "lucide-react";

interface WatchTrailerButtonProps {
  trailerKey?: string;
}

export default function WatchTrailerButton({
  trailerKey,
}: WatchTrailerButtonProps) {
  if (!trailerKey) return null;

  const handleClick = () => {
    document.getElementById("movie-trailer")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center text-sm lg:text-base cursor-pointer gap-2 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-red-700 hover:shadow-lg active:scale-95"
    >
      <Play className="size-4 lg:size-5 fill-current" />
      Watch Trailer
    </button>
  );
}
