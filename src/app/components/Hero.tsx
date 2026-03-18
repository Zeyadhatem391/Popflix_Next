"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Typewriter as SimpleTypewriter } from "react-simple-typewriter";
import Head from "next/head";

const backgroundImages = [
  "https://image.tmdb.org/t/p/w1280/z3xHxsW817eU5FtQzjWDYhVSQVi.jpg",
  "https://image.tmdb.org/t/p/w1280/6ELJEzQJ3Y45HczvreC3dg0GV5R.jpg",
  "https://image.tmdb.org/t/p/w1280/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
  "https://image.tmdb.org/t/p/w1280/dqK9Hag1054tghRQSqLSfrkvQnA.jpg",
  "https://image.tmdb.org/t/p/w1280/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
  "https://image.tmdb.org/t/p/w1280/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
  "https://image.tmdb.org/t/p/w1280/zecxlBpLx0aLIjNjX1IOZuaSgo0.jpg",
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <link rel="preload" as="image" href={backgroundImages[0]} />
      </Head>

      <div className="relative w-full h-screen overflow-hidden">
        {backgroundImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 bg-center bg-cover transition-opacity duration-1000 ${
              idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}

        <div className="absolute inset-0 bg-black/40 z-20" />

        <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-black/80 to-transparent z-30" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black/80 to-transparent z-30" />

        <div className="relative z-40 flex flex-col items-center justify-center text-center h-full px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            Welcome to PopFlix
          </h1>
          <h2 className="text-xl md:text-3xl font-semibold text-white mb-8">
            <SimpleTypewriter
              words={[
                "Stream thousands of movies & series.",
                "Enjoy HD quality with no ads.",
                "Watch anytime, anywhere.",
                "Join PopFlix today!",
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={50}
              deleteSpeed={30}
              delaySpeed={2000}
            />
          </h2>
          <Link href="/movies">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 cursor-pointer">
              Start Watching
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Hero;
