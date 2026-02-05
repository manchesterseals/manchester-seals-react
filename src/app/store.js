import { configureStore } from '@reduxjs/toolkit';
import rosterReducer from '../features/roster/rosterSlice';

const store = configureStore({
  reducer: {
    roster: rosterReducer,
  },
});

export default store;
