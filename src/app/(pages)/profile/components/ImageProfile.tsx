"use client";
import Image from "next/image";
import { Session } from "next-auth";
import DefaultImage from "@/assets/images/default.png";
import useGetImageProfile from "@/hooks/Profile/useGetImageProfile";
import EditImage from "./EditImage";

type ImageProfileProps = {
  session: Session | null;
};

const ImageProfile = ({ session }: ImageProfileProps) => {
  const { data } = useGetImageProfile(session?.accessToken);

  const profileImage =
    data?.profile_picture && data.profile_picture !== ""
      ? data.profile_picture
      : session?.user?.image || DefaultImage;

  return (
    <div className="flex items-center gap-6 border-b border-[#222] pb-6">
      <div className="relative w-20 h-20 rounded-full overflow-hidden border border-[#333]">
        <Image src={profileImage} alt="avatar" fill className="object-cover" />
      </div>

      <div className="flex flex-col gap-2 flex-1">
        <h1 className="text-xl font-semibold tracking-wide capitalize">
          {session?.user?.name}
        </h1>

        <EditImage />
      </div>
    </div>
  );
};
export default ImageProfile;
