import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Calendar, MapPin, MessageSquare, Navigation,
    ArrowRight, Clock, ShieldCheck, CheckCircle2, XCircle, Info, Package, RefreshCcw
} from 'lucide-react';
import { useRental } from '../context/RentalContext.jsx';
import Container from '../components/layout/Container.jsx';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';
import Card from '../components/ui/Card.jsx';
import { EmptyState } from '../components/items/ItemStates.jsx';

const STATUS_CONFIG = {
    requested: { label: 'Pending Approval', variant: 'info', icon: Clock, color: 'text-brand-teal' },
    accepted: { label: 'Accepted', variant: 'approved', icon: CheckCircle2, color: 'text-brand-green' },
    picked_up: { label: 'Active Rental', variant: 'approved', icon: Package, color: 'text-brand-green' },
    returned: { label: 'Completed', variant: 'info', icon: RefreshCcw, color: 'text-brand-teal' },
    cancelled: { label: 'Cancelled', variant: 'error', icon: XCircle, color: 'text-red-500' }
};

function BookingCard({ booking }) {
    const navigate = useNavigate();
    const { item, startDate, endDate, totalCost, status } = booking;
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.requested;
    const StatusIcon = config.icon;

    const isActionable = status === 'accepted' || status === 'picked_up';

    return (
        <Card variant="glass" className="!p-8 group hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
            {/* Background Accent */}
            <div className={`absolute top-0 right-0 w-32 h-32 opacity-5 blur-[40px] rounded-full translate-x-10 -translate-y-10 transition-colors ${config.color}`} />

            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                {/* Image & Status Overlay */}
                <div className="relative w-full md:w-56 aspect-[4/3] rounded-3xl overflow-hidden glass-card shadow-lg group-hover:scale-105 transition-transform duration-500">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4">
                        <Badge variant={config.variant} className="shadow-lg backdrop-blur-md px-3 py-1.5 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 border-none">
                            <StatusIcon size={12} /> {config.label}
                        </Badge>
                    </div>
                </div>

                {/* Info Content */}
                <div className="flex-1 space-y-6">
                    <div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                            <h3 className="text-2xl font-black text-brand-dark dark:text-brand-frost uppercase tracking-tighter leading-none group-hover:text-brand-teal transition-colors">
                                {item.title}
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black text-brand-teal/40 uppercase tracking-widest">Booking Value:</span>
                                <span className="text-lg font-black text-brand-dark dark:text-brand-frost">₹{totalCost.toLocaleString('en-IN')}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <div className="text-[10px] font-black uppercase tracking-widest text-brand-teal/40">Rental Dates</div>
                                <div className="flex items-center gap-2 text-sm font-black text-brand-dark dark:text-brand-frost leading-tight uppercase tracking-tighter">
                                    <Calendar size={14} className="text-brand-teal" /> {startDate} — {endDate}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-[10px] font-black uppercase tracking-widest text-brand-teal/40">Location</div>
                                <div className="flex items-center gap-2 text-sm font-black text-brand-dark dark:text-brand-frost leading-tight uppercase tracking-tighter truncate">
                                    <MapPin size={14} className="text-brand-green" /> {item.location}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-wrap gap-3 pt-6 border-t border-brand-teal/10">
                        {isActionable ? (
                            <>
                                <Button variant="primary" size="sm" className="!rounded-xl px-6 flex-1 sm:flex-none">
                                    <MessageSquare size={16} /> Chat Host
                                </Button>
                                <Button variant="outline" size="sm" className="!rounded-xl px-6 flex-1 sm:flex-none">
                                    <Navigation size={16} /> Get Directions
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="outline"
                                size="sm"
                                className="!rounded-xl px-6 flex-1 sm:flex-none opacity-50 hover:opacity-100 transition-opacity"
                                onClick={() => navigate(`/item/${item.id}`)}
                            >
                                View Listing <ArrowRight size={14} />
                            </Button>
                        )}
                        {status === 'requested' && (
                            <Button variant="ghost" size="sm" className="!text-red-500 !text-[11px] ml-auto uppercase tracking-widest font-black">
                                <XCircle size={14} /> Cancel Request
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Status-specific Help Note */}
            {status === 'accepted' && (
                <div className="mt-6 p-4 rounded-2xl bg-brand-green/5 border border-brand-green/10 flex items-center gap-3">
                    <ShieldCheck size={16} className="text-brand-green shrink-0" />
                    <p className="text-[10px] font-bold text-brand-teal/70 uppercase tracking-tight">
                        The exact pickup address and landlord's phone number are now visible in 'Get Directions'.
                    </p>
                </div>
            )}
        </Card>
    );
}

export default function MyBookings() {
    const navigate = useNavigate();
    const { myBookings } = useRental();

    const activeBookings = myBookings.filter(b => b.status !== 'returned' && b.status !== 'cancelled');
    const pastBookings = myBookings.filter(b => b.status === 'returned' || b.status === 'cancelled');

    return (
        <div className="pt-28 pb-32 animate-fade-in min-h-screen bg-white/40 dark:bg-transparent">
            <Container>
                {/* Header */}
                <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8 animate-fade-up">
                    <div>
                        <h1 className="text-4xl sm:text-6xl font-black text-brand-dark dark:text-brand-frost tracking-tighter leading-none mb-3">
                            My Rentals
                        </h1>
                        <div className="flex items-center gap-3">
                            <Badge variant="info" className="!bg-brand-teal !text-white px-3 py-1 text-xs font-black">
                                {activeBookings.length} Active Gear
                            </Badge>
                            <span className="text-brand-teal/40 text-[10px] font-black uppercase tracking-[0.2em]">
                                Managing your local borrows
                            </span>
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        size="md"
                        onClick={() => navigate('/browse')}
                    >
                        Browse More Gear <ArrowRight size={18} />
                    </Button>
                </div>

                {/* Content Sections */}
                <div className="space-y-20">
                    {/* Active Section */}
                    <div className="space-y-10">
                        <div className="flex items-center gap-4 px-2">
                            <div className="w-10 h-1 rounded-full bg-brand-green shadow-[0_0_12px_rgba(115,171,132,0.4)]" />
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-brand-teal/60">Current Status & Pipeline</h2>
                        </div>

                        {activeBookings.length === 0 ? (
                            <div className="py-12">
                                <EmptyState
                                    icon={Package}
                                    title="No active rentals"
                                    description="Rent tools, cameras, or sports gear from your neighbors to see them here."
                                    action={<Button variant="primary" onClick={() => navigate('/browse')}>Start Browsing</Button>}
                                />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-8">
                                {activeBookings.map((booking, i) => (
                                    <div key={booking.id || i} className="animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                                        <BookingCard booking={booking} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Past Section */}
                    {pastBookings.length > 0 && (
                        <div className="space-y-10">
                            <div className="flex items-center gap-4 px-2">
                                <div className="w-10 h-1 rounded-full bg-brand-teal/20" />
                                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-brand-teal/40">Past Rentals & History</h2>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {pastBookings.map((booking, i) => (
                                    <div key={booking.id || i} className="animate-fade-up opacity-80 hover:opacity-100 transition-opacity">
                                        <BookingCard booking={booking} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </Container>

            {/* Mobile Empty State Hint */}
            {activeBookings.length === 0 && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] sm:hidden">
                    <Button
                        variant="primary"
                        size="lg"
                        className="w-full shadow-22 shadow-brand-green/30"
                        onClick={() => navigate('/browse')}
                    >
                        Rent Gear Locally
                    </Button>
                </div>
            )}
        </div>
    );
}
