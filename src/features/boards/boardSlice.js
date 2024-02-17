import { createSlice } from '@reduxjs/toolkit';

// Creating the task slice.
// TODO: I think I should transform each key into an array of objects.
// Makes sense since we are going to be reordering the tasks.
const initialState = {
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

// We need to call the createSlice so that we have our action creators and reducers.
const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    // Re-ordering the tasks.
    reorderTasks(state, action) {
      // It is easier to destructure the payload and handle this in an
      // immutable way.
      return { ...state, ...action.payload };
    },
    // Create task action.
    createTask: {
      // To create a new task, we need its id, content, and the column where it
      // will be added.
      prepare(content, columnId) {
        return {
          payload: {
            content,
            columnId,
          },
        };
      },
      // Then, we can create the reducer.
      reducer(state, action) {
        // This creates the new task.
        // The id will be calculated by the number of tasks we have.
        const id = `task-${Object.keys(state.tasks).length + 1}`;
        state.tasks[id] = {
          id,
          content: action.payload.content,
        };
        // We add the new task to the column.
        state.columns[action.payload.columnId].taskIds.push(id);
      },
    },
    // TODO: Delete task action.
    deleteTask: {
      prepare(taskId, columnId) {
        return {
          payload: {
            taskId,
            columnId,
          },
        };
      },
      reducer(state, action) {
        // We need to remove the task from the tasks object.
        delete state.tasks[action.payload.taskId];
        // We also need to remove the task from the column.
        const index = state.columns[action.payload.columnId].taskIds.indexOf(
          action.payload.taskId,
        );
        state.columns[action.payload.columnId].taskIds.splice(index, 1);
      },
    },
  },
});

// Exporting the action creators.
export const { createTask, reorderTasks, deleteTask } = boardSlice.actions;

// Exporting the reducer.
export default boardSlice.reducer;

// Selectors.
export const selectTasks = (state) => state.boards.tasks;
export const selectColumns = (state) => state.boards.columns;
export const selectColumnOrder = (state) => state.boards.columnOrder;
