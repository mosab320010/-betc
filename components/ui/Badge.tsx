
import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'outline';
    className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
    const variants = {
        default: 'bg-zinc-900 text-white',
        outline: 'bg-transparent text-zinc-900 border border-zinc-300',
    };
    
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
}
