"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { UserPageProps } from ".";
import TableSkeleton from "@/components/global/table-loading-state";
import { useFetchAllUsersQuery } from "@/api/m365/users";
import { Span } from "next/dist/trace";
import TableEmptyState from "@/components/global/empty-table-state";
import { formatDate } from "@/lib/utils";

function UsersTable({ filter, setFilter }: UserPageProps) {
  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useFetchAllUsersQuery();

  const usersData = userData || [];
  console.log("USERDATA", usersData);

  const [selectedUsers, setSelectedUsers] = React.useState<string[]>([]);

  const toggleUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleAll = () => {
    setSelectedUsers((prev) =>
      prev.length === usersData?.length ? [] : usersData?.map((user) => user.id)
    );
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 75 && score <= 100) {
      return "text-orange-600 rounded-full border-2 border-[#FEDF89]";
    } else if (score >= 50 && score < 75) {
      return "text-blue-600 rounded-full border-2 border-[#B2DDFF]";
    } else if (score >= 25 && score < 50) {
      return "text-gray-500 rounded-full border-2 border-[#EAECF0]";
    } else if (score >= 0 && score < 25) {
      return "text-red-600 rounded-full border-2 border-[#FECDCA]";
    } else {
      return "text-gray-500 rounded-full border-2 border-[#EAECF0]";
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role.toLowerCase()) {
      case "owner":
        return "bg-purple-50 text-purple-700 hover:bg-purple-50";
      case "member":
        return "bg-blue-50 text-blue-700 hover:bg-blue-50";
      case "admin":
        return "bg-gray-50 text-gray-700 hover:bg-gray-50";
      default:
        return "bg-gray-50 text-gray-700 hover:bg-gray-50";
    }
  };



  // const filteredUser = users.filter((acc) => {
  //   const matchesSearchQuery =
  //     filter.searchQuery === "" ||
  //     acc.name.toLowerCase().includes(filter.searchQuery.toLowerCase());

  //   // const matchesStatus = filter.active
  //   //   ? acc.active.toLowerCase() === "active"
  //   //   : true;

  //   let matchesHealthScore = true;
  //   switch (filter.healthScore) {
  //     case "low":
  //       matchesHealthScore = acc.healthScore === "low";
  //       break;
  //     case "medium":
  //       matchesHealthScore = acc.healthScore === "medium";
  //       break;
  //     case "high":
  //       matchesHealthScore = acc.healthScore === "high";
  //       break;
  //     case "critical":
  //       matchesHealthScore = acc.healthScore === "critical";
  //       break;

  //     case "all":
  //     default:
  //       matchesHealthScore = true;
  //       break;
  //   }

  //   return matchesSearchQuery;
  // });

  return (
    <>
      {usersData.length === 0 && !userLoading && (
        <TableEmptyState
          description="No user to display"
          title="No user found"
        />
      )}
      
      {usersData.length > 0 && !userLoading && (
        <TableWrapper>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectedUsers.length === usersData.length}
                    onCheckedChange={toggleAll}
                    aria-label="Select all users"
                  />
                </TableHead>
                <TableHead>User</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Account
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Associated account information</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Group
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>User's assigned group</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Roles
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>User's assigned roles</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Health Score</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usersData?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={() => toggleUser(user.id)}
                      aria-label={`Select ${user.user.displayName}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col ">
                      <span className="font-medium capitalize">
                        {user.user.displayName}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {user.user.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">
                    {user.account.name}
                  </TableCell>
                  <TableCell className="capitalize">
                    {user.groups.map((group, index) => {
                      const isLast = index === user.groups.length - 1;
                      return `${group.name}${isLast ? "" : ", "}`;
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {user.roles.map((role, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className={getRoleBadgeVariant(role)}
                        >
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">
                        1 year ago
                      </span>
                      <span className="text-sm">
                        {formatDate(user.created)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={"secondary"}
                      className={getHealthScoreColor(user.healthScore)}
                    >
                      {user.healthScore}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="h-5 w-5 text-muted-foreground" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
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
        </TableWrapper>
      )}

      {userLoading && (
        <TableWrapper>
          <TableSkeleton columns={6} />
        </TableWrapper>
      )}
    </>
  );
}

export default UsersTable;
