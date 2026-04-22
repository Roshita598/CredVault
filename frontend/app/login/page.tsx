"use client";
import { useState } from "react";
import { API_ENDPOINTS } from "@/lib/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(API_ENDPOINTS.authVerify, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Store token
      localStorage.setItem("token", data.token || "demo-token");

      alert("Login successful!");

      // 👉 redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-md sm:p-10">
        
        {/* Heading */}
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Login
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Access your secure credential dashboard.
        </p>

        {/* Error Message */}
        {error && (
          <p className="mt-4 text-sm text-red-500 bg-red-50 p-2 rounded">
            {error}
          </p>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="mt-6 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="mt-3 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}