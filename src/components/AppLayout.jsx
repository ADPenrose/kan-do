import TaskColumn from '../features/boards/TaskColumn';
import { DragDropContext } from '@hello-pangea/dnd';
import { useSelector } from 'react-redux';
import {
  reorderTasks,
  selectColumnOrder,
  selectColumns,
  selectTasks,
} from '../features/boards/boardSlice';
import { useDispatch } from 'react-redux';

function AppLayout() {
  // We need to get the initial data from redux. Later, this will be fetched
  // from local storage.
  const tasks = useSelector(selectTasks);
  const columns = useSelector(selectColumns);
  const columnOrder = useSelector(selectColumnOrder);
  const todoData = {
    tasks,
    columns,
    columnOrder,
  };

  // We need to use the useDispatch hook to dispatch the action that will create
  // a new task.
  const dispatch = useDispatch();

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

    // If none of the things above happened, we need to create a copy of the
    // tasks array of the source column, and also a coy of the destination.
    const startColumn = todoData.columns[source.droppableId];
    const finishColumn = todoData.columns[destination.droppableId];

    // If the source and destination are the same, we need to reorder the tasks
    // in the same column.
    if (startColumn === finishColumn) {
      // Then, we need to create a new array of taskIds, and remove the task that was dragged from its position, to then add it to the new position.
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      // Then, we need to create a new column object, with the same properties as the original column, but with the new taskIds array.
      const newColumn = {
        ...startColumn,
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
      // We need to dispatch an action to update the state of the data.
      dispatch(reorderTasks(newState));
      return;
    }

    // If the source and destination are different, we need to move the task
    // from the source column to the destination column.
    // First, we need to create a new array of taskIds for the source column.
    const startTaskIds = Array.from(startColumn.taskIds);
    // Then, we need to remove the task that was dragged from the source column.
    startTaskIds.splice(source.index, 1);
    // Then, we need to create a new column object for the source column, with
    // the new taskIds array.
    const newStartColumn = {
      ...startColumn,
      taskIds: startTaskIds,
    };

    // Once that is done, we need to create a new array of taskIds for the
    // destination column.
    const finishTaskIds = Array.from(finishColumn.taskIds);
    // We add the task that was dragged to the destination column.
    finishTaskIds.splice(destination.index, 0, draggableId);
    // Then, we need to create a new column object for the destination column.
    const newFinishColumn = {
      ...finishColumn,
      taskIds: finishTaskIds,
    };

    // Finally, we update the state of the data.
    const newState = {
      ...todoData,
      columns: {
        ...todoData.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    };

    // We need to dispatch an action to update the state of the data.
    dispatch(reorderTasks(newState));
    return;
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
