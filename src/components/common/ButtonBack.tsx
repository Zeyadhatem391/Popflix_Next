import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
export default function ButtonBack() {
  return (
    <div className="absolute top-5 left-5">
      <Link
        href="/"
        className="relative w-17.5 h-17.5 flex items-center justify-center group"
      >
        {/* Outer Border */}
        <span className="absolute inset-2 rounded-full border-2 border-black transition-all duration-500 group-hover:scale-75 group-hover:opacity-0"></span>

        {/* Green Border */}
        <span className="absolute inset-2 rounded-full border-4 border-[#599a53] scale-125 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"></span>

        <FaArrowLeft className="text-white text-2xl z-10 transition-transform duration-500 group-hover:-translate-x-4" />
      </Link>
    </div>
  );
}
