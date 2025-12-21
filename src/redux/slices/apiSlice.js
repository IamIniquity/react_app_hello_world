import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apiService from '../../api/apiService';

// Асинхронные thunks
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

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    feedback: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch feedback
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
      // Add feedback
      .addCase(addFeedback.fulfilled, (state, action) => {
        state.feedback.push(action.payload);
      })
      // Remove feedback
      .addCase(removeFeedback.fulfilled, (state, action) => {
        state.feedback = state.feedback.filter(item => item.id !== action.payload);
      });
  },
});

export default apiSlice.reducer;