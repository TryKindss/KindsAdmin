import MainPageWrapper from "@/components/global/wrappers/MainPageWrapper";
import UsersFilter from "./UserFilter";
import UsersTable from "./UsersTable";
import { useState } from "react";

interface InitialFilters {
  active: boolean;
  searchQuery: string;
  group: string;
  account: string;
}
export interface UserPageProps {
  filter: InitialFilters;
  setFilter: React.Dispatch<React.SetStateAction<InitialFilters>>;
}

export default function Component() {
  const [filter, setFilter] = useState<InitialFilters>({
    active: true,
    account: "",
    group: "",
    searchQuery: "",
  });
  return (
    <MainPageWrapper>
      <UsersFilter filter={filter} setFilter={setFilter} />
      <UsersTable filter={filter} setFilter={setFilter} />
    </MainPageWrapper>
  );
}
