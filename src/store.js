// Using RTK to create the store.
import { configureStore } from '@reduxjs/toolkit';

// Importing the reducers.
import boardReducer from './features/boards/boardSlice';

// Creating the store.
const store = configureStore({
  reducer: {
    boards: boardReducer,
  },
});

export default store;
