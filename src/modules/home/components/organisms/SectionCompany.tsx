import Image from "next/image";
import Link from "next/link";

import { getMovieImage } from "../../../../lib/helpers/getMovieImage";
import { Companies } from "@/modules/Company/data/data";

const SectionCompany = async () => {
  return (
    <section className="my-10 mx-7">
      <div className="flex justify-items-center gap-3 overflow-x-auto no-scrollbar md:gap-9">
        {Companies.map((company) => {
          const companyImage = getMovieImage(company.logo_path);

          return (
            <div key={company.id} className="flex cursor-pointer">
              <Link href={`/company/${company.id}`}>
                <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-zinc-700 transition duration-300 hover:border-yellow-400 md:h-32 md:w-32">
                  <Image
                    src={companyImage}
                    alt={company.name}
                    fill
                    className="object-contain p-1 transition-transform duration-500 hover:scale-110"
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
