import Image from "next/image";
import { unknownMan, unknownWoman } from "@/assets/images/images";
import { getMovieImage } from "@/lib/helpers/getMovieImage";

interface ActorImageProps {
  profilePath?: string | null;
  gender?: number;
  name: string;
  width?: number;
  height?: number;
  className?: string;
}

const ActorImage = ({
  profilePath,
  gender,
  name,
  width = 350,
  height = 450,
  className = "",
}: ActorImageProps) => {
  const fallbackImage = gender === 1 ? unknownWoman : unknownMan;

  const image = getMovieImage(profilePath);

  const imageAcrot = profilePath ? image : fallbackImage;

  return (
    <Image
      src={imageAcrot}
      alt={name}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default ActorImage;
