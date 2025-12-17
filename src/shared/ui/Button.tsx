import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[#C8FF00] text-black border-none shadow-[0_4px_12px_rgba(200,255,0,0.3)] hover:bg-[#B3E600] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(200,255,0,0.4)] focus:ring-[#C8FF00]',
    secondary: 'bg-transparent text-[#1A4D2E] border-2 border-[#1A4D2E] hover:bg-[#1A4D2E] hover:text-white focus:ring-[#1A4D2E]',
    outline: 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-[#1A4D2E] focus:ring-white',
  };

  const sizes = {
    sm: 'px-6 py-2.5 text-sm',
    md: 'px-8 py-3.5 text-base',
    lg: 'px-10 py-4 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
}
