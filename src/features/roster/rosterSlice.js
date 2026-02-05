import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchRoster = createAsyncThunk('roster/fetchRoster', async () => {
  const response = await fetch('/api/roster');
  if (!response.ok) {
    throw new Error('Failed to fetch roster');
  }
  const payload = await response.json();
  return payload.data || [];
});

const rosterSlice = createSlice({
  name: 'roster',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoster.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRoster.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchRoster.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message || 'Failed to fetch roster';
      });
  },
});

export default rosterSlice.reducer;
