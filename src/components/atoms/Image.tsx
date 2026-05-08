import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/cn";

interface Props {
  src: string | StaticImageData;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
}

export default function Images({
  src,
  alt,
  className,
  fill = false,
  width,
  height,
  priority = false,
}: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      quality={100}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      priority={priority}
      className={cn(className)}
    />
  );
}