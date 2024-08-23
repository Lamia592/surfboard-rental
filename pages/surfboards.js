const handleRentSurfboard = async (surfboard) => {
    const { data, error } = await supabase.from('rentals').insert([
      {
        surfboard_id: surfboard.id,
        renter_id: supabase.auth.user().id,
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
  
  // Add the rent button to each surfboard card
  <div key={surfboard.id} className="border p-4">
    <h3 className="font-bold">{surfboard.title}</h3>
    <p>{surfboard.description}</p>
    <p>${surfboard.price_per_day} per day</p>
    <button onClick={() => handleRentSurfboard(surfboard)} className="bg-green-500 text-white px-4 py-2 mt-2">Rent</button>
  </div>
  