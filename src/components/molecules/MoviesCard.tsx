import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface Props {
  id: number;
  title?: string;
  image: string | StaticImageData;
  vote_average?: number;
  hiddinVote?: boolean;
  hiddinName?: boolean;
}

export default function MoviesCard({
  id,
  title,
  image,
  vote_average,
  hiddinVote = true,
  hiddinName = false,
}: Props) {
  return (
    <div
      className="relative min-w-[160px] md:min-w-[230px] h-[260px] md:h-[300px]
                  rounded-xl overflow-hidden group
                  transition-transform duration-300 hover:scale-105"
    >
      <Link href={`/movies/${id}`} className="block w-full h-full relative">
        {/* Movie Image */}
        <Image
          src={image}
          alt={title || "image name"}
          fill
          sizes="(max-width:768px) 50vw, 200px"
          className="object-cover"
        />

        {/* Rating */}
        {hiddinVote && vote_average && (
          <span className="absolute top-2 left-2 bg-black/70 text-yellow-400 text-xs font-semibold px-2 py-1 rounded-md">
            ⭐ {vote_average.toFixed(1)}
          </span>
        )}
        {hiddinName && (
          <div className="absolute bottom-0 w-full bg-linear-to-t from-black/80 to-transparent p-2 text-center">
            <h5 className="text-sm md:text-lg font-medium">{title}</h5>
          </div>
        )}
      </Link>
    </div>
  );
}
