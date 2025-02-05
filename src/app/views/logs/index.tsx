import MainPageWrapper from "@/components/global/wrappers/MainPageWrapper";
import React from "react";
import LogsFilter from "./LogsFilter";
import UsersTable from "../inboxes/InboxesTable";
import LogsTable from "./LogsTable";

function LogsView() {
  return (
    <MainPageWrapper>
      <LogsFilter />
      <LogsTable/>
    </MainPageWrapper>
  );
}

export default LogsView;
