import React from "react";
import FilterSidebar from "./FilterSidebar";
import MainContent from "./MainContent";

function AccountsView() {
  return (
    <div className="flex h-full bg-gray-50">
      <FilterSidebar />
      <MainContent />
    </div>
  );
}

export default AccountsView;
