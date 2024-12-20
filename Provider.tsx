'use client'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import userDetailsContext from './app/_context/UserDetailsContext';

function Provider({children}: {children: React.ReactNode}) {

    const {user} = useUser(); // user info
    const [userDetails, setUserDetails] = useState([]);

    const verifyuser = async () => {
        const status = await axios.post('api/verifyUser', {
            user: user,
        });
        setUserDetails(status.data.result);
    }

    useEffect(() => {
        user && verifyuser();
    }, [user]);

  return (
    <userDetailsContext.Provider value={{userDetails, setUserDetails}}>
    <div>
        {children}
    </div>
    </userDetailsContext.Provider>
  )
}

export default Provider