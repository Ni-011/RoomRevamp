"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { useSetAtom } from "jotai";
import { userDetailsAtom } from "@/app/atoms/UserDetailsAtom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
// ** the annoying 404 and 500 errors on api/verifyUser is because of out of sync time with clerk, use ntp to sync time
function Provider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const setUserDetails = useSetAtom(userDetailsAtom);

  useEffect(() => {
    user && verifyuser();
  }, [user]);

  const verifyuser = async () => {
    if (!user) {
      console.log("No user data available");
      return;
    }

    try {
      console.log("Making API call with user data:", {
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName,
      });

      const response = await fetch("/api/verifyUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data.error) {
        console.error("API returned error:", data.error);
        return;
      }

      setUserDetails(data.result);
    } catch (error: any) {
      console.error("API Error Details:", {
        message: error.message,
        status: error.status,
        details: error,
      });
    }
  };

  // Using a sandbox client ID for testing
  // Replace this with your actual PayPal client ID in production
  const paypalClientId =
    "AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R";

  // PayPal script options
  const paypalScriptOptions = {
    clientId: paypalClientId,
    currency: "USD",
    intent: "capture",
    components: "buttons",
  };

  return (
    <PayPalScriptProvider options={paypalScriptOptions}>
      <div>{children}</div>
    </PayPalScriptProvider>
  );
}

export default Provider;
