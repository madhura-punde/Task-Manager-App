import {
  deleteService,
  getService,
  postService,
} from "../components/apiService";

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

export const addTaskService = async (task) => {
  console.log(task);
  let res;
  try {
    res = await postService("http://localhost:5000/api/tasks", task);
  } catch (err) {
    res = err;
  }
  return res;
};

export const deleteTaskService = async (id) => {
  console.log(id);
  let res;
  try {
    res = await deleteService(`http://localhost:5000/api/tasks/${id}`);
  } catch (err) {
    res = err;
  }
  return res;
};
