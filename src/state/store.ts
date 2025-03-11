// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import coursesSlice from './courses';
import authSlice from './auth';
import profileSlice from './profile';
import chatSlice from './chat';
import cartSlice from './cart';
import paymentSlice from './payment';
import quizSlice from './quiz';


const store = configureStore({
  reducer: {
  coursesReducer: coursesSlice,
  authReducer:authSlice,
  profileReducer:profileSlice,
  chatReducer:chatSlice,
  cartReducer: cartSlice, 
  paymentReducer: paymentSlice, 
  quizReducer: quizSlice,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
