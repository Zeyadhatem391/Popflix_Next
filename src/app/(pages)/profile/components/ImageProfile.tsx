import Image from "next/image";
import { Session } from "next-auth";
import DefaultImage from "@/assets/images/default.png";

type ImageProfileProps = {
  session: Session | null;
};

const ImageProfile = ({ session }: ImageProfileProps) => {
  return (
    <div className="flex items-center gap-6 border-b border-[#222] pb-6">
      <div className="relative w-20 h-20 rounded-full overflow-hidden border border-[#333]">
        <Image
          src={session?.user?.image || DefaultImage}
          alt="avatar"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-2 flex-1">
        <h1 className="text-xl font-semibold tracking-wide capitalize">
          {session?.user?.name}
        </h1>

        <button className="w-fit mt-1 px-4 py-1.5 text-sm bg-blue-600 hover:bg-blue-500 rounded-md transition cursor-pointer">
          Edit image
        </button>
      </div>
    </div>
  );
};

export default ImageProfile;
