import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

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
    if (!surfboard) {
      console.error("No surfboard selected");
      return;
    }
    const userId= (await supabase.auth.getUser()).data.user.id;
    const { data, error } = await supabase.from('rentals').insert([
      {
        surfboard_id: surfboard.id,
        renter_id: userId,
        start_date: new Date(),
        end_date: new Date(), // Replace with actual rental dates
        total_price: surfboard.price_per_day, // Replace with actual calculated price
      },
    ]);
    if (error) {
      console.error(error);
    } else {
      alert('Surfboard rented successfully!');
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-4">Available Surfboards</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {surfboards.map((surfboard) => (
          <div key={surfboard.id} className="border p-4">
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
