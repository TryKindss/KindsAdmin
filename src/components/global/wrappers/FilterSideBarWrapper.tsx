import React, { PropsWithChildren } from "react";

function FilterSideBarWrapper({ children }: PropsWithChildren) {
  return (
    <div className="w-64 rounded bg-white p-6">
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export default FilterSideBarWrapper;
