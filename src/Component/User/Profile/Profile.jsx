import React from "react";

import "./Profile.css";

import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { Helmet } from "react-helmet";
//  import ProfileHeader from '.'

export default function Profile() {
  const location = useLocation();
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });
  return (
    <>
      {/* <h1>Hello World Hello World </h1> */}
      <Helmet>
                
                <title>User Dashboard - PropertyDekho247.com</title>
                <meta name="description" content="Welcome to your personal dashboard on PropertyDekho247.com! Here, you can manage all your property listings, track your active posts, and monitor inquiries in one convenient place. Edit, update, or remove listings with ease, and stay on top of your resale property activity. Whether you're a seller or a buyer, your dashboard provides all the tools you need to have a seamless experience on our platform. Keep your account up-to-date and enjoy a smooth property management journey with us!"></meta>
                <link rel="canonical" href="https://www.propertydekho247.com/user/" />
            </Helmet>
      <>
        {" "}
        <div className="profile-container">
          {!location.pathname.includes("/user/post") && <Sidebar />}
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
