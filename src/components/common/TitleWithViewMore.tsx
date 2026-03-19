import Link from "next/link";

type TitleWithViewMorePtops = {
  genreId: number;
  title: string;
  Url?: string;
  ViewMore?: boolean;
};

const genres: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  18: "Drama",
  14: "Fantasy",
  27: "Horror",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  53: "Thriller",
  99: "Documentary",
  10751: "Family",
  10752: "War",
  37: "Western",
  10770: "TVMovie",
  10402: "Music",
  36: "History",
};

const TitleWithViewMore = ({
  genreId,
  title,
  Url,
  ViewMore,
}: TitleWithViewMorePtops) => {
  const GenreUrl = genres[genreId];

  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl md:text-2xl font-semibold ml-0 lg:ml-8 pl-2 border-l-6 border-red-800 ">
        {title}
      </h2>
      {ViewMore && (
        <Link
          href={GenreUrl ? `/genre/${GenreUrl}` : `/${Url}`}
          className="border border-white px-3 py-1.5 rounded-md text-sm hover:bg-white hover:text-black transition"
        >
          View More
        </Link>
      )}
    </div>
  );
};

export default TitleWithViewMore;
