import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appointmentService from "./appointmentService";


const initialState = {
  appointments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createAppointment = createAsyncThunk("appointment/createAppointment", async (appointmentData, thunkAPI) => {
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
});

export const fetchAppointments = createAsyncThunk("appointment/fetchAppointments", async (appointments, thunkAPI) => {
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
})

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
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
        state.appointment = action.payload;
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
  },
});

export const { reset } = appointmentSlice.actions;
export default appointmentSlice.reducer;