import React from 'react';

/**
 * Button component
 * variants: 'primary' | 'secondary' | 'outline' | 'ghost'
 * sizes: 'sm' | 'md' | 'lg'
 */
export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    loading = false,
    onClick,
    type = 'button',
    ...props
}) {
    const base =
        'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97]';

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    const variants = {
        primary:
            'bg-brand-dark text-brand-frost shadow-lg shadow-black/20 hover:bg-brand-dark/90 hover:shadow-xl focus-visible:ring-brand-teal dark:bg-brand-green dark:text-brand-dark dark:hover:bg-brand-green/90 dark:shadow-brand-green/20',
        secondary:
            'bg-brand-aqua text-brand-dark shadow-md shadow-brand-aqua/20 hover:bg-brand-aqua/90 hover:shadow-lg focus-visible:ring-brand-aqua',
        outline:
            'border-2 border-brand-teal/30 text-brand-dark bg-transparent hover:bg-brand-teal/5 focus-visible:ring-brand-teal dark:border-brand-aqua/30 dark:text-brand-frost dark:hover:bg-brand-aqua/5',
        ghost:
            'text-brand-teal bg-transparent hover:bg-brand-teal/5 focus-visible:ring-brand-teal dark:text-brand-aqua dark:hover:bg-brand-aqua/5',
    };

    return (
        <button
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
            {...props}
        >
            {loading && (
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
            )}
            {children}
        </button>
    );
}
