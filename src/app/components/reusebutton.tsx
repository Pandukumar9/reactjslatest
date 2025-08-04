// components/ReuseButton.tsx

import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string; // dynamic Tailwind styles
  type?: 'button' | 'submit' | 'reset';
}

export default function ReuseButton({
  label,
  onClick,
  className = '',
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded text-white font-medium shadow ${className}`}
    >
      {label}
    </button>
  );
}
