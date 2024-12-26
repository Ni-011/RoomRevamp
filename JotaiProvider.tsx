"use client";
import { Provider } from "jotai";

function RecoilProvider({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>;
}

export default RecoilProvider;
