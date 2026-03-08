import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

const FilterButton = () => {
  return (
    <Button
      className="flex items-center gap-2 rounded-md p-5  
      text-lg font-semibold
      bg-stone-800 text-white border border-stone-800
      hover:bg-stone-700 hover:border-stone-700
      transition-all duration-200"
    >
      <Filter size={20} />
      Filter
    </Button>
  );
};

export default FilterButton;
