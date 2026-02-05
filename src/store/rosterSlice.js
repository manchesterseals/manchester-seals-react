import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchRoster = createAsyncThunk('roster/fetchRoster', async () => {
  const response = await fetch('/api/roster')

  if (!response.ok) {
    throw new Error('Failed to load roster')
  }

  const payload = await response.json()
  return Array.isArray(payload.data) ? payload.data : []
})

const rosterSlice = createSlice({
  name: 'roster',
  initialState: {
    data: [],
    status: 'idle',
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoster.pending, (state) => {
        state.status = 'loading'
        state.error = ''
      })
      .addCase(fetchRoster.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchRoster.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error?.message ?? 'Unable to fetch roster'
      })
  },
})

export default rosterSlice.reducer
