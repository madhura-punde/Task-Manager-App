import React, { useEffect, useState } from "react";
import { getUserTasksServices } from "./dataService";
import { getUserRoleFromToken } from "../components/apiService";
import { useNavigate } from "react-router-dom";
import "./Admin/admin.css";

const AdminDashboard = () => {
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
    <div className="admin-dashboard-container">
      <div className="dashboard-content">
        {loading && <p>Loading...</p>}

        <h1 className="dashboard-title">
          {userRole === "Admin" && "Admin Dashboard"}
        </h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
        {userData && (
          <div>
            <p className="user-greeting"> Hello, {userData.requestedBy}</p>
            <div className="task-container">
              {userData.taskList?.map((task) => (
                <div className="task-card" key={task._id}>
                  <h3 className="task-title">{task.title}</h3>
                  <p className="task-description">{task.description}</p>
                  <p className="task-status">Status: {task.status}</p>
                  {/* <p className="task-status">
                    Completed: {task.completed ? "Yes" : "No"}
                  </p> */}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
