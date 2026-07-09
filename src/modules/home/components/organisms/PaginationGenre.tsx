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
  totalPages: number;
  setPage: (page: number) => void;
};

export function PaginationDemo({ page, totalPages, setPage }: Props) {

  if (totalPages <= 1) return null;

  const startPage = Math.max(page - 2, 1);
  const endPage = Math.min(startPage + 4, totalPages);

  const pages = [];

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <Pagination className="mt-8">
      <PaginationContent>

        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage(page - 1)}
              className="cursor-pointer text-gray-300 hover:bg-gray-800 hover:text-white"
            />
          </PaginationItem>
        )}

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

        {page < totalPages && (
          <PaginationItem>
            <PaginationNext
              onClick={() => setPage(page + 1)}
              className="cursor-pointer text-gray-300 hover:bg-gray-800 hover:text-white"
            />
          </PaginationItem>
        )}

      </PaginationContent>
    </Pagination>
  );
}