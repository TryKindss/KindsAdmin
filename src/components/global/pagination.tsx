import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

export interface globalPagination {
  currentPage: string;
  totalPages: number;
  totalItems: number;
  itemsPerPage: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface PaginationProps {
  // handlePageChange: (currentPage: number)=>void;
  currentPage: number;
  setCurrentPage: (newPage: number) => void;
  paginationData: globalPagination;
}
function PaginationBar({
  currentPage,
  setCurrentPage,
  paginationData,
}: PaginationProps) {
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || !paginationData) return;
    if (newPage > Number(paginationData.totalPages)) return;

    setCurrentPage(newPage);
  };

  const getPageNumbers = (currentPage: number, totalPages: number) => {
    const delta = 1;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };
  return (
    <div className="py-12">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }}
              className={
                !paginationData.hasPreviousPage
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>

          {getPageNumbers(
            Number(paginationData.currentPage),
            Number(paginationData.totalPages)
          ).map((pageNum, idx) => (
            <PaginationItem key={idx}>
              {pageNum === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(Number(pageNum));
                  }}
                  isActive={Number(paginationData.currentPage) === pageNum}
                >
                  {pageNum}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }}
              className={
                !paginationData.hasNextPage
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div className="text-sm text-muted-foreground text-center mt-4">
        Page {paginationData.currentPage} of {paginationData.totalPages} (Total:{" "}
        {paginationData.totalItems})
      </div>
    </div>
  );
}

export default PaginationBar;
