import ActorsClient from "@/modules/actors/components/ActorsClient";

type Props = {
  searchParams: Promise<{
    page?: string;
    query?: string;
  }>;
};

export default async function ActorsPageContent({
  searchParams,
}: Props) {
  const params = await searchParams;

  return (
    <ActorsClient
      page={Number(params.page ?? "1")}
      query={params.query ?? ""}
    />
  );
}