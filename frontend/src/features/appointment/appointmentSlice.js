import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appointmentService from "./appointmentService";

const initialState = {
  appointment: null,
  appointments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createAppointment = createAsyncThunk(
  "appointment/createAppointment",
  async (appointmentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await appointmentService.createAppointment(appointmentData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateAppointment = createAsyncThunk(
  "appointment/updateAppointment",
  async (appointmentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await appointmentService.updateAppointment(appointmentData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchAppointments = createAsyncThunk(
  "appointment/fetchAppointments",
  async (appointments, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await appointmentService.fetchAppointments(token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.appointment = null;
    },
    setAppointment: (state, action) => {
      state.appointment = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAppointment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.appointments.push(action.payload);
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.appointment = null;
      })
      .addCase(fetchAppointments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.appointments = null;
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        const newAppointments = state.appointments.map((a) =>
          a._id === action.payload._id
            ? { ...a, status: action.payload.status }
            : a
        );
        state.appointments = newAppointments;
      })
      .addCase(updateAppointment.rejected, (state, action) => {
        state.message = action.payload;
        state.appointment = null;
      });
  },
});

export const { reset, setAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;
