import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import apiReducer from './slices/apiSlice';
import { rtkApi } from './api/rtkApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    api: apiReducer, // старый
    [rtkApi.reducerPath]: rtkApi.reducer, // новый
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkApi.middleware),
});