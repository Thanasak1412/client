import NextImage, { ImageProps } from 'next/image';

import { cn } from '../utils/client';

interface Props extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  alt?: string;
  className: string;
}

export default function Image({ src, alt = '', className, ...other }: Readonly<Props>) {
  return (
    <div className={cn('relative w-full pb-[56.25%]', className)}>
      <NextImage src={src} alt={alt} style={{ objectFit: 'cover', ...other.style }} {...other} />
    </div>
  );
}
