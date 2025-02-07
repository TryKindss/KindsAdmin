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
import TableEmptyState from "@/components/global/empty-table-state";
import { PolicyPageProps } from ".";
import TableWrapper from "@/components/global/wrappers/TableWrapper";
import { useAppSelector } from "@/hooks";
import { useFetchAllAccountsQuery } from "@/api/m365/accounts";
import {
  useFetchAllPolicyQuery,
  useTogglePolicyStatusMutation,
} from "@/api/m365/policy";
import TableSkeleton from "@/components/global/table-loading-state";
import { useToast } from "@/hooks/use-toast";

export default function PolicyTable({ filter, setFilter }: PolicyPageProps) {
  const token = useAppSelector((store) => store.authState.token);
  const { toast } = useToast();

  const {
    data: accountDetails,
    isLoading: accountLoading,
    isError: accountDetailsError,
  } = useFetchAllAccountsQuery();

  console.log("ACCOUNTDETAILS", accountDetails);
  console.log("ACCOUNTDETAILS", accountDetailsError);
  const orgId = accountDetails?.organizations?.[0]?.id || "";

  const {
    data: policyData,
    isLoading: policyLoading,
    isError: policyError,
  } = useFetchAllPolicyQuery({ orgId }, { skip: !token || orgId.length === 0 });

  const [togglePolicy, { isLoading: togglePolicyLoading }] =
    useTogglePolicyStatusMutation();

  const handleTogglePolicy = async (
    policyId: string,
    currentStatus: boolean
  ) => {
    try {
      await togglePolicy({
        policyId,
        status: !currentStatus,
      })
        .unwrap()
        .then((data) => {
          console.log("toggleResponseDATA", data);
          toast({
            title: "Policy updated",
            description: "Policy status updated successfully",
          });
        });
    } catch (error) {
      console.error("Failed to toggle policy:", error);
      toast({
        title: "Error",
        description: "Error updating status",
        variant: "destructive"
      });

    }
  };

  const policies = policyData || [];

  const filteredPolicies = policies.filter((policy) => {
    const matchesSearch = policy.name
      .toLowerCase()
      .includes(filter.search.toLowerCase());

    const matchesAction =
      filter.action === "all" ||
      policy.action.toLowerCase().includes(filter.action.toLowerCase());

    const matchesStatus = filter.active ? policy.isEnabled === true : true;
    return matchesSearch && matchesAction && matchesStatus;
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
                      <div className="space-y-1"></div>
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
                          <DropdownMenuItem
                            onClick={() =>
                              handleTogglePolicy(policy.id, policy.isEnabled)
                            }
                            disabled={togglePolicyLoading}
                          >
                            {policy.isEnabled ? "Disable" : "Enable"}
                          </DropdownMenuItem>
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
