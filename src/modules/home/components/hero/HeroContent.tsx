"use client";

import { Typewriter as SimpleTypewriter } from "react-simple-typewriter";
import HeroButton from "./HeroButton";

export default function HeroContent() {
  return (
    <div className="relative z-40 flex h-full flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
        Welcome to PopFlix
      </h1>

      <h2 className="mb-8 text-xl font-semibold text-white md:text-3xl">
        <SimpleTypewriter
          words={[
            "Stream thousands of movies & series.",
            "Enjoy HD quality with no ads.",
            "Watch anytime, anywhere.",
            "Join PopFlix today!",
          ]}
          loop
          cursor
          cursorStyle="|"
          typeSpeed={50}
          deleteSpeed={30}
          delaySpeed={2000}
        />
      </h2>

      <HeroButton />
    </div>
  );
}
