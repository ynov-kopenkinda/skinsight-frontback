import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* <HeaderMessage /> */}
      {children}
    </div>
  );
}

export default Layout;
