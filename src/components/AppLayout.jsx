import TodoColumn from '../features/boards/TodoColumn';

function AppLayout() {
  return (
    <div className="flex h-full flex-col bg-slate-100 px-7">
      {/* Boards title */}
      <h1 className="py-4 text-3xl font-bold">Boards</h1>
      {/* Boards */}
      <div className="shrin flex basis-full items-start gap-10">
        <TodoColumn />
        <TodoColumn />
        <TodoColumn />
      </div>
    </div>
  );
}

export default AppLayout;
