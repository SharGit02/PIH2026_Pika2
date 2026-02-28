import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ItemCard } from './components/ItemCard';

const MOCK_DATA = [
  { id: 1, title: "Canon EOS R5", price: 1500, distance: 0.5, category: "Photography", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500" },
  { id: 2, title: "Drill & Tool Kit", price: 200, distance: 1.2, category: "Maintenance", image: "https://images.unsplash.com/photo-1504148455328-497c5efdf13a?w=500" },
  { id: 3, title: "Camping Tent", price: 400, distance: 3.0, category: "Outdoor", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500" },
  { id: 4, title: "Electric Scooter", price: 600, distance: 0.9, category: "Transport", image: "https://images.unsplash.com/photo-1558981403-c5f91dbbe9ad?w=500" },
  { id: 5, title: "Party Speaker", price: 750, distance: 2.5, category: "Events", image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500" },
  { id: 6, title: "Mountain Bike", price: 350, distance: 4.1, category: "Sport", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500" },
];

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = MOCK_DATA.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-20 pt-16 transition-colors duration-300">
      <Navbar />

      {/* Search Header */}
      <header className="border-b py-20 px-6 transition-colors duration-300" style={{ backgroundColor: 'var(--bg-app)', borderColor: 'var(--border-color)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Rent items from people around you.
          </h1>
          <p className="text-xl mb-10 font-medium" style={{ color: 'var(--text-muted)' }}>
            The best way to borrow and lend locally.
          </p>
          <div className="relative group max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="What do you need today?"
              className="w-full p-5 pl-8 rounded-full border-2 outline-none transition-all font-bold text-lg"
              style={{
                backgroundColor: 'var(--input-bg)',
                color: 'var(--text-primary)',
                borderColor: 'var(--border-color)'
              }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="absolute right-3 top-3 bottom-3 px-6 rounded-full font-bold transition-transform hover:scale-105"
              style={{ backgroundColor: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)' }}
            >
              Search
            </button>
          </div>
        </div>
      </header>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-6 mt-16">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Featured Items</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map(item => (
            <ItemCard key={item.id} {...item} />
          ))}
          {filteredItems.length === 0 && (
            <div className="col-span-full text-center py-20 font-bold text-xl" style={{ color: 'var(--text-muted)' }}>
              No items found matching "{searchTerm}"
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;