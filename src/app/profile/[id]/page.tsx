"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UserProfile({ params }: { params: { id: string } }) {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (params?.id) {
      setUserId(params.id);
    }
  }, [params]);

  const forgotPassword = async () => {
    try {
      const res = await axios.post("/api/users/password", { id:userId });
      toast.success(res.data.message);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "Something went wrong!");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center w-full items-center h-screen">
        My ID: {id}
        <button
          className="p-2 bg-red-200 text-black rounded cursor-pointer mt-5"
          onClick={forgotPassword}
        >
          Reset Password
        </button>
      </div>
      ;
    </>
  );
}
