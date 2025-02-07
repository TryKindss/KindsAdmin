"use client";

import MainPageWrapper from "@/components/global/wrappers/MainPageWrapper";
import PolicyFilter from "./PolicyFilter";
import PolicyTable from "./PolicyTable";
import { useState } from "react";

export interface PolicyPageProps {
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



export default function Component() {
  const [filter, setFilter] = useState({
    active: true,
    search: "",
    action: "",
  });

  return (
    <MainPageWrapper>
      <PolicyFilter filter={filter} setFilter={setFilter} />
      <PolicyTable filter={filter} setFilter={setFilter} />
    </MainPageWrapper>
  );
}
