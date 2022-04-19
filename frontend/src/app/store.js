import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import appointmentReducer from '../features/appointment/appointmentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    appointment: appointmentReducer
  },
});
