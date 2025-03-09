"use client";
import { userDetailsAtom } from "@/app/atoms/UserDetailsAtom";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useAtomValue } from "jotai";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Header() {
  const userDetails = useAtomValue(userDetailsAtom);

  return (
    <div className="flex justify-between items-center p-5 px-10">
      {/* left side */}
      <div className="flex items-center gap-2">
        <Link href="/dashboard">
          <h1 className="text-4xl text-[#3a5a40]">RoomRevamp</h1>
        </Link>
      </div>
      {/* right side */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 rounded-full p-4 bg-[#fefae0]">
          <Image src="/money.png" alt="money" width={30} height={30} />
          <p className="text-lg text-[#3a5a40]">{userDetails?.credits ?? 0}</p>
        </div>
        <Link href="/dashboard/BuyCredits">
          <Button
            variant="ghost"
            className="rounded-full text-sm text-white text-[#588157] hover:bg-[#588157] hover:text-white"
          >
            Buy Credits
          </Button>
        </Link>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
