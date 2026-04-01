import { ChevronRight } from "lucide-react";
import Link from "next/link";

type RightArrowProps = {
  id: string;
};

const Companies = [
  { id: 174, name: "Warner Bros." },
  { id: 2, name: "Walt Disney Pictures" },
  { id: 33, name: "Universal Pictures" },
  { id: 198834, name: "Netflix" },
  { id: 9383, name: "Blue Sky Studios" },
  { id: 521, name: "DreamWorks Animation" },
  { id: 854, name: "EuropaCorp" },
  { id: 79, name: "Village Roadshow Pictures" },
  { id: 1632, name: "Lionsgate" },
  { id: 25120, name: "Warner Animation Group" },
];

const RightArrow = ({ id }: RightArrowProps) => {
  const currentId = Number(id);

  const currentIndex = Companies.findIndex((c) => c.id === currentId);

  const nextCompanyId =
    currentIndex >= 0 && currentIndex < Companies.length - 1
      ? Companies[currentIndex + 1].id
      : Companies[0].id;

  return (
    <Link
      href={`/company/${nextCompanyId}`}
      className="group flex items-center justify-center 
        w-10 h-10 md:w-12 md:h-12 
        rounded-full bg-zinc-800 
        hover:bg-yellow-400 
        transition-all duration-300"
    >
      <ChevronRight
        className="text-white group-hover:text-black transition-colors duration-300"
        size={30}
      />
    </Link>
  );
};

export default RightArrow;
