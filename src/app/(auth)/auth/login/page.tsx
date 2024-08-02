import { Metadata } from 'next';

import Image from '@/app/ui/image';
import { cn } from '@/app/utils/client';
import LoginForm from '@/app/ui/login-form';

export const metadata: Metadata = {
  title: 'Sign In',
};

export default function Page() {
  return (
    <main className="container h-screen py-16">
      <div className="flex flex-row items-center h-full">
        {/* PARAGRAPH SECTION */}
        <div className="flex-col hidden h-full px-6 md:flex">
          <div className="flex flex-col items-center justify-center flex-1 space-y-4">
            <h3 className="text-3xl font-bold leading-6">Hi Welcome back</h3>

            <p className="text-base font-normal text-center">
              Login in to access your account and get back to where you left off.
            </p>
          </div>

          <Image
            src="/illustration_login.png"
            alt="Login account"
            className="flex-[0.3]"
            fill
            style={{ objectPosition: 'center' }}
            sizes="(min-width: 1024px) 432px, 100%"
          />
        </div>

        <div
          className={cn(
            'flex flex-auto items-center justify-center',
            'md:px-0 md:py-[calc(72px+24px)]'
          )}
        >
          {/* LOGIN FORM SECTION */}
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
