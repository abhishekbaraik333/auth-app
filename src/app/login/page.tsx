"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/login", user);
      toast.success(response.data.message);
      router.push("/profile");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "Something went wrong!");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center h-screen py-2">
      <h1>{loading ? "Processing" : "Login"} </h1>
      <hr />

      <div className="flex items-center gap-5 mt-10">
        <label htmlFor="email">email :</label>
        <input
          className="border border-zinc-700 p-2 rounded"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
      </div>

      <div className="flex items-center gap-5 mt-10">
        <label htmlFor="password">password :</label>
        <input
          className="border border-zinc-700 p-2 rounded"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
      </div>

      <button
        onClick={onLogin}
        className="p-3 rounded border border-zinc-300 cursor-pointer"
      >
        {buttonDisabled ? "No Login" : "Login"}
      </button>
      <Link href="/signup">Go to Signup</Link>
    </div>
  );
};

export default Login;
