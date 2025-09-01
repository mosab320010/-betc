
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'sm' | 'md' | 'icon';
}

export function Button({ className, variant = 'default', size = 'md', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    default: 'bg-zinc-900 text-white hover:bg-zinc-800 focus-visible:ring-zinc-900',
    outline: 'border border-zinc-300 bg-transparent hover:bg-zinc-100 focus-visible:ring-zinc-400',
    secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 focus-visible:ring-zinc-400'
  };
  
  const sizes = {
    sm: 'h-9 px-3',
    md: 'h-10 px-4 py-2',
    icon: 'h-10 w-10'
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
