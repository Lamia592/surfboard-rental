import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Layout from '../components/Layout';

export default function MyRentals() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    const user= (await supabase.auth.getUser()).data.user;
    if (!user) {
      alert('You must be logged in to view your rentals.');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('rentals')
        .select('*, surfboards(title, description, image_url, price_per_day)')
        .eq('renter_id', user.id)
        .eq('status', 'completed'); // Assuming the renter's ID is stored as 'renter_id'

      if (error) {
        console.error('Error fetching rentals:', error);
      } else {
        setRentals(data);
      }
    } catch (error) {
      console.error('Error fetching rentals:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">My Rentals</h2>
          
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : rentals.length === 0 ? (
            <p className="text-center text-gray-600">You have no rentals at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {rentals.map((rental) => (
                <div key={rental.id} className="border border-gray-200 shadow-md rounded-lg overflow-hidden bg-gray-50">
                  <img
                    src={rental.surfboards.image_url || '/images/default-surfboard.webp'}
                    alt={rental.surfboards.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-xl text-gray-800">{rental.surfboards.title}</h3>
                    <p className="text-gray-600">{rental.surfboards.description}</p>
                    <p className="text-green-500 text-lg font-bold">${rental.surfboards.price_per_day} / day</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
