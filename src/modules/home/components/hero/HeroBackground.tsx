"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const backgroundImages = [
  "https://image.tmdb.org/t/p/w1280/z3xHxsW817eU5FtQzjWDYhVSQVi.jpg",
  "https://image.tmdb.org/t/p/w1280/6ELJEzQJ3Y45HczvreC3dg0GV5R.jpg",
  "https://image.tmdb.org/t/p/w1280/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
  "https://image.tmdb.org/t/p/w1280/dqK9Hag1054tghRQSqLSfrkvQnA.jpg",
  "https://image.tmdb.org/t/p/w1280/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
  "https://image.tmdb.org/t/p/w1280/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
  "https://image.tmdb.org/t/p/w1280/zecxlBpLx0aLIjNjX1IOZuaSgo0.jpg",
];

export default function HeroBackground() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const nextIndex = (currentIndex + 1) % backgroundImages.length;

    const img = new window.Image();

    img.src = backgroundImages[nextIndex];
  }, [currentIndex]);

  return (
    <Image
      src={backgroundImages[currentIndex]}
      fill
      alt="Hero Background"
      preload
      sizes="100vw"
      className="object-cover"
    />
  );
}