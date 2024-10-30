import React from "react";
import AccountsTable from "./AccountsTable";

function MainContent() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="px-6">
        <AccountsTable/>
      </div>
    </div>
  );
}

export default MainContent;
