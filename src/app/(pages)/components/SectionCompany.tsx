"use client";
import Image from "next/image";
import Link from "next/link";

import DefaultImage from "@/assets/images/default.png";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w300";

const Companies = [
  {
    id: 174,
    name: "Warner Bros.",
    logo_path: "/zhD3hhtKB5qyv7ZeL4uLpNxgMVU.png",
  },
  {
    id: 2,
    name: "Walt Disney Pictures",
    logo_path: "/rRGi5UkwvdOPSfr5Xf42RZUsYgd.png",
  },
  {
    id: 33,
    name: "Universal Pictures",
    logo_path: "/7AYU97zQGg3aV3sTiSV0NihOgXG.png",
  },
  {
    id: 198834,
    name: "Netflix",
    logo_path: "/wwemzKWzjKYJFfCeiB57q3r4Bcm.png",
  },
  {
    id: 9383,
    name: "Blue Sky Studios",
    logo_path: "/ppeMh4iZJQUMm1nAjRALeNhWDfU.png",
  },

  {
    id: 521,
    name: "DreamWorks Animation",
    logo_path: "/3DWUezrpxTqVMW4oKRhzfqJbULK.png",
  },
  {
    id: 854,
    name: "EuropaCorp",
    logo_path: "/62xhmot9suhsKEDXyJgV9XuydHQ.png",
  },
  {
    id: 79,
    name: "Village Roadshow Pictures",
    logo_path: "/uySsPIA5PdoccIUxomkw0cfgBjB.png",
  },
  {
    id: 1632,
    name: "Lionsgate",
    logo_path: "/45f1kfTY94FdfGMljWHTMocnSbm.png",
  },
  {
    id: 25120,
    name: "Warner Animation Group",
    logo_path: "/6RLMWBcGF2COzjjBORPUy705yF7.png",
  },
];

const SectionCompany = () => {
  return (
    <section className="my-10 mx-7">
      <div className="gap-3 md:gap-9 justify-items-center flex overflow-x-auto no-scrollbar">
        {Companies.map((Company) => {
          const CompanyImage = Company.logo_path
            ? IMAGE_BASE + Company.logo_path
            : DefaultImage.src;

          return (
            <div key={Company.id} className="flex cursor-pointer">
              <Link href={`/Company/${Company.id}`}>
                <div className="relative w-28 h-28 md:h-32 md:w-32 rounded-full overflow-hidden border-2 border-zinc-700 hover:border-yellow-400 transition duration-300">
                  <Image
                    src={CompanyImage}
                    alt={Company.name}
                    fill
                    className="object-contain p-1 hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SectionCompany;
