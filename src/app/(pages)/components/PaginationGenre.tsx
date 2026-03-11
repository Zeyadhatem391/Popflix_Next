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
  const endPage = Math.min(startPage + 4, 500);

  const pages = [];

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <Pagination className="mt-8">
      <PaginationContent>

        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => page > 1 && setPage(page - 1)}
            className="cursor-pointer text-gray-300 hover:bg-gray-800 hover:text-white"
          />
        </PaginationItem>

        {/* Pages */}
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

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            onClick={() => page < 500 && setPage(page + 1)}
            className="cursor-pointer text-gray-300 hover:bg-gray-800 hover:text-white"
          />
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  );
}