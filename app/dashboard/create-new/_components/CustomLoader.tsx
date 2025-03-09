import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { loadComponents } from "next/dist/server/load-components";

const CustomLoader = ({
  loading,
  status,
}: {
  loading: boolean;
  status?: string;
}) => {
  return (
    <AlertDialog open={loading}>
      <AlertDialogTitle></AlertDialogTitle>
      <AlertDialogContent className="bg-[#e9edc9]">
        <div className="flex flex-col items-center justify-center pb-10">
          <Image src={"/load1.gif"} alt="loading" width={200} height={200} />
          <h2 className="text-[#3a5a40]">
            {status || "Imagining you room... Please wait"}
          </h2>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomLoader;
