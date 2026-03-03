"use client";
import Image from "next/image";
import DefaultImage from "@/assets/images/default.png";
import { useParams } from "next/navigation";
import useGetActorDetails from "@/hooks/useGetActorDetails";
import ActorDetailsSkeleton from "@/components/skeletons/ActorDetailsSkeleton";
import ActorMovies from "../components/ActorMovies";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";


const ActorDetails = () => {
  const params = useParams();

  const id = params.actorId as string;
  const { data, isLoading } = useGetActorDetails(id);

  if (isLoading || !data) {
    return <ActorDetailsSkeleton />;
  }
  const actorImage = data?.profile_path
    ? IMAGE_BASE + data?.profile_path
    : DefaultImage.src;

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-3 gap-8">
        {/* ===== Actor Image ===== */}
        <div className="flex justify-center">
          <Image
            src={actorImage}
            alt="Actor Image"
            width={350}
            height={450}
            className="rounded-2xl object-cover shadow-lg"
          />
        </div>

        {/* ===== Actor Info ===== */}
        <div className="md:col-span-2 space-y-6">
          {/* Name */}
          <h1 className="text-3xl md:text-4xl font-bold">{data?.name}</h1>

          {/* Personal Information Card */}
          <div className="bg-zinc-900 rounded-2xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 border-b border-zinc-700 pb-2">
              Personal Information
            </h2>

            <div className="space-y-4 text-gray-300">
              <div>
                <p className="text-sm text-gray-400">Birthday</p>
                <p className="font-medium">
                  {data?.birthday || "Not currently available"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-400">Place of Birth</p>
                <p className="font-medium">
                  {data?.place_of_birth || "Not currently available"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-400">Known For</p>
                <p className="font-medium">
                  {data?.known_for_department || "Not currently available"}
                </p>
              </div>
            </div>
          </div>

          {/* Biography */}
          <div className="bg-zinc-900 rounded-2xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-3">Biography</h2>

            <p className="text-gray-300 leading-relaxed">
              {data?.biography.slice(0, 190) || "Not currently available"} ...
            </p>
          </div>
        </div>
        <ActorMovies moviesId={id}/>
      </div>
    </section>
  );
};

export default ActorDetails;
