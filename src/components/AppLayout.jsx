import TaskColumn from '../features/boards/TaskColumn';
import Task from './Task';

function AppLayout() {
  return (
    <div className="h-screen overflow-x-auto bg-gray-100 px-7 pb-7">
      {/* This outer wrapping is needed to maintain the right padding on 
      overflow */}
      <div className="h-full w-fit">
        {/* Boards title */}
        <h1 className="py-4 text-3xl font-bold">Boards</h1>
        {/* Boards */}
        <div className="flex h-[90%] items-start gap-10 overflow-hidden">
          <TaskColumn title="TODO" type="todo">
            <Task />
          </TaskColumn>
          <TaskColumn title="IN PROGRESS" type="in-progress">
            <Task />
            <Task />
          </TaskColumn>
          <TaskColumn title="DONE" type="done">
            <Task />
          </TaskColumn>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
