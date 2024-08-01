import Calendar from '../../ui/todo/calendar';

export default async function Page() {
  // FETCHING ALL TODO FROM API USING DATA FETCHING
  const todos = await [];

  return (
    <div className="container py-9">
      <Calendar events={todos} />
    </div>
  );
}
