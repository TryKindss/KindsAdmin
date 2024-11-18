import MainPageWrapper from "@/components/global/wrappers/MainPageWrapper";
import UsersFilter from "./UserFilter";
import UsersTable from "./UsersTable";


interface InitialFilters {
  active: boolean;
  searchQuery: string;
  connections: string;
  healthScore: string;
}
export interface AccountPageProps {
  filter: InitialFilters;
  setFilter: React.Dispatch<React.SetStateAction<InitialFilters>>;
}

export default function Component() {
  return (
    <MainPageWrapper>
      <UsersFilter />
      <UsersTable />
    </MainPageWrapper>
  );
}
