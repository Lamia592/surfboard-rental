import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { loadStripe } from '@stripe/stripe-js';
import Layout from '../components/Layout';
import Image from 'next/image'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Surfboards() {
  const [surfboards, setSurfboards] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalDays, setTotalDays] = useState(0);

  useEffect(() => {
    fetchSurfboards();
  }, []);

  const fetchSurfboards = async () => {
    const { data, error } = await supabase.from('surfboards').select('*, rentals (status)');
    if (error) {
      console.error(error);
    } else {

      const availableSurfboards = data.filter(surfboard => {
        // If the surfboard has rentals, check their status
        const isRented = surfboard.rentals.some(rental => rental.status === 'completed');
        return !isRented; // Include only if not rented
      });
      setSurfboards(availableSurfboards);
    }
  };

  // Calculate total rental days whenever start or end date changes
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const timeDiff = end - start;
      const days = timeDiff / (1000 * 60 * 60 * 24); // Convert milliseconds to days
      setTotalDays(days > 0 ? days : 0); // Ensure no negative values
    } else {
      setTotalDays(0); // Reset if dates are not selected
    }
  }, [startDate, endDate]); // Watch both startDate and endDate

  const handleRentSurfboard = async (surfboard) => {

    if (!startDate || !endDate || !totalDays) {
      alert('Please select both start and end dates.');
      return;
    }

    const stripe = await stripePromise;
    
    const totalprice = surfboard.price_per_day * totalDays;
    // Create a Stripe checkout session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        surfboardId: surfboard.id,
        price: totalprice,
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
          start_date: startDate,
          end_date: endDate,
          total_price:totalprice
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
           {/* Modern Date Picker Design */}
           <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Select Your Rental Dates</h3>
            <div className="flex justify-center items-center space-x-4">
              <div>
                <label className="block text-gray-700 mb-2">Start Date:</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border border-gray-300 p-2 rounded-lg w-40 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">End Date:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border border-gray-300 p-2 rounded-lg w-40 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {surfboards.map((surfboard) => (
              <div key={surfboard.id} className="border border-gray-200 shadow-md rounded-lg overflow-hidden bg-white">
                <Image width={400} height={250}
                  src={surfboard.image_url || '/images/default-surfboard.webp'} // Ensure you have a default image
                  alt={surfboard.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-xl text-gray-800">{surfboard.title}</h3>
                  <p className="text-gray-600">{surfboard.description}</p>
                  <p className="text-green-500">${surfboard.price_per_day} / day</p>
                  {/* Calculate and Display Total Price */}
                  {totalDays > 0 && (
                    <p className="text-gray-800 mt-2">
                      Total Price: <span className="font-bold text-green-500">${(surfboard.price_per_day * totalDays).toFixed(2)}</span> for {totalDays} days
                    </p>
                  )}
                  <p className="text-blue-500">Location:  {surfboard.location}</p>
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
