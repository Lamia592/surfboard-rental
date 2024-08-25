"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '../lib/supabaseClient';

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = '/';
  };

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Section: Logo and Navigation Links */}
        <div className="flex items-center space-x-4">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2">
            <Link href="/">
              <Image src="/images/logo.webp" alt="Logo" width={40} height={40} />
            </Link>
            <Link href="/">
              <h1 className="text-xl font-bold">SurfShare</h1>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav>
            <ul className="flex space-x-4 items-center">
              <li>
                {/* <Link href="/about" className="hover:underline">
                  About
                </Link> */}
              </li>
              <li>
                <Link href="/surfboards" className="hover:underline">
                  All Boards
                </Link>
              </li>
              {user && (
                <>
                  <li>
                    <Link href="/add-surfboard" className="hover:underline">
                      Rent Yours
                    </Link>
                  </li>
                  <li>
                    <Link href="/my-rentals" className="hover:underline">
                      My Rentals
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>

        {/* Right Section: User Info and Login/Logout */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="font-semibold">Hello, {user.email}</span>
              <button onClick={handleLogout} className="hover:underline">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="hover:underline">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
