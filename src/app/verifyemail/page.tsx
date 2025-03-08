"use client"

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function verifyEmailPage(){

    const [token, setToken] = useState('')
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyEmail = async() => {
        try {
            await axios.post("/api/users/verifyemail",{token})
            setVerified(true)
        } catch (error:any) {
            setError(true)
            console.log(error);
            
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || '')
    }, [])
    

    useEffect(() => {
    if(token.length > 0 ){
        verifyEmail()
    }
    }, [token])
    
    return(
        <>
            <div className="flex h-screen w-full flex-col justify-center items-center">
                <h1>Verify Email</h1>
                <h2 className="bg-blue-300 text-black p-2 rounded mt-5">{token ? `${token}`:"No token"}</h2>
                {
                    verified && (
                        <div>
                            <h2>Email Verified</h2>
                            <Link href={"/login"}>
                            Go to Login
                             </Link>
                        </div>
                    )
                }
                {error && (
                    <h3 className="text-red-600">Error : Something went wrong</h3>
                )}
            </div>
        </>
    )


}