import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  page: number;
  setPage: (page: number) => void;
};

export function PaginationDemo({ page, setPage }: Props) {

  const startPage = Math.max(page - 2, 1);
  const pages = Array.from({ length: 5 }, (_, i) => startPage + i);

  return (
    <Pagination className="mt-8">
      <PaginationContent>

        <PaginationItem>
          <PaginationPrevious
            onClick={() => page > 1 && setPage(page - 1)}
            className="cursor-pointer text-gray-300 hover:bg-gray-800 hover:text-white"
          />
        </PaginationItem>

        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              onClick={() => setPage(p)}
              isActive={page === p}
              className={
                page === p
                  ? "bg-red-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => setPage(page + 1)}
            className="cursor-pointer text-gray-300 hover:bg-gray-800 hover:text-white"
          />
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  );
}