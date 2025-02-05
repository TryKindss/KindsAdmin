import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import FilterSideBarWrapper from "@/components/global/wrappers/FilterSideBarWrapper";
import { UserPageProps } from ".";

function InboxesFilter({ filter, setFilter, groups }: UserPageProps) {
  console.log('groups', groups);
  return (
    <FilterSideBarWrapper>
      <h2 className="text-lg font-semibold">Users</h2>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="active"
            onClick={() => {
              setFilter({ ...filter, active: true });
            }}
          >
            Active
          </TabsTrigger>
          <TabsTrigger
            value="all"
            onClick={() => {
              setFilter({ ...filter, active: false });
            }}
          >
            All
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search"
          className="pl-8"
          onChange={(e) => {
            setFilter({ ...filter, searchQuery: e.target.value });
          }}
          value={filter.searchQuery}
        />
      </div>

      <div className="space-y-4">
        <Select
          onValueChange={(value) => setFilter({ ...filter, account: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Accounts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Accounts</SelectItem>
            <SelectItem value="general">General Health</SelectItem>
            <SelectItem value="dental">Little Dental Van Nuys</SelectItem>
            <SelectItem value="records">Records & Tax Co.</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filter.group}
          onValueChange={(value) => setFilter({ ...filter, group: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All groups" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All groups</SelectItem>
            {groups.map((group) => (
              <SelectItem key={group} value={group}>
                {group}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => setFilter({ ...filter, roles: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All </SelectItem>
            <SelectItem value="owner">Owner</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="member">Member</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) =>
            setFilter({ ...filter, healthScore: value })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Health Score" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Health Score</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </FilterSideBarWrapper>
  );
}

export default InboxesFilter;
