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
import { LogsPageProps } from ".";

function UsersFilter({ filter, setFilter }: LogsPageProps) {
  return (
    <FilterSideBarWrapper>
      <h2 className="text-lg font-semibold">Logs</h2>
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search" className="pl-8" onChange={(e)=> setFilter({...filter, search: e.target.value})}/>
      </div>

      <div className="space-y-4">
        <Select
          onValueChange={(value) => {
            setFilter({ ...filter, action: value });
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Actions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All </SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="quarantined">Quarantine</SelectItem>
            <SelectItem value="deleted">Deleted</SelectItem>
          </SelectContent>
        </Select>
        {/* <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All groups" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All groups</SelectItem>
            <SelectItem value="security">Security</SelectItem>
            <SelectItem value="compliance">Corporate Compliance</SelectItem>
            <SelectItem value="legal">FinTech Legal</SelectItem>
          </SelectContent>
        </Select> */}
      </div>
    </FilterSideBarWrapper>
  );
}

export default UsersFilter;
