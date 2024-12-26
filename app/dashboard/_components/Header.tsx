"use client";
import { userDetailsAtom } from "@/app/atoms/UserDetailsAtom";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useAtomValue } from "jotai";

function Header() {
  const userDetails = useAtomValue(userDetailsAtom);

  return (
    <div className="flex justify-between items-center p-5 px-10">
      {/* left side */}
      <div className="flex items-center gap-2">
        <h1 className="text-4xl">RoomRevamp</h1>
      </div>
      {/* right side */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 bg-slate-200 rounded-full p-4">
          <Image src="/money.png" alt="money" width={30} height={30} />
          <p className="text-lg">{userDetails?.credits ?? 0}</p>
        </div>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
