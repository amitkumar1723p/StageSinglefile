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
// console.log("medata" ,medata)
   
  // Function to handle the edit button click
  const handleEdit = () => {
    setVarb({ Name: name, email: email, ContactNumber: number });
    dispatch(ProfileEditAction({ ContactNumber: number }));
  };
  // Check if any changes were made to the fields
  const hasChanges = name !== medata.user.Name || email !== medata.user.email || number !== medata.user.ContactNumber;
  // Effect to handle navigation on successful profile update
  const handleEnableEdit=()=>{
    alert("please make changes !")
  }

  return (
    <>
      <div className="main-profile-dashboard-section">
        <div className="top-section-in-profile">
          <div className="top-section-in-profile-left-section">
            <h3>Welcome to your Profile</h3>
            <p>
              Manage, Explore, Achieve – Your Property Adventure Begins Here!
            </p>
          </div>
          <p className="Last_Updated-dashborad">Last Updated on: 20 Dec 2024</p>
        </div>

        <div className="dashborad-section-left-right">
          <div className="dashborad-section-left">
            <div className="profile-main-box">
              {medata && medata.IsAuthenticated == true && (
                <header>
                  <form>
                    <div className="profileNameEmail">
                    <div >
                      <label>Name:</label>
                      <input
                      className="profile-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)} // Update name state
                      />
                    </div>
                    <div>
                      <label>Email:</label>
                      <input
                      className="profile-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Update email state
                      />
                    </div>
                    </div>

                    <div>
                      <label>Contact Number:</label>
                      <input
                        className="profile-name-ans ans"
                        type="tel"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)} // Update number state
                      />
                    </div>
                    {hasChanges ?
                    <Link to="/user/profileUpdate"  className="editProfileButton" onClick={handleEdit}>
                        <button >Update Profile</button>
                      </Link>
                      :  <div className="editProfileButton" onClick={handleEnableEdit}>
                          <button >Edit Profile</button>
                    </div>}
                  </form>

                  <div className="button-section-dashborad">
                    <div className="whatapp-notify ">
                      <img
                        className="icon-wp"
                        src="/img/whatapp.png"
                        alt="whatapp logo"
                      />
                      <p>Receive updates on whatsapp</p>
                      <div>
                        {/* <button  style={{ padding: "5px", borderRadius: "10px" }}  onClick={handleToggle}>
                   {isToggled ? 'whatsApp status Show' : 'whatsApp status hide'} 
              </button> */}

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
                </header>
              )}
            </div>
            <div className="need-help-box">
              <img
                src={`data:image/svg+xml;utf8,${encodeURIComponent(`
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
  <path d="M15.492 7.91602H15.5M18.492 7.91602H18.5M22 7.69902C22 10.341 19.761 12.483 17 12.483C16.6747 12.483 16.3523 12.453 16.033 12.393C15.803 12.35 15.688 12.329 15.608 12.341C15.528 12.353 15.414 12.413 15.188 12.534C14.5409 12.8789 13.7963 12.9948 13.075 12.863C13.3507 12.5224 13.5376 12.1186 13.619 11.688C13.669 11.423 13.545 11.166 13.359 10.978C12.4912 10.1071 12.0027 8.9285 12 7.69902C12 5.05802 14.239 2.91602 17 2.91602C19.761 2.91602 22 5.05802 22 7.69902ZM7.50199 21.916H4.71799C4.39499 21.916 4.06999 21.87 3.77299 21.743C2.80699 21.328 2.31599 20.779 2.08799 20.436C2.02611 20.341 1.99571 20.2289 2.0011 20.1157C2.00648 20.0024 2.04738 19.8937 2.11799 19.805C3.23799 18.317 5.83799 17.419 7.50699 17.419C9.17499 17.419 11.771 18.317 12.891 19.805C13.032 19.992 13.051 20.241 12.921 20.436C12.692 20.779 12.201 21.328 11.235 21.743C10.9349 21.8638 10.6134 21.9226 10.29 21.916H7.50199ZM10.286 12.205C10.2855 12.5696 10.2131 12.9304 10.0732 13.267C9.93316 13.6036 9.72824 13.9094 9.47009 14.1668C9.21195 14.4242 8.90563 14.6282 8.56863 14.7672C8.23163 14.9063 7.87054 14.9775 7.50599 14.977C6.7701 14.9775 6.0641 14.6859 5.54318 14.1661C5.02227 13.6463 4.72905 12.9409 4.72799 12.205C4.72839 11.8405 4.80058 11.4796 4.94045 11.1429C5.08032 10.8063 5.28513 10.5005 5.54319 10.243C5.80124 9.98547 6.10749 9.78132 6.44444 9.64218C6.78139 9.50304 7.14244 9.43162 7.50699 9.43202C7.87154 9.43162 8.2326 9.50304 8.56955 9.64218C8.9065 9.78132 9.21275 9.98547 9.4708 10.243C9.72886 10.5005 9.93366 10.8063 10.0735 11.1429C10.2134 11.4796 10.2856 11.8405 10.286 12.205Z" stroke="#0078D4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  `)}`}
                alt="icon"
              />
              <h4>Need Help?</h4>
              <p className="need-help-box-paragraph">
                Feel free to contact us and we will always help you through the
                process
              </p>
              <div className="need-help-box-contact-main">
                <p className="need-help-box-contact">+91 783-784-0785</p>
                <p className="need-help-box-or">Or</p>
                <p className="need-help-box-contact">
                  support@propertydekho.com
                </p>
              </div>
            </div>
          </div>
          <div className="dashboard-right-side">
            <img src="img/dash-banner.svg" alt="dash-banner" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileHeader;
