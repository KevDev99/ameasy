import axios from "axios";

const API_URL = "/api/appointments";

// Create appointment
const createAppointment = async (appointmentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post('http://localhost:5000' + API_URL, appointmentData, config);

  return response.data;
}

// Fetch appointments
const fetchAppointments = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get('http://localhost:5000' + API_URL, config);

  return response.data;
}

const appointmentService = {
  createAppointment,
  fetchAppointments
}

export default appointmentService;