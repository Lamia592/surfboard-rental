import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function AddSurfboard() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleAddSurfboard = async () => {
    const { data, error } = await supabase.from('surfboards').insert([
      {
        title,
        description,
        price_per_day: price,
        owner_id: supabase.auth.user().id,
      },
    ]);
    if (error) {
      console.error(error);
    } else {
      alert('Surfboard added successfully!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Add Surfboard</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <input
          type="number"
          placeholder="Price per day"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <button onClick={handleAddSurfboard} className="bg-blue-500 text-white px-4 py-2">Add Surfboard</button>
      </div>
    </div>
  );
}
