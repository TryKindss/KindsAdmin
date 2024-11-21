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

function LogsTable() {
  const [selectedUsers, setSelectedUsers] = React.useState<number[]>([]);

  const emails = [
    {
      id: 1,
      action: "Quarantined",
      user: "olivia@untitledui.com",
      subject: "Subject line",
      details: "who the email is from",
      totalUsers: 1,
      senderScore: 60,
      scoreColor: "red",
      detections: ["Malicious", "Suspicious Sender"],
    },
    {
      id: 2,
      action: "Delivered",
      user: "olivia@untitledui.com",
      subject: "Welcome to the platform",
      details: "User@malicious.domain.com",
      totalUsers: 32,
      senderScore: 99,
      scoreColor: "yellow",
      detections: ["Not Malicious", "Marketing"],
    },
    {
      id: 3,
      action: "Delivered",
      user: "olivia@untitledui.com",
      subject: "Welcome to the platform",
      details: "User@malicious.domain.com",
      totalUsers: 1,
      senderScore: 100,
      scoreColor: "green",
      detections: ["Safe"],
    },
  ];

  const users = [
    {
      id: 1,
      name: "Olivia Rhye",
      email: "olivia@untitledui.com",
      account: "General Health",
      group: "Security",
      roles: ["Owner", "Admin", "Member"],
      created: "12/23/2023",
      healthScore: "Low",
    },
    {
      id: 2,
      name: "Phoenix Baker",
      email: "phoenix@untitledui.com",
      account: "Little Dental Van Nuys",
      group: "Corporate Compliance",
      roles: ["Admin"],
      created: "12/23/2023",
      healthScore: "Low",
    },
    {
      id: 3,
      name: "Lana Steiner",
      email: "lana@untitledui.com",
      account: "Little Dental Van Nuys",
      group: "Regulatory Affairs",
      roles: ["Admin"],
      created: "12/23/2023",
      healthScore: "Low",
    },
    {
      id: 4,
      name: "Demi Wilkinson",
      email: "demi@untitledui.com",
      account: "Little Dental Van Nuys",
      group: "FinTech Legal",
      roles: ["Member"],
      created: "12/23/2023",
      healthScore: "Low",
    },
    {
      id: 5,
      name: "Candice Wu",
      email: "candice@untitledui.com",
      account: "Big Dental Costa Mesa",
      group: "Corporate Governance",
      roles: ["Admin"],
      created: "12/23/2023",
      healthScore: "Medium",
    },
    {
      id: 6,
      name: "Governance Team",
      email: "Governance@untitledui.com",
      account: "Big Dental Costa Mesa",
      group: "Corporate Governance",
      roles: ["Member"],
      created: "12/23/2023",
      healthScore: "Medium",
    },
    {
      id: 7,
      name: "Drew Cano",
      email: "drew@untitledui.com",
      account: "Records & Tax Co.",
      group: "Mergers & Acquisitions",
      roles: ["Admin"],
      created: "12/23/2023",
      healthScore: "High",
    },
    {
      id: 8,
      name: "Orlando Diggs",
      email: "orlando@untitledui.com",
      account: "Records & Tax Co.",
      group: "Mergers & Acquisitions",
      roles: ["Member"],
      created: "12/23/2023",
      healthScore: "High",
    },
    {
      id: 9,
      name: "Andi Lane",
      email: "andi@untitledui.com",
      account: "Records & Tax Co.",
      group: "Corporate Compliance",
      roles: ["Member"],
      created: "12/23/2023",
      healthScore: "Critical",
    },
  ];

  const toggleUser = (userId: number) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleAll = () => {
    setSelectedUsers((prev) =>
      prev.length === users.length ? [] : users.map((user) => user.id)
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedUsers.length === users.length}
                onCheckedChange={toggleAll}
                aria-label="Select all users"
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
          {emails.map((user, index) => (
            <TableRow key={index}>
              <TableCell>
                <Checkbox
                  checked={selectedUsers.includes(user.id)}
                  onCheckedChange={() => toggleUser(user.id)}
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
                  <p>{user.subject}</p>
                  <p className="text-sm text-muted-foreground">
                    {user.details}
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
    </TableWrapper>
  );
}

export default LogsTable;
