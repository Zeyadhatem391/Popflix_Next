import { authOptions } from "@/app/lib/nextAuth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Footer() {
  const session = await getServerSession(authOptions);

  return (
    <footer className="bg-black text-white border-t border-[#333] mt-10">
      <div className="max-w-screen-xl mx-auto px-5 py-10">

        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* Logo / Brand */}
          <div>
            <h2 className="text-2xl font-bold mb-4">🎬 PopFlix</h2>
            <p className="text-gray-400 text-sm">
              Discover the latest movies, actors and trending categories.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase mb-4 text-gray-300">
              Navigation
            </h3>
            <ul className=" text-gray-400 flex gap-4 flex-row md:flex-col">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
              {!session && (
                <li>
                  <Link href="/login" className="hover:text-white transition">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Movies */}
          <div>
            <h3 className="text-sm font-semibold uppercase mb-4 text-gray-300">
              Browse
            </h3>
            <ul className="text-gray-400 flex gap-4 flex-row md:flex-col">
              <li>
                <Link href="/movies" className="hover:text-white transition">
                  Movies
                </Link>
              </li>
              <li>
                <Link href="/actors" className="hover:text-white transition">
                  Actors
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold uppercase mb-4 text-gray-300">
              Follow Us
            </h3>
            <div className="flex gap-4 text-gray-400 flex-row md:flex-col">
              <a href="https://www.facebook.com/share/19wmyZPHU6/?mibextid=wwXIfrhttps://www.facebook.com/share/19wmyZPHU6/?mibextid=wwXIfr" target="_blank" className="hover:text-white transition">Facebook</a>
              <a href="https://wa.me/+201112079745" className="hover:text-white transition" target="_blank">whatsapp</a>
              <a href="https://github.com/Zeyadhatem391" className="hover:text-white transition" target="_blank">GitHub</a>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-[#333] mt-10 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} PopFlix. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}