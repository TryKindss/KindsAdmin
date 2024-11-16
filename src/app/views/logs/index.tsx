import MainPageWrapper from "@/components/global/wrappers/MainPageWrapper";
import React from "react";
import LogsFilter from "./LogsFilter";
import UsersTable from "../users/UsersTable";

function LogsView() {
  return (
    <MainPageWrapper>
      <LogsFilter />
      <UsersTable />
    </MainPageWrapper>
  );
}

export default LogsView;
