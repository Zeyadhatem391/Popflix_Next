import { NotFound } from "@/assets/images/images";
import Image from "next/image";
import { category as categories } from "../data/category";

export default function HeroCategory({ category }: { category: string }) {
  const currentCategory = categories.find(
    (item) => item.name.toLowerCase() === category.toLowerCase(),
  );

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Image
        src={currentCategory?.image || NotFound}
        fill
        alt="Hero Background"
        sizes="100vw"
        preload
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex h-full items-center justify-center px-6 md:justify-start md:px-16 lg:px-24">
        <div className="max-w-2xl text-center md:text-left">
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-7xl">
            {currentCategory?.name ?? category}
          </h1>

          <p className="text-base leading-7 text-white/90 sm:text-lg lg:text-xl">
            {currentCategory?.desc ??
              "Explore a world of unforgettable stories, characters, and adventures. Discover movies that bring imagination, emotion, and extraordinary experiences to life."}
          </p>
        </div>
      </div>
    </section>
  );
}
