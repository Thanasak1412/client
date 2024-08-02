import { Metadata } from 'next';

import Calendar from '../../../ui/todo/calendar';
import { getTodoList } from '../../../lib/actions/todo';

export const metadata: Metadata = {
  title: 'Todo',
};

export default async function Page() {
  // FETCHING ALL TODO FROM API USING DATA FETCHING
  const todos = await getTodoList();

  const newTodos = todos.map((todo) => ({
    ...todo,
    date: todo.created_at,
  }));

  return (
    <div className="container py-9">
      <Calendar events={newTodos} />
    </div>
  );
}
