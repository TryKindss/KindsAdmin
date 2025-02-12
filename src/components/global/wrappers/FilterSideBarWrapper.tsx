import React, { PropsWithChildren } from "react";

function FilterSideBarWrapper({ children }: PropsWithChildren) {
  return (
    <div className="">
      <div className="space-y-3 w-64 rounded bg-white p-6">{children}</div>
    </div>
  );
}

export default FilterSideBarWrapper;
