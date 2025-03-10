import axios from "axios";
const token = localStorage.getItem("x-auth-token");

export const getUserRoleFromToken = () => {
  if (token) {
    try {
      // Decode the JWT token and extract the payload (role)
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      return decodedToken ? decodedToken.role : null;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
  return null; // Return null if token is not found
};

let apiUrl = "http://localhost:5000";
const apiService = axios.create({
  baseURL: apiUrl,
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

apiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("x-auth-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config; // Return the updated config
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getService = (endPoint, conf) => {
  return apiService.get(endPoint, conf);
};

export const postService = (endPoint, data) => {
  return apiService.post(endPoint, data);
};

export default apiService;
