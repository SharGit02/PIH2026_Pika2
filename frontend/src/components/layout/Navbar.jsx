import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Sun, Moon, Menu, X, MapPin, LayoutDashboard, LogIn, Package,
    Search, Clock, Plus, Bell, MessageSquare, User, Heart, Settings, LogOut, ChevronDown
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useRental } from '../../context/RentalContext.jsx';
import Button from '../ui/Button.jsx';
import Badge from '../ui/Badge.jsx';

const RENTER_LINKS = [
    { label: 'Browse Gear', to: '/browse', icon: Search },
    { label: 'My Bookings', to: '/my-bookings', icon: Clock },
];

const LENDER_LINKS = [
    { label: 'My Listings', to: '/my-listings', icon: Package },
    { label: 'List an Item', to: '/list-item', icon: Plus },
    { label: 'My Earnings', to: '/earnings', icon: LayoutDashboard },
];

export default function Navbar() {
    const { isDark, toggleTheme } = useTheme();
    const { userRole, toggleRole, userProfile, notifications } = useRental();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const unreadCount = notifications.filter(n => !n.read).length;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close menus on route change
    useEffect(() => {
        setMobileOpen(false);
        setProfileOpen(false);
    }, [location.pathname]);

    const isActive = (to) => location.pathname === to;
    const navLinks = userRole === 'renter' ? RENTER_LINKS : LENDER_LINKS;

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? 'glass-nav shadow-2xl py-2 scale-[0.98] mt-2 w-[98%] mx-auto rounded-[2rem]' : 'bg-transparent py-4 mx-auto w-full'}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-2.5 group shrink-0"
                        aria-label="RentiGO Home"
                    >
                        <div className="w-10 h-10 rounded-2xl bg-brand-dark dark:bg-brand-green flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <MapPin size={20} className="text-brand-frost dark:text-brand-dark" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-brand-dark dark:text-brand-frost hidden xs:block uppercase">
                            Renti<span className="text-brand-green">GO</span>
                        </span>
                    </Link>

                    {/* Role Switcher (Desktop) */}
                    <div className="hidden lg:flex items-center bg-brand-dark/5 dark:bg-white/5 p-1 rounded-2xl mx-8 shadow-inner border border-brand-teal/5">
                        <button
                            onClick={() => userRole !== 'renter' && toggleRole()}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${userRole === 'renter'
                                ? 'bg-brand-dark text-white dark:bg-brand-green dark:text-brand-dark shadow-xl'
                                : 'text-brand-dark/40 dark:text-brand-frost/40 hover:text-brand-dark'}`}
                        >
                            Borrowing
                        </button>
                        <button
                            onClick={() => userRole !== 'lender' && toggleRole()}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${userRole === 'lender'
                                ? 'bg-brand-dark text-white dark:bg-brand-green dark:text-brand-dark shadow-xl'
                                : 'text-brand-dark/40 dark:text-brand-frost/40 hover:text-brand-dark'}`}
                        >
                            Lending
                        </button>
                    </div>

                    {/* Desktop Center Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map(({ label, to, icon: Icon }) => (
                            <Link
                                key={to}
                                to={to}
                                className={`flex items-center gap-2 justify-center h-10 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${isActive(to)
                                    ? 'text-brand-green bg-brand-green/5'
                                    : 'text-brand-teal/60 hover:text-brand-dark dark:text-brand-frost/60 dark:hover:text-brand-frost'
                                    }`}
                            >
                                <Icon size={16} />
                                {label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2">
                        <div className="items-center gap-2 hidden sm:flex">
                            <button
                                onClick={() => navigate('/messages')}
                                className="p-2.5 rounded-2xl text-brand-teal hover:bg-brand-teal/5 relative group transition-all duration-300"
                                aria-label="Inbox"
                            >
                                <MessageSquare size={20} className="group-hover:scale-110 transition-transform" />
                            </button>

                            <button
                                onClick={() => navigate('/notifications')}
                                className="p-2.5 rounded-2xl text-brand-teal hover:bg-brand-teal/5 relative group transition-all duration-300"
                                aria-label="Notifications"
                            >
                                <Bell size={20} className="group-hover:rotate-12 transition-transform" />
                                {unreadCount > 0 && (
                                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-green border-2 border-white dark:border-brand-dark shadow-brand-green/40 shadow-xl" />
                                )}
                            </button>

                            <button
                                onClick={toggleTheme}
                                className="p-2.5 rounded-2xl text-brand-teal hover:bg-brand-teal/5 dark:text-brand-aqua dark:hover:bg-brand-aqua/10 transition-all duration-300"
                                aria-label="Toggle Theme"
                            >
                                {isDark ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                        </div>

                        {/* User Profile Dropdown */}
                        <div className="relative ml-2">
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className={`flex items-center gap-2 p-1.5 pl-3 rounded-2xl transition-all ${profileOpen ? 'bg-brand-dark text-white dark:bg-brand-green dark:text-brand-dark' : 'glass-card hover:bg-brand-teal/5'}`}
                            >
                                <div className="hidden xs:block">
                                    <div className={`text-[9px] font-black uppercase tracking-tight text-right ${profileOpen ? 'text-white/60 dark:text-brand-dark/60' : 'text-brand-teal/40'}`}>Verified Neighbour</div>
                                    <div className="text-[11px] font-black uppercase tracking-tighter leading-none">{userProfile.name.split(' ')[0]}</div>
                                </div>
                                <div className="w-8 h-8 rounded-xl overflow-hidden shadow-xl shrink-0 group">
                                    <img src={userProfile.avatar} alt="" className="w-full h-full object-cover bg-white" />
                                </div>
                                <ChevronDown size={14} className={`hidden xs:block transition-transform duration-300 ${profileOpen && 'rotate-180'}`} />
                            </button>

                            {profileOpen && (
                                <div className="absolute right-0 mt-4 w-64 glass-nav shadow-2xl rounded-[2.5rem] border border-brand-teal/5 p-4 animate-fade-down overflow-hidden z-[101]">
                                    <div className="flex flex-col gap-1">
                                        {[
                                            { icon: User, label: 'My Profile', to: '/profile' },
                                            { icon: Heart, label: 'Wishlist', to: '/wishlist' },
                                            { icon: LogIn, label: 'Switch Account', to: '/login' },
                                        ].map((link, i) => (
                                            <Link
                                                key={i}
                                                to={link.to}
                                                className="flex items-center gap-4 p-4 rounded-2xl text-xs font-black uppercase tracking-widest text-brand-teal/60 hover:text-brand-dark dark:hover:text-brand-frost hover:bg-brand-teal/5 transition-all"
                                            >
                                                <link.icon size={18} /> {link.label}
                                            </Link>
                                        ))}
                                        <div className="h-px bg-brand-teal/5 my-2 mx-4" />
                                        <button className="flex items-center gap-4 p-4 rounded-2xl text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10 transition-all">
                                            <LogOut size={18} /> Sign Out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2.5 rounded-2xl text-brand-teal hover:bg-brand-teal/10 ml-1"
                        >
                            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden glass-nav border-t border-brand-teal/10 p-6 animate-fade-in flex flex-col gap-6 shadow-2xl max-h-[85vh] overflow-y-auto w-[98%] mx-auto mt-2 rounded-[2rem]">
                    {/* Mobile Notification Hint */}
                    <div className="flex items-center justify-between px-4 py-4 rounded-3xl bg-brand-teal/5 border border-brand-teal/5">
                        <div className="flex items-center gap-4">
                            <Bell size={20} className="text-brand-teal" />
                            <span className="text-xs font-black uppercase tracking-wide">Notifications</span>
                        </div>
                        {unreadCount > 0 && <Badge variant="success" className="px-3 py-1 font-black leading-none !text-[10px]">{unreadCount} New</Badge>}
                    </div>

                    <div className="flex bg-brand-dark/5 dark:bg-white/5 p-1.5 rounded-[2rem] border border-brand-teal/5">
                        <button
                            onClick={toggleRole}
                            className={`flex-1 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all ${userRole === 'renter' ? 'bg-brand-dark text-white dark:bg-brand-green dark:text-brand-dark shadow-xl' : 'text-brand-teal/40'}`}
                        >
                            Borrowing
                        </button>
                        <button
                            onClick={toggleRole}
                            className={`flex-1 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all ${userRole === 'lender' ? 'bg-brand-dark text-white dark:bg-brand-green dark:text-brand-dark shadow-xl' : 'text-brand-teal/40'}`}
                        >
                            Lending
                        </button>
                    </div>

                    <nav className="flex flex-col gap-2">
                        {navLinks.map(({ label, to, icon: Icon }) => (
                            <Link
                                key={to}
                                to={to}
                                className={`flex items-center gap-4 p-5 rounded-[2rem] text-sm font-black uppercase tracking-widest ${isActive(to) ? 'bg-brand-green/10 text-brand-green' : 'text-brand-teal/60'}`}
                            >
                                <Icon size={20} /> {label}
                            </Link>
                        ))}
                        <Link
                            to="/wishlist"
                            className="flex items-center gap-4 p-5 rounded-[2rem] text-sm font-black uppercase tracking-widest text-brand-teal/60"
                        >
                            <Heart size={20} /> My Wishlist
                        </Link>
                        <Link
                            to="/messages"
                            className="flex items-center gap-4 p-5 rounded-[2rem] text-sm font-black uppercase tracking-widest text-brand-teal/60"
                        >
                            <MessageSquare size={20} /> Neighborhood Chat
                        </Link>
                        <Button
                            variant="primary"
                            size="lg"
                            className="mt-6 !rounded-[2.5rem] shadow-xl shadow-brand-green/20"
                            onClick={() => navigate('/profile')}
                        >
                            <User size={18} /> My Account
                        </Button>
                    </nav>

                    <div className="flex justify-center pt-4">
                        <button onClick={toggleTheme} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-teal/40">
                            {isDark ? <Sun size={14} /> : <Moon size={14} />} {isDark ? 'Light' : 'Dark'} Mode
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
