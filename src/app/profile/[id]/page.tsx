"use client"

import axios from "axios";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export default async function UserProfile({
  params,
}: {
  params: Promise<{ id: any }>;
}) {
  const { id } = await params;

  const forgotPassword = async() =>{
    try {      
      const res = await axios.post("/api/users/password", {id})
      console.log(res);
      toast.success(res.data.message)
      
    } catch (error:any) {
      throw new Error(error.message)
    }
  }

  return (  
    <>
      <div className="flex flex-col justify-center w-full items-center h-screen">My ID: {id}
      <button className="p-2 bg-red-200 text-black rounded cursor-pointer mt-5" onClick={forgotPassword}>
        Reset Password
      </button>
        </div>;
    </>
  );
}
