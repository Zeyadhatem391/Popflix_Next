import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search } from "@/assets/icons/Icons";

type Props = {
  desktop?: boolean;
};

export default function SearchTrigger({ desktop = false }: Props) {
  if (desktop) {
    return (
      <Link href="/search">
        <div className="relative w-[250px] md:w-[400px] rounded-2xl cursor-pointer">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

          <Input
            type="text"
            placeholder="Search movies..."
            readOnly
            className="pl-10 bg-[#111] border-gray-700 text-white placeholder:text-gray-400 rounded-2xl cursor-pointer"
          />
        </div>
      </Link>
    );
  }

  return (
    <Link href="/search">
      <Search className="w-6 h-6 cursor-pointer" />
    </Link>
  );
}