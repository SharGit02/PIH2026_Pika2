import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    LayoutDashboard, Package, Clock, CheckCircle2, RotateCcw, IndianRupee, Plus,
    Calendar, User, ArrowRight,
} from 'lucide-react';
import { useRental } from '../context/RentalContext.jsx';
import Container from '../components/layout/Container.jsx';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import { EmptyState } from '../components/items/ItemStates.jsx';

const STATUS_ICON = {
    Pending: <Clock size={14} />,
    Approved: <CheckCircle2 size={14} />,
    Returned: <RotateCcw size={14} />,
};

function RequestCard({ req }) {
    return (
        <div className="glass-card rounded-2xl p-4 flex gap-4 items-start card-hover">
            <img
                src={req.itemImage}
                alt={req.itemTitle}
                className="w-20 h-20 rounded-xl object-cover shrink-0 border border-[#99d19c]/30 dark:border-[#79c7c5]/15"
            />
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-[#000501] dark:text-[#ade1e5] text-sm line-clamp-1">{req.itemTitle}</h3>
                    <Badge variant={req.status.toLowerCase()} className="shrink-0">
                        {STATUS_ICON[req.status]}
                        {req.status}
                    </Badge>
                </div>
                <p className="text-xs text-[#73ab84] dark:text-[#79c7c5] font-medium mb-2">
                    <User size={11} className="inline mr-1" />{req.ownerName}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#73ab84] dark:text-[#79c7c5]">
                    <span className="flex items-center gap-1">
                        <Calendar size={11} /> {req.startDate} → {req.endDate}
                    </span>
                    <span className="flex items-center gap-1 font-bold text-[#000501] dark:text-[#ade1e5]">
                        <IndianRupee size={11} />
                        {(req.pricePerDay * Math.max(1, Math.ceil((new Date(req.endDate) - new Date(req.startDate)) / 86400000))).toLocaleString('en-IN')}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default function Dashboard() {
    const { activeRequests, myListings } = useRental();
    const [activeTab, setActiveTab] = useState('requests');
    const navigate = useNavigate();

    const TABS = [
        { id: 'requests', label: 'Active Requests', icon: Clock, count: activeRequests.length },
        { id: 'listings', label: 'My Listings', icon: Package, count: myListings.length },
    ];

    // Earnings summary
    const earnings = activeRequests
        .filter(r => r.status === 'Approved' || r.status === 'Returned')
        .reduce((sum, r) => {
            const days = Math.max(1, Math.ceil((new Date(r.endDate) - new Date(r.startDate)) / 86400000));
            return sum + r.pricePerDay * days;
        }, 0);

    return (
        <div className="pb-24 animate-fade-in">
            <Container>

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
                    <div className="animate-fade-up">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-teal dark:text-brand-aqua mb-2 opacity-80">Your space</p>
                        <h1 className="text-4xl sm:text-5xl font-black text-brand-dark dark:text-brand-frost flex items-center gap-4 tracking-tighter">
                            <div className="w-12 h-12 rounded-2xl bg-brand-green/20 dark:bg-brand-green/10 flex items-center justify-center">
                                <LayoutDashboard size={28} className="text-brand-teal dark:text-brand-green" />
                            </div>
                            Dashboard
                        </h1>
                    </div>
                    <Button variant="primary" size="md" onClick={() => navigate('/browse')} className="shadow-brand-green/20">
                        <Plus size={18} /> Browse to Borrow
                    </Button>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {[
                        { label: 'Total Requests', value: activeRequests.length, icon: Clock },
                        { label: 'Approved', value: activeRequests.filter(r => r.status === 'Approved').length, icon: CheckCircle2 },
                        { label: 'Returned', value: activeRequests.filter(r => r.status === 'Returned').length, icon: RotateCcw },
                        { label: 'My Listings', value: myListings.length, icon: Package },
                    ].map(({ label, value, icon: Icon }) => (
                        <div key={label} className="glass-card rounded-2xl p-5">
                            <Icon size={20} className="text-[#73ab84] dark:text-[#79c7c5] mb-3" />
                            <div className="text-3xl font-black text-[#000501] dark:text-[#ade1e5]">{value}</div>
                            <div className="text-xs font-semibold text-[#73ab84] dark:text-[#79c7c5] mt-0.5">{label}</div>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex gap-1 glass rounded-2xl p-1 w-fit mb-8">
                    {TABS.map(({ id, label, icon: Icon, count }) => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === id
                                ? 'bg-[#000501] text-[#ade1e5] dark:bg-[#99d19c] dark:text-[#000501] shadow-sm'
                                : 'text-[#73ab84] dark:text-[#79c7c5] hover:bg-[#73ab84]/10 dark:hover:bg-[#79c7c5]/10'
                                }`}
                        >
                            <Icon size={15} />
                            {label}
                            {count > 0 && (
                                <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${activeTab === id
                                    ? 'bg-white/20 text-inherit'
                                    : 'bg-[#99d19c]/25 text-[#3d6b50] dark:bg-[#79c7c5]/15 dark:text-[#79c7c5]'
                                    }`}>
                                    {count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Tab content */}
                {activeTab === 'requests' && (
                    <div>
                        {activeRequests.length === 0 ? (
                            <EmptyState
                                icon={Clock}
                                title="No active requests"
                                description="You haven't requested to borrow anything yet. Start by browsing available items near you."
                                action={
                                    <Button variant="primary" onClick={() => navigate('/browse')}>
                                        Browse Items <ArrowRight size={15} />
                                    </Button>
                                }
                            />
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {activeRequests.map(req => (
                                    <RequestCard key={req.id} req={req} />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'listings' && (
                    <div>
                        {myListings.length === 0 ? (
                            <EmptyState
                                icon={Package}
                                title="No listings yet"
                                description="List items you own to earn money when your neighbours need them."
                                action={
                                    <Button variant="primary">
                                        <Plus size={15} /> List an Item
                                    </Button>
                                }
                            />
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {myListings.map(item => (
                                    <Link key={item.id} to={`/item/${item.id}`}>
                                        <div className="glass-card rounded-2xl overflow-hidden card-hover">
                                            <div className="h-36 overflow-hidden">
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-bold text-[#000501] dark:text-[#ade1e5] text-sm line-clamp-1">{item.title}</h3>
                                                <div className="flex items-center justify-between mt-2">
                                                    <span className="text-xs font-medium text-[#73ab84] dark:text-[#79c7c5]">₹{item.pricePerDay}/day</span>
                                                    <Badge variant="success">Active</Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                )}

            </Container>
        </div>
    );
}
