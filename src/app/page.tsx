import NextLink from 'next/link';

import Image from './ui/image';
import { cn } from './utils/client';

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen p-24 md:justify-between">
      <h2 className="text-2xl font-bold text-center md:text-4xl">TODO LIST</h2>

      <div className="flex flex-row items-center justify-between w-full mt-4">
        <Image
          src="/illustration_dashboard.png"
          alt="Illustration of the todo"
          fill
          style={{ objectPosition: 'top' }}
          sizes="(min-width: 1024px) 1000px, 100%"
          className="flex-1"
        />

        <NextLink
          href="/auth/login"
          className={cn(
            'rounded-lg border-0 h-12 align-middle text-base',
            'inline-flex items-center justify-center',
            'hover:shadow-md py-2 px-4 text-gray-800 bg-white hover:bg-gray-400',
            "flex-[0.2]"
          )}
        >
          Get Started
        </NextLink>
      </div>
    </main>
  );
}
