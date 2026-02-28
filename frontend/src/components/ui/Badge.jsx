import React from 'react';

/**
 * Badge component
 * variants: 'default' | 'success' | 'warning' | 'error' | 'info'
 */
export default function Badge({ children, variant = 'default', className = '' }) {
    const base = 'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide';

    const variants = {
        default:
            'bg-[#99d19c]/20 text-[#2d6b3a] dark:bg-[#99d19c]/15 dark:text-[#99d19c]',
        success:
            'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
        warning:
            'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
        error:
            'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
        info:
            'bg-[#79c7c5]/20 text-[#1a6a6a] dark:bg-[#79c7c5]/15 dark:text-[#79c7c5]',
        pending:
            'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
        approved:
            'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
        returned:
            'bg-[#79c7c5]/20 text-[#1a6a6a] dark:bg-[#79c7c5]/15 dark:text-[#79c7c5]',
    };

    return (
        <span className={`${base} ${variants[variant] || variants.default} ${className}`}>
            {children}
        </span>
    );
}
