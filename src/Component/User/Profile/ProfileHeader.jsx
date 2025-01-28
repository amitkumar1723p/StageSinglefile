import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./ProfileHeader.css";
import { useSelector } from "react-redux";
import { GetPost_BiddingDocumentAction } from "../../../Action/userAction";
import { UserContext } from "../../CreateContext/CreateContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ProfileEditAction } from "../../../Action/userAction";

function ProfileHeader() {
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });

  // Get state from Redux store
  const { data, LodingType } = useSelector((state) => {
    return state.userData;
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // useEffect(()=>{

  // } ,[medata])
  const styles = {
    // Toggle switch styles
    toggleSwitchContainer: {
      position: "relative",
      display: "inline-block",
      width: "50px",
      height: "24px",
    },

    toggleSwitchInput: {
      opacity: 0,
      width: 0,
      height: 0,
    },

    slider: {
      position: "absolute",
      cursor: "pointer",
      backgroundColor: "#ccc",
      borderRadius: "24px",
      width: "100%",
      height: "100%",
      transition: "background-color 0.3s",
    },

    sliderBefore: {
      content: '""',
      position: "absolute",
      height: "20px",
      width: "20px",
      left: "4px",
      bottom: "2px",
      backgroundColor: "white",
      borderRadius: "50%",
      transition: "transform 0.3s",
    },

    // Toggled state when input is checked
    toggleChecked: {
      backgroundColor: "#4caf50",
    },

    toggleCheckedBefore: {
      transform: "translateX(26px)",
    },
  };

  const [isToggled, setIsToggled] = useState(false);

  // Toggle the state when the button is clicked
  const handleToggleChange = () => {
    setIsToggled(!isToggled);
  };
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++Editing start here+++++++++++++++++
  // Initialize state with the data from the backend

  const { setVarb } = useContext(UserContext);
  const [name, setName] = useState(medata?.user?.Name);
  const [email, setEmail] = useState(medata?.user?.email);
  const [number, setNumber] = useState(medata?.user?.ContactNumber);

  // Function to handle the edit button click
  const handleEdit = () => {
    setVarb({ Name: name, email: email, ContactNumber: number });
    dispatch(ProfileEditAction({ ContactNumber: number }));
  };
  // Check if any changes were made to the fields
  const hasChanges =
    name !== medata.user.Name ||
    email !== medata.user.email ||
    number !== medata.user.ContactNumber;
  // Effect to handle navigation on successful profile update
  const handleEnableEdit = () => {
    alert("please make changes !");
  };

  return (
    <>
      <div className="main-profile-dashboard-section">
        <div className="dashborad-section-left-right">
          <div className="top-section-in-profile">
            <div className="top-section-in-profile-left-section">
              <h3>Welcome to your Profile</h3>
              <p>
                Manage, Explore, Achieve – Your Property Adventure Begins Here!
              </p>
            </div>
          </div>
          <div className="dashborad-section-left">
            <div className="profile-main-box">
              {medata && medata.IsAuthenticated == true && (
                <header>
                  <form>
                    <div className="medata-role">
                      <p className="register-as-role"> You are registered as: </p>
                      <span>{medata.user.Role}</span>
                    </div>
                    <div className="profileNameEmail">
                      <div className="profile-section-data">
                        <label>Name:</label>
                        <input
                          className="profile-name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)} // Update name state
                        />
                      </div>
                      <div className="profile-section-data">
                        <label>Email:</label>
                        <input
                          className="profile-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)} // Update email state
                        />
                      </div>
                    </div>

                    <div className="profile-section-data">
                      <label>Contact Number:</label>
                      <input
                        className="profile-name-ans ans"
                        type="tel"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)} // Update number state
                      />
                    </div>
                    {hasChanges ? (
                      <Link
                        to="/user/profileUpdate"
                        className="editProfileButton"
                        onClick={handleEdit}
                      >
                        <button>Update Profile</button>
                      </Link>
                    ) : (
                      <div
                        className="editProfileButton"
                        onClick={handleEnableEdit}
                      >
                        <div className="button-section-dashborad">
                          <div className="whatapp-notify ">
                            <img
                              className="icon-wp"
                              src="/img/whatapp.png"
                              alt="whatapp logo"
                            />
                            <p>Receive updates on whatsapp</p>
                            <div>
                              <label style={styles.toggleSwitchContainer}>
                                <input
                                  type="checkbox"
                                  checked={isToggled}
                                  onChange={handleToggleChange}
                                  style={styles.toggleSwitchInput}
                                />
                                <span
                                  style={{
                                    ...styles.slider,
                                    ...(isToggled ? styles.toggleChecked : {}),
                                  }}
                                >
                                  <span
                                    style={{
                                      ...styles.sliderBefore,
                                      ...(isToggled
                                        ? styles.toggleCheckedBefore
                                        : {}),
                                    }}
                                  />
                                </span>
                              </label>
                            </div>
                          </div>
                          {/* toggle button for hide the whatsapp  */}

                          {/* <div className="edit-btn-dashborad">
                      <Link to="/user/profileUpdate" style={styles.b1}>
                        <span style={styles.text1}>Edit Profile</span>
                      </Link>
                    </div> */}
                        </div>
                        <button>Edit Profile</button>
                      </div>
                    )}
                  </form>
                </header>
              )}
            </div>
          </div>
        </div>
        <div className="dashboard-right-side">
          <img src="img/dash-banner.svg" alt="dash-banner" />
        </div>
      </div>
    </>
  );
}

export default ProfileHeader;
