// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import coursesSlice from './courses';
import authSlice from './auth';
import profileSlice from './profile';
import chatSlice from './chat';


const store = configureStore({
  reducer: {
  coursesReducer: coursesSlice,
  authReducer:authSlice,
  profileReducer:profileSlice,
  chatReducer:chatSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
