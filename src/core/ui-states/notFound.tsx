"use client";

import Link from "next/link";
import { ArrowLeft, Home, Search, Ghost } from "@/assets/icons/Icons";

export default function NotFoundUI() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center py-20 relative overflow-hidden bg-gradient-to-b from-[#020617] via-[#0F172A] to-black">
      <div className="container max-w-[1240px] mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Ghost + 404 */}
          <div className="mb-8 relative inline-block">
            <div className="relative z-10 text-[#4DA8DA] opacity-90 mx-auto">
              <Ghost size={120} strokeWidth={1.5} />
            </div>

            <h1 className="text-[160px] md:text-[220px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#4DA8DA] to-[#4DA8DA10] select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 -z-10">
              404
            </h1>
          </div>

          {/* Text Content */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Oops! Page not found
            </h2>

            <p className="text-lg text-slate-400 max-w-md mx-auto leading-relaxed">
              The page you're searching for might have been moved, removed, or
              never existed in the first place.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="group flex items-center gap-2 px-8 py-4 bg-[#014162] text-white rounded-2xl font-semibold shadow-xl shadow-[#01416240] hover:bg-[#02507A] hover:-translate-y-1 transition-all duration-300 active:translate-y-0"
            >
              <Home
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
              Back to Home
            </Link>

            <Link
              href="/shop"
              className="group flex items-center gap-2 px-8 py-4 bg-[#111827] border border-slate-700 text-slate-200 rounded-2xl font-semibold hover:bg-[#1F2937] hover:border-slate-600 transition-all duration-300"
            >
              <Search
                size={20}
                className="group-hover:rotate-12 transition-transform text-slate-400 group-hover:text-[#4DA8DA]"
              />
              Search Products
            </Link>
          </div>

          {/* Secondary Action */}
          <div className="mt-16 pt-8 border-t border-slate-800">
            <button
              onClick={() => window.history.back()}
              className="text-slate-400 hover:text-[#4DA8DA] inline-flex items-center gap-2 font-medium transition-colors"
            >
              <ArrowLeft size={16} />
              Go back to previous page
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#014162]/20 blur-[150px] rounded-full -z-10"></div>

      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 -z-20 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      ></div>
    </main>
  );
}