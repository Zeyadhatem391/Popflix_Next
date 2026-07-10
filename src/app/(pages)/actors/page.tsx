import { Suspense } from "react";
import ActorCardSkeleton from "@/shared/components/skeletons/ActorCardSkeleton";
import ActorsPageContent from "@/modules/actors/components/ActorsPageContent";

type Props = {
  searchParams: Promise<{
    page?: string;
    query?: string;
  }>;
};

export default function Page(props: Props) {
  return (
    <Suspense fallback={<ActorCardSkeleton count={10} />}>
      <ActorsPageContent {...props} />
    </Suspense>
  );
}