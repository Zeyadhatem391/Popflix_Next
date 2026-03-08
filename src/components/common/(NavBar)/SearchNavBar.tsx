import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";

const SearchNavBar = () => {
  return (
    <>
      {/* Desktop Search */}
      <div className="relative w-[400px] hidden md:block rounded-2xl">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

        <Input
          type="text"
          placeholder="Search movies..."
          className="pl-10 bg-[#111] border-gray-700 text-white placeholder:text-gray-400 focus-visible:ring-gray-500 rounded-2xl"
        />
      </div>

      {/* Mobile Icon */}
     
    </>
  );
};

export default SearchNavBar;