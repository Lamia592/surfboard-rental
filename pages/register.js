import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useRouter } from 'next/router'; // Import useRouter from Next.js

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Initialize the router
  
  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert('Error signing up');
      console.error(error);
    } else {
      alert('Registration successful! Check your email to confirm your account.');
      router.push('/'); // Redirect to the home page after successful login
    }
  };

  return (
    <Layout>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12">
      <div className="p-6 max-w-md w-full bg-white shadow-md rounded">
        {/* Title and Description */}
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Create Your Account</h2>
        <p className="text-gray-600 mb-4 text-center">
          Join our surf community by creating an account. It&#39;s quick and easy!
          Just fill in your details below and get started on your surfing adventure.
        </p>
        
        {/* Registration Form */}
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
          onClick={handleRegister}
          className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 w-full rounded"
        >
          Register
        </button>

        {/* Login Link */}
        <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 hover:underline">
          </Link>
        </p>
      </div>
    </div>
  </Layout>
  );
}
