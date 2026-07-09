import { Suspense } from "react";
import ActorsClient from "../../../modules/actors/components/ActorsClient";
import ActorCardSkeleton from "@/shared/components/skeletons/ActorCardSkeleton";

type Props = {
  searchParams: Promise<{
    page?: string;
    query?: string;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;

  const page = Number(params.page ?? "1");
  const query = params.query ?? "";

  return (
    <Suspense fallback={<ActorCardSkeleton count={10} />}>
      <ActorsClient page={page} query={query} />
    </Suspense>
  );
}