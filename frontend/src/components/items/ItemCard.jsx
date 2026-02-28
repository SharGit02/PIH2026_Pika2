import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, IndianRupee, ImageOff, Heart, ShieldCheck } from 'lucide-react';
import { useRental } from '../../context/RentalContext.jsx';
import Card from '../ui/Card.jsx';
import Badge from '../ui/Badge.jsx';

export default function ItemCard({ item }) {
    const {
        _id,
        id,                 // placeholder compat
        title,
        images,
        image,              // placeholder compat
        pricePerDay,
        category,
        location,           // MongoDB: { address, lat, lng }
        distance,           // placeholder compat
        distanceKm,         // from backend geo-sort
        rating,
        reviewCount,
        available,
    } = item;

    const itemId = _id || id;
    const imgSrc = (images && images[0]) || image;
    const isAvailable = availability ?? available ?? true;
    const displayAddress = typeof location === 'string' ? location : (location?.address || null);
    const displayDistance = distanceKm ?? distance ?? null;

    const { wishlist, toggleWishlist } = useRental();
    const isWishlisted = wishlist.includes(id);
    const [imgError, setImgError] = useState(false);

    const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(id);
    };

    return (
        <Link to={`/item/${id}`} className="block group">
            <Card variant="glass" hover className="overflow-hidden h-full">
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#99d19c]/30 to-[#79c7c5]/20 dark:from-[#99d19c]/10 dark:to-[#79c7c5]/8">
                    {imgError ? (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#73ab84] dark:text-[#79c7c5]">
                            <ImageOff size={32} className="opacity-40" />
                            <span className="text-xs font-semibold opacity-60">{category}</span>
                        </div>
                    ) : (
                        <img
                            src={imgSrc}
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

                    {/* Availability dot */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
                        style={{
                            backgroundColor: available ? 'rgba(153, 209, 156, 0.85)' : 'rgba(250, 160, 160, 0.85)',
                            color: available ? '#1a4d2a' : '#7f1d1d',
                        }}
                    >
                        <span className={`w-1.5 h-1.5 rounded-full ${available ? 'bg-emerald-600' : 'bg-red-500'}`} />
                        {available ? 'Available' : 'Unavailable'}
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

                        {/* Location */}
                        <div className="flex items-center gap-1 text-xs font-semibold text-brand-teal dark:text-brand-aqua mt-1">
                            <MapPin size={14} />
                            <span className="line-clamp-1">{location}</span>
                            <span className="ml-auto shrink-0 opacity-60">{distance} km</span>
                        </div>
                        )}
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

                        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-brand-green/10 dark:bg-brand-green/5 text-xs font-black text-brand-teal dark:text-brand-green">
                            <Star size={14} className="fill-brand-teal dark:fill-brand-green" />
                            <span>{rating}</span>
                        </div>
                        ) : null}
                    </div>
                </div>
            </Link>
        </Card>
    );
}
