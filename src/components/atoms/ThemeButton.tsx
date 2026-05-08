"use client";

import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "@/assets/icons/icons";
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "light";

  return (
    <button
      onClick={() => setTheme(isDark ? "dark" : "light")}
      className={`relative flex h-11 w-21 cursor-pointer items-center rounded-full p-1 transition-colors duration-500 md:h-9 md:w-18 ${
        isDark ? "bg-gray-200" : "bg-gray-900"
      } shadow-md`}
      aria-label="Toggle Theme"
    >
      <span
        className={`absolute left-1.5 h-8 w-8 transform rounded-full transition-transform duration-500 md:left-1 md:h-7 md:w-7 ${
          isDark ? "translate-x-0 bg-white" : "translate-x-9  ds-bg-dark-gray"
        }`}
      />

      <span
        className={`absolute  justify-center left-2 transform text-xs transition-transform duration-500 md:left-1 ${
          isDark ? "translate-x-1" : "translate-x-10"
        }`}
      >
        {isDark ? (
          <FaSun className="ds-text-alt ml-0 md:ml-1" size={16} />
        ) : (
          <FaMoon className="text-white" />
        )}
      </span>
      {/* <button
                    className="transition-all duration-500 hover:scale-110 ds-text-base"
                  >
                    {theme === "light" ? (
                      <FaSun className="w-5 h-5 md:w-7 md:h-6" />
                    ) : (
                      <FaMoon className="w-5 h-5 md:w-7 md:h-6" />
                    )}
                  </button> */}
    </button>
  );
}
