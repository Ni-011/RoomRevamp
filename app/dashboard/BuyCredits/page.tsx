"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { db } from "@/config/db";
import { Users } from "@/config/schema";
import { useAtomValue, useSetAtom } from "jotai";
import { userDetailsAtom } from "@/app/atoms/UserDetailsAtom";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";

interface UserDetails {
  id: number;
  name: string;
  email: string;
  imageURL: string;
  credits: number;
}

const Credits = () => {
  const [selectedCredit, setSelectedCredit] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paypalError, setPaypalError] = useState<string | null>(null);
  const [{ isPending, isResolved, isRejected }] = usePayPalScriptReducer();

  const userDetails = useAtomValue<UserDetails | null>(userDetailsAtom);
  const setUserDetails = useSetAtom(userDetailsAtom);

  // Get amount based on selected credit package in USD
  const getAmount = () => {
    switch (selectedCredit) {
      case "starter":
        return "0.99";
      case "value":
        return "3.99";
      case "pro":
        return "6.99";
      default:
        return "0";
    }
  };

  // Get credits based on selected package
  const getCredits = () => {
    switch (selectedCredit) {
      case "starter":
        return 100;
      case "value":
        return 500;
      case "pro":
        return 1000;
      default:
        return 0;
    }
  };

  const handleCreditSelection = (credit: string) => {
    setSelectedCredit(credit);
    setPaymentSuccess(false);
    setPaypalError(null);
  };

  const router = useRouter();

  // Handle successful payment
  const handlePaymentSuccess = async (data: any) => {
    try {
      if (!userDetails || !userDetails.id) {
        console.error("User details not available");
        setPaypalError(
          "Unable to update your credits. Please contact support."
        );
        return;
      }

      // update user credits
      const result = await db
        .update(Users)
        .set({
          credits: (userDetails.credits || 0) + getCredits(),
        })
        .where(eq(Users.id, userDetails.id))
        .returning({ id: Users.id });

      // Check if any rows were updated
      if (result.length > 0) {
        // Update was successful
        setUserDetails({
          ...userDetails,
          credits: (userDetails.credits || 0) + getCredits(),
        } as UserDetails);

        setPaymentSuccess(true);
        console.log("Payment successful!", data);

        // Redirect to dashboard after a short delay
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        // No rows were updated
        console.error("Failed to update user credits");
        setPaypalError(
          "Failed to update your credits. Please contact support."
        );
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setPaypalError("Error processing payment. Please try again.");
    }
  };

  // Render PayPal buttons or success message
  const renderPaymentSection = () => {
    if (!selectedCredit) {
      return null;
    }

    if (paymentSuccess) {
      return (
        <div className="mt-8 p-6 bg-green-50 rounded-xl border-2 border-green-500 text-center">
          <h3 className="text-2xl font-bold text-green-700 mb-2">
            Payment Successful!
          </h3>
          <p className="text-green-600 mb-4">
            {getCredits()} credits have been added to your account.
          </p>
          <Button
            onClick={() => setSelectedCredit(null)}
            className="bg-green-600 hover:bg-green-700"
          >
            Continue
          </Button>
        </div>
      );
    }

    return (
      <div className="mt-8 p-6 bg-[#fefae0] rounded-xl border-2 border-[#3a5a40] max-w-md mx-auto">
        <h3 className="text-xl font-semibold text-[#3a5a40] mb-4 text-center">
          Complete Your Purchase
        </h3>
        <div className="mb-6 flex justify-between items-center p-4 bg-white rounded-lg">
          <div>
            <p className="font-medium text-gray-700">
              {selectedCredit === "starter"
                ? "Starter Pack"
                : selectedCredit === "value"
                ? "Value Pack"
                : "Pro Pack"}
            </p>
            <p className="text-sm text-gray-500">{getCredits()} Credits</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-[#3a5a40]">${getAmount()}</p>
          </div>
        </div>

        {paypalError ? (
          <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200 mb-4">
            <p className="text-red-600 mb-2">{paypalError}</p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Refresh Page
            </Button>
          </div>
        ) : isPending ? (
          <div className="text-center p-4">
            <p className="text-[#3a5a40] mb-2">Loading payment options...</p>
            <div className="w-8 h-8 border-4 border-[#3a5a40] border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : isRejected ? (
          <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200 mb-4">
            <p className="text-red-600 mb-2">
              Failed to load payment options. Please try again.
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Refresh Page
            </Button>
          </div>
        ) : (
          <div className="mb-4">
            <PayPalButtons
              fundingSource="paypal"
              style={{
                layout: "vertical",
                color: "gold",
                shape: "rect",
                label: "pay",
                height: 55,
              }}
              forceReRender={[selectedCredit, getAmount()]}
              createOrder={(data, actions) => {
                try {
                  return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                      {
                        amount: {
                          currency_code: "USD",
                          value: getAmount(),
                        },
                        description: `${
                          selectedCredit === "starter"
                            ? "Starter"
                            : selectedCredit === "value"
                            ? "Value"
                            : "Pro"
                        } Pack - ${getCredits()} Credits`,
                      },
                    ],
                  });
                } catch (error) {
                  console.error("Error creating PayPal order:", error);
                  setPaypalError(
                    "Error creating PayPal order. Please try again."
                  );
                  throw error;
                }
              }}
              onApprove={(data, actions) => {
                try {
                  return actions.order!.capture().then((details) => {
                    console.log("Payment captured successfully", details);
                    handlePaymentSuccess(data);
                  });
                } catch (error) {
                  console.error("Error capturing PayPal payment:", error);
                  setPaypalError("Error processing payment. Please try again.");
                  throw error;
                }
              }}
              onCancel={() => {
                console.log("Payment cancelled");
                alert(
                  "Payment was cancelled. You can try again when you're ready."
                );
              }}
              onError={(err) => {
                console.error("PayPal error:", err);
                setPaypalError(
                  "There was an error processing your payment. Please try again."
                );
              }}
            />
          </div>
        )}

        <button
          onClick={() => setSelectedCredit(null)}
          className="w-full mt-4 py-2 text-[#3a5a40] text-sm font-medium hover:underline"
        >
          Cancel and go back
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4 sm:p-8">
      {/* Responsive header */}
      <div className="text-center mb-8 sm:mb-16 relative">
        <div className="inline-block">
          <span className="bg-gradient-to-r from-[#3a5a40]/10 via-[#588157]/20 to-[#3a5a40]/10 text-[#3a5a40] text-xs sm:text-sm font-medium px-4 sm:px-6 py-1.5 sm:py-2 rounded-full inline-block mb-3 sm:mb-4 shadow-sm">
            🌟 Transform Your Space
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#3a5a40] to-[#588157] bg-clip-text text-transparent mb-3 sm:mb-6">
          Choose Your Credit Pack
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
          Unlock the power of AI-driven interior design with our flexible credit
          packages
        </p>
      </div>

      {/* Render payment section if a credit pack is selected */}
      {renderPaymentSection()}

      {/* Hide credit cards if payment section is shown */}
      {!selectedCredit && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {/* Basic Package */}
          <div className="bg-[#fefae0] rounded-2xl p-5 sm:p-8 shadow-lg border-2 border-[#3a5a40]/20 hover:border-[#3a5a40] transition-all duration-300 flex flex-col">
            <div className="flex-grow">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#3a5a40] mb-2">
                Starter Pack
              </h2>
              <div className="text-3xl sm:text-4xl font-bold text-[#3a5a40] mb-3 sm:mb-4">
                $0.99
                <span className="text-base sm:text-lg text-gray-600 font-normal">
                  /one-time
                </span>
              </div>
              <div className="mb-5 sm:mb-6">
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                  Perfect for trying out our service
                </p>
                <div className="text-xl sm:text-2xl font-semibold text-[#588157] mb-2">
                  100 Credits
                </div>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-[#3a5a40] mr-2"
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
                      className="w-4 h-4 sm:w-5 sm:h-5 text-[#3a5a40] mr-2"
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
              className="w-full py-4 sm:py-6 text-base sm:text-lg font-semibold bg-[#3a5a40] hover:bg-[#588157] 
              text-[#fefae0] transition-all duration-200 ease-in-out rounded-xl
              shadow-[0_4px_0px_0px_#344e3a] sm:shadow-[0_6px_0px_0px_#344e3a] hover:shadow-[0_3px_0px_0px_#4e7350] sm:hover:shadow-[0_4px_0px_0px_#4e7350]
              hover:translate-y-[2px] active:translate-y-[4px] sm:active:translate-y-[6px] active:shadow-none
              border-2 border-[#344e3a] hover:border-[#4e7350]
              transform hover:scale-[0.99] active:scale-[0.97]"
              onClick={() => handleCreditSelection("starter")}
            >
              Buy Now
            </Button>
          </div>

          {/* Popular Package */}
          <div className="bg-[#fefae0] rounded-2xl p-5 sm:p-8 shadow-lg border-2 border-[#3a5a40] relative transform hover:scale-[1.02] sm:hover:scale-105 transition-all duration-300 flex flex-col">
            <div className="absolute top-0 right-0 bg-[#3a5a40] text-white px-3 sm:px-4 py-0.5 sm:py-1 rounded-bl-lg rounded-tr-lg text-xs sm:text-sm font-semibold">
              POPULAR
            </div>
            <div className="flex-grow">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#3a5a40] mb-2">
                Value Pack
              </h2>
              <div className="text-3xl sm:text-4xl font-bold text-[#3a5a40] mb-3 sm:mb-4">
                $3.99
                <span className="text-base sm:text-lg text-gray-600 font-normal">
                  /one-time
                </span>
              </div>
              <div className="mb-5 sm:mb-6">
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                  Best value for regular users
                </p>
                <div className="text-xl sm:text-2xl font-semibold text-[#588157] mb-2">
                  500 Credits
                </div>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-[#3a5a40] mr-2"
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
                      className="w-4 h-4 sm:w-5 sm:h-5 text-[#3a5a40] mr-2"
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
                      className="w-4 h-4 sm:w-5 sm:h-5 text-[#3a5a40] mr-2"
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
                    <span>Save $0.96 compared to Starter</span>
                  </li>
                </ul>
              </div>
            </div>
            <Button
              className="w-full py-4 sm:py-6 text-base sm:text-lg font-semibold bg-[#3a5a40] hover:bg-[#588157] 
              text-[#fefae0] transition-all duration-200 ease-in-out rounded-xl
              shadow-[0_4px_0px_0px_#344e3a] sm:shadow-[0_6px_0px_0px_#344e3a] hover:shadow-[0_3px_0px_0px_#4e7350] sm:hover:shadow-[0_4px_0px_0px_#4e7350]
              hover:translate-y-[2px] active:translate-y-[4px] sm:active:translate-y-[6px] active:shadow-none
              border-2 border-[#344e3a] hover:border-[#4e7350]
              transform hover:scale-[0.99] active:scale-[0.97]"
              onClick={() => handleCreditSelection("value")}
            >
              Buy Now
            </Button>
          </div>

          {/* Pro Package */}
          <div className="bg-[#fefae0] rounded-2xl p-5 sm:p-8 shadow-lg border-2 border-[#3a5a40]/20 hover:border-[#3a5a40] transition-all duration-300 flex flex-col sm:col-span-2 lg:col-span-1 sm:max-w-md mx-auto w-full">
            <div className="flex-grow">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#3a5a40] mb-2">
                Pro Pack
              </h2>
              <div className="text-3xl sm:text-4xl font-bold text-[#3a5a40] mb-3 sm:mb-4">
                $6.99
                <span className="text-base sm:text-lg text-gray-600 font-normal">
                  /one-time
                </span>
              </div>
              <div className="mb-5 sm:mb-6">
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                  Perfect for power users
                </p>
                <div className="text-xl sm:text-2xl font-semibold text-[#588157] mb-2">
                  1000 Credits
                </div>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-[#3a5a40] mr-2"
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
                      className="w-4 h-4 sm:w-5 sm:h-5 text-[#3a5a40] mr-2"
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
                      className="w-4 h-4 sm:w-5 sm:h-5 text-[#3a5a40] mr-2"
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
                    <span>Save $2.97 compared to Starter</span>
                  </li>
                </ul>
              </div>
            </div>
            <Button
              className="w-full py-4 sm:py-6 text-base sm:text-lg font-semibold bg-[#3a5a40] hover:bg-[#588157] 
              text-[#fefae0] transition-all duration-200 ease-in-out rounded-xl
              shadow-[0_4px_0px_0px_#344e3a] sm:shadow-[0_6px_0px_0px_#344e3a] hover:shadow-[0_3px_0px_0px_#4e7350] sm:hover:shadow-[0_4px_0px_0px_#4e7350]
              hover:translate-y-[2px] active:translate-y-[4px] sm:active:translate-y-[6px] active:shadow-none
              border-2 border-[#344e3a] hover:border-[#4e7350]
              transform hover:scale-[0.99] active:scale-[0.97]"
              onClick={() => handleCreditSelection("pro")}
            >
              Buy Now
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Credits;
