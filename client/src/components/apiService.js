import axios from "axios";
// import apiUrl from "../config/ApiConfig";

const token = localStorage.getItem("x-auth-token");

let apiUrl = "http://localhost:5000";
const apiService = axios.create({
  baseURL: apiUrl,
  headers: {
    "content-type": "application/json",
    Authorization: `x-auth-token: ${token}`,
  },
});

// apiService.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("x-auth-token"); // Get the token from localStorage (or wherever you store it)

//     if (token) {
//       config.headers["Authorization"] = `x-auth-token: ${token}`; // Add token to Authorization header
//     }
//     console.log(token);
//     return config; // Return the updated config
//   },
//   (error) => {
//     return Promise.reject(error); // Reject if there's an error in the request
//   }
// );

export const getService = (endPoint, conf) => {
  return apiService.get(endPoint, conf);
};

export const postService = (endPoint, data) => {
  return apiService.post(endPoint, data);
};

export default apiService;
