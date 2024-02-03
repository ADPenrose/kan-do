import { HiChevronDown } from 'react-icons/hi';
import Badge from '../../components/Badge';
import ButtonAddTask from '../../components/ButtonAddTask';

function TaskColumn({ title, type, children }) {
  return (
    <div className="flex h-full w-60 flex-shrink-0 flex-col gap-4 rounded-md bg-gray-200 p-3">
      {/* Board title and dropdown button */}
      <div className="flex items-center justify-between">
        <Badge text={title} type={type} />
        <HiChevronDown
          className="hover:cursor-pointer"
          size="1.6rem"
          color="#6b7280"
        />
      </div>
      {/* Add new task button */}
      <ButtonAddTask />
      {/* Tasks */}
      <div className="scrollbar flex h-full flex-grow flex-col gap-3 overflow-y-scroll pr-2">
        {children}
      </div>
    </div>
  );
}

export default TaskColumn;
