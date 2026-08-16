"use client";

import { ChevronLeft } from "@/assets/icons/Icons";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";

const Back = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant="outline"
      className="rounded-full size-14 my-2 ds-bg-form border-0 cursor-pointer"
    >
      <ChevronLeft className="size-7 text-white " />
    </Button>
  );
};

export default Back;