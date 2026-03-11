import ActorsClient from "./components/ActorsClient";

type Props = {
  searchParams: { page?: string };
};

export default function ActorsPage({ searchParams }: Props) {
  const page = Number(searchParams.page ?? "1");

  return <ActorsClient page={page} />;
}