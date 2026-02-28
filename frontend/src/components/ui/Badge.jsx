import React from 'react';

/**
 * Badge component
 * variants: 'default' | 'success' | 'warning' | 'error' | 'info'
 */
export default function Badge({ children, variant = 'default', className = '' }) {
    const base = 'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide';

    const variants = {
        default:
            'bg-brand-green/20 text-brand-dark dark:bg-brand-green/10 dark:text-brand-green',
        success:
            'bg-emerald-100/80 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
        warning:
            'bg-amber-100/80 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
        error:
            'bg-red-100/80 text-red-800 dark:bg-red-900/30 dark:text-red-300',
        info:
            'bg-brand-aqua/20 text-brand-dark dark:bg-brand-aqua/10 dark:text-brand-aqua',
        pending:
            'bg-amber-100/80 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
        approved:
            'bg-emerald-100/80 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
        returned:
            'bg-brand-aqua/20 text-brand-dark dark:bg-brand-aqua/10 dark:text-brand-aqua',
    };

    return (
        <span className={`${base} ${variants[variant] || variants.default} ${className}`}>
            {children}
        </span>
    );
}
