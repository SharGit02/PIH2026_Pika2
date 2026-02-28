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
            'bg-[#000501] text-[#ade1e5] shadow-lg shadow-black/20 hover:bg-[#0f1f14] hover:shadow-xl hover:shadow-black/30 focus-visible:ring-[#79c7c5] dark:bg-[#99d19c] dark:text-[#000501] dark:hover:bg-[#7dc47f] dark:shadow-[#99d19c]/20',
        secondary:
            'bg-[#79c7c5] text-[#000501] shadow-md shadow-[#79c7c5]/25 hover:bg-[#60b5b3] hover:shadow-lg focus-visible:ring-[#79c7c5]',
        outline:
            'border-2 border-[#73ab84] text-[#000501] bg-transparent hover:bg-[#73ab84]/10 focus-visible:ring-[#73ab84] dark:border-[#79c7c5] dark:text-[#ade1e5] dark:hover:bg-[#79c7c5]/10',
        ghost:
            'text-[#73ab84] bg-transparent hover:bg-[#73ab84]/10 focus-visible:ring-[#73ab84] dark:text-[#ade1e5] dark:hover:bg-[#ade1e5]/10',
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
