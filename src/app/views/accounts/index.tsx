"use client";
import React, { useState } from "react";
import MainPageWrapper from "@/components/global/wrappers/MainPageWrapper";
import AccountFilter from "./AccountFilter";
import AccountsTable from "./AccountsTable";

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

function AccountsView() {
  const initialFilters = {
    active: true,
    searchQuery: "",
    connections: "all",
    healthScore: "all",
  };
  const [filter, setFilter] = useState(initialFilters);

  return (
    <MainPageWrapper>
      <AccountFilter filter={filter} setFilter={setFilter} />
      <AccountsTable filter={filter} setFilter={setFilter} />
    </MainPageWrapper>
  );
}

export default AccountsView;
