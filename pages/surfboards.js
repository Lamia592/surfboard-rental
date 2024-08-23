import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Surfboards() {
  const [surfboards, setSurfboards] = useState([]);

  useEffect(() => {
    fetchSurfboards();
  }, []);

  const fetchSurfboards = async () => {
    const { data, error } = await supabase.from('surfboards').select('*');
    if (error) {
      console.error(error);
    } else {
      setSurfboards(data);
    }
  };

  const handleRentSurfboard = async (surfboard) => {
    const stripe = await stripePromise;

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        surfboardId: surfboard.id,
        price: surfboard.price_per_day,
        title: surfboard.title,
      }),
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Available Surfboards</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {surfboards.map((surfboard) => (
          <div key={surfboard.id} className="border p-4 bg-white shadow-md rounded">
            <h3 className="font-bold">{surfboard.title}</h3>
            <p>{surfboard.description}</p>
            <p>${surfboard.price_per_day} per day</p>
            <button
              onClick={() => handleRentSurfboard(surfboard)}
              className="bg-green-500 text-white px-4 py-2 mt-2"
            >
              Rent
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
