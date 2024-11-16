"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TableEmptyState from "@/components/global/empty-table-state";
import { PolicyPageProps } from ".";
import TableWrapper from "@/components/global/wrappers/TableWrapper";

const policies = [
  {
    id: 1,
    name: "Require authentication for files after 60 days",
    description:
      "Set the maximum time data can be accessed without additional security layers required to access content.",
    status: "active",
    coverage: { accounts: 32, users: 112 },
    createdBy: "Phoenix Baker",
    created: "12/23/2023",
  },
  {
    id: 2,
    name: "Max session length for encrypted content",
    description:
      "Set the frequency that end users will have to re-authenticate to access encrypted messages and files.",
    status: "active",
    coverage: { accounts: 32, users: 112 },
    createdBy: "Phoenix Baker",
    created: "12/23/2023",
  },
  {
    id: 3,
    name: "2FA Method",
    description: "DUO is your default 2FA method",
    status: "inactive",
    coverage: { accounts: 32, users: 112 },
    createdBy: "Phoenix Baker",
    created: "12/23/2023",
  },
  {
    id: 4,
    name: "Login requirements for business user",
    description: "DUO is required to access encrypted content",
    status: "active",
    coverage: { accounts: 32, users: 112 },
    createdBy: "Phoenix Baker",
    created: "12/23/2023",
  },
  {
    id: 5,
    name: "Content filtering",
    description:
      "Automatically encrypt email based on message content, attached content, or recipient. You can set custom values.",
    status: "inactive",
    coverage: { accounts: 32, users: 112 },
    createdBy: "Phoenix Baker",
    created: "12/23/2023",
  },
];

export default function PolicyTable({ filter, setFilter }: PolicyPageProps) {
  const filteredPolicies = policies.filter((policy) => {
    const matchesSearch = policy.name
      .toLowerCase()
      .includes(filter.search.toLowerCase());
    const matchesStatus = filter.active ? policy.status === "active" : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full space-y-4 p-4">
      <TableWrapper>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Coverage</TableHead>
              <TableHead>Created by</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPolicies.length > 0 &&
              filteredPolicies.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{policy.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {policy.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        policy.status === "active"
                          ? "bg-green-50 text-green-700 border-green-200 capitalize"
                          : "bg-red-50 text-red-700 border-red-200 capitalize"
                      }
                    >
                      {policy.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">
                        {policy.coverage.accounts} Accounts
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {policy.coverage.users} users
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{policy.createdBy}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">1 year ago</div>
                      <div className="text-sm text-muted-foreground">
                        {policy.created}
                      </div>
                    </div>
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
        {filteredPolicies.length < 1 && (
          <TableEmptyState
            description="No Item to display"
            title="Empty Policy"
          />
        )}
      </TableWrapper>
    </div>
  );
}
