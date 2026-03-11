import ActorsClient from "./components/ActorsClient";

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function ActorsPage({ searchParams }: Props) {
  const params = await searchParams;

  const page = Number(params.page ?? "1");

  return <ActorsClient page={page} />;
}