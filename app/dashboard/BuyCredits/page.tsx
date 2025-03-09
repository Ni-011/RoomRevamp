"use client";
import React from "react";
import { Button } from "@/components/ui/button";

const Credits = () => {
  return (
    <div className="min-h-screen p-8">
      {/* Keep the new enhanced header */}
      <div className="text-center mb-16 relative">
        <div className="inline-block">
          <span className="bg-gradient-to-r from-[#3a5a40]/10 via-[#588157]/20 to-[#3a5a40]/10 text-[#3a5a40] text-sm font-medium px-6 py-2 rounded-full inline-block mb-4 shadow-sm">
            🌟 Transform Your Space
          </span>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-[#3a5a40] to-[#588157] bg-clip-text text-transparent mb-6">
          Choose Your Credit Pack
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Unlock the power of AI-driven interior design with our flexible credit
          packages
        </p>
      </div>

      {/* Original cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Basic Package */}
        <div className="bg-[#fefae0] rounded-2xl p-8 shadow-lg border-2 border-[#3a5a40]/20 hover:border-[#3a5a40] transition-all duration-300 flex flex-col">
          <div className="flex-grow">
            <h2 className="text-2xl font-semibold text-[#3a5a40] mb-2">
              Starter Pack
            </h2>
            <div className="text-4xl font-bold text-[#3a5a40] mb-4">
              ₹69
              <span className="text-lg text-gray-600 font-normal">
                /one-time
              </span>
            </div>
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Perfect for trying out our service
              </p>
              <div className="text-2xl font-semibold text-[#588157] mb-2">
                100 Credits
              </div>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-[#3a5a40] mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>2 credits per transformation</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-[#3a5a40] mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>50 room transformations</span>
                </li>
              </ul>
            </div>
          </div>
          <Button
            className="w-full py-6 text-lg font-semibold bg-[#3a5a40] hover:bg-[#588157] 
            text-[#fefae0] transition-all duration-200 ease-in-out rounded-xl
            shadow-[0_6px_0px_0px_#344e3a] hover:shadow-[0_4px_0px_0px_#4e7350]
            hover:translate-y-[2px] active:translate-y-[6px] active:shadow-none
            border-2 border-[#344e3a] hover:border-[#4e7350]
            transform hover:scale-[0.99] active:scale-[0.97]"
          >
            Buy Now
          </Button>
        </div>

        {/* Popular Package */}
        <div className="bg-[#fefae0] rounded-2xl p-8 shadow-lg border-2 border-[#3a5a40] relative transform hover:scale-105 transition-all duration-300 flex flex-col">
          <div className="absolute top-0 right-0 bg-[#3a5a40] text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-semibold">
            POPULAR
          </div>
          <div className="flex-grow">
            <h2 className="text-2xl font-semibold text-[#3a5a40] mb-2">
              Value Pack
            </h2>
            <div className="text-4xl font-bold text-[#3a5a40] mb-4">
              ₹299
              <span className="text-lg text-gray-600 font-normal">
                /one-time
              </span>
            </div>
            <div className="mb-6">
              <p className="text-gray-600 mb-4">Best value for regular users</p>
              <div className="text-2xl font-semibold text-[#588157] mb-2">
                500 Credits
              </div>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-[#3a5a40] mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>2 credits per transformation</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-[#3a5a40] mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>250 room transformations</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-[#3a5a40] mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Save ₹46 compared to Starter</span>
                </li>
              </ul>
            </div>
          </div>
          <Button
            className="w-full py-6 text-lg font-semibold bg-[#3a5a40] hover:bg-[#588157] 
            text-[#fefae0] transition-all duration-200 ease-in-out rounded-xl
            shadow-[0_6px_0px_0px_#344e3a] hover:shadow-[0_4px_0px_0px_#4e7350]
            hover:translate-y-[2px] active:translate-y-[6px] active:shadow-none
            border-2 border-[#344e3a] hover:border-[#4e7350]
            transform hover:scale-[0.99] active:scale-[0.97]"
          >
            Buy Now
          </Button>
        </div>

        {/* Pro Package */}
        <div className="bg-[#fefae0] rounded-2xl p-8 shadow-lg border-2 border-[#3a5a40]/20 hover:border-[#3a5a40] transition-all duration-300 flex flex-col">
          <div className="flex-grow">
            <h2 className="text-2xl font-semibold text-[#3a5a40] mb-2">
              Pro Pack
            </h2>
            <div className="text-4xl font-bold text-[#3a5a40] mb-4">
              ₹499
              <span className="text-lg text-gray-600 font-normal">
                /one-time
              </span>
            </div>
            <div className="mb-6">
              <p className="text-gray-600 mb-4">Perfect for power users</p>
              <div className="text-2xl font-semibold text-[#588157] mb-2">
                1000 Credits
              </div>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-[#3a5a40] mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>2 credits per transformation</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-[#3a5a40] mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>500 room transformations</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-[#3a5a40] mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Save ₹139 compared to Starter</span>
                </li>
              </ul>
            </div>
          </div>
          <Button
            className="w-full py-6 text-lg font-semibold bg-[#3a5a40] hover:bg-[#588157] 
            text-[#fefae0] transition-all duration-200 ease-in-out rounded-xl
            shadow-[0_6px_0px_0px_#344e3a] hover:shadow-[0_4px_0px_0px_#4e7350]
            hover:translate-y-[2px] active:translate-y-[6px] active:shadow-none
            border-2 border-[#344e3a] hover:border-[#4e7350]
            transform hover:scale-[0.99] active:scale-[0.97]"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Credits;
