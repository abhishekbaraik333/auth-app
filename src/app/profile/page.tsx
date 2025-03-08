"use client"

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {useState} from "react";
import toast from "react-hot-toast";

const Profile = () => {
  const router = useRouter()

  const [data, setData] = useState('nothing')

  const logout = async()=>{
    try {
      const response = await axios.get("/api/users/logout")
      toast.success("Logout Successful")
      router.push("/login")
    } catch (error:any) {
      console.log("Logout unsuccessful Error:", error.message);
      
    }
  }

  const getUser = async()=>{
    const response = await axios.get("/api/users/me")
    console.log(response.data.data._id);
    setData(response.data.data._id)
  }

  return (
    <>
      <div className="flex flex-col gap-5 h-screen w-full items-center justify-center">
        <h1>Profile</h1>
        <div className="text-black bg-orange-500 p-4 rounded-xl">
          {data==="nothing"? "Nothing":<Link href={`/profile/${data}`}>
          {data}
          </Link>}
        </div>
        <button onClick={logout} className="bg-red-400 p-3 rounded">Logout</button>
        <button onClick={getUser} className="bg-blue-400 p-3 rounded">Get me</button>
        
      </div>
    </>
  );
};

export default Profile;
