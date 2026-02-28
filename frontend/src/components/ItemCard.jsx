import React from 'react';

export function ItemCard({ title, price, distance, category, image }) {
    return (
        <div
            className="rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105"
            style={{
                backgroundColor: 'var(--bg-card)',
                border: '2px solid var(--border-color)',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
            }}
        >
            <div className="h-48 overflow-hidden relative border-b" style={{ borderColor: 'var(--border-color)' }}>
                <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                <div
                    className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: 'var(--bg-app)', color: 'var(--text-primary)' }}
                >
                    {category}
                </div>
            </div>
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold line-clamp-1" style={{ color: 'var(--text-primary)' }}>{title}</h3>
                    <span className="font-black text-lg" style={{ color: 'var(--text-primary)' }}>${price}<span className="text-sm font-medium opacity-70">/day</span></span>
                </div>
                <div className="flex items-center space-x-2 mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" style={{ color: 'var(--text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm font-bold" style={{ color: 'var(--text-muted)' }}>{distance} miles away</span>
                </div>
                <button
                    className="w-full mt-6 py-3 rounded-xl font-bold transition-colors"
                    style={{ backgroundColor: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)' }}
                >
                    Request to Borrow
                </button>
            </div>
        </div>
    );
}
