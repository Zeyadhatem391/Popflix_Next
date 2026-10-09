"use client";

import useScroll from "@/shared/hooks/useScroll";

export default function NavbarClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const isScrolled = useScroll();

  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 text-white transition-colors duration-300 ${
        isScrolled ? "ds-bg-primary shadow-md" : "bg-transparent"
      }`}
    >
      {children}{" "}
    </div>
  );
}
