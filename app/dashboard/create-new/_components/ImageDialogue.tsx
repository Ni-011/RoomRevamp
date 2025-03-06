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
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import { Button } from "@/components/ui/button";
import "react-before-after-slider-component/dist/build.css";

const ImageDialogue = ({
  imageDialogue,
  transformedImageURL,
  OGImageURL,
  setImageDialogue,
}: {
  imageDialogue: boolean;
  transformedImageURL: string;
  OGImageURL: string;
  setImageDialogue: (value: boolean) => void;
}) => {
  return (
    <AlertDialog open={imageDialogue}>
      <AlertDialogContent className="bg-[#e9edc9]">
        <AlertDialogHeader>
          <AlertDialogTitle></AlertDialogTitle>
          <ReactBeforeSliderComponent
            firstImage={{
              imageUrl: OGImageURL,
            }}
            secondImage={{
              imageUrl: transformedImageURL,
            }}
          />
          <div className="flex justify-center pt-5">
            <Button
              onClick={() => setImageDialogue(false)}
              className="w-full py-6 text-lg font-semibold bg-[#3a5a40] hover:bg-[#588157] 
            text-[#fefae0] transition-all duration-200 ease-in-out rounded-xl
            shadow-[0_6px_0px_0px_#344e3a] hover:shadow-[0_4px_0px_0px_#4e7350]
            hover:translate-y-[2px] active:translate-y-[6px] active:shadow-none
            border-2 border-[#344e3a] hover:border-[#4e7350]
            transform hover:scale-[0.99] active:scale-[0.97] mt-[-15]"
              variant="default"
              size="lg"
            >
              Close
            </Button>
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ImageDialogue;
