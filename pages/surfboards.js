import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { loadStripe } from '@stripe/stripe-js';
import Layout from '../components/Layout';

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
<Layout>
      <div className="bg-white min-h-screen py-8"> {/* Ensure full page height and white background */}
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Available Surfboards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {surfboards.map((surfboard) => (
              <div key={surfboard.id} className="border border-gray-200 shadow-md rounded-lg overflow-hidden bg-white">
                <img
                  src={surfboard.image_url || '/images/default-surfboard.webp'} // Ensure you have a default image
                  alt={surfboard.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-xl text-gray-800">{surfboard.title}</h3>
                  <p className="text-gray-600">{surfboard.description}</p>
                  <p className="text-green-500 text-lg font-bold">${surfboard.price_per_day} / day</p>
                  <button 
                    onClick={() => handleRentSurfboard(surfboard)} 
                    className="mt-4 w-full bg-blue-500 hover:bg-blue-400 text-white py-2 rounded-md"
                  >
                    Rent Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
