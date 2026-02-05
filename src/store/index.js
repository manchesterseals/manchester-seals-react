import { configureStore } from '@reduxjs/toolkit'
import rosterReducer from './rosterSlice'

export const store = configureStore({
  reducer: {
    roster: rosterReducer,
  },
})
