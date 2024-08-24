"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '../lib/supabaseClient';

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = supabase.auth.getUser();
    setUser(user);

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
              <Link href="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/surfboards" className="hover:underline">
                Surfboards
              </Link>
            </li>
            {user ? (
              <>
                <Link className="hover:underline" href="/my-rentals">
                     My Rentals
                </Link>
                <li className="font-semibold">Hello, {user.email}</li>

                <li>
                  <button onClick={handleLogout} className="hover:underline">
                    Logout
                  </button>
                </li>

              </>
            ) : (
              <>
                <li>
                  <Link href="/login" className="hover:underline">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
