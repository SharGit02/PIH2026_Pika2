import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Package, Plus, Star, MapPin, CheckCircle2, XCircle,
    Clock, MessageSquare, ArrowRight, ShieldCheck, IndianRupee,
    TrendingUp, Users, AlertCircle, Info, ChevronRight, Hammer
} from 'lucide-react';
import { useRental } from '../context/RentalContext.jsx';
import Container from '../components/layout/Container.jsx';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';
import Card from '../components/ui/Card.jsx';
import { EmptyState } from '../components/items/ItemStates.jsx';

// Request Card for Incoming Requests
function RequestCard({ request, onAccept, onDecline }) {
    const { id, item, startDate, endDate, totalCost, renterName, renterRating, renterAvatar } = request;

    return (
        <Card variant="glass" className="!p-6 group relative overflow-hidden animate-fade-up">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-full sm:w-24 aspect-square rounded-2xl overflow-hidden glass-card">
                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h4 className="text-lg font-black text-brand-dark dark:text-brand-frost uppercase tracking-tighter leading-none mb-1">{item.title}</h4>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-brand-teal/60 uppercase">
                                <Clock size={12} /> {startDate} — {endDate}
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] font-black text-brand-teal/40 uppercase tracking-widest block mb-0.5">Potential Earnings:</span>
                            <span className="text-xl font-black text-brand-green">₹{totalCost.toLocaleString('en-IN')}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-brand-teal/10">
                        <div className="flex items-center gap-3">
                            <img src={renterAvatar} alt="" className="w-8 h-8 rounded-full border border-brand-teal/20" />
                            <div>
                                <div className="text-[10px] font-black text-brand-dark dark:text-brand-frost uppercase">{renterName}</div>
                                <div className="flex items-center gap-1 text-[9px] font-bold text-brand-teal">
                                    <Star size={10} className="fill-brand-teal" /> {renterRating}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="!rounded-xl !p-2 text-red-500 border-red-500/20" onClick={() => onDecline(id)}>
                                <XCircle size={18} />
                            </Button>
                            <Button variant="primary" size="sm" className="!rounded-xl px-6" onClick={() => onAccept(id)}>
                                <CheckCircle2 size={16} /> Accept Request
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Countdown bar (simulated) */}
            <div className="absolute bottom-0 left-0 h-1 bg-brand-green w-3/4 opacity-30" />
        </Card>
    );
}

// Listing Card for Owner's Items
function OwnerListingCard({ listing }) {
    const { id, title, image, pricePerDay, status = 'active', category } = listing;

    return (
        <Card variant="default" className="!p-4 group hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden">
            <div className="flex gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden glass-card">
                    <img src={image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-black text-brand-dark dark:text-brand-frost uppercase tracking-tighter leading-tight truncate max-w-[120px]">{title}</h4>
                        <Badge variant={status === 'active' ? 'approved' : 'info'} className="!text-[8px] px-1.5 py-0.5 uppercase">{status}</Badge>
                    </div>
                    <div className="text-[10px] font-black text-brand-teal/60 uppercase tracking-widest">₹{pricePerDay}/day · {category}</div>
                    <div className="flex gap-2 mt-3">
                        <button className="text-[9px] font-black text-brand-teal uppercase tracking-widest hover:underline">Edit</button>
                        <span className="text-brand-teal/20">|</span>
                        <button className="text-[9px] font-black text-brand-teal uppercase tracking-widest hover:underline">Availability</button>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default function MyListings() {
    const navigate = useNavigate();
    const { myListings, incomingRequests, acceptRequest, declineRequest } = useRental();

    return (
        <div className="pt-28 pb-32 animate-fade-in min-h-screen bg-white/40 dark:bg-transparent">
            <Container>
                {/* Header & Stats Overview */}
                <div className="mb-14 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-end animate-fade-up">
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-4xl sm:text-6xl font-black text-brand-dark dark:text-brand-frost tracking-tighter leading-none mb-3">
                                Hosting Dashboard
                            </h1>
                            <div className="flex items-center gap-3">
                                <Badge variant="approved" className="px-3 py-1 text-xs font-black">
                                    Top Rated Host
                                </Badge>
                                <span className="text-brand-teal/40 text-[10px] font-black uppercase tracking-[0.2em]">
                                    Managing your local sharing business
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Card variant="glass" className="!p-4 bg-brand-green/30 border-brand-green/20 min-w-[160px]">
                                <div className="text-[10px] font-black text-brand-dark uppercase tracking-widest mb-1">Total Earnings</div>
                                <div className="text-2xl font-black text-brand-dark">₹12,450</div>
                                <div className="flex items-center gap-1 text-[9px] font-black text-brand-dark uppercase mt-1">
                                    <TrendingUp size={10} /> +14% this month
                                </div>
                            </Card>
                            <Card variant="glass" className="!p-4 min-w-[160px]">
                                <div className="text-[10px] font-black text-brand-teal/60 uppercase tracking-widest mb-1">Total Views</div>
                                <div className="text-2xl font-black text-brand-dark dark:text-brand-frost">2.8K</div>
                                <div className="text-[9px] font-bold text-brand-teal uppercase mt-1">across all items</div>
                            </Card>
                        </div>
                    </div>

                    <Button
                        variant="primary"
                        size="lg"
                        className="!rounded-[2rem] shadow-2xl shadow-brand-green/20 px-10 py-8"
                        onClick={() => navigate('/list-item')}
                    >
                        <Plus size={20} /> List New Item
                    </Button>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-16 items-start">
                    {/* Incoming Requests Section (Lender-only Flow) */}
                    <div className="space-y-10">
                        <div className="flex items-center justify-between px-2">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-1 rounded-full bg-brand-green shadow-xl shadow-brand-green/40" />
                                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-brand-teal/60">Incoming Booking Requests</h2>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-brand-teal/40">{incomingRequests.length} New</span>
                        </div>

                        {incomingRequests.length === 0 ? (
                            <div className="py-12 px-8 rounded-[3rem] border-2 border-dashed border-brand-teal/10 flex flex-col items-center justify-center text-center opacity-60">
                                <Clock size={48} className="text-brand-teal/20 mb-6" />
                                <h3 className="text-xl font-black text-brand-dark dark:text-brand-frost uppercase tracking-tighter mb-2">No pending requests</h3>
                                <p className="text-sm font-bold text-brand-teal/60 uppercase tracking-tight">Ensure your items are active to receive bookings.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-6">
                                {incomingRequests.map(req => (
                                    <RequestCard
                                        key={req.id}
                                        request={req}
                                        onAccept={acceptRequest}
                                        onDecline={declineRequest}
                                    />
                                ))}
                            </div>
                        )}

                        <div className="p-8 rounded-[3rem] bg-brand-teal/5 flex items-start gap-4 animate-fade-up">
                            <Info size={24} className="text-brand-teal shrink-0" />
                            <div className="space-y-2">
                                <h4 className="text-sm font-black text-brand-dark dark:text-brand-frost uppercase tracking-tighter">Fast Response = More Bookings</h4>
                                <p className="text-xs font-bold text-brand-teal/70 leading-relaxed uppercase tracking-tight">
                                    Lenders who respond within 2 hours are 60% more likely to get their items booked.
                                    Your response time is visible to borrowers.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Active Inventory Sidebar */}
                    <div className="space-y-10">
                        <div className="flex items-center gap-4 px-2">
                            <div className="w-10 h-1 rounded-full bg-brand-teal/20" />
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-brand-teal/60">My Active Gear</h2>
                        </div>

                        {myListings.length === 0 ? (
                            <Card variant="glass" className="!p-8 text-center space-y-6">
                                <Hammer size={32} className="text-brand-teal/20 mx-auto" strokeWidth={3} />
                                <p className="text-[10px] font-black text-brand-teal/60 uppercase tracking-widest">No listings yet</p>
                                <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/list-item')}>Add Your First Item</Button>
                            </Card>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {myListings.map(listing => (
                                    <OwnerListingCard key={listing.id} listing={listing} />
                                ))}
                                <button
                                    onClick={() => navigate('/list-item')}
                                    className="group w-full p-4 rounded-3xl border-2 border-dashed border-brand-teal/10 hover:border-brand-green/30 hover:bg-brand-green/5 transition-all flex items-center justify-center gap-3 text-brand-teal"
                                >
                                    <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Add Another Item</span>
                                </button>
                            </div>
                        )}

                        <div className="p-8 rounded-[3rem] border border-brand-green/10 bg-brand-green/5 space-y-6">
                            <h4 className="flex items-center gap-2 text-xs font-black text-brand-dark dark:text-brand-frost uppercase tracking-widest">
                                <ShieldCheck size={18} className="text-brand-green" /> Safety & Trust
                            </h4>
                            <div className="space-y-4">
                                <div className="flex gap-3 text-[10px] font-bold text-brand-teal/70 uppercase">
                                    <AlertCircle size={14} className="shrink-0 text-brand-green" />
                                    <span>Capture photos of your item's condition before handover for protection.</span>
                                </div>
                                <div className="flex gap-3 text-[10px] font-bold text-brand-teal/70 uppercase">
                                    <AlertCircle size={14} className="shrink-0 text-brand-green" />
                                    <span>RentiGO handles payment and security deposit escrow automatically.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
