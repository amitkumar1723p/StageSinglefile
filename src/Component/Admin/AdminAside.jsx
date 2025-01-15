import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
export default function AdminAside() {
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });
  const navigate = useNavigate();
  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2 className="logo">Dashboard</h2>
        <div className="menu">
          <button
            className="menu-button"
            onClick={() => {
              navigate("/admin/dashboard");
            }}
          >
            Dashboard
          </button>

          {/* <button className="menu-button" onClick={()=>{navigate('/admin/verify')}}>Admin Verify</button> */}

          {medata &&
            medata.IsAuthenticated &&
            medata.user.Role === "Owner" &&
            medata.user.OwnerVerify && (
              <button
                className="menu-button"
                onClick={() => {
                  navigate("/admin/agent/dashboard");
                }}
              >
                Admin
              </button>
            )}
          <button
            className="menu-button"
            onClick={() => {
              navigate("/admin/allpost");
            }}
          >
            All Post
          </button>
          <button className="menu-button">Library</button>
          <button className="menu-button">Authentication</button>
          <button className="menu-button">Schedules</button>
          <button className="menu-button">Payouts</button>
          <button className="menu-button">Settings</button>
        </div>
      </div>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}
