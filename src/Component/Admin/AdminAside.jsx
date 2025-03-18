import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "./AdminAside.css"; // Import the vanilla CSS file
import { getAllUserAction, getPaidPropertyAction, getTransactionDetailAction } from "../../Action/userAction";
// import { useDispatch, useSelector } from "react-redux";
// import { NavLink, Outlet, useLocation } from "react-router-dom";
// import './AdminAside.css'; // Import the vanilla CSS file
import {
  GetAllNotificationsAndRequirements,
  Admin_OwnerGetAllPostAction,
  GetDeletedPostsAction,
} from "../../Action/postAction";

export default function AdminAside() {
  const dispatch = useDispatch();
  const { medata } = useSelector((state) => state.meDetails);
  const location = useLocation();
  // get all user excepation owner Admin agent
  // const{data:AllUserResponseData}=useSelector((state)=>{
  //   return state.AllUserResponse
  // })
  // this useEffect get All user reponse
  // useEffect(() => {
  //   dispatch(GetAllNotificationsAndRequirements());
  // const{data:AllUserResponseData}=useSelector((state)=>{
  //   return state.AllUserResponse
  // })
  // this useEffect get All user reponse
  useEffect(() => {
    // dispatch(getAllUserAction())
    //have to protect for agent

    
    if (["Owner"].includes(medata?.user?.Role)) {
      dispatch(GetAllNotificationsAndRequirements());
    }
    if (medata?.user?.Role === "Owner") {
      console.log("owner")
      dispatch(getAllUserAction());
      dispatch(Admin_OwnerGetAllPostAction());
      dispatch(getTransactionDetailAction())
    }
  }, []);

  
  const { data: adminAlertData, LodingType: AlertType } = useSelector(
    (state) => {
      return state.Post;
    }
  );
  // useEffect(() => {
  //   if (adminAlertData && ["DeletePostRequest"].includes(AlertType)) {
  //     if (adminAlertData.success === true) {
  //       dispatch(GetDeletedPostsAction());
  //     }
  //   }

  //   // eslint-disable-next-line
  // }, [adminAlertData]);

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
                className={`AdminAside-icon ${
                  location.pathname === "/admin/dashboard" ? "active" : ""
                }`}
              />
              Dashboard
            </NavLink>
            {medata?.IsAuthenticated &&
              medata.user.Role === "Owner" &&
              medata.user.OwnerVerify && (
                <>
   <NavLink
              to="/admin/all-user-Response-action"
              className={({ isActive }) =>
                `AdminAside-navLink ${isActive ? "active" : "hover"}`
              }
            >
              <img
                src="/img/Dashboard.svg"
                alt="Dashboard Icon"
                className={`AdminAside-icon ${
                  location.pathname === "/admin/all-user-Response-action" ? "active" : ""
                }`}
              />
            All Response
            </NavLink>


                  <NavLink
                    to="/admin/agent/dashboard?Role=Admin"
                    className={({ isActive }) =>
                      `AdminAside-navLink ${
                        location.search.includes("Role=Admin")
                          ? "active"
                          : "hover"
                      }`
                    }
                  >
                    <img
                      src="/img/agent.svg"
                      alt="Admin Icon"
                      className={`AdminAside-icon ${
                        location.search.includes("Role=Admin") ? "active" : ""
                      }`}
                    />
                    Admin
                  </NavLink>
                  <NavLink
                    to="/admin/agent/dashboard?Role=Agent"
                    className={({ isActive }) =>
                      `AdminAside-navLink ${
                        location.search.includes("Role=Agent")
                          ? "active"
                          : "hover"
                      }`
                    }
                  >
                    <img
                      src="/img/Admin.svg"
                      alt="Agent Icon"
                      className={`AdminAside-icon ${
                        location.search.includes("Role=Agent") ? "active" : ""
                      }`}
                    />
                    Agent
                  </NavLink>

                  
                  {/* All repose user route  */}
                  {/* <NavLink
                    to="/admin/all-registration-response"
                    className={({ isActive }) =>
                      `AdminAside-navLink ${
                        location.search.includes("Role=Agent")
                          ? "active"
                          : "hover"
                      }`
                    }
                  >
                    <img
                      src="/img/Admin.svg"
                      alt="Agent Icon"
                      className={`AdminAside-icon ${
                        location.search.includes("Role=Agent") ? "active" : ""
                      }`}
                    />
                    All User
                  </NavLink> */}
                  {/* All repose user route  */}
                </>
              )}
            {/* <NavLink
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetAllNotificationsAndRequirements())

  }, [])

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
            {/* <NavLink
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
          </NavLink> */}
 
            <button className="AdminAside-button">
              <img src="/img/Report.svg" className="AdminAside-icon" alt="" />
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
              <img src="/img/Schedule.svg" className="AdminAside-icon" alt="" />
              Schedules
            </button>
            <button className="AdminAside-button">
              <img src="/img/Setting.svg" className="AdminAside-icon" alt="" />
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
