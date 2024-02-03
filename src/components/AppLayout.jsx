import { useState } from 'react';
import TaskColumn from '../features/boards/TaskColumn';
import { DragDropContext } from '@hello-pangea/dnd';

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Take out the garbage' },
    'task-2': { id: 'task-2', content: 'Watch my favorite show' },
    'task-3': { id: 'task-3', content: 'Charge my phone' },
    'task-4': { id: 'task-4', content: 'Cook dinner' },
    'task-5': { id: 'task-5', content: 'Go for a run' },
    'task-6': { id: 'task-6', content: 'Read a book' },
    'task-7': { id: 'task-7', content: 'Write a blog post' },
    'task-8': { id: 'task-8', content: 'Go grocery shopping' },
    'task-9': { id: 'task-9', content: 'Attend a meeting' },
    'task-10': { id: 'task-10', content: 'Exercise for 30 minutes' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'TODO',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'IN PROGRESS',
      taskIds: ['task-5', 'task-6'],
    },
    'column-3': {
      id: 'column-3',
      title: 'DONE',
      taskIds: ['task-7', 'task-8', 'task-9', 'task-10'],
    },
  },
  // This helps us record the order of the columns.
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

function AppLayout() {
  // This state will be used to manage the data of the boards.
  const [todoData, setTodoData] = useState(initialData);

  // This function is responsible for chainging the state of the data when a
  // drag and drop event occurs.
  function handleDragEnd(result) {
    // The result object contains the information of the drag and drop event.
    // We need to destructure the source, destination and draggableId from it.
    const { source, destination, draggableId } = result;

    // If there is no destination, we return early, because the user dropped
    // the task outside of the droppable area.
    if (!destination) return;

    // If the source and destination are the same, we return early, because the
    // user didn't change the order of the tasks.
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // If none of the thingws above happened, we need to create a copy of the
    // tasks array of the source column.
    const column = todoData.columns[source.droppableId];

    // Then, we need to create a new array of taskIds, and remove the task that
    // was dragged from its position, to then add it to the new position.
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    // Then, we need to create a new column object, with the same properties as
    // the original column, but with the new taskIds array.
    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    // Finally, we need to update the state of the data.
    const newState = {
      ...todoData,
      columns: {
        ...todoData.columns,
        [newColumn.id]: newColumn,
      },
    };
    setTodoData(newState);
  }

  return (
    // This context will be used to manage the drag and drop of the tasks, and
    // the reordering of the columns.
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="h-screen overflow-auto bg-gray-100 px-7 pb-7">
        {/* This outer wrapping is needed to maintain the right padding on 
      overflow */}
        <div className="h-fit w-fit">
          {/* Boards title */}
          <h1 className="py-4 text-3xl font-bold">Boards</h1>
          {/* Boards */}
          <div className="flex items-start gap-10">
            {/* We need to loop for each of the columns specified on the columns
          order key, and for each one of those, get both the data for that column and for its tasks. */}
            {todoData.columnOrder.map((columnId) => {
              const column = todoData.columns[columnId];
              const tasks = column.taskIds.map(
                (taskId) => todoData.tasks[taskId],
              );
              return (
                <TaskColumn
                  key={column.id}
                  column={column}
                  type={column.title.toLowerCase().replace(' ', '-')}
                  tasks={tasks}
                />
              );
            })}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default AppLayout;
