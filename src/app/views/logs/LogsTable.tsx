"use client";

import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, HelpCircle } from "lucide-react";
import TableWrapper from "@/components/global/wrappers/TableWrapper";
import { useAppSelector } from "@/hooks";
import { useFetchAllAccountsQuery } from "@/api/m365/accounts";
import { useFetchEmailLogsQuery } from "@/api/m365/logs";
import { EmailItem } from "@/lib/type/logs";
import TableSkeleton from "@/components/global/table-loading-state";
import TableEmptyState from "@/components/global/empty-table-state";
import { LogsPageProps } from ".";
import { useDebounce } from "@/hooks/useDebounce";
import {
  getActionBadgeColor,
  getBadgeVariant,
  getProgressColor,
} from "@/utils/helper";
import { useRouter } from "next/navigation";
import PaginationBar from "@/components/global/pagination";

function LogsTable({ filter, setFilter }: LogsPageProps) {
  const [selectedMessageIds, setSelectedMessageIds] = React.useState<string[]>(
    []
  );
  const debouncedSearch = useDebounce(filter.search, 500);

  const router = useRouter();

  const [currentPage, setCurrentPage] = React.useState(1);
  const token = useAppSelector((store) => store.authState.token);

  const {
    data: accountDetails,
    isLoading: accountLoading,
    isError: accountDetailsError,
  } = useFetchAllAccountsQuery();

  const orgId = accountDetails?.organizations?.[0].id || "";

  const {
    data: emailLogs,
    isLoading: emailLogsLoading,
    isError: emailLogsError,
    isFetching,
  } = useFetchEmailLogsQuery(
    {
      orgId,
      page: currentPage,
      limit: 20,
      search: debouncedSearch,
      status: filter.action.toLowerCase() === "all" ? "" : filter.action,
    },
    {
      skip: !token || orgId.length === 0,
      refetchOnMountOrArgChange: true,
    }
  );

  const emails = emailLogs?.items || ([] as EmailItem[]) || [];

  // const filteredLogs = emails?.filter((email: EmailItem) => {
  //   const matchesAction =
  //     filter.action === "all" || email.action.toLowerCase() === filter.action;
  //   return matchesAction;
  // });

  const toggleMessage = (id: string) => {
    setSelectedMessageIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelectedMessageIds((prev) =>
      prev.length === emails.length ? [] : emails.map((email: any) => email.id)
    );
  };


  return (
    <TableWrapper>
      {(accountLoading || emailLogsLoading || isFetching) && (
        <TableSkeleton columns={6} />
      )}

      {!accountLoading &&
        !emailLogsLoading &&
        !isFetching &&
        emails.length === 0 && (
          <TableEmptyState
            description="No Log to display"
            title="No Log found"
          />
        )}

      {!accountLoading &&
        !emailLogsLoading &&
        !isFetching &&
        emails.length > 0 && (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={selectedMessageIds.length === emails.length}
                      onCheckedChange={toggleAll}
                      aria-label="Select all messages"
                    />
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Action
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Action Carried Out</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Email Header
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Email Preview</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Similar
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>This is the total number of affected inboxes</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Sender Score
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Sender Email Score</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Detections
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>System Detections</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableHead>

                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {emails.map((user, index: any) => (
                  <TableRow
                    className="hover:cursor-pointer"
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`logs/${user.id}`);
                    }}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedMessageIds.includes(user.id)}
                        onCheckedChange={() => toggleMessage(user.id)}
                        aria-label={`Select ${user.from.address}`}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col w-max">
                        <Badge
                          key={index}
                          variant="outline"
                          className={getActionBadgeColor(user.action)}
                        >
                          {user.action}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="truncate text-nowrap max-w-[300px]">
                      {user.from.name}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="truncate text-nowrap max-w-[200px]">
                          {user.from.address}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {user.subject}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{(user as any).affectedUsersCount}</TableCell>

                    <TableCell className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 rounded-full bg-gray-200">
                          <div
                            className={`h-2 rounded-full ${getProgressColor(
                              user.senderScore
                            )}`}
                            style={{ width: `${user.senderScore}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {user.senderScore}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.detections.slice(0, 1).map((detection, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className={`${getBadgeVariant(
                            detection
                          )} text-nowrap`}
                        >
                          {detection}
                        </Badge>
                      ))}
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreVertical className="h-5 w-5 text-muted-foreground" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="text-xs">
                          <DropdownMenuItem
                            className="text-xs"
                            onClick={(e) => {
                              //  e.stopPropagation()
                              router.push(`logs/${user.id}`);
                            }}
                          >
                            View Log
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-xs">
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 text-xs">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

              {emails.length === 0 && (
                <TableEmptyState
                  description="No Logs to display, adjust filter option"
                  title="No Logs Match found"
                />
              )}
            </Table>
          </>
        )}

      {emailLogs?.pagination && (
        <PaginationBar
          currentPage={currentPage}
          paginationData={emailLogs?.pagination}
          setCurrentPage={setCurrentPage}
        />
      )}

      {emailLogsError ||
        (accountDetailsError && (
          <p className="text-center text-black">
            An error occured, kindly reload your browser
          </p>
        ))}
    </TableWrapper>
  );
}

export default LogsTable;
