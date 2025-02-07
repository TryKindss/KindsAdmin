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
import { PolicyPageProps } from ".";

function PolicyFilter({ filter, setFilter }: PolicyPageProps) {
  return (
    <FilterSideBarWrapper>
      <h2 className="text-lg font-semibold">Policy</h2>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="active"
            onClick={() => setFilter({ ...filter, active: true })}
          >
            Active
          </TabsTrigger>
          <TabsTrigger
            value="all"
            onClick={() => setFilter({ ...filter, active: false })}
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
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
        />
      </div>

      <div className="space-y-4">
        <Select
          onValueChange={(value) => setFilter({ ...filter, action: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All connections" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Action</SelectItem>
            <SelectItem value="quarantine"> Quarantine</SelectItem>
            <SelectItem value="display-banner">Display Banner</SelectItem>
            <SelectItem value="external-sender">Sender External Banner</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Enabled</SelectItem>
            <SelectItem value="security">Disabled</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </FilterSideBarWrapper>
  );
}

export default PolicyFilter;
