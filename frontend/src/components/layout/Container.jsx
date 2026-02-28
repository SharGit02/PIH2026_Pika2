import React from 'react';

/**
 * Container – max-width wrapper with consistent horizontal padding
 */
export default function Container({ children, className = '' }) {
    return (
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
            {children}
        </div>
    );
}
