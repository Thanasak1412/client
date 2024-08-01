'use client';

import { type EventSourceInput, EventClickArg } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin, { type DateClickArg } from '@fullcalendar/interaction';
import { PlusIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

import { useState } from 'react';
import { toast } from 'react-toastify';

import { CalendarForm } from '../calendar';
import Modal from './modal';
import { createTodo, State } from '../../lib/actions/todo';
import { cn } from '../../utils/client';

type CalendarState = {
  events: EventSourceInput;
  isOpenModal: boolean;
  selectedEventId: null | string;
};

const initialState: CalendarState = {
  events: [],
  isOpenModal: false,
  selectedEventId: null,
};

export default function Calendar({ events }: Readonly<{ events: CalendarState['events'] }>) {
  const [calendar, setCalendar] = useState({ ...initialState, events });

  const notifySuccess = () =>
    toast(
      <div className="flex flex-row items-center space-x-2">
        <CheckCircleIcon className="text-green-500 size-4" />{' '}
        <h2 className="text-sm">Create success!</h2>
      </div>
    );

  const handleSelectEvent = (arg: DateClickArg) => {
    setCalendar((prev) => ({
      ...prev,
      isOpenModal: true,
      selectedEventId: arg.dateStr, // * refer date string is an id
    }));
  };

  const handleToggleModal = () => {
    setCalendar((prev) => ({
      ...prev,
      isOpenModal: !prev.isOpenModal,
    }));
  };

  const handleFormAction = async (_prevState: State, formData: FormData) => {
    const res = await createTodo(_prevState, formData);

    if (!Object.keys(res?.errors ?? {}).length) {
      handleToggleModal();

      notifySuccess();
    }

    return res;
  };

  return (
    <div className="w-[calc(100%-2px)] -ml-1 -mb-1">
      <Modal
        isOpen={calendar.isOpenModal}
        handleToggle={handleToggleModal}
        title={`${!calendar.selectedEventId ? 'Add' : 'Edit'} todo`}
        body={
          <CalendarForm
            handleFormAction={handleFormAction}
            handleCancel={() => console.log('cancel')}
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
          dateClick={handleSelectEvent}
          height="auto"
          plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
        />
      </div>
    </div>
  );
}
