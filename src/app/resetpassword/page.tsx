"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function ResetPassword(){
    const router = useRouter()
    const [token, setToken] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const resetPassword = async() => {
        try {
            
           const res = await axios.post("/api/users/resetpassword",{token, newPassword})
            toast.success(res.data.message)
            router.push("/login")
        } catch (error: unknown) { 
            if (axios.isAxiosError(error)) { 
              toast.error(error.response?.data?.error || "Something went wrong!");
            } else {
              toast.error("An unexpected error occurred.");
            }
          }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || '')
    }, [])

    return(
        <>
            <div className="flex h-screen w-full flex-col justify-center items-center">
                <h1>Reset your Password</h1>
                <input className="my-5 bg-zinc-200 rounded placeholder:text-black text-black p-2" type="text" placeholder="New Password" onChange={(e)=> setNewPassword(e.target.value)}/>
                <button className="text-red-200 bg-zinc-500 p-3 rounded" onClick={resetPassword}>Reset Password</button>
            </div>
        </>
    )


}