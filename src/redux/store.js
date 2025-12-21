import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import authReducer from './slices/authSlice';
import apiReducer from './slices/apiSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    api: apiReducer,
  },
});