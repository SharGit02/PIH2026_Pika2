import React from 'react';

/* Skeleton shimmer for a single card */
function SkeletonCard() {
    return (
        <div className="glass-card rounded-2xl overflow-hidden animate-pulse">
            <div className="h-48 bg-[#99d19c]/20 dark:bg-[#73ab84]/10" />
            <div className="p-4 space-y-3">
                <div className="h-4 bg-[#99d19c]/25 dark:bg-[#73ab84]/15 rounded-lg w-3/4" />
                <div className="h-3 bg-[#99d19c]/20 dark:bg-[#73ab84]/10 rounded-lg w-1/2" />
                <div className="flex justify-between items-center pt-2">
                    <div className="h-6 bg-[#99d19c]/25 dark:bg-[#73ab84]/15 rounded-lg w-24" />
                    <div className="h-4 bg-[#99d19c]/20 dark:bg-[#73ab84]/10 rounded-full w-16" />
                </div>
            </div>
        </div>
    );
}

/** Loading skeleton grid */
export function LoadingGrid({ count = 8 }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: count }, (_, i) => <SkeletonCard key={i} />)}
        </div>
    );
}

/** Empty state */
export function EmptyState({ icon: Icon, title, description, action }) {
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center px-4">
            {Icon && (
                <div className="w-16 h-16 rounded-2xl bg-[#99d19c]/15 dark:bg-[#73ab84]/10 flex items-center justify-center mb-5">
                    <Icon size={28} className="text-[#73ab84] dark:text-[#79c7c5]" />
                </div>
            )}
            <h3 className="text-xl font-bold text-[#000501] dark:text-[#ade1e5] mb-2">{title}</h3>
            {description && (
                <p className="text-[#73ab84] dark:text-[#79c7c5] text-sm max-w-sm leading-relaxed">{description}</p>
            )}
            {action && <div className="mt-6">{action}</div>}
        </div>
    );
}

/** Error state */
export function ErrorState({ message, onRetry }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center px-4">
            <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
                <span className="text-2xl">⚠️</span>
            </div>
            <h3 className="text-lg font-bold text-[#000501] dark:text-[#ade1e5] mb-2">Something went wrong</h3>
            <p className="text-sm text-[#73ab84] dark:text-[#79c7c5] mb-5 max-w-xs">{message || 'Failed to load data. Please try again.'}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-5 py-2.5 bg-[#000501] dark:bg-[#99d19c] text-[#ade1e5] dark:text-[#000501] text-sm font-bold rounded-xl hover:opacity-90 transition-opacity"
                >
                    Try Again
                </button>
            )}
        </div>
    );
}
