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
import { useAppSelector } from "@/hooks";
import { useFetchAllAccountsQuery } from "@/api/m365/accounts";
import { useFetchEmailLogsQuery } from "@/api/m365/logs";
import { EmailItem } from "@/lib/type/logs";
import TableSkeleton from "@/components/global/table-loading-state";
import TableEmptyState from "@/components/global/empty-table-state";

function LogsTable() {
  const [selectedMessageIds, setSelectedMessageIds] = React.useState<string[]>([]);

  const token = useAppSelector((store) => store.authState.token);

  const {
    data: accountDetails,
    isLoading: accountLoading,
    isError: accountDetailsError,
  } = useFetchAllAccountsQuery();

  const orgId = accountDetails?.organizations[0].id || "";

  const {
    data: emailLogs,
    isLoading: emailLogsLoading,
    isError: emailLogsError,
  } = useFetchEmailLogsQuery({ orgId }, { skip: !token || orgId.length === 0 });

  console.log(accountDetails);
  console.log("emailLogs", emailLogs);

  const emails = emailLogs?.items || [];

  const toggleMessage = (id: string) => {
    setSelectedMessageIds((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelectedMessageIds((prev) =>
      prev.length === emails.length
        ? []
        : emails.map((email: any) => email.id)
    );
  };

  const getActionBadgeColor = (action: string) => {
    switch (action.toLowerCase()) {
      case "quarantined":
        return "text-red-600 bg-red-50 rounded-lg border-2 border-red-200 w-max";
      case "delivered":
        return "text-gray-600 bg-gray-50 rounded-lg border-2 border-gray-200 w-max";
      default:
        return "text-gray-500 bg-gray-50 rounded-lg border-2 border-gray-200 w-max";
    }
  };

  const getBadgeVariant = (detection: string) => {
    switch (detection.toLowerCase()) {
      case "malicious":
        return "bg-red-50 text-red-700 hover:bg-red-100";
      case "suspicious sender":
        return "bg-yellow-50 text-yellow-700 hover:bg-yellow-100";
      case "not malicious":
        return "bg-green-50 text-green-700 hover:bg-green-100";
      case "marketing":
        return "bg-blue-50 text-blue-700 hover:bg-blue-100";
      case "safe":
        return "bg-gray-50 text-gray-700 hover:bg-gray-100";
      default:
        return "bg-gray-50 text-gray-700 hover:bg-gray-100";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress < 79) return "bg-red-500";
    if (progress < 99) return "bg-orange-500";
    if (progress < 100) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <TableWrapper>
      {/* loading state -- here */}
      {(accountLoading || emailLogsLoading) && <TableSkeleton columns={6} />}

      {/* empty state -- here  */}
      {!accountLoading && !emailLogsLoading && emails.length === 0 && (
        <TableEmptyState description="No Log to display" title="No Log found" />
      )}

      {/* data state -- here  */}
      {!accountLoading && !emailLogsLoading && emails.length > 0 && (
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
                  Total Users
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>No. of Users</p>
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
            {emails.map((user: EmailItem, index: any) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox
                    checked={selectedMessageIds.includes(user.id)}
                    onCheckedChange={() => toggleMessage(user.id)}
                    aria-label={`Select ${user.user}`}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <Badge
                      key={index}
                      variant="outline"
                      className={getActionBadgeColor(user.action)}
                    >
                      {user.action}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>{user.user}</TableCell>
                <TableCell>
                  <div>
                    <p>{user.emailHeader.from}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.emailHeader.subject}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{user.totalUsers}</TableCell>

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
                  {user.detections.map((detection, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className={getBadgeVariant(detection)}
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
      )}

      {/* error state -- here */}
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
