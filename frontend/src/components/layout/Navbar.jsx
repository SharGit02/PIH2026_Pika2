import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, MapPin, LayoutDashboard, LogIn, Package } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';
import Button from '../ui/Button.jsx';

const NAV_LINKS = [
    { label: 'Browse', to: '/browse', icon: Package },
    { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
];

export default function Navbar() {
    const { isDark, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => { setMobileOpen(false); }, [location.pathname]);

    const isActive = (to) => location.pathname === to;

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'glass-nav shadow-sm' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 group"
                        aria-label="RentiGO Home"
                    >
                        <div className="w-8 h-8 rounded-xl bg-[#000501] dark:bg-[#99d19c] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
                            <MapPin size={16} className="text-[#ade1e5] dark:text-[#000501]" />
                        </div>
                        <span className="text-xl font-black tracking-tight text-[#000501] dark:text-[#ade1e5]">
                            Renti<span className="text-[#73ab84] dark:text-[#99d19c]">GO</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {NAV_LINKS.map(({ label, to, icon: Icon }) => (
                            <Link
                                key={to}
                                to={to}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive(to)
                                        ? 'bg-[#000501]/8 text-[#000501] dark:bg-[#99d19c]/15 dark:text-[#99d19c]'
                                        : 'text-[#3d6b50] hover:bg-[#73ab84]/10 hover:text-[#000501] dark:text-[#79c7c5] dark:hover:bg-[#79c7c5]/10 dark:hover:text-[#ade1e5]'
                                    }`}
                            >
                                <Icon size={16} />
                                {label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2">
                        {/* Dark mode toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl text-[#73ab84] hover:bg-[#73ab84]/12 dark:text-[#79c7c5] dark:hover:bg-[#79c7c5]/12 transition-all duration-200"
                            aria-label="Toggle dark mode"
                        >
                            {isDark ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        {/* Login – desktop only */}
                        <div className="hidden md:block">
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => navigate('/login')}
                            >
                                <LogIn size={15} />
                                Login
                            </Button>
                        </div>

                        {/* Mobile menu toggle */}
                        <button
                            onClick={() => setMobileOpen(prev => !prev)}
                            className="md:hidden p-2.5 rounded-xl text-[#73ab84] hover:bg-[#73ab84]/12 dark:text-[#79c7c5] transition-all"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden glass-nav border-t border-[#99d19c]/20 dark:border-[#79c7c5]/10 px-4 pb-4 pt-2 animate-fade-up">
                    <nav className="flex flex-col gap-1">
                        {NAV_LINKS.map(({ label, to, icon: Icon }) => (
                            <Link
                                key={to}
                                to={to}
                                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive(to)
                                        ? 'bg-[#000501]/8 text-[#000501] dark:bg-[#99d19c]/15 dark:text-[#99d19c]'
                                        : 'text-[#3d6b50] hover:bg-[#73ab84]/10 dark:text-[#79c7c5] dark:hover:bg-[#79c7c5]/10'
                                    }`}
                            >
                                <Icon size={16} /> {label}
                            </Link>
                        ))}
                        <Button
                            variant="primary"
                            size="sm"
                            className="mt-2 w-full"
                            onClick={() => navigate('/login')}
                        >
                            <LogIn size={15} /> Login
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    );
}
