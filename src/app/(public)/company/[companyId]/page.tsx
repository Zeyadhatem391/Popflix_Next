import { Suspense } from "react";
import CompanyPages from "@/modules/Company/components/CompanyPages";
import CompanyMovies from "@/modules/Company/components/CompanyMovies";
import ActorMoviesSkeleton from "@/shared/components/skeletons/ActorMoviesSkeleton";

export default function Page({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  return (
    <Suspense fallback={<ActorMoviesSkeleton />}>
      <CompanyContent params={params} />
    </Suspense>
  );
}

async function CompanyContent({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;

  return (
    <div className="my-10 mx-7">
      <CompanyPages id={companyId} />
      <CompanyMovies id={companyId} />
    </div>
  );
}
