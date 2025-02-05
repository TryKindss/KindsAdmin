"use client";

import { Badge } from "@/components/ui/badge";
import { MoreVertical } from "lucide-react";
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
import { useAppSelector } from "@/hooks";
import { useFetchAllAccountsQuery } from "@/api/m365/accounts";
import { useFetchAllPolicyQuery } from "@/api/m365/policy";
import TableSkeleton from "@/components/global/table-loading-state";



export default function PolicyTable({ filter, setFilter }: PolicyPageProps) {
  const token = useAppSelector((store) => store.authState.token);

  const {
    data: accountDetails,
    isLoading: accountLoading,
    isError: accountDetailsError,
  } = useFetchAllAccountsQuery();

  console.log("ACCOUNTDETAILS", accountDetails)
  console.log("ACCOUNTDETAILS", accountDetailsError)
  const orgId = accountDetails?.organizations?.[0]?.id || "";

  const {
    data: policyData,
    isLoading: policyLoading,
    isError: policyError,
  } = useFetchAllPolicyQuery({ orgId }, { skip: !token || orgId.length === 0 });

  const policies = policyData || [];

  const filteredPolicies = policies.filter((policy) => {
    const matchesSearch = policy.name
      .toLowerCase()
      .includes(filter.search.toLowerCase());
    // const matchesStatus = filter.active ? policy.status === "active" : true;
    return matchesSearch;
  });

  return (
    <div className="w-full space-y-4 p-4">
      <TableWrapper>
        {/* loading state -- here */}
        {(accountLoading || policyLoading) && <TableSkeleton columns={6} />}

        {/* empty state -- here  */}
        {!accountLoading && !policyLoading && filteredPolicies.length === 0 && (
          <TableEmptyState
            description="No Policy to display"
            title="No Policy found"
          />
        )}
        {!accountLoading && !policyLoading && filteredPolicies.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Coverage</TableHead>
                <TableHead>Action</TableHead>
                {/* <TableHead>Created</TableHead> */}
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
                          policy.isEnabled
                            ? "bg-green-50 text-green-700 border-green-200 capitalize"
                            : "bg-red-50 text-red-700 border-red-200 capitalize"
                        }
                      >
                        {policy.isEnabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">
                          {policy.inboxesCount} Inboxes
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {policy.organizationsCount} Organization
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="capitalize bg-gr">
                      {policy?.action}
                    </TableCell>
                    {/* <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">1 year ago</div>
                        <div className="text-sm text-muted-foreground">
                          {policy?.created}
                        </div>
                      </div>
                    </TableCell> */}
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
      </TableWrapper>
    </div>
  );
}
