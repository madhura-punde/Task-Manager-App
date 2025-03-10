import React, { useEffect, useState } from "react";
import { getUserTasksServices } from "./dataService";
import { getUserRoleFromToken } from "../components/apiService";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userRole = getUserRoleFromToken();

  const getLoadData = async () => {
    try {
      const userData = await getUserTasksServices();
      if (userData.status === 200) {
        setUserData(userData.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLoadData();
    setLoading(false);
  }, []);

  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("x-auth-token");
  };

  return (
    <div>
      {loading && <p>Loading...</p>}

      <h1>{userRole === "User" && "User Dashboard"}</h1>
      <button onClick={handleLogout}>Logout</button>
      {userData && (
        <div>
          <p> Hello, {userData.requestedBy}</p>
          {userData.taskList?.map((task) => (
            <div key={task._id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
              <p>Completed: {task.completed ? "Yes" : "No"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
