import React, { useContext, useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogoutAction } from "../../Action/userAction";
import { AlertAction } from "../../Action/alertAction";
// import HamBurger from "../../../public/img/Hamburger.svg"
import { GetMeDetailsAction } from "../../Action/userAction";
import WindowComponent from "../WindowComponent";
import ChannelPartner from "./ChannelPartner";

import { UserContext } from "../CreateContext/CreateContext";
const Navbar = () => {
  const { NavbarRef } = useContext(UserContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const ChannelPartnerBtnRef = useRef(null);

  const [alertType, setalertType] = useState("");
  const [alertMessage, setalertMessage] = useState("");
  const [alertshow, setalertShow] = useState(null);
  const [showChannelPartner, setShowChannelPartner] = useState(false);

  const { logoutdata } = useSelector((state) => {
    return state.LogoutUser;
  });

  // Check Logged User
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });

  let nameCode = "";
  if (medata && medata.user && medata.user.Name) {
    const userShort = medata.user.Name;
    const getShort = userShort.split(" ");

    if (getShort.length > 1) {
      for (let i = 0; i < getShort.length; i++) {
        let val = getShort[i][0];
        nameCode += val;
      }
    } else {
      nameCode = getShort[0][0];
    }
  }

  const [isOpen, setIsOpen] = useState(false);

  const closeDropdown = (event) => {
    if (!event.target.matches(".dropbtn")) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);
  //  Logout Data show Code (Start)

  // for removing the localstorage of login user/agen/owner/admin
  const clearAllPropertyData = () => {
    localStorage.removeItem("Admin_OwnerGetAllPostState");
  };

  useEffect(() => {
    if (logoutdata) {
      if (logoutdata.success === true) {
        navigate("/");
        dispatch(GetMeDetailsAction());
        setalertMessage(<p>{logoutdata.message}</p>);
        setalertType("success");
        setalertShow(true);
        dispatch({ type: "LogoutClear" });
        dispatch({ type: "LoginUserGetPostClear" });
        dispatch({ type: "Admin_OwnerGetAllPostClear" });
        setTimeout(() => {
          dispatch({ type: "MeDetailsClear" });
        }, 0);

        clearAllPropertyData();
      }
      if (logoutdata.success === false) {
        setalertMessage(<p>{logoutdata.message}</p>);
        setalertType("error");
        setalertShow(true);
        dispatch({ type: "LogoutClear" });
      }
    }
    // eslint-disable-next-line
  }, [logoutdata]);

  //  Logout Data show Code (End)\

  useEffect(() => {
    if (alertshow === true) {
      dispatch(AlertAction(alertType, alertMessage, alertshow));
    }
    // eslint-disable-next-line
  }, [alertType, alertMessage, alertshow]);

  const LogoutUserFunc = () => {
    dispatch(LogoutAction());
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="d-flex logo-nav-bar">
            <div
              className="logo"
              onClick={() => {
                navigate("/");

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              <h2 className="logo-heading-navbar">
                Property <span> Dekho247</span>
              </h2>
            </div>
            {/* <small>
              <span className="WishingHoli"> Wishing</span>
              <span className="YouHoli">You</span>
              <span className="HappyHoli">Happy</span>
              <span className="holiholi">Holi !!</span>
            </small> */}
          </div>
          {/* <Link to={"sqpt/admin/request"}>Admin</Link>
          <Link to={"sqpt/admin/login"}>AdminLogin</Link>
          <Link to={"user/post/update"}>Rough</Link>  */}

          <ul className="nav-links">
            <li
              className="nav-link sell-btn shine-btn"
              onClick={() => {
                if (medata && medata.IsAuthenticated === true) {
                  if (["Admin", "Agent", "Owner"].includes(medata.user.Role)) {
                    navigate("/admin/dashboard");
                  } else {
                    navigate("/user/post");
                  }
                } else {
                  navigate("/login");
                }
              }}
            >
              {["Admin", "Agent", "Owner"].includes(medata?.user?.Role) ? (
                `${medata?.user?.Role} Dashboard`
              ) : (
                <>
                  {" "}
                  Post Property <span className="header-free"> Free</span>{" "}
                </>
              )}
            </li>

            {medata && medata.IsAuthenticated === false && (
              <>
                <li
                  className="nav-link buy-btn"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </li>{" "}
              </>
            )}

            {medata && medata.IsAuthenticated === true && (
              <>
                <li
                  className="userimg-logo-box"
                  onClick={() => {
                    // if (medata.user.Role == "User") {
                    if (
                      [
                        "Buyer",
                        "Tenant",
                        "Property Owner",
                        "Channel Partner",
                      ].includes(medata.user.Role)
                    ) {
                      if (location.pathname !== "/user") {
                        navigate("/user");
                      }
                    }
                    if (["Admin", "Owner"].includes(medata.user.Role)) {
                      if (location.pathname !== "/user") {
                        navigate("/admin/dashboard");
                      }
                    }
                  }}
                ></li>

                <div className="nav-dropdown nav-computer-item">
                  <div
                    className="dropbtn btn-drop"
                    onClick={() => {
                      setIsOpen(!isOpen);
                    }}
                  >
                    <span
                      className="name-user-nav"
                      onClick={() => {
                        navigate("/user");
                      }}
                    >
                      {nameCode ? (
                        nameCode
                      ) : (
                        <>
                          <img
                            src="/img/admin-aside-dropdown-svg.svg"
                            onClick={() => {
                              setIsOpen(!isOpen);
                            }}
                            className="dropbtn icons-nav"
                            alt="menu"
                          />
                        </>
                      )}
                    </span>
                    {isOpen ? (
                      <img
                        alt="dropdown-icon"
                        className={`dropbtn ${isOpen ? "rotate-up" : ""}`}
                        onClick={() => {
                          setIsOpen(!isOpen);
                        }}
                        src="/img/admin-aside-dropdown-svg.svg"
                      />
                    ) : (
                      <img
                        alt="dropdown-icon`"
                        className="dropbtn"
                        onClick={() => {
                          setIsOpen(!isOpen);
                        }}
                        src="/img/admin-aside-dropdown-svg.svg"
                      />
                    )}
                  </div>

                  {isOpen && (
                    <div className="dropdown-content-main">
                      <div className="dropdown-content">
                        <li
                          className="navItem "
                          onClick={() => {
                            navigate("/");
                          }}
                        >
                          <img
                            alt="dropdown-icon`"
                            className="dropbtn-nav"
                            onClick={() => {
                              setIsOpen(!isOpen);
                            }}
                            src={`data:image/svg+xml;utf8,${encodeURIComponent(`
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 19V10C4 9.68333 4.071 9.38333 4.213 9.1C4.355 8.81667 4.55067 8.58333 4.8 8.4L10.8 3.9C11.15 3.63333 11.55 3.5 12 3.5C12.45 3.5 12.85 3.63333 13.2 3.9L19.2 8.4C19.45 8.58333 19.646 8.81667 19.788 9.1C19.93 9.38333 20.0007 9.68333 20 10V19C20 19.55 19.804 20.021 19.412 20.413C19.02 20.805 18.5493 21.0007 18 21H15C14.7167 21 14.4793 20.904 14.288 20.712C14.0967 20.52 14.0007 20.2827 14 20V15C14 14.7167 13.904 14.4793 13.712 14.288C13.52 14.0967 13.2827 14.0007 13 14H11C10.7167 14 10.4793 14.096 10.288 14.288C10.0967 14.48 10.0007 14.7173 10 15V20C10 20.2833 9.904 20.521 9.712 20.713C9.52 20.905 9.28267 21.0007 9 21H6C5.45 21 4.97933 20.8043 4.588 20.413C4.19667 20.0217 4.00067 19.5507 4 19Z" fill="#94D1FF"/>
                        </svg>

 
                        `)}`}
                          />{" "}
                          Home
                        </li>


                        {["Admin", "Agent", "Owner"].includes(
                              medata?.user?.Role
                            ) ? (
                              <>
                                   <NavLink
                          to="/admin/dashboard"
                          className={({ isActive }) =>
                            `AdminAside-navLink ${
                              isActive ? "active" : "hover"
                            }`
                          }
                        >
                          <img
                            src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/Dashboard.svg "
                            alt="Dashboard Icon"
                            className={`AdminAside-icon ${
                              location.pathname === "/admin/dashboard"
                                ? "active"
                                : ""
                            }`}
                          />
                          Dashboard
                        </NavLink>
                                   {/* -----------------------------Agent-admin AllUserResponse --------------------------------------------- */}

                            {medata.user.Role == "Agent" ? (
                              <NavLink
                                to="/admin/agent-user-Response-action"
                                className={({ isActive }) =>
                                  `AdminAside-navLink ${
                                    isActive ? "active" : "hover"
                                  }`
                                }
                              >
                                <img
                                  src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/Dashboard.svg "
                                  alt="Dashboard Icon"
                                  className={`AdminAside-icon ${
                                    location.pathname ===
                                    "/admin/all-asign-post-Response-action"
                                      ? "active"
                                      : ""
                                  }`}
                                />
                                All Response
                              </NavLink>
                            ) : (
                              <NavLink
                                to="/admin/all-user-Response-action"
                                className={({ isActive }) =>
                                  `AdminAside-navLink ${
                                    isActive ? "active" : "hover"
                                  }`
                                }
                              >
                                <img
                                  src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/Dashboard.svg "
                                  alt="Dashboard Icon"
                                  className={`AdminAside-icon ${
                                    location.pathname ===
                                    "/admin/all-user-Response-action"
                                      ? "active"
                                      : ""
                                  }`}
                                />
                                All Response
                              </NavLink>
                            )}
                        
                         {/* Fresh Property Routing / */}
            <NavLink
              to="/admin/fresh-property"
              className={({ isActive }) =>
                `AdminAside-navLink ${isActive ? "active" : "hover"}`
              }><img
                src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/Dashboard.svg"
                alt="Dashboard Icon"
              
              />Fresh property</NavLink>
                        
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
                            src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/agent.svg "
                            alt="Admin Icon"
                            className={`AdminAside-icon ${
                              location.search.includes("Role=Admin")
                                ? "active"
                                : ""
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
                            src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/Admin.svg "
                            alt="Agent Icon"
                            className={`AdminAside-icon ${
                              location.search.includes("Role=Agent")
                                ? "active"
                                : ""
                            }`}
                          />
                          Agent
                        </NavLink>
                               {/* admin routes  */}
                               
                               </>
                            ) : (
                              <> 
                                <NavLink to="/user">
                              <li
                                className={`navItem ${
                                  location.pathname == "/user"
                                    ? "active-btn-nav"
                                    : ""
                                }`}
                              >
                                <img
                                  className=""
                                  src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/Profile.svg "
                                  alt="profile"
                                />
                                Profile
                              </li>
                            </NavLink>

                            <NavLink to="/user/my-post/all-response">
                              <li
                                className={`navItem navItem mob-hide ${
                                  location.pathname ==
                                  "/user/my-post/all-response"
                                    ? "active-btn-nav"
                                    : ""
                                } `}
                              >
                                <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/NewLeads.svg " alt="my-visits" />
                                All Response
                              </li>
                            </NavLink>
                            
                              <NavLink to="/user/my-listing ">
                              <li
                                className={`navItem ${
                                  location.pathname == "/user/my-listing"
                                    ? "active-btn-nav"
                                    : ""
                                } `}
                              >
                                <img
                                  className=""
                                  src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/MyListing.svg "
                                  alt="my listing"
                                />
                                My Listing
                              </li>
                            </NavLink>

                          
                            <NavLink to="/user/favourite-post">
                              <li
                                className={`navItem ${
                                  location.pathname == "/user/favourite-post"
                                    ? "active-btn-nav"
                                    : ""
                                }`}
                              >
                                <img
                                  className=""
                                  src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/Fav-Post.svg "
                                  alt="shortlisted"
                                />
                                Shortlisted Property
                              </li>
                            </NavLink>
                              {/* simple user  */}
                              
                              </>
                            )}

                       

                        {/* {!["Admin", "Agent", "Owner"].includes(
                          medata?.user?.Role
                        ) && (
                          <>
                          
 
                          </>
                        )} */}

                        <li
                          className="navItem  sell-btn hide-for-pc"
                          onClick={() => {
                            if (medata && medata.IsAuthenticated === true) {
                              navigate("/user/post");
                            } else {
                              navigate("/login");
                            }
                          }}
                        >
                          <img
                            alt="dropdown-icon`"
                            className="dropbtn-nav-1"
                            onClick={() => {
                              setIsOpen(!isOpen);
                            }}
                            src={`data:image/svg+xml;utf8,${encodeURIComponent(`
                       <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="Vector" d="M4.85889 11.0159L5.21244 11.3695L5.566 11.0159L9.80345 6.77849L10.157 6.42493L9.80345 6.07138L8.73471 5.00264L8.38116 4.64909L8.02761 5.00264L5.21244 7.81781L3.99101 6.59638L3.63746 6.24282L3.28391 6.59638L2.21517 7.66511L1.86162 8.01867L2.21517 8.37222L4.85889 11.0159ZM9.8989 12.2157C8.85833 13.6477 7.5611 14.5616 6.00002 14.9831C4.43938 14.5612 3.14233 13.6471 2.10172 12.215C1.03195 10.7427 0.500498 9.11734 0.5 7.32493C0.5 7.32488 0.5 7.32484 0.5 7.32479L0.5 3.09648L5.99993 1.034L11.4999 3.09648V7.32493C11.4999 9.11788 10.9687 10.7435 9.8989 12.2157Z" fill="#94D1FF" stroke="#94D1FF"/>
                        </svg>


                      `)}`}
                          />
                          Post Property
                          <span className="header-free"> Free</span>
                        </li>
                        <li className="navItem " onClick={LogoutUserFunc}>
                          <img
                            alt="dropdown-icon`"
                            className="dropbtn-nav"
                            onClick={() => {
                              setIsOpen(!isOpen);
                            }}
                            src={`data:image/svg+xml;utf8,${encodeURIComponent(`
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 21C4.45 21 3.97933 20.8043 3.588 20.413C3.19667 20.0217 3.00067 19.5507 3 19V5C3 4.45 3.196 3.97933 3.588 3.588C3.98 3.19667 4.45067 3.00067 5 3H12V5H5V19H12V21H5ZM16 17L14.625 15.55L17.175 13H9V11H17.175L14.625 8.45L16 7L21 12L16 17Z" fill="#94D1FF"/>
                          </svg>

 
                        `)}`}
                          />
                          Logout
                        </li>

                        {/* <div className="needhelp-innavbar">
                        <img
                          src={`data:image/svg+xml;utf8,${encodeURIComponent(`
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                            <path d="M15.492 7.91602H15.5M18.492 7.91602H18.5M22 7.69902C22 10.341 19.761 12.483 17 12.483C16.6747 12.483 16.3523 12.453 16.033 12.393C15.803 12.35 15.688 12.329 15.608 12.341C15.528 12.353 15.414 12.413 15.188 12.534C14.5409 12.8789 13.7963 12.9948 13.075 12.863C13.3507 12.5224 13.5376 12.1186 13.619 11.688C13.669 11.423 13.545 11.166 13.359 10.978C12.4912 10.1071 12.0027 8.9285 12 7.69902C12 5.05802 14.239 2.91602 17 2.91602C19.761 2.91602 22 5.05802 22 7.69902ZM7.50199 21.916H4.71799C4.39499 21.916 4.06999 21.87 3.77299 21.743C2.80699 21.328 2.31599 20.779 2.08799 20.436C2.02611 20.341 1.99571 20.2289 2.0011 20.1157C2.00648 20.0024 2.04738 19.8937 2.11799 19.805C3.23799 18.317 5.83799 17.419 7.50699 17.419C9.17499 17.419 11.771 18.317 12.891 19.805C13.032 19.992 13.051 20.241 12.921 20.436C12.692 20.779 12.201 21.328 11.235 21.743C10.9349 21.8638 10.6134 21.9226 10.29 21.916H7.50199ZM10.286 12.205C10.2855 12.5696 10.2131 12.9304 10.0732 13.267C9.93316 13.6036 9.72824 13.9094 9.47009 14.1668C9.21195 14.4242 8.90563 14.6282 8.56863 14.7672C8.23163 14.9063 7.87054 14.9775 7.50599 14.977C6.7701 14.9775 6.0641 14.6859 5.54318 14.1661C5.02227 13.6463 4.72905 12.9409 4.72799 12.205C4.72839 11.8405 4.80058 11.4796 4.94045 11.1429C5.08032 10.8063 5.28513 10.5005 5.54319 10.243C5.80124 9.98547 6.10749 9.78132 6.44444 9.64218C6.78139 9.50304 7.14244 9.43162 7.50699 9.43202C7.87154 9.43162 8.2326 9.50304 8.56955 9.64218C8.9065 9.78132 9.21275 9.98547 9.4708 10.243C9.72886 10.5005 9.93366 10.8063 10.0735 11.1429C10.2134 11.4796 10.2856 11.8405 10.286 12.205Z" stroke="#0078D4" stroke-linecap="round" stroke-linejoin="round"/>
                         </svg>
                       `)}`}
                          alt="icon"
                        />
                        <h4>Need Help?</h4>
                        <p className="needhelp-innavbar-paragraph">
                          Feel free to contact us and we will always help you
                          through the process
                        </p>
                        <div className="needhelp-innavbar-contact-main">
                          <p className="needhelp-innavbar-contact">
                            +91 783-784-0785
                          </p>
                          <p className="needhelp-innavbar-or">Or</p>
                          <p className="needhelp-innavbar-contact">
                            support@propertydekho247.com
                          </p>
                        </div>
                      </div> */}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* <li
              ref={ChannelPartnerBtnRef}
              onClick={() => {
                setShowChannelPartner(true);
              }}
            >
              Channel patner{" "}
            </li> */}
          </ul>
        </div>
      </nav>

      {showChannelPartner && (
        <WindowComponent
          Component={ChannelPartner}
          SetShow={setShowChannelPartner}
          BtnRef={ChannelPartnerBtnRef}
        />
      )}
    </>
  );
};

export default Navbar;
