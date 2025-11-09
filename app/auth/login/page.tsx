"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const Login: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const callBack= "/";
  useEffect(() => {
    if (status === "authenticated") router.replace(callBack);
  }, [status, router, callBack]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
        callbackUrl: callBack,
      });

      if (!result) {
        setError("Unexpected sign-in response");
        setLoading(false);
        return;
      }

      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      // success: navigate to returned url (or fallback)
      router.replace(callBack);
    } catch (err: any) {
      setError(err?.message ?? "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {status === "loading" ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-75 mx-auto mb-4" />
          <p className="text-gray-700">Checking session...</p>
        </div>
      ) : (
        <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
          <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                id="username"
                name="username"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className={`w-full py-2 px-4 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {loading ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.4)" strokeWidth="4" />
                    <path d="M22 12a10 10 0 00-10-10" stroke="white" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                  <span>Signing in…</span>
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
