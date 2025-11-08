'use client';

import React from 'react';
import { signOut } from 'next-auth/react'
import {  useSession } from 'next-auth/react';

const AuthHeader: React.FC = ({ }) => {
  const handleLogout = () => { signOut({ callbackUrl: '/' }); };
  const { data: session, status } = useSession();
  return (
    <header className="bg-gray-800 text-white px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Left: App Title */}
        <div className="text-xl font-bold">WinTech Dashboard</div>

        {/* Right: User Info + Logout */}
        <div className="flex items-center gap-4">
          <span className="text-sm">
            Welcome, <span className="font-semibold">{session?.user.id ?? 'User'}</span>
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;
