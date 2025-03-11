import React, { useEffect, useState } from "react";
import {
  addTaskService,
  deleteTaskService,
  getUserTasksServices,
} from "../dataService";
import { getUserRoleFromToken } from "../../components/apiService";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  DialogActions,
} from "@mui/material";
import "./user.css";

const Dashboard = () => {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  let [user, setUser] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "In Progress",
    // completed: false,
  });
  const navigate = useNavigate();

  const userRole = getUserRoleFromToken();

  const getLoadData = async () => {
    setLoading(true);
    try {
      const userData = await getUserTasksServices();
      if (userData.status === 200) {
        setUserData(userData.data);
        setUser(userData.data.requestedBy);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getLoadData();
  }, []);

  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("x-auth-token");
  };

  const handleAddTask = async (e) => {
    // e.preventDefault();
    const res = await addTaskService(newTask);
    if (res.status === 200 || 2001) {
      // console.log(res);
      setIsDialogOpen(false);
      alert(res.data.message);
      // setUserData(res.data.taskList || []);
      await getLoadData();
      setNewTask({
        title: "",
        description: "",
        status: "In Progress",
        completed: false,
      });
      // await getLoadData();
    } else {
      console.log(res);
    }
  };

  let handleDelete = async (task) => {
    setLoading(true);
    let res = await deleteTaskService(task._id);
    if (res.status === 200) {
      console.log(res);
      alert(res.data.message);
      // setUserData(res.data.task || []);
      await getLoadData();
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  console.log(userRole, userRole === "User");
  return (
    <div className="dashboard-container">
      {loading && <p>Loading...</p>}

      <h1 className="dashboard-title">
        {userRole === "User" ? "User Dashboard" : "Admin Dashboard"}
      </h1>
      <button className="dashboard-btn" onClick={handleLogout}>
        Logout
      </button>
      {/* {userRole === "User" && ( */}
      <button className="dashboard-btn" onClick={() => setIsDialogOpen(true)}>
        + Add Task
      </button>
      {/* )} */}
      {userData && (
        <div>
          <p> Hello, {userData.requestedBy}</p>
          {userData.taskList?.map((task) => (
            <div key={task._id} className="task-card">
              <h3 className="task-title">{task.title}</h3>
              <p className="task-description">{task.description}</p>
              <div>
                <p>
                  Status: <span>{task.status}</span>
                </p>
              </div>
              {/* {userRole === "User" && ( */}
              <button onClick={(e) => handleDelete(task)}>Delete</button>
              {/* )} */}
            </div>
          ))}
        </div>
      )}

      {/* Alert Modal for Adding Task */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            margin="dense"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
          <TextField
            label="Description"
            fullWidth
            margin="dense"
            multiline
            rows={3}
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            required
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select
              value={newTask.status}
              onChange={(e) =>
                setNewTask({ ...newTask, status: e.target.value })
              }
            >
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddTask} color="primary">
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;
