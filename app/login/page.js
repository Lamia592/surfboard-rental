import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useRouter } from 'next/router'; // Import useRouter from Next.js

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Initialize the router

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert('Error logging in. Please check your email and password.');
      console.error(error);
    } else {
      alert('Logged in successfully!');
      router.push('/'); // Redirect to the home page after successful login
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="p-8 max-w-md w-full bg-white shadow-md rounded">
          {/* Title and Description */}
          <h2 className="text-gray-600 text-2xl font-bold mb-4 text-center">Welcome Back</h2>
          <p className="text-gray-600 mb-6 text-center">
            Please enter your email and password to log in to your account.
          </p>
          
          {/* Login Form */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-gray-600 border border-gray-300 p-2 w-full mb-4 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-gray-600 border border-gray-300 p-2 w-full mb-4 rounded"
          />
          <button
            onClick={handleLogin}
            className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 w-full rounded"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="mt-4 text-sm text-center">
            Don&#39;t have an account?{' '}
            <Link href="/register">
              <a className="text-blue-500 hover:underline">Register here</a>
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
