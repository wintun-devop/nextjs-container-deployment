'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

type NavItem = { label: string; href: string };

const NAV: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Profile', href: '/profile' },
  { label: 'My Listings', href: '/listings' },
  { label: 'Messages', href: '/messages' },
  { label: 'Favorites', href: '/favorites' },
];

const  AuthHeader: React.FC = ()  => {
  const [open, setOpen] = useState(false); // mobile slide-over
  const [menuOpen, setMenuOpen] = useState(false); // desktop user dropdown
  const { data: session } = useSession();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const avatarButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleLogout = async () => {
    setMenuOpen(false);
    await signOut({ callbackUrl: '/' });
  };

  // global ESC to close both mobile and dropdown
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        setMenuOpen(false);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // close dropdown on outside click
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!menuRef.current) return;
      if (menuRef.current.contains(e.target as Node)) return;
      setMenuOpen(false);
    }
    if (menuOpen) document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [menuOpen]);

  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <span className="inline-block rounded-md bg-green-600 p-2">
                <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2L2 7v7c0 5 5 9 10 9s10-4 10-9V7L12 2z" />
                </svg>
              </span>
              <span className="text-lg font-semibold">homey</span>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex md:items-center md:gap-6">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/add-listing"
              className="ml-4 inline-flex items-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700"
            >
              Add New Listing
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            {/* Desktop user with dropdown */}
            <div className="relative hidden md:flex md:items-center md:gap-3">
              <button
                ref={avatarButtonRef}
                onClick={() => setMenuOpen((s) => !s)}
                aria-expanded={menuOpen}
                aria-haspopup="menu"
                className="flex items-center gap-3 rounded-md px-2 py-1 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
              >
                <img
                  src="/avatar-placeholder.png"
                  alt="User avatar"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div className="text-left">
                  <div className="font-medium text-sm">{session?.user?.id ?? 'Mike Parker'}</div>
                  <div className="text-xs text-gray-500">Done</div>
                </div>

                <svg
                  className={`ml-1 h-4 w-4 text-gray-500 transition-transform ${menuOpen ? 'rotate-180' : 'rotate-0'}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden
                >
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06-.02L10 10.67l3.71-3.48a.75.75 0 011.04 1.08l-4.25 4a.75.75 0 01-1.06 0l-4.25-4a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>

              {menuOpen && (
                <div
                  ref={menuRef}
                  role="menu"
                  aria-orientation="vertical"
                  aria-label="User menu"
                  className="absolute right-0 mt-2 w-48 origin-top-right rounded-md border bg-white shadow-lg ring-1 ring-black/5"
                >
                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      role="menuitem"
                      onClick={() => setMenuOpen(false)}
                    >
                      View Profile
                    </Link>

                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      role="menuitem"
                      onClick={() => setMenuOpen(false)}
                    >
                      Settings
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      role="menuitem"
                    >
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="inline-flex items-center rounded-md p-2 text-gray-600 hover:bg-gray-100 md:hidden"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav slide-over */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} aria-hidden />

          <aside className="absolute right-0 top-0 h-full w-72 bg-white shadow-lg" role="dialog" aria-modal="true">
            <div className="flex h-16 items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <span className="inline-block rounded-md bg-green-600 p-2">
                  <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 2L2 7v7c0 5 5 9 10 9s10-4 10-9V7L12 2z" />
                  </svg>
                </span>
                <span className="font-semibold">homey</span>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="mt-3 px-4">
              <ul className="flex flex-col gap-2">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}

                <li>
                  <Link
                    href="/add-listing"
                    className="mt-2 block rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white"
                    onClick={() => setOpen(false)}
                  >
                    Add New Listing
                  </Link>
                </li>
              </ul>

              <div className="mt-6 flex items-center gap-3 border-t pt-4">
                <img src="/avatar-placeholder.png" alt="User avatar" className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <div className="font-medium">{session?.user?.id ?? 'Mike Parker'}</div>
                  <div className="text-xs text-gray-500">Done</div>
                </div>
              </div>

              <div className="mt-6">
                <button onClick={() => { setOpen(false); handleLogout(); }} className="text-sm text-red-600">
                  Log out
                </button>
              </div>
            </nav>
          </aside>
        </div>
      )}
    </header>
  );
}


export default AuthHeader;