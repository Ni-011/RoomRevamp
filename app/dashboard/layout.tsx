import React from "react";
import Header from "./_components/Header";
import Provider from "@/Provider";

function laout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default laout;
