import { cn } from '../../utils/client';
import type { ClassValue } from 'clsx';

type Props = {
  title: string;
  body: React.ReactNode;
  buttonToggle: React.ReactNode;
  isOpen: boolean;
  handleToggle: VoidFunction;
  className?: ClassValue;
};

export default function Modal({
  title,
  body,
  buttonToggle,
  isOpen,
  handleToggle,
  className,
}: Readonly<Props>) {
  return (
    <>
      {/* MODAL TOGGLE */}
      <button
        data-modal-target="main-modal"
        data-modal-toggle="main-modal"
        className={cn(
          'block text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center',
          'hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300',
          'dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
          className
        )}
        type="button"
        onClick={handleToggle}
      >
        {buttonToggle}
      </button>

      {/* MAIN MODAL */}
      <div
        id="main-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={cn(
          'w-full md:inset-0 h-[calc(100%-1rem)] max-h-full',
          'fixed top-0 right-0 left-0 z-50',
          'hidden overflow-y-auto overflow-x-hidden',
          {
            block: isOpen,
          }
        )}
      >
        <div className={cn('relative p-4 w-full max-w-md max-h-full mx-auto')}>
          {/* MODAL CONTENT */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
              <button
                type="button"
                className={cn(
                  'w-8 h-8',
                  'end-2.5 text-gray-400 bg-transparent rounded-lg text-sm ms-auto inline-flex justify-center items-center',
                  'dark:hover:bg-gray-600 dark:hover:text-white',
                  'hover:bg-gray-200 hover:text-gray-900 '
                )}
                data-modal-hide="main-modal"
                onClick={handleToggle}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="p-4 md:p-5">{body}</div>
          </div>
        </div>
      </div>
    </>
  );
}
