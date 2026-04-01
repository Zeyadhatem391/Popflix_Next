import { ChevronLeft } from "lucide-react";

const LeftArrow = () => {
  return (
    <button
      className="group flex items-center justify-center 
            w-10 h-10 md:w-12 md:h-12 
            rounded-full bg-zinc-800 
            hover:bg-yellow-400 
            transition-all duration-300"
    >
      <ChevronLeft
        className="text-white group-hover:text-black transition-colors duration-300"
        size={30}
      />
    </button>
  );
};

export default LeftArrow;
