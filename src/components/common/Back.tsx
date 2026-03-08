"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const Back = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant="outline"
      className="rounded-full size-14 my-2 bg-black border-black "
    >
      <ChevronLeft className="size-7 text-white " />
    </Button>
  );
};

export default Back;