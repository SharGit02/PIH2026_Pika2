import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Github, Twitter, Instagram, ShieldCheck, Heart, User } from 'lucide-react';
import Container from './Container.jsx';

const FOOTER_LINKS = {
    Borrow: [
        { label: 'Browse Gear', to: '/browse' },
        { label: 'My Bookings', to: '/my-bookings' },
        { label: 'Wishlist', to: '/wishlist' },
        { label: 'How it Works', to: '/' },
    ],
    Lend: [
        { label: 'List an Item', to: '/list-item' },
        { label: 'My Listings', to: '/my-listings' },
        { label: 'Hosting Tools', to: '/my-listings' },
        { label: 'SafeShare Guarantee', to: '/' },
    ],
    Company: [
        { label: 'About Us', to: '/' },
        { label: 'Trust & Safety', to: '/' },
        { label: 'Help Center', to: '/' },
        { label: 'Contact', to: '/' },
    ],
};

export default function Footer() {
    return (
        <footer className="pt-24 pb-12 bg-white/20 dark:bg-transparent border-t border-brand-teal/5">
            <Container>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
                    {/* Brand Column */}
                    <div className="col-span-2 space-y-8">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 rounded-2xl bg-brand-dark dark:bg-brand-green flex items-center justify-center group-hover:rotate-12 transition-transform">
                                <MapPin size={20} className="text-brand-frost dark:text-brand-dark" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-brand-dark dark:text-brand-frost uppercase">
                                Renti<span className="text-brand-green">GO</span>
                            </span>
                        </Link>

                        <p className="text-sm font-bold text-brand-teal/60 dark:text-brand-aqua/40 leading-relaxed max-w-sm uppercase tracking-tight">
                            The hyperlocal sharing economy. Borrow anything from verified neighbours in your local community.
                        </p>

                        <div className="flex gap-4">
                            {[Twitter, Instagram, Github].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-2xl glass-card flex items-center justify-center text-brand-teal hover:bg-brand-green hover:text-brand-dark transition-all">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link Groups */}
                    {Object.entries(FOOTER_LINKS).map(([group, links]) => (
                        <div key={group} className="space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-teal/40">{group}</h4>
                            <ul className="space-y-4">
                                {links.map(({ label, to }) => (
                                    <li key={label}>
                                        <Link
                                            to={to}
                                            className="text-xs font-black text-brand-dark/70 dark:text-brand-frost/70 uppercase tracking-widest hover:text-brand-green transition-colors"
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="mt-24 pt-10 border-t border-brand-teal/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 text-[10px] font-black text-brand-teal/40 uppercase tracking-widest">
                        <span>© 2026 RENTIGO</span>
                        <span className="w-1 h-1 rounded-full bg-brand-teal/20" />
                        <span>MADE WITH LOVE FOR COMMUNITIES</span>
                    </div>

                    <div className="flex gap-8">
                        <a href="#" className="text-[10px] font-black text-brand-teal/40 hover:text-brand-teal uppercase tracking-widest transition-colors">Privacy</a>
                        <a href="#" className="text-[10px] font-black text-brand-teal/40 hover:text-brand-teal uppercase tracking-widest transition-colors">Terms</a>
                        <a href="#" className="text-[10px] font-black text-brand-teal/40 hover:text-brand-teal uppercase tracking-widest transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </Container>
        </footer>
    );
}

