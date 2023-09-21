import Cookies from "js-cookie";
import axios from "axios";

const TOKEN_COOKIE_NAME = "jwt";

// Function to set JWT token in cookies or headers with additional payload data
export const setAuthToken = (token, userData) => {
  // Decode the original token
  const tokenParts = token.split('.');
  const header = JSON.parse(atob(tokenParts[0]));
  const payload = JSON.parse(atob(tokenParts[1]));

  // Add or update the user data in the payload
  Object.assign(payload, userData);

  // Recreate the token with the updated payload
  const updatedToken = btoa(JSON.stringify(header)) + '.' + btoa(JSON.stringify(payload)) + '.' + tokenParts[2];

  // Set the JWT token in cookie
  Cookies.set(TOKEN_COOKIE_NAME, updatedToken, {
    expires: 7,             // Expires in 7 days
    secure: true,           // Send only over HTTPS (secure)
    sameSite: 'strict',     // Set SameSite attribute to 'Strict'
    path: '/',              // Cookie is valid for the entire domain
    // domain: '.world',   // Set a custom domain (replace with your domain)
    // httpOnly: true,     // Cookie cannot be accessed via JavaScript
  });

  axios.defaults.headers.common["Authorization"] = `Bearer ${updatedToken}`;
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

// Function to get the current user from JWT stored in a cookie
export const getCurrentUser = () => {
  const token = Cookies.get('jwt'); // Replace 'jwt' with your actual cookie name
  if (token) {
    // Decode the JWT token (assuming it's a base64-encoded JWT)
    const tokenPayload = token.split('.')[1];
    const decodedPayload = atob(tokenPayload);
    const user = JSON.parse(decodedPayload);
    return user;
  } else {
    // If the token is not present, return null or handle it as needed
    return null;
  }
};

export function clearAllCookies() {
  const cookies = Cookies.get();
  for (const cookieName in cookies) {
    Cookies.remove(cookieName);
  }
}

// Function to retrieve a user based on username and email payload
export const getUserByUsernameAndEmail = (username, email) => {
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.username === username && currentUser.email === email) {
    return currentUser;
  } else {
    return null; // User not found or payload does not match
  }
};

export function getCookie(cookieName) {
  // document.cookie property to access all cookies set for the current website
  const cookies = document.cookie.split(';').map(cookie => cookie.trim());
  for (const cookie of cookies) {
    const [name, value] = cookie.split('=');
    if (name === cookieName) {
      return decodeURIComponent(value);
    }
  }
  return null; // Return null if the cookie is not found
}

export function getAllCookies(cookieName) {
  const cookies = document.cookie.split(';').map(cookie => cookie.trim());
  const matchingCookies = [];

  for (const cookie of cookies) {
    const [name, value] = cookie.split('=');
    if (name === cookieName) {
      matchingCookies.push(decodeURIComponent(value));
    }
  }

  return matchingCookies;
}

