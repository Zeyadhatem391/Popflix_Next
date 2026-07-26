import Link from "next/link";

export default function HeroButton() {
  return (
    <Link
      href="/movies"
      className="cursor-pointer rounded-full bg-red-600 px-8 py-3 font-bold text-white transition-all duration-300 hover:bg-red-700"
    >
      Start Watching
    </Link>
  );
}
