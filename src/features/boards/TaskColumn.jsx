import { HiOutlineDotsHorizontal, HiChevronDown } from 'react-icons/hi';

function TaskColumn() {
  return (
    <div className="min-h-[80%] w-60 rounded-md bg-slate-200 p-3">
      {/* Board title and dropdown button */}
      {/* TODO: Title of the column should be obtained from props */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Todo</h2>
        <HiChevronDown size="1.6rem" color="#64748b" />
      </div>
      {/* TODO: Everything below should be placed in a resuable Task component*/}
      <div className="mt-3 flex flex-col gap-3">
        <div className="flex flex-col justify-between gap-4 rounded bg-white p-2">
          {/* Task title and options menu */}
          <div className="flex items-center justify-between">
            <span className="font-bold">Task 1</span>
            <HiOutlineDotsHorizontal size="1.2rem" color="#64748b" />
          </div>

          {/* Task body */}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae odit
            nesciunt ratione animi eum mollitia cum vel eos doloribus
            consequatur?
          </p>
        </div>
      </div>
    </div>
  );
}

export default TaskColumn;
