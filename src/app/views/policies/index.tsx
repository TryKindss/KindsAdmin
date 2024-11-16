"use client";

import MainPageWrapper from "@/components/global/wrappers/MainPageWrapper";
import PolicyFilter from "./PolicyFilter";
import PolicyTable from "./PolicyTable";
import { useState } from "react";

export interface PolicyPageProps {
  filter: {
    active: boolean;
    search: string;
  };
  setFilter: React.Dispatch<
    React.SetStateAction<{
      active: boolean;
      search: string;
    }>
  >;
}

const policies = [
  {
    id: 1,
    name: "Require authentication for files after 60 days",
    description:
      "Set the maximum time data can be accessed without additional security layers required to access content.",
    status: "active",
    coverage: { accounts: 32, users: 112 },
    createdBy: "Phoenix Baker",
    created: "12/23/2023",
  },
  {
    id: 2,
    name: "Max session length for encrypted content",
    description:
      "Set the frequency that end users will have to re-authenticate to access encrypted messages and files.",
    status: "active",
    coverage: { accounts: 32, users: 112 },
    createdBy: "Phoenix Baker",
    created: "12/23/2023",
  },
  {
    id: 3,
    name: "2FA Method",
    description: "DUO is your default 2FA method",
    status: "inactive",
    coverage: { accounts: 32, users: 112 },
    createdBy: "Phoenix Baker",
    created: "12/23/2023",
  },
  {
    id: 4,
    name: "Login requirements for business user",
    description: "DUO is required to access encrypted content",
    status: "active",
    coverage: { accounts: 32, users: 112 },
    createdBy: "Phoenix Baker",
    created: "12/23/2023",
  },
  {
    id: 5,
    name: "Content filtering",
    description:
      "Automatically encrypt email based on message content, attached content, or recipient. You can set custom values.",
    status: "inactive",
    coverage: { accounts: 32, users: 112 },
    createdBy: "Phoenix Baker",
    created: "12/23/2023",
  },
];

export default function Component() {
  const [filter, setFilter] = useState({
    active: true,
    search: "",
  });

  return (
    <MainPageWrapper>
      <PolicyFilter filter={filter} setFilter={setFilter} />
      <PolicyTable filter={filter} setFilter={setFilter} />
    </MainPageWrapper>
  );
}
