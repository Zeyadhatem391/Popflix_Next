"use client";

import Back from "@/shared/components/common/Back";
import InputSearch from "@/shared/components/common/InputSearch";

type Props = {
  genreName: string;
  setSearchQuery: (value: string) => void;
};

export default function GenreHeader({
  genreName,
  setSearchQuery,
}: Props) {
  return (
    <div className="flex items-center gap-3 w-full my-3">
      <Back />
      <InputSearch
        setSearchQuery={setSearchQuery}
        genreName={genreName}
      />
    </div>
  );
}