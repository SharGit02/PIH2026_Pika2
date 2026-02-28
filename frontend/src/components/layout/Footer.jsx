import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Github, Twitter, Instagram } from 'lucide-react';

const FOOTER_LINKS = {
    Product: [
        { label: 'Browse Items', to: '/browse' },
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'List an Item', to: '/dashboard' },
    ],
    Company: [
        { label: 'About Us', to: '/' },
        { label: 'How It Works', to: '/' },
        { label: 'Trust & Safety', to: '/' },
    ],
    Support: [
        { label: 'Help Center', to: '/' },
        { label: 'Community', to: '/' },
        { label: 'Contact', to: '/' },
    ],
};

export default function Footer() {
    return (
        <footer className="border-t border-[#99d19c]/25 dark:border-[#79c7c5]/10 mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-xl bg-[#000501] dark:bg-[#99d19c] flex items-center justify-center">
                                <MapPin size={16} className="text-[#ade1e5] dark:text-[#000501]" />
                            </div>
                            <span className="text-xl font-black tracking-tight text-[#000501] dark:text-[#ade1e5]">
                                Renti<span className="text-[#73ab84] dark:text-[#99d19c]">GO</span>
                            </span>
                        </Link>
                        <p className="text-sm text-[#73ab84] dark:text-[#79c7c5] leading-relaxed max-w-[200px]">
                            The hyperlocal rental marketplace. Borrow anything from people around you.
                        </p>
                        <div className="flex items-center gap-3 mt-5">
                            {[
                                { Icon: Twitter, href: '#', label: 'Twitter' },
                                { Icon: Instagram, href: '#', label: 'Instagram' },
                                { Icon: Github, href: '#', label: 'GitHub' },
                            ].map(({ Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="w-9 h-9 rounded-xl border border-[#99d19c]/40 dark:border-[#79c7c5]/20 flex items-center justify-center text-[#73ab84] dark:text-[#79c7c5] hover:bg-[#73ab84]/10 dark:hover:bg-[#79c7c5]/10 hover:border-[#73ab84] dark:hover:border-[#79c7c5]/40 transition-all duration-200"
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link groups */}
                    {Object.entries(FOOTER_LINKS).map(([group, links]) => (
                        <div key={group}>
                            <h4 className="text-sm font-bold text-[#000501] dark:text-[#ade1e5] mb-4 tracking-wide uppercase text-xs">
                                {group}
                            </h4>
                            <ul className="flex flex-col gap-2.5">
                                {links.map(({ label, to }) => (
                                    <li key={label}>
                                        <Link
                                            to={to}
                                            className="text-sm text-[#73ab84] dark:text-[#79c7c5] hover:text-[#000501] dark:hover:text-[#ade1e5] transition-colors duration-150 font-medium"
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-6 border-t border-[#99d19c]/20 dark:border-[#79c7c5]/8 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p className="text-xs text-[#73ab84] dark:text-[#79c7c5]">
                        © 2026 RentiGO. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="text-xs text-[#73ab84] dark:text-[#79c7c5] hover:text-[#000501] dark:hover:text-[#ade1e5] transition-colors">Privacy Policy</a>
                        <a href="#" className="text-xs text-[#73ab84] dark:text-[#79c7c5] hover:text-[#000501] dark:hover:text-[#ade1e5] transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
