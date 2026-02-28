import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    MapPin, Star, IndianRupee, Calendar, User, ArrowLeft, CheckCircle2, XCircle, ImageOff,
    ShieldCheck, Info, MessageSquare, Clock, Share2, Heart, ChevronRight, AlertCircle,
    Package, CreditCard, Lock, Flag, ExternalLink
} from 'lucide-react';
import { fetchItemById, fetchItems } from '../api/services.js';
import { useRental } from '../context/RentalContext.jsx';
import Modal from '../components/ui/Modal.jsx';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import Container from '../components/layout/Container.jsx';
import Card from '../components/ui/Card.jsx';
import ItemCard from '../components/items/ItemCard.jsx';
import { ErrorState } from '../components/items/ItemStates.jsx';

function DetailSkeleton() {
    return (
        <div className="animate-pulse pt-24 pb-16 min-h-screen">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="h-96 rounded-3xl bg-brand-green/20 dark:bg-brand-teal/10" />
                    <div className="space-y-5">
                        <div className="h-8 bg-brand-green/25 rounded-xl w-3/4" />
                        <div className="h-4 bg-brand-green/20 rounded-lg w-1/2" />
                        <div className="h-24 bg-brand-green/15 rounded-2xl mt-4" />
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default function ItemDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addBooking, wishlist, toggleWishlist, addToRecentlyViewed, addNotification } = useRental();

    const [item, setItem] = useState(null);
    const [similarItems, setSimilarItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bookingModalOpen, setBookingModalOpen] = useState(false);
    const [confirming, setConfirming] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    // New Interaction Modals
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [reportModalOpen, setReportModalOpen] = useState(false);

    // Booking Dates
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(tomorrow);
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchItemById(id)
            .then(data => {
                setItem(data);
                addToRecentlyViewed(data);
                return fetchItems({ category: data.category });
            })
            .then(similar => {
                setSimilarItems(Array.isArray(similar) ? similar.filter(i => i.id !== id).slice(0, 4) : []);
                setLoading(false);
            })
            .catch((e) => {
                console.error(e);
                setError('Item not found or unavailable.');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <DetailSkeleton />;
    if (error || !item) return <div className="pt-28"><ErrorState message={error} onRetry={() => navigate('/browse')} /></div>;

    const days = Math.max(1, Math.ceil((new Date(endDate) - new Date(startDate)) / 86400000));
    const securityDeposit = Math.round(item.pricePerDay * 2);
    const serviceFee = Math.round(item.pricePerDay * 0.1 * days);
    const totalCost = (item.pricePerDay * days) + securityDeposit + serviceFee;

    const handleBooking = async () => {
        setConfirming(true);
        await new Promise(res => setTimeout(res, 1500));
        addBooking(item, {
            startDate,
            endDate,
            totalCost,
            securityDeposit,
            status: 'requested'
        });
        setConfirming(false);
        setConfirmed(true);
        setTimeout(() => {
            setBookingModalOpen(false);
            navigate('/my-bookings');
        }, 1200);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `Rent ${item.title} on RentiGO`,
                text: `Check out this ${item.title} for rent in ${item.location}!`,
                url: window.location.href,
            }).catch(() => setShareModalOpen(true));
        } else {
            setShareModalOpen(true);
        }
    };

    return (
        <div className="pb-32 animate-fade-in bg-white/50 dark:bg-transparent min-h-screen">
            <Container>
                {/* Navigation Breadcrumb */}
                <div className="pt-28 pb-10 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-brand-teal hover:text-brand-dark dark:text-brand-aqua dark:hover:text-brand-frost transition-all group"
                    >
                        <div className="w-10 h-10 rounded-2xl bg-brand-teal/5 dark:bg-brand-aqua/10 flex items-center justify-center group-hover:bg-brand-teal/10">
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        </div>
                        Back to Search
                    </button>

                    <div className="flex gap-3">
                        <button
                            onClick={handleShare}
                            className="p-3 rounded-2xl glass-card hover:bg-brand-teal/5 text-brand-teal transition-all"
                        >
                            <Share2 size={18} />
                        </button>
                        <button
                            onClick={() => toggleWishlist(item.id)}
                            className={`p-3 rounded-2xl glass-card transition-all ${wishlist.includes(item.id) ? 'bg-red-500 text-white shadow-lg' : 'hover:bg-brand-teal/5 text-brand-teal'}`}
                        >
                            <Heart size={18} className={wishlist.includes(item.id) ? 'fill-white' : ''} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-start">
                    {/* Left Column: Media & Info */}
                    <div className="space-y-12">
                        {/* Hero Section */}
                        <div className="space-y-8">
                            <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-[2.5rem] overflow-hidden glass-card shadow-2xl group">
                                {imgError ? (
                                    <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-brand-teal/5">
                                        <ImageOff size={64} className="text-brand-teal/20" />
                                        <span className="font-black uppercase tracking-widest text-brand-teal/40">{item.category}</span>
                                    </div>
                                ) : (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                        onError={() => setImgError(true)}
                                    />
                                )}
                                <div className="absolute top-6 left-6 flex gap-2">
                                    <Badge variant="info" className="!bg-white/90 !text-brand-dark px-4 py-2 text-xs font-black uppercase shadow-lg">
                                        {item.category}
                                    </Badge>
                                    <Badge variant="approved" className="px-4 py-2 text-xs font-black uppercase shadow-lg">
                                        Verified Item
                                    </Badge>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-brand-dark dark:text-brand-frost leading-none">
                                    {item.title}
                                </h1>
                                <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-brand-teal/70 dark:text-brand-aqua/60">
                                    <div className="flex items-center gap-2">
                                        <Star size={18} className="fill-brand-green text-brand-green" />
                                        <span className="text-brand-dark dark:text-brand-frost">{item.rating}</span>
                                        <span className="opacity-50 text-[10px] uppercase font-black tracking-widest">({item.reviewCount || 42} Reviews)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin size={18} className="text-brand-teal" />
                                        <span>{item.location}</span>
                                        <span className="w-1 h-1 rounded-full bg-brand-teal/30" />
                                        <span>{item.distance}km away</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description & Specs */}
                        <Card variant="glass" className="!p-8 space-y-8">
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-brand-teal/40 mb-4">Description</h3>
                                <p className="text-lg text-brand-dark/80 dark:text-brand-frost/80 leading-relaxed font-medium">
                                    {item.description || "A high-quality item perfect for your needs. Professional grade and well-maintained by the owner. Available for immediate pickup in the local community."}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-brand-teal/10">
                                <div className="space-y-1">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-brand-teal/40">Response Time</div>
                                    <div className="flex items-center gap-2 text-sm font-black text-brand-dark dark:text-brand-frost uppercase tracking-tighter">
                                        <Clock size={14} className="text-brand-green" /> &lt; 2 Hours
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-brand-teal/40">Condition</div>
                                    <div className="flex items-center gap-2 text-sm font-black text-brand-dark dark:text-brand-frost uppercase tracking-tighter">
                                        <Badge variant="info" className="px-2 py-0.5 !text-[10px]">Like New</Badge>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-brand-teal/40">Pickup Type</div>
                                    <div className="flex items-center gap-2 text-sm font-black text-brand-dark dark:text-brand-frost uppercase tracking-tighter">
                                        <Package size={14} className="text-brand-teal" /> Self-Pickup
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Location Preview (Interactive) */}
                        <div className="space-y-6">
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-brand-teal/40 px-2">Location</h3>
                            <button
                                onClick={() => navigate('/map')}
                                className="w-full relative h-64 rounded-[2rem] overflow-hidden glass-card group cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-brand-green/5 dark:bg-brand-teal/5 flex items-center justify-center group-hover:bg-brand-green/10 transition-colors">
                                    <div className="relative">
                                        <div className="w-16 h-16 bg-brand-green/20 rounded-full animate-ping absolute -inset-0" />
                                        <div className="w-16 h-16 bg-brand-green/40 rounded-full flex items-center justify-center relative z-10 border-4 border-white dark:border-brand-dark shadow-2xl group-hover:scale-110 transition-transform">
                                            <MapPin size={24} className="text-brand-dark dark:text-white" />
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute bottom-6 left-6 right-6 p-4 glass-card shadow-xl flex items-center justify-between group-hover:translate-y-[-4px] transition-transform">
                                    <div className="text-xs font-black text-brand-dark dark:text-brand-frost uppercase tracking-widest">
                                        Approximate location near {item.location}
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-black text-brand-green uppercase tracking-widest">
                                        View Full Map <ExternalLink size={12} />
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Checkout Sidebar */}
                    <aside className="sticky top-32 space-y-6">
                        <Card variant="glass" className="!p-8 shadow-2xl !rounded-[2.5rem] border-brand-green/20">
                            <div className="flex items-baseline gap-2 mb-8">
                                <span className="text-4xl font-black text-brand-dark dark:text-brand-frost">₹{item.pricePerDay.toLocaleString('en-IN')}</span>
                                <span className="text-xs font-black uppercase tracking-[0.2em] text-brand-teal/60">/ day</span>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="grid grid-cols-2 gap-2 p-2 rounded-2xl bg-brand-teal/5 dark:bg-brand-teal/10">
                                    <div className="flex flex-col gap-1 px-4 py-2 border-r border-brand-teal/10">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-brand-teal/60">From</label>
                                        <input
                                            type="date"
                                            min={today}
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="bg-transparent text-sm font-black text-brand-dark dark:text-brand-frost outline-none cursor-pointer"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 px-4 py-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-brand-teal/60">To</label>
                                        <input
                                            type="date"
                                            min={startDate}
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="bg-transparent text-sm font-black text-brand-dark dark:text-brand-frost outline-none cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 mb-10 pb-6 border-b border-brand-teal/10 text-xs font-bold text-brand-teal/60">
                                <div className="flex justify-between uppercase tracking-tighter">
                                    <span>Rent (₹{item.pricePerDay} × {days} days)</span>
                                    <span className="text-brand-dark dark:text-brand-frost font-black">₹{(item.pricePerDay * days).toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between uppercase tracking-tighter">
                                    <span className="flex items-center gap-1.5">Security Deposit <Info size={12} /></span>
                                    <span className="text-brand-dark dark:text-brand-frost font-black">₹{securityDeposit.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between uppercase tracking-tighter">
                                    <span>Service Fee</span>
                                    <span className="text-brand-dark dark:text-brand-frost font-black">₹{serviceFee.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between pt-4 text-sm font-black text-brand-dark dark:text-brand-frost uppercase tracking-widest">
                                    <span>Total Amount</span>
                                    <span className="text-brand-green text-lg">₹{totalCost.toLocaleString('en-IN')}</span>
                                </div>
                            </div>

                            <Button
                                variant="primary"
                                size="lg"
                                className="w-full !rounded-2xl shadow-xl shadow-brand-green/20"
                                onClick={() => setBookingModalOpen(true)}
                                disabled={!item.available}
                            >
                                <Lock size={18} /> Request to Book
                            </Button>
                        </Card>

                        {/* Owner & Trust Card */}
                        <div className="space-y-4">
                            <Card variant="default" className="!p-6 !rounded-[2rem]">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 rounded-2xl overflow-hidden glass-card">
                                        <img src={item.ownerAvatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=owner"} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-sm font-black text-brand-dark dark:text-brand-frost uppercase tracking-tighter">{item.ownerName}</h4>
                                            <Badge variant="approved" className="!text-[9px] px-2 py-0.5">Top Host</Badge>
                                        </div>
                                        <div className="text-[10px] font-bold text-brand-teal/60 uppercase mt-0.5">Verified Member since 2024</div>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full !text-[11px] !py-3"
                                    onClick={() => navigate('/messages')}
                                >
                                    <MessageSquare size={14} /> Message Owner
                                </Button>
                            </Card>

                            <button
                                onClick={() => setReportModalOpen(true)}
                                className="w-full flex items-center justify-center gap-2 py-4 text-xs font-black uppercase tracking-widest text-brand-teal/40 hover:text-red-500/60 transition-colors"
                            >
                                <Flag size={14} /> Report this Listing
                            </button>
                        </div>
                    </aside>
                </div>

                {/* Similar Items */}
                {similarItems.length > 0 && (
                    <section className="mt-32">
                        <div className="flex items-center justify-between mb-10">
                            <h3 className="text-2xl font-black text-brand-dark dark:text-brand-frost tracking-tighter uppercase leading-none">Nearby Favourites</h3>
                            <button onClick={() => navigate('/browse')} className="text-xs font-black uppercase tracking-widest text-brand-teal flex items-center gap-2 group">
                                View More <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {similarItems.map(sItem => (
                                <ItemCard key={sItem.id} item={sItem} />
                            ))}
                        </div>
                    </section>
                )}
            </Container>

            {/* SHARED MODALS */}
            <Modal isOpen={bookingModalOpen} onClose={() => !confirming && setBookingModalOpen(false)} title="Rental Confirmation">
                {confirmed ? (
                    <div className="text-center py-10 space-y-6 animate-fade-in">
                        <div className="w-20 h-20 rounded-full bg-brand-green/20 flex items-center justify-center mx-auto shadow-inner">
                            <CheckCircle2 size={40} className="text-brand-green" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-brand-dark dark:text-brand-frost tracking-tighter mb-2">Request Sent!</h3>
                            <p className="text-sm font-bold text-brand-teal/60 uppercase tracking-tight max-w-[280px] mx-auto">
                                The owner has 24 hours to accept. Redirecting to your dashboard...
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8 pb-4">
                        <div className="flex gap-4 p-4 rounded-3xl glass-card bg-brand-teal/5">
                            <div className="w-20 h-20 rounded-2xl overflow-hidden glass-card">
                                <img src={item.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                                <h4 className="text-sm font-black text-brand-dark dark:text-brand-frost uppercase tracking-tighter leading-tight mb-1">{item.title}</h4>
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-brand-teal/60 uppercase">
                                    <MapPin size={10} /> {item.location}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4 pt-4">
                            <Button variant="outline" size="lg" className="flex-1 !rounded-2xl" onClick={() => setBookingModalOpen(false)}>Back</Button>
                            <Button variant="primary" size="lg" className="flex-1 !rounded-2xl" onClick={handleBooking} loading={confirming}>Confirm Request</Button>
                        </div>
                    </div>
                )}
            </Modal>

            <Modal isOpen={shareModalOpen} onClose={() => setShareModalOpen(false)} title="Share with Gear-heads">
                <div className="space-y-8 py-4">
                    <p className="text-sm font-bold text-brand-teal/60 uppercase tracking-tight text-center">Share this listing with your neighborhood community</p>
                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="!rounded-2xl py-8 flex flex-col gap-2" onClick={() => { navigator.clipboard.writeText(window.location.href); addNotification('Link copied to clipboard', 'success'); setShareModalOpen(false); }}>
                            <Package size={24} /> <span className="text-[10px]">Copy Link</span>
                        </Button>
                        <Button variant="outline" className="!rounded-2xl py-8 flex flex-col gap-2">
                            <MessageSquare size={24} /> <span className="text-[10px]">WhatsApp</span>
                        </Button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={reportModalOpen} onClose={() => setReportModalOpen(false)} title="Report Listing">
                <div className="space-y-8 py-4">
                    <p className="text-sm font-bold text-red-500/80 uppercase tracking-tight text-center">Is there an issue with this neighbor's listing?</p>
                    <div className="space-y-2">
                        {['Inaccurate Description', 'Suspicious Owner', 'Safety Issue', 'Hate Speech'].map(reason => (
                            <button key={reason} onClick={() => { addNotification('Listing reported. Our moderators will review it.', 'info'); setReportModalOpen(false); }} className="w-full p-4 rounded-2xl bg-brand-teal/5 hover:bg-red-500/10 hover:text-red-500 transition-colors text-xs font-black uppercase text-left">
                                {reason}
                            </button>
                        ))}
                    </div>
                </div>
            </Modal>

            {/* Mobile Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden p-4 bg-white/80 dark:bg-brand-dark/80 backdrop-blur-xl border-t border-brand-teal/10">
                <div className="flex items-center justify-between gap-6 max-w-lg mx-auto">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-brand-teal/60 uppercase tracking-widest">Total Cost</span>
                        <span className="text-xl font-black text-brand-dark dark:text-brand-frost uppercase tracking-tighter">₹{totalCost.toLocaleString('en-IN')}</span>
                    </div>
                    <Button
                        variant="primary"
                        size="lg"
                        className="flex-1 !rounded-2xl shadow-xl shadow-brand-green/20"
                        onClick={() => setBookingModalOpen(true)}
                        disabled={!item.available}
                    >
                        {item.available ? 'Request to Book' : 'Booked'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
