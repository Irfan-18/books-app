import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './reducers'; // Ensure this path is correct

const store = configureStore({
  reducer: {
    books: bookReducer,
  },
});

export default store;
