'use client';

import { type ButtonHTMLAttributes } from 'react';
import { cn } from '../utils/client';

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {
  disabled?: boolean;
}

export default function Button({
  children,
  className,
  disabled = false,
  ...other
}: Readonly<Props>) {
  return (
    <button
      type="button"
      className={cn(
        'rounded-lg border-0 h-12 align-middle cursor-pointer inline-flex items-center justify-center',
        'hover:shadow-md py-2 px-4',
        className
      )}
      disabled={disabled}
      {...other}
    >
      {children}
    </button>
  );
}
