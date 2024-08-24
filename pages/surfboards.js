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
  
    // Create a Stripe checkout session
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
  
    if (session.id) {
      // Get the logged-in user's ID
      const user= (await supabase.auth.getUser()).data.user;
      if (!user) {
        alert('You must be logged in to rent a surfboard.');
        return;
      }
  
      // Insert a new rental record into the database with the Stripe session ID
      const { data, error } = await supabase.from('rentals').insert([
        {
          renter_id: user.id, // Assuming this is the foreign key to the user
          surfboard_id: surfboard.id, // Foreign key to the surfboard
          status: 'pending', // Initial status
          stripe_session_id: session.id, // Stripe session ID for reference
          start_date: new Date(),
          end_date: new Date(),
          total_price:surfboard.price_per_day
        },
      ]);
  
      if (error) {
        console.error('Error creating rental record:', error);
        alert('An error occurred while processing your rental. Please try again.');
      } else {
        console.log('Rental record created successfully:', data);
  
        // Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({ sessionId: session.id });
        if (result.error) {
          console.error('Error redirecting to Stripe Checkout:', result.error.message);
        }
      }
    } else {
      console.error('Error creating Stripe session:', session.error);
      alert('An error occurred while creating the payment session. Please try again.');
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
                  <p className="text-blue-500">Located@  {surfboard.location}</p>
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
