import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'neonAccent' | 'dark';
}

export default function Card({ 
  children, 
  className = '', 
  onClick,
  variant = 'default'
}: CardProps) {
  const variants = {
    default: 'bg-white border border-[#E0E0E0] shadow-[0_4px_12px_rgba(0,0,0,0.08)]',
    neonAccent: 'bg-[#C8FF00] text-black shadow-[0_8px_24px_rgba(200,255,0,0.2)]',
    dark: 'bg-[#1A4D2E] text-white shadow-[0_8px_24px_rgba(0,0,0,0.3)]',
  };

  return (
    <div
      className={`rounded-2xl p-8 transition-all duration-300 ${
        onClick ? 'cursor-pointer hover:scale-105 hover:-translate-y-1' : ''
      } ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
