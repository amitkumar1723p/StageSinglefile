import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./ProfileHeader.css";
import { useSelector } from "react-redux";
import { GetMeDetailsAction, GetPost_BiddingDocumentAction, ProfileUpdateAction } from "../../../Action/userAction";
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
  const [name, setName] = useState( medata?.user?.Name?.charAt(0).toUpperCase() + medata?.user?.Name?.slice(1));
  const [Lastname, setLastName] = useState(medata?.user?.LastName?.charAt(0).toUpperCase() + medata?.user?.LastName?.slice(1));
  const [email, setEmail] = useState(medata?.user?.email);
  const [number, setNumber] = useState(medata?.user?.ContactNumber);
  // Function to handle the edit button click
  const handleEdit = () => {
    setVarb({ Name: name,LastName:Lastname, email: email, ContactNumber: number });
    if(number !== medata?.user?.ContactNumber){
 
      dispatch(ProfileEditAction({ ContactNumber: number }));
    }
    else{
      const updateData={ Name: name,LastName:Lastname, email: email, ContactNumber: number };
           
          dispatch(ProfileUpdateAction(updateData))
    }
  };
  // Check if any changes were made to the fields
  const hasChanges =
    name !== medata?.user?.Name?.charAt(0).toUpperCase() + medata?.user?.Name?.slice(1) ||
    Lastname !== medata?.user?.LastName?.charAt(0).toUpperCase() + medata?.user?.LastName?.slice(1)||
    email !== medata?.user?.email ||
    number !== medata?.user?.ContactNumber;
  // Effect to handle navigation on successful profile update

  
   
  //  useEffect(()=>{
 
  //      console.log(AlertData)
  //       console.log(AlertType)
  //   if(AlertData?.success){
  //     alert("get user details")
  //     dispatch(GetMeDetailsAction());     }

  //  },[AlertData])
   const handleEnableEdit = (e) => {
    e.preventDefault();
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
                        <label>First Name:</label>
                        <input
                          className="profile-name"
                          type="text"
                          value={name }
                          onChange={(e) => setName(e.target.value)} // Update name state
                        />
                      </div>
                      <div className="profile-section-data">
                        <label>Last Name:</label>
                        <input
                          className="profile-name"
                          type="text"
                          value={Lastname? Lastname :""}
                          placeholder={Lastname? "" :"Please Update Your Last Name"}
                          onChange={(e) => setLastName(e.target.value)} // Update name state
                        />
                      </div>
                
                    </div>

              <div className="profileNameEmail">
              <div className="profile-section-data">
                      <label>Contact Number:</label>
                      <input
                        className="profile-email"
                        type="tel"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)} // Update number state
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
                    {hasChanges ? (
                      <Link
                        to={number !== medata?.user?.ContactNumber ? `/user/profileUpdate`:""}
                        className="editProfileButton"
                        onClick={handleEdit}
                      >
                        <button>Update Profile</button>
                      </Link>
                    ) : (
                      <div
                        className="editProfileButton"
                        
                      >
                        <div className="button-section-dashborad">
                          <div className="whatapp-notify ">
                            {/* <img
                              className="icon-wp"
                              src="/img/whatapp.png"
                              alt="whatapp logo"
                            /> */}
                            <p>Receive updates</p>
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
                        <button onClick={handleEnableEdit}>Edit Profile</button>
                      </div>
                    )}
                  </form>
                </header>
              )}
            </div>
          </div>
        </div>
        <Link to="/user/post">
       
        <div className="dashboard-right-side">
          <img src="img/dash-banner.svg" alt="dash-banner" style={{height:'100%', width: 'auto'}} />
        </div>
         </Link>
      </div>
    </>
  );
}

export default ProfileHeader;
