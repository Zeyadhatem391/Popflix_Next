"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Typewriter as SimpleTypewriter } from "react-simple-typewriter";

const backgroundImages = [
  "https://image.tmdb.org/t/p/w1280/z3xHxsW817eU5FtQzjWDYhVSQVi.jpg",
  "https://image.tmdb.org/t/p/w1280/6ELJEzQJ3Y45HczvreC3dg0GV5R.jpg",
  "https://image.tmdb.org/t/p/w1280/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
  "https://image.tmdb.org/t/p/w1280/dqK9Hag1054tghRQSqLSfrkvQnA.jpg",
  "https://image.tmdb.org/t/p/w1280/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
  "https://image.tmdb.org/t/p/w1280/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
  "https://image.tmdb.org/t/p/w1280/zecxlBpLx0aLIjNjX1IOZuaSgo0.jpg",
];

export default function HeroGood() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const nextIndex = (currentIndex + 1) % backgroundImages.length;

    const img = new window.Image();
    img.src = backgroundImages[nextIndex];
  }, [currentIndex]);

  return (
    <div className="relative w-full h-screen">
      <Image
        src={backgroundImages[currentIndex]}
        fill
        alt="Hero Background"
        preload
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/40 z-20" />

      <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-black/80 to-transparent z-30" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black/80 to-transparent z-30" />

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

        <Link href="/movies">
          <button className="cursor-pointer rounded-full bg-red-600 px-8 py-3 font-bold text-white transition-all duration-300 hover:bg-red-700">
            Start Watching
          </button>
        </Link>
      </div>
    </div>
  );
}