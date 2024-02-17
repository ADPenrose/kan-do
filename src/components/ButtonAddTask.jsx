import { useDispatch } from 'react-redux';
import { createTask } from '../features/boards/boardSlice';

function ButtonAddTask({ columnId }) {
  // We need to use the useDispatch hook to dispatch the action that will create
  // a new task.
  const dispatch = useDispatch();
  return (
    <div className="px-3">
      <button
        className="w-full rounded-md bg-gray-300 text-xl text-gray-500 transition-colors hover:bg-gray-400 hover:text-gray-300"
        onClick={() => dispatch(createTask('test', `${columnId}`))}
      >
        +
      </button>
    </div>
  );
}

export default ButtonAddTask;
