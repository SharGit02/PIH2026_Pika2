import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, IndianRupee } from 'lucide-react';
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
        reviewCount,
        available,
    } = item;

    return (
        <Link to={`/item/${id}`} className="block group">
            <Card variant="glass" hover className="overflow-hidden h-full">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                        <Badge variant="info" className="shadow-sm backdrop-blur-sm">
                            {category}
                        </Badge>
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

                {/* Content */}
                <div className="p-4">
                    {/* Title */}
                    <h3 className="font-bold text-[#000501] dark:text-[#ade1e5] text-base line-clamp-1 group-hover:text-[#73ab84] dark:group-hover:text-[#99d19c] transition-colors duration-200 mb-1">
                        {title}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center gap-1 text-xs text-[#73ab84] dark:text-[#79c7c5] mb-3">
                        <MapPin size={12} />
                        <span className="line-clamp-1">{location}</span>
                        <span className="ml-auto shrink-0 font-medium">{distance} km</span>
                    </div>

                    {/* Price + Rating */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-0.5">
                            <IndianRupee size={14} className="text-[#000501] dark:text-[#ade1e5]" />
                            <span className="text-xl font-black text-[#000501] dark:text-[#ade1e5]">
                                {pricePerDay.toLocaleString('en-IN')}
                            </span>
                            <span className="text-xs text-[#73ab84] dark:text-[#79c7c5] font-medium ml-0.5">/day</span>
                        </div>

                        <div className="flex items-center gap-1 text-xs font-semibold text-[#73ab84] dark:text-[#79c7c5]">
                            <Star size={13} className="fill-[#73ab84] dark:fill-[#79c7c5]" />
                            <span>{rating}</span>
                            <span className="opacity-60">({reviewCount})</span>
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    );
}
