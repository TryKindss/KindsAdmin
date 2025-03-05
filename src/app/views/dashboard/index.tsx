"use client";
import React, { useState } from "react";
import TabList from "./TabList";
import LogsView from "../logs";
import InsightView from "../insights";
import OnboardingView from "../onboarding";
import PoliciesView from "../policies";
import SettingsView from "../settings";
import UsersView from "../inboxes";
import AccountsView from "../accounts";
import { useDashboardTabContext } from "@/providers/DashboardTabContext";

function DashboardView() {
  const tabItems = [
    { value: "dashboard", label: "Dashboard", content: <OnboardingView /> },
    { value: "policies", label: "Policies", content: <PoliciesView /> },
    { value: "accounts", label: "Accounts", content: <AccountsView /> },
    { value: "users", label: "Inboxes", content: <UsersView /> },
    { value: "logs", label: "Logs", content: <LogsView /> },
    { value: "settings", label: "Settings", content: <SettingsView /> },
    { value: "insights", label: "Insights", content: <InsightView /> },
  ];

  // const [active, setActive] = useState(tabItems[0].value);

  const {active, setActive} = useDashboardTabContext();
  return (
    <div className="layout h-full">
      <TabList active={active} setActive={setActive} tabItems={tabItems} />
    </div>
  );
}

export default DashboardView;
