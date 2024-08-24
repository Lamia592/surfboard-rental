import { useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Success() {
  const router = useRouter();
  const { session_id } = router.query;

  useEffect(() => {
    const updateRentalStatus = async () => {
      if (session_id) {
        try {
          // Fetch session details from Stripe (expand this logic as needed)
          // Update rental status in the Supabase database
          const { data, error } = await supabase
            .from('rentals')
            .update({ status: 'completed' }) // Update the status to 'completed'
            .eq('stripe_session_id', session_id); // Match the Stripe session ID

          if (error) {
            console.error('Error updating rental status:', error);
          } else {
            console.log('Rental status updated successfully:', data);
          }
        } catch (error) {
          console.error('Error updating rental status:', error.message);
        }
      }
    };

    updateRentalStatus();
  }, [session_id]);

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white py-12">
        <div className="p-6 max-w-md w-full bg-gray-50 shadow-md rounded-lg text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Thank You for Your Payment!</h1>
          <p className="text-gray-600 mb-6">Your surfboard rental is confirmed. We hope you have an amazing time surfing!</p>
          <div className="space-x-4">
          <Link className="bg-yellow-500 hover:bg-yellow-400 text-white px-6 py-3 rounded-md text-lg font-semibold" href="/surfboards">
           
              Browse Surfboards
           
          </Link>
          <Link className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-md text-lg font-semibold" href="/my-rentals">
           
             View My Rentals
           
          </Link>
        </div>
        </div>
      </div>
    </Layout>
  );
}
