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
import { UserPageProps } from ".";
import TableSkeleton from "@/components/global/table-loading-state";
import { useFetchAllUsersQuery } from "@/api/m365/users";
import TableEmptyState from "@/components/global/empty-table-state";
import { formatDate } from "@/lib/utils";
import { UserData } from "@/lib/type/user";

function InboxesTable({ filter, setFilter, setGroups }: UserPageProps) {
  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useFetchAllUsersQuery();

  const usersData = userData || [];

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

  const getHealthScoreColor = (score: string) => {
    if (score.toLowerCase() === "high") {
      return "text-orange-600 rounded-full border-2 border-[#FEDF89]";
    } else if (score.toLowerCase() === "medium") {
      return "text-blue-600 rounded-full border-2 border-[#B2DDFF]";
    } else if (score.toLowerCase() === "low") {
      return "text-gray-500 rounded-full border-2 border-[#EAECF0]";
    } else if (score.toLowerCase() === "critical") {
      return "text-red-600 rounded-full border-2 border-[#FECDCA]";
    } else {
      return "text-gray-500 rounded-full border-2 border-[#EAECF0]";
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role.toLowerCase()) {
      case "owner":
        return "bg-purple-50 text-purple-700 hover:bg-purple-100";
      case "member":
        return "bg-blue-50 text-blue-700 hover:bg-blue-100";
      case "admin":
        return "bg-gray-50 text-gray-700 hover:bg-gray-100";
      case "user":
        return "text-gray-500 rounded-full border-2 border-[#EAECF0] capitalize";
      case "group":
        return "text-blue-600 rounded-full border-2 border-[#B2DDFF] capitalize";
      default:
        return "bg-gray-50 text-gray-700 hover:bg-gray-100";
    }
  };

  const filteredUser = usersData.filter((acc) => {
    const matchesSearchQuery =
      filter.searchQuery === "" ||
      acc.user.displayName
        .toLowerCase()
        .includes(filter.searchQuery.toLowerCase());

    const matchesGroup =
      filter.group === "all" ||
      acc.groups.some((group) => group.name === filter.group);

    const matchesRoleRisk =
      filter.roleRisk === "all" ||
      acc.roleRisk.toLowerCase() === filter.roleRisk.toLocaleLowerCase();

    const matchesInboxType =
      filter.inboxType === "all" ||
      acc.inboxType.toLowerCase() === filter.inboxType.toLocaleLowerCase();

    return (
      matchesSearchQuery && matchesGroup && matchesInboxType && matchesRoleRisk
    );
  });

  function getUniqueGroupNames(data: UserData): string[] {
    const uniqueGroups = new Set<string>();
    data.forEach((item) => {
      item.groups.forEach((group) => {
        uniqueGroups.add(group.name);
      });
    });
    return Array.from(uniqueGroups);
  }

  React.useEffect(() => {
    if (!userLoading && userData) {
      setGroups(getUniqueGroupNames(userData));
    }
  }, [userLoading, userData]);

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
                <TableHead>Inboxes</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Organization
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Associated organization information</p>
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
                    Inbox Type
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Associated type of Inboxes</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role Risk</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUser.length > 0 &&
                filteredUser?.map((user) => (
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
                        {/* {user.roles.map((role, index) => (
                        
                      ))} */}
                        <Badge
                          variant="secondary"
                          className={getRoleBadgeVariant(user.inboxType)}
                        >
                          {user.inboxType.toLowerCase() === "user"
                            ? "User"
                            : "Shared"}
                        </Badge>
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
                          variant="outline"
                          className={
                            user.status === "active"
                              ? "bg-green-50 text-green-700 border-green-200 capitalize"
                              : "bg-red-50 text-red-700 border-red-200 capitalize"
                          }
                        >
                          {user.status}
                        </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={"secondary"}
                        className={`${getHealthScoreColor(
                          user.roleRisk
                        )} capitalize`}
                      >
                        {user.roleRisk}
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
          {filteredUser.length === 0 && (
            <TableEmptyState
              description="No Inbox to display, adjust filter option"
              title="No Inbox Match found"
            />
          )}
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

export default InboxesTable;
