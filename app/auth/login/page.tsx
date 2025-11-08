"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

const Login: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { data: session, status } = useSession();
  console.log("login_page_sess", session)
  console.log("login_page_status", status)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const callbackUrl = '/';
    try {
      const loginResult = await signIn('credentials', {
        username: username,
        password: password,
        redirect: false,
        callbackUrl,
      });
      if (loginResult?.error) {
        setError(loginResult?.error);
      } else {
        router.push(callbackUrl);
      }
    } catch (e: any) {
      setError(e?.error);
    }
  };
  useEffect(() => {
    router.push('/');
  }, []);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {status === 'loading' ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-94 border-blue-500 border-opacity-75 mx-auto mb-4"></div>
          <p className="text-gray-700">Checking session...</p>
        </div>
      ) : (
        <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
          <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;