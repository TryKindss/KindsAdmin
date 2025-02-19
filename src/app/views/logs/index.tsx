"use client"
import MainPageWrapper from "@/components/global/wrappers/MainPageWrapper";
import React, { useState } from "react";
import LogsFilter from "./LogsFilter";
import UsersTable from "../inboxes/InboxesTable";
import LogsTable from "./LogsTable";


export interface LogsPageProps {
  filter: {
    active: boolean;
    search: string;
    action: string;
  };
  setFilter: React.Dispatch<
    React.SetStateAction<{
      active: boolean;
      search: string;
      action: string;
    }>
  >;
}   
function LogsView() {

    const [filter, setFilter] = useState({
      active: true,
      search: "",
      action: "all",
    });


  return (
    <MainPageWrapper>
      <LogsFilter filter={filter} setFilter={setFilter} />
      <LogsTable filter={filter} setFilter={setFilter} />
    </MainPageWrapper>
  );
}

export default LogsView;
