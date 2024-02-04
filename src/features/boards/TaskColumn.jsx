import { HiChevronDown } from 'react-icons/hi';
import Badge from '../../components/Badge';
import ButtonAddTask from '../../components/ButtonAddTask';
import Task from '../../components/Task';
import { Droppable } from '@hello-pangea/dnd';

function TaskColumn({ column, type, tasks }) {
  return (
    <div className="flex h-[42rem] w-60 flex-shrink-0 flex-col gap-2 rounded-md bg-gray-200">
      {/* Board title and dropdown button */}
      <div className="flex items-center justify-between p-3">
        <Badge text={column.title} type={type} />
        <HiChevronDown
          className="hover:cursor-pointer"
          size="1.6rem"
          color="#6b7280"
        />
      </div>
      {/* Add new task button */}
      <ButtonAddTask />
      {/* Tasks */}
      {/* We need to wrap all of our tasks inside of a Droppable component.
      The droppableId needs to be unique within the DragDropContext */}
      <Droppable droppableId={column.id}>
        {/* Since the Droppable uses the render props pattern, it expects
        its child to be a funciton that returns a RFC */}
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`h-full gap-3 p-3 transition-colors duration-300 ${snapshot.isDraggingOver ? 'bg-blue-100' : ''}`}
          >
            {/* For each task, we render a task component. */}
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}

            {/* The Droppable component also provides a placeholder that we can
            use to maintain the layout of the tasks while a task is being dragged */}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default TaskColumn;
