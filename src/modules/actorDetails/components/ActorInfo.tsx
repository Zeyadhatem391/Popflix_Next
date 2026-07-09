import ActorImage from "@/modules/home/components/organisms/ActorImage";
import { GetActorDetails } from "../api/GetActorDetails";

type Props = {
  actorId: string;
};

const ActorInfo = async ({ actorId }: Props) => {
  const data = await GetActorDetails(actorId);

  return (
    <>
      <div className="flex justify-center">
        <ActorImage
          profilePath={data.profile_path}
          gender={data.gender}
          name={data.name || "actor"}
          className="rounded-2xl object-cover shadow-lg"
        />
      </div>

      <div className="md:col-span-2 space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold">{data.name}</h1>

        <div className="bg-zinc-900 rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4 border-b border-zinc-700 pb-2">
            Personal Information
          </h2>

          <div className="space-y-4 text-gray-300">
            <div>
              <p className="text-sm text-gray-400">Birthday</p>

              <p className="font-medium">
                {data.birthday || "Not currently available"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">Place of Birth</p>

              <p className="font-medium">
                {data.place_of_birth || "Not currently available"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">Known For</p>

              <p className="font-medium">
                {data.known_for_department || "Not currently available"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-3">Biography</h2>

          <p className="text-gray-300 leading-relaxed">
            {data.biography
              ? `${data.biography.slice(0, 190)}...`
              : "Not currently available"}
          </p>
        </div>
      </div>
    </>
  );
};

export default ActorInfo;
