import { Suspense } from "react";

import SearchPageContent from "@/modules/search/components/SearchPageContent";

type Props = {
  searchParams: Promise<{
    query?: string;
  }>;
};

export default function Page({ searchParams }: Props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent searchParams={searchParams} />
    </Suspense>
  );
}