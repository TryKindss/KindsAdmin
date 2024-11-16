import MainPageWrapper from "@/components/global/wrappers/MainPageWrapper";
import UsersFilter from "./UserFilter";
import UsersTable from "./UsersTable";

export default function Component() {
  return (
    <MainPageWrapper>
      <UsersFilter />
      <UsersTable />
    </MainPageWrapper>
  );
}
