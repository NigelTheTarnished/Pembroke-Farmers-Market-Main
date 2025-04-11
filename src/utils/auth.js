import { jwtDecode } from "jwt-decode";

export const isAuthenticated = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return false;
    
    // Try to decode the token
    const decoded = jwtDecode(token);
    
    // Get current time in seconds
    const currentTime = Date.now() / 1000;
    
    // Check if token is expired
    if (decoded.exp < currentTime) {
      console.log('Token expired');
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Error checking authentication:', err);
    return false;
  }
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
