import Link from "next/link";
import { Search } from "@/assets/icons/Icons";

export default function SearchTrigger() {
  return (
    <Link href="/search">
      <Search className="w-6 h-6 cursor-pointer" />
    </Link>
  );
}
