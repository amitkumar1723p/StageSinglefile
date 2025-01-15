import React from "react";

import "./Profile.css";

import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";

//  import ProfileHeader from '.'

export default function Profile() {
 
  const location =useLocation()
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });
  return (
    <>
      {/* <h1>Hello World Hello World </h1> */}

      <>
        {" "}
        <div className="profile-container">

{
  !location.pathname.includes('/user/post') && <Sidebar />
}
       
          <main className="main-content create-post-section">
            <Outlet />
            {/* <ProfileHeader MeData={medata} /> */}

            {/* <ExperienceSection /> */}
            {/* <div className="profile-showpost">
                <ShowLoginUserPost />
              </div> */}
          </main>
          {/* <UpgradeSection /> */}
        </div>{" "}
      </>

      {/* <div className="ProfileContainer">
        {!CreatePostLoading && (
         
          <div className="profileHeader">
            <ul>
              <li>
                {" "}
                <NavLink to={"/profile/post"}> Post </NavLink>{" "}
              </li>
              <li>
                <NavLink to={"/"}>Home</NavLink>
              </li>
           
              <li>
                <NavLink to={"/profile/post3"}>Contact</NavLink>
              </li>
            </ul>
          </div>
      )} */}

      {/* </div> */}
    </>
  );
}
