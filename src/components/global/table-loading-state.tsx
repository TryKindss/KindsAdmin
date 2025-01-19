import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Custom TableSkeleton Component
const TableSkeleton = ({
  rows = 5,
  columns = 5,
}: {
  rows?: number;
  columns?: number;
}) => {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full text-sm my-4">
        <TableHeader>
          <TableRow>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <TableHead key={`header-${colIndex}`} className="p-2">
                <Skeleton height={40} />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={`row-${rowIndex}`} className="hover:bg-gray-100">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell
                  key={`row-${rowIndex}-col-${colIndex}`}
                  className="py-2"
                >
                  <Skeleton height={40} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableSkeleton;
