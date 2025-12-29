import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apiService from '../../api/apiService';

// thunks для отзывов
export const fetchFeedback = createAsyncThunk(
  'api/fetchFeedback',
  async () => {
    return await apiService.fetchFeedback();
  }
);

export const addFeedback = createAsyncThunk(
  'api/addFeedback',
  async (feedback) => {
    return await apiService.createFeedback(feedback);
  }
);

export const removeFeedback = createAsyncThunk(
  'api/removeFeedback',
  async (id) => {
    await apiService.deleteFeedback(id);
    return id;
  }
);

export const updateFeedbackStatus = createAsyncThunk(
  'api/updateFeedbackStatus',
  async ({ id, status }) => {
    return await apiService.updateFeedbackStatus(id, status);
  }
);


export const fetchUsers = createAsyncThunk(
  'api/fetchUsers',
  async () => {
    return await apiService.fetchUsers();
  }
);

export const deleteUser = createAsyncThunk(
  'api/deleteUser',
  async (id) => {
    await apiService.deleteUser(id);
    return id;
  }
);

export const updateUserStatus = createAsyncThunk(
  'api/updateUserStatus',
  async ({ id, status }) => {
    return await apiService.updateUserStatus(id, status);
  }
);

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    feedback: [],
    users: [], 
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // получить отзывы
      .addCase(fetchFeedback.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedback = action.payload;
      })
      .addCase(fetchFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // получить пользователей
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // добавление отзыва
      .addCase(addFeedback.fulfilled, (state, action) => {
        state.feedback.push(action.payload);
      })
      
      // удаление отзыва
      .addCase(removeFeedback.fulfilled, (state, action) => {
        state.feedback = state.feedback.filter(item => item.id !== action.payload);
      })
      
      // изменение статуса отзыва
      .addCase(updateFeedbackStatus.fulfilled, (state, action) => {
        const index = state.feedback.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.feedback[index] = action.payload;
        }
      })
      
      // удаление пользователя
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      
      // изменение статуса пользователя
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export default apiSlice.reducer;