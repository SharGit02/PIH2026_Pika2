import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    MapPin, Star, IndianRupee, Calendar, User, ArrowLeft, CheckCircle2, XCircle, ImageOff,
} from 'lucide-react';
import { fetchItemById } from '../api/services.js';
import { useRental } from '../context/RentalContext.jsx';
import Modal from '../components/ui/Modal.jsx';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import Container from '../components/layout/Container.jsx';
import { ErrorState } from '../components/items/ItemStates.jsx';

function DetailSkeleton() {
    return (
        <div className="animate-pulse pt-24 pb-16 min-h-screen">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="h-96 rounded-3xl bg-[#99d19c]/20 dark:bg-[#73ab84]/10" />
                    <div className="space-y-5">
                        <div className="h-8 bg-[#99d19c]/25 dark:bg-[#73ab84]/15 rounded-xl w-3/4" />
                        <div className="h-4 bg-[#99d19c]/20 rounded-lg w-1/2" />
                        <div className="h-6 bg-[#99d19c]/25 rounded-xl w-1/3 mt-4" />
                        <div className="h-24 bg-[#99d19c]/15 rounded-2xl mt-4" />
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default function ItemDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addRequest } = useRental();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [confirming, setConfirming] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(tomorrow);
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        fetchItemById(id)
            .then(data => { setItem(data); setLoading(false); })
            .catch(() => { setError('Item not found or unavailable.'); setLoading(false); });
    }, [id]);

    if (loading) return <DetailSkeleton />;
    if (error || !item) return (
        <div className="pt-28">
            <ErrorState message={error} onRetry={() => navigate('/browse')} />
        </div>
    );

    const days = Math.max(1, Math.ceil((new Date(endDate) - new Date(startDate)) / 86400000));
    const totalPrice = days * item.pricePerDay;

    const handleConfirm = async () => {
        setConfirming(true);
        await new Promise(res => setTimeout(res, 900));
        addRequest(item, { startDate, endDate });
        setConfirming(false);
        setConfirmed(true);
        setTimeout(() => {
            setModalOpen(false);
            navigate('/dashboard');
        }, 1400);
    };

    return (
        <div className="pb-24 animate-fade-in">
            <Container>
                {/* Back */}
                <div className="mb-10 animate-fade-up">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2.5 text-sm font-black uppercase tracking-widest text-brand-teal dark:text-brand-aqua hover:text-brand-dark dark:hover:text-brand-frost transition-all duration-300 group"
                    >
                        <div className="w-9 h-9 rounded-xl bg-brand-teal/10 dark:bg-brand-aqua/10 flex items-center justify-center group-hover:bg-brand-teal/20 transition-colors">
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        </div>
                        Back to results
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">

                    {/* Image */}
                    <div className="relative">
                        <div className="aspect-[4/3] rounded-3xl overflow-hidden glass-card shadow-2xl bg-gradient-to-br from-[#99d19c]/30 to-[#79c7c5]/20 dark:from-[#99d19c]/10 dark:to-[#79c7c5]/8">
                            {imgError ? (
                                <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-[#73ab84] dark:text-[#79c7c5]">
                                    <ImageOff size={48} className="opacity-30" />
                                    <span className="text-sm font-semibold opacity-50">{item.category}</span>
                                </div>
                            ) : (
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                    onError={() => setImgError(true)}
                                />
                            )}
                        </div>
                        {/* Floating badge */}
                        <div className="absolute top-4 left-4">
                            <Badge variant="info" className="shadow-md backdrop-blur-sm text-sm px-3 py-1">
                                {item.category}
                            </Badge>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col">
                        {/* Title + availability */}
                        <div className="flex items-start justify-between gap-4 mb-3">
                            <h1 className="text-3xl font-black text-[#000501] dark:text-[#ade1e5] leading-tight">
                                {item.title}
                            </h1>
                            <Badge variant={item.available ? 'approved' : 'error'} className="shrink-0 mt-1">
                                {item.available ? (
                                    <><CheckCircle2 size={12} /> Available</>
                                ) : (
                                    <><XCircle size={12} /> Unavailable</>
                                )}
                            </Badge>
                        </div>

                        {/* Location + rating */}
                        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-[#73ab84] dark:text-[#79c7c5]">
                            <div className="flex items-center gap-1.5 font-medium">
                                <MapPin size={15} /> {item.location} · {item.distance} km away
                            </div>
                            <div className="flex items-center gap-1.5 font-semibold">
                                <Star size={15} className="fill-[#73ab84] dark:fill-[#79c7c5]" />
                                {item.rating} ({item.reviewCount} reviews)
                            </div>
                        </div>

                        {/* Price */}
                        <div className="glass-card rounded-2xl p-5 mb-6">
                            <div className="flex items-baseline gap-1 mb-1">
                                <IndianRupee size={22} className="text-[#000501] dark:text-[#ade1e5]" />
                                <span className="text-5xl font-black text-[#000501] dark:text-[#ade1e5]">
                                    {item.pricePerDay.toLocaleString('en-IN')}
                                </span>
                                <span className="text-lg text-[#73ab84] dark:text-[#79c7c5] font-semibold">/ day</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-[#73ab84] dark:text-[#79c7c5]">
                                <Calendar size={13} />
                                Available: {item.availableFrom} to {item.availableTo}
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-[#3d6b50] dark:text-[#79c7c5] text-sm leading-relaxed mb-6 font-medium">
                            {item.description}
                        </p>

                        {/* Owner card */}
                        <div className="flex items-center gap-3 glass-card rounded-2xl p-4 mb-8">
                            <img
                                src={item.ownerAvatar}
                                alt={item.ownerName}
                                className="w-12 h-12 rounded-xl object-cover border-2 border-[#99d19c]/40 dark:border-[#79c7c5]/20"
                            />
                            <div>
                                <div className="flex items-center gap-1.5 text-sm font-semibold text-[#000501] dark:text-[#ade1e5]">
                                    <User size={13} /> {item.ownerName}
                                </div>
                                <div className="text-xs text-[#73ab84] dark:text-[#79c7c5] mt-0.5">Verified owner · Member since 2024</div>
                            </div>
                        </div>

                        {/* CTA */}
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => setModalOpen(true)}
                            disabled={!item.available}
                            className="w-full"
                        >
                            {item.available ? 'Request to Borrow' : 'Currently Unavailable'}
                        </Button>
                    </div>
                </div>
            </Container>

            {/* Request Modal */}
            <Modal isOpen={modalOpen} onClose={() => { if (!confirming) setModalOpen(false); }} title="Confirm Rental Request">
                {confirmed ? (
                    <div className="flex flex-col items-center py-6 text-center">
                        <div className="w-16 h-16 rounded-full bg-[#99d19c]/25 flex items-center justify-center mb-4">
                            <CheckCircle2 size={32} className="text-[#73ab84] dark:text-[#99d19c]" />
                        </div>
                        <h3 className="text-xl font-bold text-[#000501] dark:text-[#ade1e5] mb-2">Request Sent!</h3>
                        <p className="text-sm text-[#73ab84] dark:text-[#79c7c5]">Redirecting you to your dashboard…</p>
                    </div>
                ) : (
                    <>
                        {/* Item summary */}
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#99d19c]/12 dark:bg-[#73ab84]/8 mb-5">
                            <img src={item.image} alt={item.title} className="w-14 h-14 rounded-xl object-cover" />
                            <div>
                                <div className="font-bold text-[#000501] dark:text-[#ade1e5] text-sm">{item.title}</div>
                                <div className="text-xs text-[#73ab84] dark:text-[#79c7c5]">by {item.ownerName}</div>
                            </div>
                        </div>

                        {/* Date pickers */}
                        <div className="grid grid-cols-2 gap-3 mb-5">
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-[#73ab84] dark:text-[#79c7c5] uppercase tracking-wide">Start Date</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    min={today}
                                    onChange={e => setStartDate(e.target.value)}
                                    className="px-3 py-2.5 rounded-xl text-sm font-semibold bg-white/70 dark:bg-[#000501]/60 border border-[#99d19c]/50 dark:border-[#79c7c5]/25 text-[#000501] dark:text-[#ade1e5] outline-none focus:ring-2 focus:ring-[#79c7c5]/50"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-[#73ab84] dark:text-[#79c7c5] uppercase tracking-wide">End Date</label>
                                <input
                                    type="date"
                                    value={endDate}
                                    min={startDate}
                                    onChange={e => setEndDate(e.target.value)}
                                    className="px-3 py-2.5 rounded-xl text-sm font-semibold bg-white/70 dark:bg-[#000501]/60 border border-[#99d19c]/50 dark:border-[#79c7c5]/25 text-[#000501] dark:text-[#ade1e5] outline-none focus:ring-2 focus:ring-[#79c7c5]/50"
                                />
                            </div>
                        </div>

                        {/* Price summary */}
                        <div className="glass-card rounded-xl p-4 mb-6">
                            <div className="flex justify-between text-sm font-medium text-[#73ab84] dark:text-[#79c7c5] mb-2">
                                <span>₹{item.pricePerDay.toLocaleString('en-IN')} × {days} day{days > 1 ? 's' : ''}</span>
                                <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="h-px bg-[#99d19c]/25 dark:bg-[#79c7c5]/10 mb-2" />
                            <div className="flex justify-between font-black text-[#000501] dark:text-[#ade1e5]">
                                <span>Total</span>
                                <span className="text-xl">₹{totalPrice.toLocaleString('en-IN')}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <Button variant="outline" size="md" className="flex-1" onClick={() => setModalOpen(false)} disabled={confirming}>
                                Cancel
                            </Button>
                            <Button variant="primary" size="md" className="flex-1" onClick={handleConfirm} loading={confirming}>
                                {confirming ? 'Sending…' : 'Confirm Request'}
                            </Button>
                        </div>
                    </>
                )}
            </Modal>
        </div>
    );
}
