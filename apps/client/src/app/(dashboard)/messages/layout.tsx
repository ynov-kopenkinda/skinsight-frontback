import React from "react";

import TapBar from "../components/TapBar";
import HeaderMessage from "./components/header-message";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <HeaderMessage />
      {children}
      <div className="border-gray glassmorphism container fixed bottom-4 left-0 right-0 z-50 mx-auto block w-fit rounded-xl border-2 bg-white pl-4 pr-4">
        <TapBar />
      </div>
    </div>
  );
}

export default Layout;
