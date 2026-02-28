import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, IndianRupee, ImageOff, Heart, ShieldCheck } from 'lucide-react';
import { useRental } from '../../context/RentalContext.jsx';
import Card from '../ui/Card.jsx';
import Badge from '../ui/Badge.jsx';

export default function ItemCard({ item }) {
    const {
        id,
        title,
        image,
        pricePerDay,
        category,
        location,
        distance,
        rating,
        available,
        verified = true, // Simulated
    } = item;

    const { wishlist, toggleWishlist } = useRental();
    const isWishlisted = wishlist.includes(id);
    const [imgError, setImgError] = useState(false);

    const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(id);
    };

    return (
        <Card variant="glass" hover className="overflow-hidden h-full group flex flex-col relative animate-fade-up">
            {/* Wishlist Icon */}
            <button
                onClick={handleWishlist}
                className={`absolute top-3 right-3 z-20 p-2.5 rounded-2xl backdrop-blur-md transition-all duration-300 ${isWishlisted
                    ? 'bg-red-500 text-white shadow-lg'
                    : 'bg-white/40 text-brand-dark/60 hover:bg-white/60 dark:bg-black/40 dark:text-brand-frost/60 hover:text-red-500'
                    }`}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
                <Heart size={18} className={isWishlisted ? 'fill-white' : ''} />
            </button>

            <Link to={`/item/${id}`} className="block flex-grow">
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-brand-green/20 to-brand-teal/10 dark:from-brand-green/10 dark:to-brand-teal/5">
                    {imgError ? (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-brand-teal/60">
                            <ImageOff size={40} className="opacity-30" />
                            <span className="text-[10px] font-black uppercase tracking-widest">{category}</span>
                        </div>
                    ) : (
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                            onError={() => setImgError(true)}
                        />
                    )}

                    {/* Verified Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Tags Layer */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <div className="flex gap-2">
                            <Badge variant="info" className="!bg-white/90 !text-brand-dark shadow-sm uppercase tracking-tighter text-[10px] py-1 px-2.5">
                                {category}
                            </Badge>
                            {verified && (
                                <div className="flex items-center gap-1 bg-brand-green text-brand-dark px-2 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg">
                                    <ShieldCheck size={10} /> Verified
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-lg backdrop-blur-md ${available ? 'bg-emerald-500 text-white' : 'bg-brand-dark text-white'
                            }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${available ? 'bg-white animate-pulse' : 'bg-white/30'}`} />
                            {available ? 'Available Now' : 'Booked'}
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col justify-between flex-grow">
                    <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="font-black text-brand-dark dark:text-brand-frost text-base leading-tight line-clamp-2 min-h-[2.5rem] group-hover:text-brand-teal transition-colors">
                                {title}
                            </h3>
                        </div>

                        {/* Location & Distance */}
                        <div className="flex items-center gap-1.5 text-xs font-bold text-brand-teal/80 dark:text-brand-aqua/80 mb-4">
                            <div className="flex items-center gap-1">
                                <MapPin size={14} className="text-brand-teal" />
                                <span className="line-clamp-1">{location}</span>
                            </div>
                            <span className="w-1 h-1 rounded-full bg-brand-teal/30" />
                            <span className="shrink-0">{distance} km away</span>
                        </div>
                    </div>

                    {/* Price & Rating Footer */}
                    <div className="flex items-end justify-between pt-4 border-t border-brand-teal/10 dark:border-brand-aqua/10">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-tighter text-brand-teal/60 mb-0.5">Starting at</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black text-brand-dark dark:text-brand-frost">
                                    ₹{pricePerDay.toLocaleString('en-IN')}
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-brand-teal/60">/ day</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-brand-green/10 dark:bg-brand-green/5 text-xs font-black text-brand-teal dark:text-brand-green shadow-sm mb-1">
                            <Star size={14} className="fill-brand-teal dark:fill-brand-green" />
                            <span>{rating}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </Card>
    );
}
