import { HiTrash } from 'react-icons/hi';
import { Draggable } from '@hello-pangea/dnd';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../features/boards/boardSlice';

function Task({ task, index, colId }) {
  const dispatch = useDispatch();

  return (
    // We need to wrap each of our tasks inside of a Draggable component.
    // The index prop is used to maintain the order of the tasks, and it
    // can be the the same as the index of the task in the tasks array.
    <Draggable draggableId={task.id} index={index}>
      {/* Since Draggable also uses the react props pattern, it expects
      its children to be a function. */}
      {(provided, snapshot) => (
        <div
          // The draggablePorps dont need to be the same as the dragHandleProps.
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`mb-3 flex flex-col justify-between gap-4 rounded bg-white p-2 transition-none ${snapshot.isDragging ? '!bg-amber-100 shadow-lg outline outline-2 outline-black' : ''}`}
        >
          {/* Task title and options menu */}
          <div className="flex items-center justify-between">
            <span className="font-bold capitalize">
              {task.id.replace('-', ' ')}
            </span>
            {/* TODO: This needs to be replaced for a trash can icon
            with a low opacity when idle, and completely visible on hover */}
            <HiTrash
              size="1.2rem"
              color="#6b7280"
              onClick={() => dispatch(deleteTask(task.id, colId))}
              className="hover:cursor-pointer"
            />
          </div>

          {/* Task body */}
          <p>{task.content}</p>
        </div>
      )}
    </Draggable>
  );
}

export default Task;
