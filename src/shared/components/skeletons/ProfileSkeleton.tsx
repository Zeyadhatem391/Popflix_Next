"use client";

export default function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex justify-center items-start py-20 px-4">
      <div className="w-full max-w-2xl bg-[#141414] rounded-2xl shadow-2xl p-8 border border-[#222] animate-pulse">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 pb-8 border-b border-[#222]">
          <div className="w-[140px] h-[140px] rounded-full bg-[#262626]" />

          <div className="h-7 w-44 rounded bg-[#262626]" />
        </div>

        {/* Email */}
        <div className="py-6 border-b border-[#222]">
          <div className="bg-[#1a1a1a] rounded-lg p-4 border border-[#262626]">
            <div className="h-3 w-14 rounded bg-[#262626] mb-3" />
            <div className="h-4 w-full rounded bg-[#262626]" />
          </div>
        </div>

        {/* Favorites */}
        <div className="py-6 border-b border-[#222]">
          <div className="bg-[#1a1a1a] rounded-lg p-4 border border-[#262626]">
            <div className="h-3 w-20 rounded bg-[#262626] mb-3" />
            <div className="h-5 w-28 rounded bg-[#262626]" />
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-6">
          <div className="h-11 rounded-lg bg-[#262626]" />
          <div className="h-11 rounded-lg bg-[#262626]" />
        </div>
      </div>
    </div>
  );
}
