"use client";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { MoreVertical, HelpCircle, Mail, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Images from "@/utils/images";
import Image from "next/image";
import TableWrapper from "@/components/global/wrappers/TableWrapper";
import { AccountPageProps } from ".";
import { useAppSelector } from "@/hooks";
import { useFetchAllAccountsQuery } from "@/api/m365/accounts";
import { formatDate } from "@/lib/utils";
import TableEmptyState from "@/components/global/empty-table-state";
import TableSkeleton from "@/components/global/table-loading-state";

export default function AccountsTable({ filter, setFilter }: AccountPageProps) {
  const token = useAppSelector((store) => store.authState.token);

  const {
    data: accountData,
    isLoading: accountLoading,
    isError,
  } = useFetchAllAccountsQuery(undefined, {
    skip: !token,
  });

  const offices = accountData?.organizations || [];

  const getProgressColor = (progress: number) => {
    if (progress < 79) return "bg-red-500";
    if (progress < 99) return "bg-orange-500";
    if (progress < 100) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getConnection = (connection: string) => {
    if (connection.toLowerCase() === "m365") return Images.emailLog.ms_outlook;
    if (connection.toLowerCase() === "gmail") return Images.emailLog.gmail;
    if (connection.toLowerCase() === "okta") return Images.emailLog.okta;
  };

  // const handleToggle = (officeId: number) => {
  //   setOffices(
  //     offices.map((office) =>
  //       office.id === officeId
  //         ? { ...office, autoSync: !office.autoSync }
  //         : office
  //     )
  //   );
  // };

  const filteredAccount = offices.filter((acc) => {
    const matchesSearchQuery =
      filter.searchQuery === "" ||
      acc.displayName.toLowerCase().includes(filter.searchQuery.toLowerCase());

    const matchesStatus = filter.active
      ? acc.status.toLowerCase() === "active"
      : true;


    let matchesHealthScore = true;
    switch (filter.healthScore) {
      case "low":
        matchesHealthScore = acc.healthScore >= 0 && acc.healthScore <= 39;
        break;
      case "medium":
        matchesHealthScore = acc.healthScore >= 40 && acc.healthScore <= 79;
        break;
      case "high":
        matchesHealthScore = acc.healthScore >= 80 && acc.healthScore <= 100;
        break;
      case "all":
      default:
        matchesHealthScore = true;
        break;
    }

    let matchesAutoSync = true;
    if (filter.autoSync === "off") {
      matchesAutoSync = acc.autoSync === false;
    } else if (filter.autoSync === "on") {
      matchesAutoSync = acc.autoSync === true;
    }

    let matchesConnection = true;
    if (filter.connections !== 'all' && filter.connections !== '') {
      matchesConnection = acc.connections.some(conn => 
        conn.toLowerCase() === filter.connections.toLowerCase()
      );
    }

    return (
      matchesSearchQuery && matchesStatus && matchesHealthScore && matchesAutoSync && matchesConnection
    );
  });

  return (
    <>
      {offices.length === 0 && !accountLoading && (
        <TableEmptyState
          description="No account to display"
          title="No account found"
        />
      )}

      {offices.length > 0 && !accountLoading && (
        <TableWrapper>
          <Table className="">
            <TableHeader className="">
              <TableRow className="">
                <TableHead className="py-4 px-6">Account</TableHead>
                <TableHead className="py-4">
                  <div className="flex items-center gap-1">
                    Health Score
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Overall health score of the account</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableHead>
                <TableHead className="py-4">Status</TableHead>
                <TableHead className="py-4">Groups</TableHead>
                <TableHead className="py-4">Users</TableHead>
                <TableHead className="py-4">
                  <div className="flex items-center gap-1">
                    Connections
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Connected services and integrations</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableHead>
                <TableHead className="py-4">Created</TableHead>
                <TableHead className="py-4">Last sync</TableHead>
                <TableHead className="py-4">
                  <div className="flex items-center gap-1">
                    Auto-Sync
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Toggle automatic synchronization</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {filteredAccount.map((office) => (
                <TableRow key={office.id} className="">
                  <TableCell className="font-medium py-3 pl-6 capitalize">
                    {office.displayName}
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 rounded-full bg-gray-200">
                        <div
                          className={`h-2 rounded-full ${getProgressColor(
                            office.healthScore
                          )}`}
                          style={{ width: `${office.healthScore}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {office.healthScore}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3">
                    <Badge
                      variant="outline"
                      className={`${
                        office.status.toLowerCase() === "active"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      {office.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3">{office.groupsCount}</TableCell>
                  <TableCell className="py-3 text-blue-600">
                    {office.usersCount}
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex gap-3 items-center">
                      {office?.connections.map((item, index) => (
                        <Image
                          key={index}
                          src={getConnection(item)}
                          alt=""
                          className="w-6 h-6"
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">
                        1 year ago
                      </span>
                      <span className="text-sm">
                        {" "}
                        {formatDate(office.lastSyncedAt)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">
                        Today
                      </span>
                      <span className="text-sm">
                        {formatDate(office.lastSyncedAt)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3">
                    <Switch
                      checked={office.autoSync}
                      // onCheckedChange={() => handleToggle(office.id)}
                    />
                  </TableCell>
                  <TableCell className="py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="h-5 w-5 text-muted-foreground" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredAccount.length === 0 && (
            <TableEmptyState
              description="No Account to display, adjust filter option"
              title="No Account Match found"
            />
          )}
        </TableWrapper>
      )}

      {accountLoading && (
        <TableWrapper>
          <TableSkeleton columns={6} />
        </TableWrapper>
      )}
    </>
  );
}
