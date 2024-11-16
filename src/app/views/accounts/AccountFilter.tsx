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

function AccountFilter() {
  return (
    <FilterSideBarWrapper>
      <h2 className="text-lg font-semibold">Accounts</h2>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search" className="pl-8" />
      </div>

      <div className="space-y-4">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All connections" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All connections</SelectItem>
            <SelectItem value="gmail">Gmail</SelectItem>
            <SelectItem value="microsoft">Microsoft</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Health Score" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All scores</SelectItem>
            <SelectItem value="high">High (80-100%)</SelectItem>
            <SelectItem value="medium">Medium (40-79%)</SelectItem>
            <SelectItem value="low">Low (0-39%)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </FilterSideBarWrapper>
  );
}

export default AccountFilter;
