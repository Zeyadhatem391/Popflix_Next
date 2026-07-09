"use client";

import Image from "next/image";
import { unknownMan, unknownWoman } from "@/assets/images/images";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

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

  const imageSrc = profilePath ? `${IMAGE_BASE}${profilePath}` : fallbackImage;

  return (
    <Image
      src={imageSrc}
      alt={name}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default ActorImage;
