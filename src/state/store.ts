// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import coursesSlice from './courses';


const store = configureStore({
  reducer: {
  coursesReducer: coursesSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
