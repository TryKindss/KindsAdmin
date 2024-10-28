"use client";
import React, { useState } from "react";
import TabList from "./TabList";
import LogsView from "../logs";
import InsightView from "../insights";
import OnboardingView from "../onboarding";
import PoliciesView from "../policies";
import SettingsView from "../settings";
import UsersView from "../users";
import AccountsView from "../accounts";

function DashboardView() {
  const tabItems = [
    { value: "onboarding", label: "Onboarding", content: <OnboardingView /> },
    { value: "policies", label: "Policies", content: <AccountsView /> },
    { value: "accounts", label: "Accounts", content: <PoliciesView /> },
    { value: "users", label: "Users", content: <UsersView /> },
    { value: "logs", label: "Logs", content: <LogsView /> },
    { value: "settings", label: "Settings", content: <SettingsView /> },
    { value: "insights", label: "Insights", content: <InsightView /> },
  ];

  const [active, setActive] = useState(tabItems[0].value);

  return (
    <div className="layout">
      <TabList active={active} setActive={setActive} tabItems={tabItems} />
    </div>
  );
}

export default DashboardView;
