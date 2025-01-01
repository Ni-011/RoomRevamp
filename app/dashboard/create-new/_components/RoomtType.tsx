import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function RoomtType({
  selectedRoomType,
}: {
  selectedRoomType: (value: string) => void;
}) {
  return (
    <div>
      <label className="text-lg text-[#3a5a40]">Select your Room Type:</label>
      <Select onValueChange={(value) => selectedRoomType(value)}>
        <SelectTrigger
          className="w-[180px] mt-2 w-full text-[#3a5a40] bg-[#fefae0] hover:bg-[#ccd5ae] 
          transition-colors duration-200 border-transparent
          data-[state=open]:bg-[#fefae0] data-[state=open]:border-[#3a5a40]"
        >
          <SelectValue placeholder="Room Type" />
        </SelectTrigger>
        <SelectContent className="bg-[#fefae0] border-[#3a5a40] shadow-md">
          <SelectItem
            value="bedroom"
            className="data-[highlighted]:bg-[#ccd5ae] data-[highlighted]:text-[#3a5a40] text-[#3a5a40] cursor-pointer focus:bg-[#ccd5ae]"
          >
            Bed Room
          </SelectItem>
          <SelectItem
            value="livingroom"
            className="data-[highlighted]:bg-[#ccd5ae] data-[highlighted]:text-[#3a5a40] text-[#3a5a40] cursor-pointer focus:bg-[#ccd5ae]"
          >
            Living Room
          </SelectItem>
          <SelectItem
            value="kitchen"
            className="data-[highlighted]:bg-[#ccd5ae] data-[highlighted]:text-[#3a5a40] text-[#3a5a40] cursor-pointer focus:bg-[#ccd5ae]"
          >
            Kitchen
          </SelectItem>
          <SelectItem
            value="office"
            className="data-[highlighted]:bg-[#ccd5ae] data-[highlighted]:text-[#3a5a40] text-[#3a5a40] cursor-pointer focus:bg-[#ccd5ae]"
          >
            Work Office
          </SelectItem>
          <SelectItem
            value="studyroom"
            className="data-[highlighted]:bg-[#ccd5ae] data-[highlighted]:text-[#3a5a40] text-[#3a5a40] cursor-pointer focus:bg-[#ccd5ae]"
          >
            Study Room
          </SelectItem>
          <SelectItem
            value="bathroom"
            className="data-[highlighted]:bg-[#ccd5ae] data-[highlighted]:text-[#3a5a40] text-[#3a5a40] cursor-pointer focus:bg-[#ccd5ae]"
          >
            Bath Room
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default RoomtType;
