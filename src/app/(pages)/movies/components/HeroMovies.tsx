import DefaultImage from "@/assets/images/default.png";
import Link from "next/link";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

/* ================= TYPES ================= */

type Movie = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
};

/* ================= FETCH MOVIES ================= */

async function getMovies(): Promise<Movie[]> {
  const randomPage = Math.floor(Math.random() * 5 + 1);

  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&page=${randomPage}`,
    {
      next: { revalidate: 30 },
    },
  );

  const data = await res.json();

  return data.results.slice(0, 10);
}

/* ================= MAIN COMPONENT ================= */

const HeroMovies = async () => {
  const movies = await getMovies();

  const rows: { big: Movie; smalls: Movie[] }[] = [];

  for (let i = 0; i < movies.length; i += 5) {
    const big = movies[i];
    const smalls = movies.slice(i + 1, i + 5);

    if (big && smalls.length === 4) {
      rows.push({ big, smalls });
    }
  }

  return (
    <section className="py-6">
      <div className=" space-y-0">
        {rows.map((row, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row h-auto md:h-140"
          >
            {index % 2 === 0 && <BigCard movie={row.big} />}

            <SmallGrid movies={row.smalls} />

            {index % 2 !== 0 && <BigCard movie={row.big} />}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroMovies;

/* ================= BIG CARD ================= */

const BigCard = ({ movie }: { movie: Movie }) => {
  const image = movie.backdrop_path
    ? IMAGE_BASE + movie.backdrop_path
    : DefaultImage.src;

  return (
    <div className="relative flex-1 group overflow-hidden">
      <img
        src={image}
        alt={movie.title}
        className="w-full h-full object-cover scale-105 group-hover:scale-110 transition duration-500"
      />

      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-center text-center p-6">
        <h3 className="text-2xl font-bold text-white">{movie.title}</h3>

        <p className="text-lg text-gray-200 mt-3 max-w-lg">
          {movie.overview?.slice(0, 120)}
        </p>
        <Link href={`/movies/${movie.id}`}>
          <button className="mt-5 bg-red-600 px-5 py-2 text-lg rounded-md cursor-pointer text-white">
            View Movie
          </button>
        </Link>
      </div>
    </div>
  );
};

/* ================= SMALL GRID ================= */

const SmallGrid = ({ movies }: { movies: Movie[] }) => {
  return (
    <div className="flex-1 grid grid-cols-2 grid-rows-2">
      {movies.map((movie) => {
        const image = movie.poster_path
          ? IMAGE_BASE + movie.poster_path
          : DefaultImage.src;

        return (
          <div key={movie.id} className="relative group overflow-hidden">
            <img
              src={image}
              alt={movie.title}
              className="w-full h-full object-cover scale-105 group-hover:scale-110 transition duration-500"
            />

            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-center text-center">
              <h5 className="text-lg text-white font-semibold">
                {movie.title}
              </h5>

              <Link href={`/movies/${movie.id}`}>
                <button className="mt-3 bg-red-600 text-lg px-4 py-1 rounded-md cursor-pointer text-white">
                  View Movie
                </button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};
