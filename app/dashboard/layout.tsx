import React from "react";
import Header from "./_components/Header";
import Provider from "@/Provider";

function laout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#e9edc9] min-h-screen">
      <Header />
      <div className="pt-20 px-10 md:px-20 lg:px-40 xl:px-60">{children}</div>
    </div>
  );
}

export default laout;
