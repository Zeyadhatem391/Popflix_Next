import HoverPrefetchLink from "../hover-prefetch/HoverPrefetchLink";
import LoginLink from "../molecules/LoginLink";
import { Suspense } from "react";

export default async function Footer() {
  return (
    <footer className="text-white border-t border-[#333] mt-10">
      <div className="max-w-screen-xl mx-auto px-5 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">🎬 PopFlix</h2>
            <p className="text-gray-400 text-sm">
              Discover the latest movies, actors and trending categories.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase mb-4 text-gray-300">
              Navigation
            </h3>
            <ul className=" text-gray-400 flex gap-4 flex-row md:flex-col">
              <li>
                <HoverPrefetchLink href="/about">
                  <div className="hover:text-white transition">About</div>
                </HoverPrefetchLink>
              </li>
              <li>
                <HoverPrefetchLink href="/contact">
                  <div className="hover:text-white transition">Contact</div>
                </HoverPrefetchLink>
              </li>
              <Suspense fallback="loading">
                <LoginLink />
              </Suspense>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase mb-4 text-gray-300">
              Browse
            </h3>
            <ul className="text-gray-400 flex gap-4 flex-row md:flex-col">
              <li>
                <HoverPrefetchLink href="/movies">
                  <div className="hover:text-white transition">Movies</div>
                </HoverPrefetchLink>
              </li>
              <li>
                <HoverPrefetchLink href="/actors">
                  <div className="hover:text-white transition">Actors</div>
                </HoverPrefetchLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase mb-4 text-gray-300">
              Follow Us
            </h3>
            <div className="flex gap-4 text-gray-400 flex-row md:flex-col">
              <a
                href="https://www.facebook.com/share/19wmyZPHU6/?mibextid=wwXIfrhttps://www.facebook.com/share/19wmyZPHU6/?mibextid=wwXIfr"
                target="_blank"
                className="hover:text-white transition"
              >
                Facebook
              </a>
              <a
                href="https://wa.me/+201112079745"
                className="hover:text-white transition"
                target="_blank"
              >
                whatsapp
              </a>
              <a
                href="https://github.com/Zeyadhatem391"
                className="hover:text-white transition"
                target="_blank"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#333] mt-10 pt-6 text-center text-gray-500 text-sm">
          © 2026 PopFlix. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
