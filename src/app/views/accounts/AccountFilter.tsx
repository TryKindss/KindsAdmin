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
import { AccountPageProps } from ".";

function AccountFilter({ filter, setFilter }: AccountPageProps) {
  return (
    <FilterSideBarWrapper>
      <h2 className="text-lg font-semibold">Accounts</h2>

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
          type="search"
          className="pl-8"
          value={filter.searchQuery}
          onChange={(e) => {
            setFilter({ ...filter, searchQuery: e.target.value });
          }}
        />
      </div>

      <div className="space-y-4">
        <Select
          onValueChange={(value) =>
            setFilter({ ...filter, connections: value })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All connections" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All connections</SelectItem>
            <SelectItem value="gmail">Gmail</SelectItem>
            <SelectItem value="m365">Microsoft</SelectItem>
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
            <SelectItem value="all">All scores</SelectItem>
            <SelectItem value="high">High (80-100%)</SelectItem>
            <SelectItem value="medium">Medium (40-79%)</SelectItem>
            <SelectItem value="low">Low (0-39%)</SelectItem>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => setFilter({ ...filter, autoSync: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Auto Sync" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Auto Sync</SelectItem>
            <SelectItem value="on">On</SelectItem>
            <SelectItem value="off">Off</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </FilterSideBarWrapper>
  );
}

export default AccountFilter;
