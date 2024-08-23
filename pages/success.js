// pages/success.js

import { useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function Success() {
  const router = useRouter();
  const { session_id } = router.query;

  useEffect(() => {
    const updateRentalStatus = async () => {
      if (session_id) {
        // Fetch session details from Stripe (you would need to expand this logic)
        // Update rental status in your Supabase database
        // const { data, error } = await supabase
        //   .from('rentals')
        //   .update({ status: 'completed' })
        //   .eq('stripe_session_id', session_id);
        // if (error) console.error(error);
        console.log("To do update rental status in the database")
      }
    };

    updateRentalStatus();
  }, [session_id]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold">Thank you for your payment!</h1>
      <p>Your surfboard rental is confirmed.</p>
    </div>
  );
}
