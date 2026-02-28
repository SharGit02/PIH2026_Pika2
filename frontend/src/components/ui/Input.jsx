import React from 'react';

/**
 * Input component
 * Supports: label, error, hint, prefix icon, and all standard input props
 */
export default function Input({
    label,
    error,
    hint,
    icon: Icon,
    className = '',
    containerClassName = '',
    id,
    ...props
}) {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
            {label && (
                <label
                    htmlFor={inputId}
                    className="text-sm font-semibold text-[#000501] dark:text-[#ade1e5] select-none"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#73ab84] dark:text-[#79c7c5] pointer-events-none">
                        <Icon size={18} />
                    </div>
                )}
                <input
                    id={inputId}
                    className={`
            w-full rounded-xl border px-4 py-3 text-sm font-medium
            bg-white/70 dark:bg-[#000501]/60
            text-[#000501] dark:text-[#ade1e5]
            placeholder:text-[#73ab84]/60 dark:placeholder:text-[#79c7c5]/40
            border-[#99d19c]/60 dark:border-[#79c7c5]/25
            backdrop-blur-sm
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-[#79c7c5]/60 focus:border-[#79c7c5]
            dark:focus:ring-[#79c7c5]/40 dark:focus:border-[#79c7c5]/60
            ${error ? 'border-red-400 focus:ring-red-300' : ''}
            ${Icon ? 'pl-10' : ''}
            ${className}
          `}
                    {...props}
                />
            </div>
            {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
            {hint && !error && <p className="text-xs text-[#73ab84] dark:text-[#79c7c5]">{hint}</p>}
        </div>
    );
}
