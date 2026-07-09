import Link from "next/link";


const Logo = () => {
  return (
    <Link
      href="/"
      className="text-red-600 font-bold text-2xl italic hover:scale-105 transition"
    >
      PopFlix
    </Link>
  );
};

export default Logo;
