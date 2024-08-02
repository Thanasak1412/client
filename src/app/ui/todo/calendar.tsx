'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { type EventClickArg } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin from '@fullcalendar/interaction';
import { PlusIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

import { toast } from 'react-toastify';

import { CalendarForm } from '../calendar';
import Modal from './modal';
import {
  createTodo,
  deleteTodo,
  getTodoById,
  TodoItem,
  updateTodo,
  type State,
} from '../../lib/actions/todo';
import { cn } from '../../utils/client';

type CalendarState = {
  events: TodoItem[];
  event: TodoItem | null;
  isOpenModal: boolean;
  selectedEventId: null | string;
};

const initialState: CalendarState = {
  events: [],
  event: null,
  isOpenModal: false,
  selectedEventId: null,
};

export default function Calendar({ events }: Readonly<{ events: CalendarState['events'] }>) {
  const [calendar, setCalendar] = useState({ ...initialState, events });

  const formRef = useRef<HTMLFormElement>(null);

  const notifySuccess = (action: string) =>
    toast(
      <div className="flex flex-row items-center space-x-2">
        <CheckCircleIcon className="text-green-500 size-4" />{' '}
        <h2 className="text-sm">{action} success!</h2>
      </div>
    );

  const handleSelectDate = () => {
    setCalendar((prev) => ({
      ...prev,
      isOpenModal: true,
      selectedEventId: null,
    }));

    formRef.current?.reset();
  };

  const handleToggleModal = () => {
    setCalendar((prev) => ({
      ...prev,
      isOpenModal: !prev.isOpenModal,
    }));

    if (!calendar.selectedEventId) {
      formRef.current?.reset();
    }
  };

  const handleFormAction = useCallback(
    async (_prevState: State, formData: FormData) => {
      const res = await (!calendar.selectedEventId
        ? createTodo(_prevState, formData)
        : updateTodo(calendar.selectedEventId, formData));

      if (!Object.keys(res?.errors ?? {}).length) {
        handleToggleModal();

        notifySuccess(res?.message ?? 'Saved');

        formRef.current?.reset();
      }

      return res;
    },
    [calendar]
  );

  const handleDeleteAction = async () => {
    const isSuccess = await deleteTodo.bind(null, calendar.selectedEventId ?? '')();

    if (isSuccess) {
      handleToggleModal();

      notifySuccess('Deleted');

      formRef.current?.reset();
    }
  };

  const handleSelectEvent = (arg: EventClickArg) => {
    setCalendar((prev) => ({ ...prev, selectedEventId: arg.event.id, isOpenModal: true }));
  };

  const getTodoItem = useCallback(async () => {
    if (calendar.selectedEventId) {
      const todo = await getTodoById(calendar.selectedEventId);

      setCalendar((prev) => ({
        ...prev,
        event: todo,
      }));
    }
  }, [calendar.selectedEventId]);

  useEffect(() => {
    getTodoItem();
  }, [calendar.selectedEventId, getTodoItem]);

  // * to set events to setCalendar state, when events changed.
  useEffect(() => {
    setCalendar((prev) => ({
      ...prev,
      events,
    }));
  }, [events]);

  return (
    <div className="w-[calc(100%-2px)] -ml-1 -mb-1">
      <Modal
        isOpen={calendar.isOpenModal}
        handleToggle={handleToggleModal}
        title={`${!calendar.selectedEventId ? 'Add' : 'Edit'} todo`}
        body={
          <CalendarForm
            handleFormAction={handleFormAction}
            handleCancel={handleToggleModal}
            handleDelete={handleDeleteAction}
            ref={formRef}
            todoItem={calendar.event}
          />
        }
        buttonToggle={
          <div className="flex flex-row space-x-2">
            <PlusIcon className="text-black size-5" />
            <p>New Event</p>
          </div>
        }
        className="ml-auto"
      />

      <div
        className={cn(
          'relative shadow-md min-h-[50vh] flex flex-col flex-auto',
          'rounded-2xl overflow-hidden bg-[#1C252E] text-white',
          'mt-6 p-4'
        )}
      >
        <FullCalendar
          weekends
          editable
          selectable
          events={calendar.events}
          initialView="dayGridMonth"
          initialDate={new Date()}
          eventDisplay="block"
          dateClick={handleSelectDate}
          eventClick={handleSelectEvent}
          height="auto"
          plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
        />
      </div>
    </div>
  );
}
