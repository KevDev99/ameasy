import axios from "axios";

const API_URL = "/api/appointments";

// Create appointment
const createAppointment = async (appointmentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, appointmentData, config);

  return response.data;
};

// Fetch appointments
const fetchAppointments = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Update appointment
const updateAppointment = async (appointmentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + `/${appointmentData._id}`,
    appointmentData,
    config
  );

  return appointmentData;
};

const appointmentService = {
  createAppointment,
  fetchAppointments,
  updateAppointment,
};

export default appointmentService;
