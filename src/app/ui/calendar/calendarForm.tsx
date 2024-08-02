'use client';

import { useFormState } from 'react-dom';
import { forwardRef } from 'react';

import { TrashIcon } from '@heroicons/react/24/solid';
import { type TodoItem, type State } from '@/app/lib/actions/todo';

type TError = {
  message: string;
  errors?: Record<string, string[]>;
};

type Props = {
  handleCancel: VoidFunction;
  handleFormAction: (_prevState: State, formDate: FormData) => Promise<TError>;
  handleDelete: () => Promise<void>;
  todoItem: TodoItem | null;
};

const initialState: { message: string; errors: {} } = {
  errors: {},
  message: '',
};

const CalendarForm = forwardRef<HTMLFormElement, Readonly<Props>>(
  ({ handleCancel, handleFormAction, handleDelete, todoItem }, ref) => {
    const [state, dispatch] = useFormState(handleFormAction, initialState);

    return (
      <>
        <form className="max-w-sm mx-auto" action={dispatch} ref={ref}>
          <div className="space-y-6">
            <div className="mb-5">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>
              <input
                defaultValue={todoItem?.title}
                type="text"
                id="title"
                name="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Title"
                required
              />

              {/* ERRORS TITLE SECTION */}
              <div id="status-error" aria-live="polite" aria-atomic="true">
                {state.errors?.title?.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <input
                defaultValue={todoItem?.description}
                type="text"
                id="description"
                name="description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />

              {/* ERRORS DESCRIPTION SECTION */}
              <div id="status-error" aria-live="polite" aria-atomic="true">
                {state.errors?.description?.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* FORM ACTION SECTION */}
          <div className="flex flex-row items-center justify-between mt-6">
            {/* DELETE BUTTON */}
            {todoItem && (
              <button type="submit" form="delete-form">
                <TrashIcon className="text-gray-500 size-5" />
              </button>
            )}

            <div className="flex flex-row space-x-4 ml-auto">
              <button
                className="rounded-md py-1.5 px-3 bg-white text-black text-sm min-h-9"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md py-1.5 px-3 bg-black text-white text-sm min-h-9"
              >
                Save changes
              </button>
            </div>
          </div>
        </form>

        {/* DELETE ACTION FORM SECTION */}
        <form action={handleDelete} id="delete-form" />
      </>
    );
  }
);

CalendarForm.displayName = 'CalendarForm';

export default CalendarForm;
