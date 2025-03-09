"use client";
import React, { useState } from "react";
import ImageSelection from "./_components/ImageSelection";
import RoomtType from "./_components/RoomtType";
import Theme from "./_components/Theme";
import UserQuery from "./_components/UserQuery";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import CustomLoader from "./_components/CustomLoader";
import ImageDialogue from "./_components/ImageDialogue";

interface FormData {
  image?: File[];
  RoomType?: string;
  theme?: string;
  userQuery?: string;
  OGImageURL?: string;
}

function createNew() {
  const [formData, setFormData] = useState<FormData>({});
  const handleInputChange = (value: any, field: string) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [field]: [value],
    }));
    console.log(formData);
  };

  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStatus, setLoadingStatus] = useState<string>("");
  const [OGImageURL, setOGImageURL] = useState<string>();
  const [transformedImageURL, setTransformedImageURL] = useState<string>();
  const [imageDialogue, setImageDialogue] = useState<boolean>(false);

  // Updated reDesignRoom function that uses the new endpoints
  const reDesignRoom = async () => {
    try {
      setLoading(true);

      // 1. Upload original image
      setLoadingStatus("Uploading your image...");
      const OGImageURL = await saveOGImage();
      console.log("OG Image URL: ", OGImageURL);
      setOGImageURL(OGImageURL);

      // 2. Start the prediction
      setLoadingStatus("Starting design generation...");
      const roomType = formData?.RoomType?.[0];
      const theme = formData?.theme?.[0];
      const userQuery = formData?.userQuery?.[0];

      const startResponse = await fetch("/api/replicate-proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            image: OGImageURL,
            prompt: `A ${roomType} with a ${theme} style interior ${userQuery}`,
            guidance_scale: 15,
            negative_prompt:
              "lowres, watermark, banner, logo, watermark, contactinfo, text, deformed, blurry, blur, out of focus, out of frame, surreal, extra, ugly, upholstered walls, fabric walls, plush walls, mirror, mirrored, functional, realistic",
            prompt_strength: 0.8,
            num_inference_steps: 50,
          },
        }),
      });

      if (!startResponse.ok) {
        const errorData = await startResponse.json();
        throw new Error(`Failed to start generation: ${errorData.error}`);
      }

      const prediction = await startResponse.json();
      console.log("Prediction started:", prediction);

      // 3. Poll for the result with improved error handling
      setLoadingStatus("Processing your design...");
      let attempts = 0;
      const maxAttempts = 60; // 5 minutes with 5-second intervals
      let generatedImageUrl = null;

      while (attempts < maxAttempts) {
        attempts++;
        setLoadingStatus(
          `Processing your design... (Attempt ${attempts}/${maxAttempts})`
        );

        const statusResponse = await fetch(
          `/api/replicate-status/${prediction.id}`
        );
        if (!statusResponse.ok) {
          const errorData = await statusResponse.json();
          throw new Error(`Failed to check status: ${errorData.error}`);
        }

        const result = await statusResponse.json();
        console.log("Prediction status:", result.status);

        if (result.status === "succeeded") {
          generatedImageUrl = Array.isArray(result.output)
            ? result.output[0]
            : result.output;
          break;
        }

        if (result.status === "failed") {
          throw new Error("Image generation failed");
        }

        if (result.status === "canceled") {
          throw new Error("Image generation was canceled");
        }

        // Wait 5 seconds before next attempt
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }

      if (!generatedImageUrl) {
        throw new Error("Timeout waiting for image generation");
      }

      // 4. Upload the generated image to Cloudinary
      setLoadingStatus("Finalizing your design...");
      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: generatedImageUrl,
          isRemoteUrl: true,
        }),
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(`Upload error: ${errorData.error}`);
      }

      const uploadData = await uploadResponse.json();
      console.log("Uploaded transformed image:", uploadData);

      // 5. Save to database
      const saveResponse = await fetch("/api/saveDesign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomType: roomType,
          theme: theme,
          userQuery: userQuery,
          ogImageURL: OGImageURL,
          transformedImageURL: uploadData.url,
          userEMail: user?.primaryEmailAddress?.emailAddress,
        }),
      });

      if (!saveResponse.ok) {
        const errorData = await saveResponse.json();
        throw new Error(`Save error: ${errorData.error}`);
      }

      const saveData = await saveResponse.json();
      console.log("Design saved:", saveData);

      setTransformedImageURL(uploadData.url);
      setImageDialogue(true);
    } catch (error: any) {
      console.error("Error:", error);
      alert(`Error generating design: ${error.message}`);
    } finally {
      setLoading(false);
      setLoadingStatus("");
    }
  };

  // Original saveOGImage function
  const saveOGImage = async () => {
    try {
      if (!formData.image?.[0]) {
        throw new Error("No image selected");
      }

      console.log(
        "Selected image:",
        formData.image[0].name,
        formData.image[0].type,
        formData.image[0].size
      );

      // Check if the file is a valid image
      if (!formData.image[0].type.startsWith("image/")) {
        throw new Error("Selected file is not an image");
      }

      const formDataToUpload = new FormData();
      formDataToUpload.append("file", formData.image[0]);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataToUpload,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Upload failed with status:", response.status);
        console.error("Error details:", errorData);
        throw new Error(
          `Failed to upload image: ${errorData.error || response.statusText}`
        );
      }

      const data = await response.json();
      console.log("Uploaded image URL:", data.url);
      return data.url;
    } catch (error) {
      console.error("Error saving original image:", error);
      throw new Error("Failed to save original image");
    }
  };

  return (
    <div className="max-w-[1800px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
      <h1 className="text-4xl text-center text-[#3a5a40] mb-10">
        ReImagine your Room with 1 click
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left side - image upload */}
        <div className="flex justify-center items-center lg:block">
          <ImageSelection
            SelectedImage={(value: any) => handleInputChange(value, "image")}
          />
        </div>

        {/* Right side - form */}
        <div className="flex flex-col gap-7">
          <RoomtType
            selectedRoomType={(value: string) =>
              handleInputChange(value, "RoomType")
            }
          />
          <Theme
            selectedThemeType={(theme: string) =>
              handleInputChange(theme, "theme")
            }
          />
          <UserQuery
            userQueryInput={(value: string) =>
              handleInputChange(value, "userQuery")
            }
          />
          {/* Generate button */}
          <Button
            className="w-full py-6 text-lg font-semibold bg-[#3a5a40] hover:bg-[#588157] 
            text-[#fefae0] transition-all duration-200 ease-in-out rounded-xl
            shadow-[0_6px_0px_0px_#344e3a] hover:shadow-[0_4px_0px_0px_#4e7350]
            hover:translate-y-[2px] active:translate-y-[6px] active:shadow-none
            border-2 border-[#344e3a] hover:border-[#4e7350]
            transform hover:scale-[0.99] active:scale-[0.97] mt-[-15]"
            onClick={reDesignRoom}
          >
            Generate Design
          </Button>
          <p className="mt-[-20] font-italic text-[#3a5a40] text-md">
            Cost: Each generation consumes 2 credits*
          </p>
        </div>
      </div>
      <CustomLoader loading={loading} status={loadingStatus} />

      {transformedImageURL && OGImageURL && (
        <ImageDialogue
          imageDialogue={imageDialogue}
          transformedImageURL={transformedImageURL}
          OGImageURL={OGImageURL}
          setImageDialogue={setImageDialogue}
        />
      )}
    </div>
  );
}

export default createNew;
