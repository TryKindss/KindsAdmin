import MainPageWrapper from "@/components/global/wrappers/MainPageWrapper";
import InboxesFilter from "./InboxesFilter";
import InboxesTable from "./InboxesTable";
import { useState } from "react";

interface InitialFilters {
  active: boolean;
  searchQuery: string;
  group: string;
  account: string;
  roles: string;
  roleRisk: string;
  inboxType: string;
}
export interface UserPageProps {
  filter: InitialFilters;
  setFilter: React.Dispatch<React.SetStateAction<InitialFilters>>;
  setGroups: React.Dispatch<React.SetStateAction<string[]>>;
  groups: string[];
}

export default function Component() {
  const [filter, setFilter] = useState<InitialFilters>({
    active: true,
    account: "",
    group: "all",
    roles: "",
    roleRisk: "all",
    searchQuery: "",
    inboxType: "all",
  });

  const [groups, setGroups] = useState<string[]>([]);

  return (
    <MainPageWrapper>
      <InboxesFilter
        filter={filter}
        setFilter={setFilter}
        groups={groups}
        setGroups={setGroups}
      />
      <InboxesTable
        filter={filter}
        setFilter={setFilter}
        setGroups={setGroups}
        groups={groups}
      />
    </MainPageWrapper>
  );
}
