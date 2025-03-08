"use client";

import axios from "axios";
import toast from "react-hot-toast";

interface UserProfileProps {
  params: { id: string };
}

export default function UserProfile({ params }: UserProfileProps) {
  const forgotPassword = async () => {
    try {
      const res = await axios.post("/api/users/password", { id: params.id });
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
    <div className="flex flex-col justify-center w-full items-center h-screen">
      <p>My ID: {params.id}</p>
      <button
        className="p-2 bg-red-200 text-black rounded cursor-pointer mt-5"
        onClick={forgotPassword}
      >
        Reset Password
      </button>
    </div>
  );
}
