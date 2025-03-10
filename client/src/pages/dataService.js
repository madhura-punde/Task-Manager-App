import { getService } from "../components/apiService";

const token = localStorage.getItem("authToken");

const headers = token ? { token } : {};

export const getUserTasksServices = async () => {
  let res;
  try {
    res = await getService("http://localhost:5000/api/tasks", {
      headers: headers,
    });
  } catch (err) {
    res = err;
  }
  return res;
};
