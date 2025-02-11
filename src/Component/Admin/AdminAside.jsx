import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import './AdminAside.css'; // Import the vanilla CSS file

export default function AdminAside() {
  const { medata } = useSelector((state) => state.meDetails);
  const location = useLocation();

  return (
   <div className="">
     <div className="AdminAside-container">
      <aside className="AdminAside-sidebar">
        <div className="AdminAside-header">Dashboard</div>
        <div className="AdminAside-links">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `AdminAside-navLink ${isActive ? "active" : "hover"}` 
            }
          >
            <img
              src="/img/Dashboard.svg"
              alt="Dashboard Icon"
              className={`AdminAside-icon ${location.pathname === "/admin/dashboard" ? "active" : ""}`}
            />
            Dashboard
          </NavLink>
          {medata?.IsAuthenticated &&
            medata.user.Role === "Owner" &&
            medata.user.OwnerVerify && (
              <>
                <NavLink
                  to="/admin/agent/dashboard?Role=Admin"
                  className={({ isActive }) =>
                    `AdminAside-navLink ${location.search.includes("Role=Admin") ? "active" : "hover"}` 
                  }
                >
                  <img
                    src="/img/agent.svg"
                    alt="Admin Icon"
                    className={`AdminAside-icon ${location.search.includes("Role=Admin") ? "active" : ""}`}
                  />
                  Admin
                </NavLink>
                <NavLink
                  to="/admin/agent/dashboard?Role=Agent"
                  className={({ isActive }) =>
                    `AdminAside-navLink ${location.search.includes("Role=Agent") ? "active" : "hover"}` 
                  }
                >
                  <img
                    src="/img/Admin.svg"
                    alt="Agent Icon"
                    className={`AdminAside-icon ${location.search.includes("Role=Agent") ? "active" : ""}`}
                  />
                  Agent
                </NavLink>
              </>
            )}
          <NavLink
            to="/admin/allpost"
            className={({ isActive }) =>
              `AdminAside-navLink ${isActive ? "active" : "hover"}` 
            }
          >
            <img
              src="/img/AllPost.svg"
              alt="All Post Icon"
              className={`AdminAside-icon ${location.pathname === "/admin/allpost" ? "active" : ""}`}
            />
            All Post
          </NavLink>

          <button className="AdminAside-button">
            <img
              src="/img/Report.svg"
              className="AdminAside-icon"
              alt=""
            />
            Report
          </button>
          <button className="AdminAside-button">
            <img
              src="/img/Authentication.svg"
              className="AdminAside-icon"
              alt=""
            />
            Authentication
          </button>
          <button className="AdminAside-button">
            <img
              src="/img/Schedule.svg"
              className="AdminAside-icon"
              alt=""
            />
            Schedules
          </button>
          <button className="AdminAside-button">
            <img
              src="/img/Setting.svg"
              className="AdminAside-icon"
              alt=""
            />
            Settings
          </button>
        </div>
      </aside>

      <div className="AdminAside-content">
        <Outlet />
      </div>
    </div>
   </div>
  );
}
