import React, { PropsWithChildren } from "react";
import NavMenu from "../scaffold/navigation/navigation-menu";

function layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen h-full flex flex-col">
      <NavMenu />
      <main className="flex-1 h-full ">{children}</main>
    </div>
  );
}

export default layout;
