'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

import { authenticate } from '../lib/actions/auth';
import { cn } from '../utils/client';
import Button from './button';

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, null);

  return (
    <div className="max-w-[420px] w-full flex flex-col">
      <h5 className="mb-10 text-lg font-bold leading-6">Sign in to your account</h5>
      <div
        className={cn(
          'flex flex-row space-x-2 items-center',
          'px-4 py-2 rounded-lg mb-6',
          'text-blue-300 bg-blue-800'
        )}
      >
        <ExclamationCircleIcon className="size-5 text-inherit" />
        <p>
          Use <strong>test001</strong> with password <strong>password</strong>
        </p>
      </div>

      {/* INPUT FORM SECTION */}
      <form action={dispatch}>
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className={cn(
              'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg',
              'focus:right-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700',
              'dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            )}
            placeholder="Username"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={cn(
              'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg',
              'focus:right-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700',
              'dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            )}
            placeholder="Password"
            required
          />
        </div>

        <LoginButton />

        {/* ERROR MESSAGE SECTION */}
        <div className="flex items-end h-8 space-x-1" aria-live="polite" aria-atomic="true">
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="text-red-500 size-5" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      aria-disabled={pending}
      className="w-full text-gray-800 bg-white hover:bg-gray-400 hover:text-gray-800"
      type="submit"
    >
      Sign in
      {pending && (
        <output className="ml-2">
          <svg
            aria-hidden="true"
            className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </output>
      )}
    </Button>
  );
}
