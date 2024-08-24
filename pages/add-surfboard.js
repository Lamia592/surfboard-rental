import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import Layout from '../components/Layout';

export default function AddSurfboard() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const router = useRouter();

  const handleAddSurfboard = async () => {
    const user= (await supabase.auth.getUser()).data.user;
    if (!user) {
      alert('You must be logged in to add a surfboard.');
      return;
    }

    const { data, error } = await supabase.from('surfboards').insert([
      {
        title,
        description,
        price_per_day: price,
        owner_id: user.id,
      },
    ]);
    if (error) {
      console.error(error);
    } else {
      alert('Surfboard added successfully!');
      router.push('/surfboards'); // Redirect to the surfboard listing page after adding
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-white py-12"> 
        <div className="p-6 max-w-lg w-full bg-gray-50 shadow-md rounded-lg border border-gray-200"> 
      
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Add a New Surfboard</h2>
          <p className="text-gray-600 mb-6 text-center">
            Fill in the details below to add a new surfboard to your listing.
          </p>
          
        
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 p-2 w-full mb-4 rounded text-gray-800 bg-white" 
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 p-2 w-full mb-4 rounded text-gray-800 bg-white h-24" 
          />
          <input
            type="number"
            placeholder="Price per day ($)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 p-2 w-full mb-4 rounded text-gray-800 bg-white" 
          />
          <button 
            onClick={handleAddSurfboard} 
            className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 w-full rounded"
          >
            Add Surfboard
          </button>
        </div>
      </div>
    </Layout>
  );
}
