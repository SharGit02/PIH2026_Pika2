import React, { useState, useEffect } from 'react';

export function Navbar() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Check initial user preference or stored value
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            setIsDark(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDark(false);
        }
    }, []);

    const toggleDarkMode = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            setIsDark(true);
        }
    };

    return (
        <nav className="fixed w-full z-10 transition-colors duration-300 border-b" style={{ backgroundColor: 'var(--nav-bg)', borderColor: 'var(--border-color)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <span className="text-2xl font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>
                            BorrowNear
                        </span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full font-bold transition-all"
                            style={{ backgroundColor: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)' }}
                        >
                            {isDark ? 'Light Mode' : 'Dark Mode'}
                        </button>
                        <button
                            className="px-4 py-2 rounded-lg font-bold transition-transform hover:scale-105"
                            style={{ backgroundColor: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)' }}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
