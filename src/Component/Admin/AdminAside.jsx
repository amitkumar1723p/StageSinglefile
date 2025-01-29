import React from "react";

import { useSelector } from "react-redux";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
export default function AdminAside() {
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2 className="logo">Dashboard</h2>
        <div className="menu">
          <button
            className={`menu-button ${location.pathname.includes("/admin/dashboard") ?"active-btn-admin":""}`}
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
              <>
                {" "}
                <button
                  className="menu-button"
                  onClick={() => {
                    navigate("/admin/agent/dashboard?Role=Admin");
                  }}
                >
                  Admin
                </button>
                <button
                  className="menu-button"
                  onClick={() => {
                    navigate("/admin/agent/dashboard?Role=Agent");
                  }}
                >
                  Agent
                </button>
              </>
            )}
          <button
            className="menu-button"
            onClick={() => {
              navigate("/admin/allpost");
            }}
          >
            All Post
          </button>

          {/* <button className="menu-button">Library</button> */}
          <button className="menu-button">Report</button>
          <button className="menu-button">Authentication</button>
          <button className="menu-button">Schedules</button>
          {/* <button className="menu-button">Payouts</button> */}
          <button className="menu-button">Settings</button>
        </div>
      </div>
      <div className="main-content admin-agent-dash ">
        <Outlet />
      </div>
    </div>
  );
}
