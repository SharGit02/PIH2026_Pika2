import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ArrowRight, ShieldCheck, Zap, Users } from 'lucide-react';
import { fetchItems } from '../api/services.js';
import ItemCard from '../components/items/ItemCard.jsx';
import { LoadingGrid, ErrorState } from '../components/items/ItemStates.jsx';
import Container from '../components/layout/Container.jsx';
import Button from '../components/ui/Button.jsx';

const STATS = [
    { label: 'Active Listings', value: '2,400+' },
    { label: 'Happy Borrowers', value: '8,100+' },
    { label: 'Cities', value: '12' },
];

const HOW_IT_WORKS = [
    { icon: Search, title: 'Search Nearby', desc: 'Find exactly what you need within walking distance of your home.' },
    { icon: ShieldCheck, title: 'Book Safely', desc: 'Verified owners, secure payments, and rental insurance included.' },
    { icon: Zap, title: 'Borrow & Return', desc: 'Pick up, use, and return. No complications, no waste.' },
];

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [locationQuery, setLocationQuery] = useState('');
    const [featured, setFeatured] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchItems({})
            .then(data => {
                setFeatured((data.items || data).slice(0, 4));
                setLoading(false);
            })
            .catch(() => {
                setError('Could not load featured items.');
                setLoading(false);
            });
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchQuery) params.set('search', searchQuery);
        if (locationQuery) params.set('location', locationQuery);
        navigate(`/browse?${params.toString()}`);
    };

    return (
        <div className="min-h-screen">

            {/* HERO */}
            <section className="hero-bg flex flex-col items-center justify-center text-center pt-32 pb-24 px-4 relative overflow-hidden">
                {/* Decorative blobs */}
                <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full opacity-30 blur-3xl pointer-events-none"
                    style={{ background: 'radial-gradient(circle, #79c7c5, transparent)' }} />
                <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full opacity-25 blur-3xl pointer-events-none"
                    style={{ background: 'radial-gradient(circle, #99d19c, transparent)' }} />

                <div className="relative z-10 max-w-4xl mx-auto">
                    {/* Eyebrow */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-semibold text-[#3d6b50] dark:text-[#79c7c5] mb-8 animate-fade-up">
                        <div className="w-2 h-2 rounded-full bg-[#73ab84] animate-pulse" />
                        Now live in 12 cities across India
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.08] mb-6 animate-fade-up delay-100">
                        <span className="text-gradient">Borrow anything.</span>
                        <br />
                        <span className="text-brand-dark dark:text-white">From anyone near you.</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-[#3d6b50] dark:text-[#79c7c5] max-w-2xl mx-auto leading-relaxed mb-10 font-medium animate-fade-up delay-200">
                        Why buy when you can borrow? RentiGO connects neighbours to share tools, cameras, sports gear, and more — at a fraction of the price.
                    </p>

                    {/* Glassmorphism Search Bar */}
                    <form
                        onSubmit={handleSearch}
                        className="glass rounded-2xl p-2 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto shadow-xl mb-10 animate-fade-up delay-300"
                    >
                        <div className="flex-1 flex items-center gap-3 px-4 py-2">
                            <Search size={18} className="text-[#73ab84] dark:text-[#79c7c5] shrink-0" />
                            <input
                                type="text"
                                placeholder="What do you need?"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent text-sm font-medium text-[#000501] dark:text-[#ade1e5] placeholder:text-[#73ab84]/60 dark:placeholder:text-[#79c7c5]/50 outline-none"
                            />
                        </div>
                        <div className="hidden sm:block w-px bg-[#99d19c]/30 dark:bg-[#79c7c5]/15 self-stretch" />
                        <div className="flex items-center gap-3 px-4 py-2">
                            <MapPin size={18} className="text-[#73ab84] dark:text-[#79c7c5] shrink-0" />
                            <input
                                type="text"
                                placeholder="Your location"
                                value={locationQuery}
                                onChange={e => setLocationQuery(e.target.value)}
                                className="w-full sm:w-36 bg-transparent text-sm font-medium text-[#000501] dark:text-[#ade1e5] placeholder:text-[#73ab84]/60 dark:placeholder:text-[#79c7c5]/50 outline-none"
                            />
                        </div>
                        <Button variant="primary" size="md" type="submit" className="shrink-0">
                            Search
                        </Button>
                    </form>

                    {/* CTA Row */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-400">
                        <Button variant="outline" size="md" onClick={() => navigate('/browse')}>
                            Browse All Items
                            <ArrowRight size={16} />
                        </Button>
                        <Button variant="ghost" size="md" onClick={() => navigate('/dashboard')}>
                            <Users size={16} />
                            List Your Item
                        </Button>
                    </div>
                </div>

                {/* Stats */}
                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mt-16 animate-fade-up delay-400">
                    {STATS.map(({ label, value }) => (
                        <div key={label} className="text-center">
                            <div className="text-3xl font-black text-[#000501] dark:text-[#ade1e5]">{value}</div>
                            <div className="text-sm font-medium text-[#73ab84] dark:text-[#79c7c5]">{label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-24">
                <Container>
                    <div className="text-center mb-14">
                        <p className="text-sm font-bold uppercase tracking-widest text-[#73ab84] dark:text-[#79c7c5] mb-3">Simple by design</p>
                        <h2 className="text-4xl font-black text-[#000501] dark:text-[#ade1e5]">How RentiGO works</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {HOW_IT_WORKS.map(({ icon: Icon, title, desc }, i) => {
                            const delayClass = i === 0 ? 'delay-100' : i === 1 ? 'delay-200' : 'delay-300';
                            return (
                                <div key={title} className={`glass-card rounded-2xl p-8 text-center animate-fade-up ${delayClass}`}>
                                    <div className="w-14 h-14 rounded-2xl bg-[#99d19c]/25 dark:bg-[#99d19c]/12 flex items-center justify-center mx-auto mb-5">
                                        <Icon size={24} className="text-[#73ab84] dark:text-[#99d19c]" />
                                    </div>
                                    <h3 className="text-lg font-bold text-[#000501] dark:text-[#ade1e5] mb-3">{title}</h3>
                                    <p className="text-sm text-[#73ab84] dark:text-[#79c7c5] leading-relaxed">{desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </Container>
            </section>

            {/* FEATURED ITEMS */}
            <section className="py-24 pt-0">
                <Container>
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-widest text-[#73ab84] dark:text-[#79c7c5] mb-2">Trending near you</p>
                            <h2 className="text-4xl font-black text-[#000501] dark:text-[#ade1e5]">Featured Items</h2>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => navigate('/browse')}>
                            View all <ArrowRight size={14} />
                        </Button>
                    </div>

                    {loading && <LoadingGrid count={4} />}
                    {error && <ErrorState message={error} onRetry={() => window.location.reload()} />}
                    {!loading && !error && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {featured.map(item => (
                                <ItemCard key={item.id} item={item} />
                            ))}
                        </div>
                    )}
                </Container>
            </section>
        </div>
    );
}
