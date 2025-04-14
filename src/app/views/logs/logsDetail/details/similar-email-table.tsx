import { SimilarEmailItem } from "@/api/m365/logs";
import TableEmptyState from "@/components/global/empty-table-state";
import TableWrapper from "@/components/global/wrappers/TableWrapper";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { getActionBadgeColor, getBadgeVariant } from "@/utils/helper";
import { HelpCircle, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function SimilarEmailTable({
  similarEmails,
}: {
  similarEmails: SimilarEmailItem[];
}) {
  const router = useRouter();
  const [selectedMessageIds, setSelectedMessageIds] = React.useState<string[]>(
    []
  );

  const toggleMessage = (id: string) => {
    setSelectedMessageIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelectedMessageIds((prev) =>
      prev.length === similarEmails.length
        ? []
        : similarEmails.map((email: any) => email.id)
    );
  };
  return (
    <TableWrapper>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedMessageIds.length === similarEmails.length}
                onCheckedChange={toggleAll}
                aria-label="Select all messages"
              />
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                Organization
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Email Subject</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TableHead>
            {/* action head */}
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
            {/* action head */}
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
            <TableHead>User</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {similarEmails.map((user, index: any) => (
            <TableRow
              className="hover:cursor-pointer"
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/logs/${user.id}`);
              }}
            >
              <TableCell>
                <Checkbox
                  checked={selectedMessageIds.includes(user.id)}
                  onCheckedChange={() => toggleMessage(user.id)}
                  aria-label={`Select ${user.from.address}`}
                />
              </TableCell>

              <TableCell className="truncate text-nowrap max-w-[300px]">
                {user.from.name}
              </TableCell>
              <TableCell className="truncate text-nowrap max-w-[300px]">
                <Badge className={`${getBadgeVariant(user.status)}`}>
                  {user.status}
                </Badge>
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
              <TableCell>{user.from.address}</TableCell>

              {/* <TableCell className="py-3">
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
                    className={`${getBadgeVariant(detection)} text-nowrap`}
                  >
                    {detection}
                  </Badge>
                ))}
              </TableCell> */}

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

        {similarEmails.length === 0 && (
          <TableEmptyState
            description="No Item to display, adjust filter option"
            title="No Logs Match found"
          />
        )}
      </Table>
    </TableWrapper>
  );
}
