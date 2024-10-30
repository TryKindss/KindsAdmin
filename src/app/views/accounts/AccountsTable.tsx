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

export default function AccountsTable() {
  const [offices, setOffices] = React.useState([
    {
      id: 1,
      name: "A-One Big dental office",
      progress: 20,
      status: "Active",
      groups: 13,
      users: 32,
      created: "12/23/2023",
      lastSync: "12/23/2024",
      autoSync: true,
    },
    {
      id: 2,
      name: "A-One Big dental office",
      progress: 40,
      status: "Active",
      groups: 5,
      users: 100,
      created: "12/23/2023",
      lastSync: "12/23/2024",
      autoSync: true,
    },
    {
      id: 3,
      name: "A-One Big dental office",
      progress: 60,
      status: "Active",
      groups: 8,
      users: 22,
      created: "12/23/2023",
      lastSync: "12/23/2024",
      autoSync: true,
    },
    {
      id: 4,
      name: "A-One Big dental office",
      progress: 80,
      status: "Active",
      groups: 18,
      users: 50,
      created: "12/23/2023",
      lastSync: "12/23/2024",
      autoSync: true,
    },
    {
      id: 5,
      name: "A-One Big dental office",
      progress: 99,
      status: "Active",
      groups: 121,
      users: 320,
      created: "12/23/2023",
      lastSync: "12/23/2024",
      autoSync: true,
    },
    {
      id: 6,
      name: "A-One Big dental office",
      progress: 100,
      status: "Active",
      groups: 4,
      users: 32,
      created: "12/23/2023",
      lastSync: "12/23/2024",
      autoSync: true,
    },
  ]);

  const getProgressColor = (progress: number) => {
    if (progress < 79) return "bg-red-500";
    if (progress < 99) return "bg-orange-500";
    if (progress < 100) return "bg-yellow-500";
    return "bg-green-500";
  };

  const handleToggle = (officeId: number) => {
    setOffices(
      offices.map((office) =>
        office.id === officeId
          ? { ...office, autoSync: !office.autoSync }
          : office
      )
    );
  };

  return (
    <div className="container mx-auto ">
      <Table className="border rounded-lg">
        <TableHeader className="rounded-lg">
          <TableRow className="rounded-t-lg">
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
        <TableBody className="bg-white">
          {offices.map((office) => (
            <TableRow key={office.id} className="">
              <TableCell className="font-medium py-3 pl-6">
                {office.name}
              </TableCell>
              <TableCell className="py-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-24 rounded-full bg-gray-200">
                    <div
                      className={`h-2 rounded-full ${getProgressColor(
                        office.progress
                      )}`}
                      style={{ width: `${office.progress}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {office.progress}%
                  </span>
                </div>
              </TableCell>
              <TableCell className="py-3">
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  {office.status}
                </Badge>
              </TableCell>
              <TableCell className="py-3">{office.groups}</TableCell>
              <TableCell className="py-3 text-blue-600">
                {office.users}
              </TableCell>
              <TableCell className="py-3">
                <div className="flex gap-3 items-center">
                  <Image src={Images.emailLog.gmail} alt="" className="w-6 h-6"/>
                  <Image src={Images.emailLog.ms_outlook} alt="" className="w-6 h-6"/>
                  <Image src={Images.emailLog.okta} alt="" className="w-6 h-6"/>
                </div>
              </TableCell>
              <TableCell className="py-3">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">
                    1 year ago
                  </span>
                  <span className="text-sm">{office.created}</span>
                </div>
              </TableCell>
              <TableCell className="py-3">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Today</span>
                  <span className="text-sm">{office.lastSync}</span>
                </div>
              </TableCell>
              <TableCell className="py-3">
                <Switch
                  checked={office.autoSync}
                  onCheckedChange={() => handleToggle(office.id)}
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
    </div>
  );
}
