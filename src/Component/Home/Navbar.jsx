import React, { useContext, useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogoutAction } from "../../Action/userAction";
import { AlertAction } from "../../Action/alertAction";

import { GetMeDetailsAction } from "../../Action/userAction";
import WindowComponent from "../WindowComponent";
import ChannelPartner from "./ChannelPartner";

import { UserContext } from "../CreateContext/CreateContext";
const Navbar = () => {
  const { setRedirectPath, RedirectPath } = useContext(UserContext);
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
          <div className="logo" onClick={()=>{ navigate("/")}}>
            <h2>
              Property <span> Dekho247</span>
            </h2>
          </div>
          {/* <Link to={"sqpt/admin/request"}>Admin</Link>
          <Link to={"sqpt/admin/login"}>AdminLogin</Link>
          <Link to={"user/post/update"}>Rough</Link>  */}

          <ul className="nav-links">
            {!["Admin", "Owner"].includes(medata?.user?.Role) && (
              <li
                className="nav-link sell-btn"
                onClick={() => {
                  if (medata && medata.IsAuthenticated === true) {
                    navigate("/user/post");
                  } else {
                    navigate("/login");
                  }
                }}
              >
                Post Property
                <span className="header-free"> Free</span>
              </li>
            )}
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
                        "PropertyOwner",
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

                {["Admin", "Owner"].includes(medata.user.Role) && (
                  <li
                    className="nav-link sell-btn"
                    onClick={() => {
                      navigate("/admin/dashboard");
                    }}
                  >
                    Admin Dashboard
                  </li>
                )}

                <div className="nav-dropdown nav-computer-item">
                  <div
                    className="dropbtn btn-drop"
                    onClick={() => {
                      setIsOpen(!isOpen);
                    }}
                  >
                    <span className="name-user-nav">
                      {nameCode ? (
                        nameCode
                      ) : (
                        <>
                          {" "}
                          <img
                            src={`data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
      <path d="M1 15.5C1 14.4391 1.42143 13.4217 2.17157 12.6716C2.92172 11.9214 3.93913 11.5 5 11.5H13C14.0609 11.5 15.0783 11.9214 15.8284 12.6716C16.5786 13.4217 17 14.4391 17 15.5C17 16.0304 16.7893 16.5391 16.4142 16.9142C16.0391 17.2893 15.5304 17.5 15 17.5H3C2.46957 17.5 1.96086 17.2893 1.58579 16.9142C1.21071 16.5391 1 16.0304 1 15.5Z" stroke="#0078D4" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M9 7.5C10.6569 7.5 12 6.15685 12 4.5C12 2.84315 10.6569 1.5 9 1.5C7.34315 1.5 6 2.84315 6 4.5C6 6.15685 7.34315 7.5 9 7.5Z" stroke="#0078D4" stroke-width="1.5"/>
    </svg>
  `)}`}
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
                        className="dropbtn"
                        onClick={() => {
                          setIsOpen(!isOpen);
                        }}
                        src={`data:image/svg+xml;utf8,${encodeURIComponent(`
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.2931 8.79302C11.4807 8.60555 11.735 8.50024 12.0001 8.50024C12.2653 8.50024 12.5196 8.60555 12.7071 8.79302L18.3641 14.45C18.4597 14.5423 18.5358 14.6526 18.5882 14.7746C18.6407 14.8966 18.6682 15.0278 18.6694 15.1606C18.6705 15.2934 18.6452 15.4251 18.595 15.548C18.5447 15.6709 18.4704 15.7825 18.3765 15.8764C18.2826 15.9703 18.171 16.0446 18.0481 16.0948C17.9252 16.1451 17.7935 16.1704 17.6607 16.1693C17.528 16.1681 17.3967 16.1405 17.2747 16.0881C17.1527 16.0357 17.0424 15.9595 16.9501 15.864L12.0001 10.914L7.05014 15.864C6.86154 16.0462 6.60894 16.147 6.34674 16.1447C6.08455 16.1424 5.83373 16.0372 5.64833 15.8518C5.46292 15.6664 5.35775 15.4156 5.35547 15.1534C5.35319 14.8912 5.45399 14.6386 5.63614 14.45L11.2931 8.79302Z" fill="#0078D4"/>
</svg>
                      `)}`}
                      />
                    ) : (
                      <img
                        alt="dropdown-icon`"
                        className="dropbtn"
                        onClick={() => {
                          setIsOpen(!isOpen);
                        }}
                        src={`data:image/svg+xml;utf8,${encodeURIComponent(`
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7069 16.207C12.5193 16.3944 12.265 16.4998 11.9999 16.4998C11.7347 16.4998 11.4804 16.3944 11.2929 16.207L5.63585 10.55C5.54034 10.4577 5.46416 10.3474 5.41175 10.2254C5.35934 10.1034 5.33176 9.97216 5.3306 9.83938C5.32945 9.7066 5.35475 9.57492 5.40503 9.45202C5.45531 9.32913 5.52957 9.21747 5.62346 9.12358C5.71735 9.02969 5.829 8.95544 5.9519 8.90515C6.0748 8.85487 6.20648 8.82957 6.33926 8.83073C6.47204 8.83188 6.60325 8.85947 6.72526 8.91188C6.84726 8.96428 6.95761 9.04047 7.04985 9.13598L11.9999 14.086L16.9499 9.13598C17.1385 8.95382 17.3911 8.85302 17.6533 8.8553C17.9155 8.85758 18.1663 8.96275 18.3517 9.14816C18.5371 9.33357 18.6423 9.58438 18.6445 9.84658C18.6468 10.1088 18.546 10.3614 18.3639 10.55L12.7069 16.207Z" fill="#0078D4"/>
</svg>  
                        `)}`}
                      />
                    )}
                  </div>

                  {isOpen && (
                    <div className="dropdown-content">
                      <li
                        className="Dropdown-section"
                        onClick={() => {
                          navigate("/");
                        }}
                      >
                        Home
                      </li>
                      <li
                        className="Dropdown-section"
                        onClick={() => {
                          navigate("/user");
                        }}
                      >
                        Profile
                      </li>
                      <li className="Dropdown-section" onClick={LogoutUserFunc}>
                        Logout
                      </li>
                      <li
                        className="Dropdown-section sell-btn hide-for-pc"
                        onClick={() => {
                          if (medata && medata.IsAuthenticated === true) {
                            navigate("/user/post");
                          } else {
                            navigate("/login");
                          }
                        }}
                      >
                        Post Property
                        <span className="header-free"> Free</span>
                      </li>
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
