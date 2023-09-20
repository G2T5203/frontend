import Cookies from "js-cookie";
import axios from "axios";

const TOKEN_COOKIE_NAME = "jwt";

// Function to set JWT token in cookies or headers
export const setAuthToken = (token) => {
  // Set the JWT token in cookies or headers
  Cookies.set(TOKEN_COOKIE_NAME, token, { expires: 7 }); // Expires in 7 days
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Function to remove JWT token from cookies or headers
export const removeAuthToken = () => {
  Cookies.remove(TOKEN_COOKIE_NAME);
  delete axios.defaults.headers.common["Authorization"];
};

// Function to check if the user is authenticated
export const isAuthenticated = () => {
  const token = Cookies.get(TOKEN_COOKIE_NAME);
  return !!token;
};
