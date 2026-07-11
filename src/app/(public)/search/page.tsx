import { Suspense } from "react";

import SearchPageContent from "@/modules/search/components/SearchPageContent";
import SearchSkeleton from "@/shared/components/skeletons/SearchSkeleton";

type Props = {
  searchParams: Promise<{
    query?: string;
  }>;
};

export default function Page({ searchParams }: Props) {
  return (
    <Suspense fallback={<SearchSkeleton/>}>
      <SearchPageContent searchParams={searchParams} />
    </Suspense>
  );
}