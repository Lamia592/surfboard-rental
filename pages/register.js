import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert('Error signing up');
      console.error(error);
    } else {
      alert('Registration successful! Check your email to confirm your account.');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="p-6 max-w-md w-full bg-white shadow-md rounded">
          <h2 className="text-2xl font-bold mb-4">Register</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-2 w-full mb-4 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2 w-full mb-4 rounded"
          />
          <button onClick={handleRegister} className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 w-full rounded">
            Register
          </button>
          <p className="mt-4 text-sm text-center">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
