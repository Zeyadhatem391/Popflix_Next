"use client";

import Link from "next/link";

export default function NotFoundUI() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-bold mb-4 animate-pulse">404</h1>

      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>

      <p className="text-gray-500 mb-6 max-w-md">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-primary text-white hover:opacity-90 transition"
      >
        Back To Home
      </Link>
    </div>
  );
}
