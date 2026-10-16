import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function HeroContentVideo() {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-6 text-center text-white">
      <h1 className="text-5xl font-bold md:text-7xl">Discover Movies</h1>

      <p className="mt-5 text-base text-white/80 md:text-xl">
        Explore your favorite movies and actors.
      </p>

      <div className="relative mt-8 w-full max-w-xl">
        <Link href="/search">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30"
          />

          <Input
            type="search"
            placeholder="Search movies, actors..."
            className="h-14 rounded-full border-white/20 bg-black/40 pl-12 pr-5 text-white placeholder:text-white/60 shadow-lg backdrop-blur-md focus-visible:border-white/50 focus-visible:ring-white/30"
          />
        </Link>
      </div>
    </div>
  );
}
