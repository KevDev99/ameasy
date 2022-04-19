import axios from "axios";

const API_URL = "/api/users/";

// login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  if (response.data) {
    localStorage.setItem("ameasyuser", JSON.stringify(response.data));
  }
  return response.data;
};

// logout user
const logout = () => localStorage.removeItem("ameasyuser");

const authService = {
  logout,
  login
};

export default authService;