import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

const SortButtonGenre = () => {
  return (
    <Button
      className="flex items-center gap-2 rounded-md p-5 text-lg font-semibold
      bg-stone-800 text-white border border-stone-800
      hover:bg-stone-700 hover:border-stone-700
      transition-all duration-200"
    >
      <ArrowUpDown size={20} />
      Sort By
    </Button>
  );
};

export default SortButtonGenre;
