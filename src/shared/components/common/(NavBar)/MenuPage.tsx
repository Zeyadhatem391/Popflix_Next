"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Menu } from "@/assets/icons/Icons";
import { useRouter } from "next/navigation";

const MenuPage = () => {
  const router = useRouter();

  const goToHome = () => {
    router.push("/");
  };

  const goToActors = () => {
    router.push("/actors");
  };

  const goToMovies = () => {
    router.push("/movies");
  };

  const goToCategory = () => {
    router.push("/category/Action");
  };

  return (
    <>
      <div className="hidden lg:block">
        <ul className="flex gap-7">
          <li>
            <button
              className="cursor-pointer hover:text-gray-200"
              onClick={goToHome}
            >
              Home
            </button>
          </li>
          <li>
            <button
              className="cursor-pointer hover:text-gray-200"
              onClick={goToActors}
            >
              Actors
            </button>
          </li>
          <li>
            <button
              className="cursor-pointer hover:text-gray-200"
              onClick={goToMovies}
            >
              Movies
            </button>
          </li>
          <li>
            <button
              className="cursor-pointer hover:text-gray-200"
              onClick={goToCategory}
            >
              Category
            </button>
          </li>
        </ul>
      </div>

      <div className="lg:hidden block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild id="menu-trigger-1">
            <Button className="p-1 md:p-2 ds-bg-form text-white rounded-md hover:bg-stone-700">
              <Menu size={20} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="center"
            className="bg-zinc-900 border border-zinc-800 text-white rounded-lg p-2 "
          >
             <DropdownMenuItem
              onClick={goToHome}
              className="px-4 py-2 hover:bg-stone-700 rounded-md"
            >
              Home
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={goToActors}
              className="px-4 py-2 hover:bg-stone-700 rounded-md"
            >
              Actors
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={goToMovies}
              className="px-4 py-2 hover:bg-stone-700 rounded-md"
            >
              Movies
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={goToCategory}
              className="px-4 py-2 hover:bg-stone-700 rounded-md"
            >
              Category
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default MenuPage;
