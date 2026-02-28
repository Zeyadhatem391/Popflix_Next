import { authOptions } from "@/app/lib/nextAuth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Footer() {
  const session = await getServerSession(authOptions);

  return (
    <footer className="bg-[#111] text-white px-5 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border-t border-[#333]">
      {/* Navigation */}
      <div className="flex gap-3 flex-wrap">
        <Link href="/about">
          <button className="bg-transparent border border-[#444] px-3 py-2 rounded-lg hover:bg-[#222] transition duration-300 cursor-pointer">
            About
          </button>
        </Link>

        <Link href="/contact">
          <button className="bg-transparent border border-[#444] px-3 py-2 rounded-lg hover:bg-[#222] transition duration-300 cursor-pointer">
            Contact
          </button>
        </Link>

        {!session && (
          <Link href="/login">
            <button className="bg-transparent border border-[#444] px-3 py-2 rounded-lg hover:bg-[#222] transition duration-300 cursor-pointer">
              Login
            </button>
          </Link>
        )}
      </div>

      {/* Action Button */}
      <div>
        <Link href="/movies">
          <button className="bg-[#444] px-4 py-2 rounded-lg font-bold hover:bg-[#666] transition duration-300 cursor-pointer">
            🎬 Movies
          </button>
        </Link>
      </div>
    </footer>
  );
}
