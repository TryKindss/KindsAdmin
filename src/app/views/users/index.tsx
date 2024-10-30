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

export default function Component() {
  const [selectedUsers, setSelectedUsers] = React.useState<number[]>([]);

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

  const getHealthScoreColor = (score: string) => {
    switch (score.toLowerCase()) {
      case "low":
        return "text-gray-500";
      case "medium":
        return "text-blue-600";
      case "high":
        return "text-orange-600";
      case "critical":
        return "text-red-600";
      default:
        return "text-gray-500";
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role.toLowerCase()) {
      case "owner":
        return "bg-purple-50 text-purple-700 hover:bg-purple-50";
      case "admin":
        return "bg-blue-50 text-blue-700 hover:bg-blue-50";
      case "member":
        return "bg-gray-50 text-gray-700 hover:bg-gray-50";
      default:
        return "bg-gray-50 text-gray-700 hover:bg-gray-50";
    }
  };

  return (
    <div className="w-full space-y-4 p-4">
      <div className="flex flex-col space-y-4">
        <h1 className="text-xl font-semibold">Users</h1>

        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-8" />
        </div>

        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <Tabs defaultValue="active" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="active">Active Users</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All accounts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All accounts</SelectItem>
                <SelectItem value="general">General Health</SelectItem>
                <SelectItem value="dental">Little Dental Van Nuys</SelectItem>
                <SelectItem value="records">Records & Tax Co.</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All groups" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All groups</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="compliance">Corporate Compliance</SelectItem>
                <SelectItem value="legal">FinTech Legal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
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
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={() => toggleUser(user.id)}
                      aria-label={`Select ${user.name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{user.account}</TableCell>
                  <TableCell>{user.group}</TableCell>
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
                      <span className="text-sm">{user.created}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={getHealthScoreColor(user.healthScore)}>
                      {user.healthScore}
                    </span>
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
        </div>
      </div>
    </div>
  );
}
