'use client'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import userDetailsContext from './app/_context/UserDetailsContext';

// a wrapper around app to get user details from login and send to the server

function Provider({children}: {children: React.ReactNode}) {

    const {user} = useUser(); // user info from clerk
    const [userDetails, setUserDetails] = useState([]);

    const verifyuser = async () => {
        try {
            console.log("Making API call...");
            const status = await axios.post('api/verifyUser', {
                user: user,
            });
            console.log("API Response:", status.data);
            setUserDetails(status.data.result);
        } catch (error: any) {
            console.error("API Error Details:", {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
                url: error.config?.url
            });
        }
    }

    // only verify if user exists
    useEffect(() => {
        user && verifyuser();
    }, [user]);

    // the app should get the user details, state management
  return (
    <userDetailsContext.Provider value={{userDetails, setUserDetails}}>
    <div>
        {children}
    </div>
    </userDetailsContext.Provider>
  )
}

export default Provider