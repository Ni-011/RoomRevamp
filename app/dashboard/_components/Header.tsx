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
    <div className="flex justify-between items-center p-3 sm:p-5 px-4 sm:px-10 sticky top-0 backdrop-blur-sm z-10">
      {/* Brand */}
      <Link href="/dashboard" className="shrink-0">
        <h1 className="text-3xl sm:text-3xl md:text-4xl text-[#3a5a40]">
          RoomRevamp
        </h1>
      </Link>

      {/* Controls - always horizontal */}
      <div className="flex items-center space-x-3 md:space-x-6">
        {/* Credits pill - clickable on mobile */}
        <Link href="/dashboard/BuyCredits" className="sm:pointer-events-none">
          <div className="flex items-center gap-2 rounded-full p-3 sm:p-4 bg-[#fefae0]">
            <Image
              src="/money.png"
              alt="credits"
              width={25}
              height={25}
              className="w-5 h-5 sm:w-[30px] sm:h-[30px]"
            />
            <p className="text-sm sm:text-lg text-[#3a5a40]">
              {userDetails?.credits ?? 0}
            </p>
          </div>
        </Link>

        {/* Buy button - hidden on mobile, visible on larger screens */}
        <div className="hidden sm:block">
          <Link href="/dashboard/BuyCredits">
            <Button
              variant="ghost"
              className="rounded-full py-4 md:py-5 px-3 md:px-4 text-white text-[#588157] hover:bg-[#588157] hover:text-white text-sm md:text-base"
            >
              Buy Credits
            </Button>
          </Link>
        </div>

        {/* User button - always visible */}
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}

export default Header;
