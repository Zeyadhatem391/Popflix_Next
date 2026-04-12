"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { IoMenuSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";

const MenuPage = () => {
  const router = useRouter();

  const goToActors = () => {
    router.push("/actors"); 
  };

  const goToMovies = () => {
    router.push("/movies"); 
  };

  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild id="menu-trigger-1">
        <Button className="p-1 md:p-2 bg-stone-800 text-white rounded-md hover:bg-stone-700">
          <IoMenuSharp size={20} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="center"
        className="bg-zinc-900 border border-zinc-800 text-white rounded-lg p-2 "
      >
        <DropdownMenuItem onClick={goToActors} className="px-4 py-2 hover:bg-stone-700 rounded-md">
          All Actors
        </DropdownMenuItem>
        <DropdownMenuItem onClick={goToMovies} className="px-4 py-2 hover:bg-stone-700 rounded-md">
          All Movies
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuPage;