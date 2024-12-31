"use client";
import Image from "next/image";
import React, { useState } from "react";

function ImageSelection({ SelectedImage }: any) {
  const [file, setFile] = useState<File | null>(null);

  const handleFile = (event: any) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    SelectedImage(event.target.files[0]);
  };

  return (
    <div>
      <label className="text-[#3a5a40]">Upload an Image of your room</label>
      <div className="mt-5">
        <label htmlFor="image-upload">
          <div
            className={`cursor-pointer border rounded-xl border-dotted border-[#3a5a40] bg-[#e9edc9] hover:bg-[#ccd5ae] transition-colors duration-200 flex justify-center ${
              file ? "p-0" : "p-40"
            }`}
          >
            {!file ? (
              <Image
                src="/upload-file.png"
                alt="upload-file"
                width={70}
                height={70}
              />
            ) : (
              <Image
                src={URL.createObjectURL(file)}
                alt="uploaded File"
                width={400}
                height={400}
                className="object-cover w-[400px] h-[400px] rounded-xl"
              />
            )}
          </div>
        </label>
        <input
          type="file"
          accept="image/*"
          id="image-upload"
          className="hidden"
          onChange={handleFile}
        />
      </div>
    </div>
  );
}

export default ImageSelection;
