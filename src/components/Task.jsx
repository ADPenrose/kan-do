import { HiOutlineDotsHorizontal } from 'react-icons/hi';

function Task() {
  return (
    <div className="flex flex-col justify-between gap-4 rounded bg-white p-2">
      {/* Task title and options menu */}
      <div className="flex items-center justify-between">
        <span className="font-bold">Task 1</span>
        <HiOutlineDotsHorizontal size="1.2rem" color="#6b7280" />
      </div>

      {/* Task body */}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae odit
        nesciunt ratione animi eum mollitia cum vel eos doloribus consequatur?
      </p>
    </div>
  );
}

export default Task;
