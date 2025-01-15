import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link, useNavigate, Navigate } from "react-router-dom";
import { GetAllAdminAction } from "../../Action/userAction";
import { adminAssigned } from "../../Action/postAction";
import { adminRemovePropertyId } from "../../Action/postAction";
import { useDispatch, useSelector } from "react-redux";
import {
  // AddPriceAction,
  ReOpenPostAction,
  VerifyPostAction,
} from "../../Action/postAction";
import "./AdminListingCard.css";
import { UserContext } from "../CreateContext/CreateContext";

export default function AdminListingCard({ PostData, index }) {
  const [formatDate, setFormatDate] = useState({
    ActiveDate: "",
    ExpiredDate: "",
  });
  const navigate = useNavigate();
  const formatReservePrice = (price) => {
    if (price >= 10000000) {
      return `₹ ${(Math.floor(price / 100000) / 100).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹ ${(Math.floor(price / 1000) / 100).toFixed(2)} L`;
    } else if (price >= 1000) {
      return `₹ ${(Math.floor(price / 10) / 100).toFixed(2)} K`;
    } else {
      return `₹ ${price.toFixed(2)}`;
    }
  };

  const { medata } = useSelector((state) => {
    return state.meDetails;
  });
  useEffect(() => {
    let dateString = PostData.PostVerifyData?.Time;
    if (!dateString) {
      setFormatDate({
        ExpiredDate: "Invalid Date",
        ActiveDate: "Invalid Date",
      });
    } else {
      const date = new Date(dateString);
      const After90Days = new Date(date.getTime() + 90 * 24 * 60 * 60 * 1000);
      let activedate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      let postExpireddate = After90Days.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      setFormatDate({ ActiveDate: activedate, ExpiredDate: postExpireddate });
    }
  }, [PostData.PostVerifyData?.Time]);

  const location = useLocation();
  const dispatch = useDispatch();

  const [PropertyAddress, setPropertyAddress] = useState("");

  useEffect(() => {
    setPropertyAddress(
      `${PostData.PropertyDetails.BHKType} BHk ${PostData.BasicDetails.ApartmentType} For  ${PostData.BasicDetails.PropertyAdType} In ${PostData.LocationDetails.Locality}`
    );
  }, [PostData]);

  // ====================================== Store the id on click property id
  const { loading, data } = useSelector((state) => {
    return state.AdminData;
  });

console.log(data,"kjgkjesf")
  const { propertyId, setPropertyId } = useContext(UserContext);

  const PropertyIdCheck = (id) => {
    // console.log(id,"hellodjdhfgjhsd")
    setPropertyId((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((item) => item !== id);
      } else {
        return [...prevIds, id];
      }
    });
  };
  // ====================================== Store the id on click property id
  // Check if no user is assigned
  const isAssignedToAnyUser = data?.Admin?.some((user) =>
    user.AssignedPropertyId.includes(PostData?._id)
  );
  // remove from Assign work start here
  const [selectedUserData, setSelectedUserData] = useState(null); // Initialize state to store selected user and post IDs

  const handleButtonClick = (userId, postId) => {
    alert("Are You Sure !");
    setSelectedUserData({ userId, postId }); // Update the state with user._id and PostData._id
  };

  useEffect(() => {
    if (selectedUserData) {
      dispatch(adminRemovePropertyId(selectedUserData));
      setSelectedUserData(null);
    }
  }, [selectedUserData]);

  // end here remove assign work
  return (
    <div className="Admin-property-post-card-main-box">
      <div className="Admin-property-post-card-main">
        <div className="property-post-card" id="property-card-1">
          <div className="admin-property-card-info">
            <div className="heading-name">
              {PostData.LocationDetails.ProjectName}

              <div className="edit-del-section">
                <div className="asign-user">
                  <p>
                    Assign to:{" "}
                    {isAssignedToAnyUser ? (
                      data?.Admin?.map((user) => {
                        if (user.AssignedPropertyId.includes(PostData._id)) {
                          return (
                            <button
                              className="adminNameButton"
                              key={user._id} // Use unique id for key
                              onClick={() =>
                                handleButtonClick(user._id, PostData._id)
                              }
                            >
                              {user.Name} <span>🗑️</span>
                            </button>
                          );
                        }
                        return null;
                      })
                    ) : (
                      <label>
                        <input
                          type="checkbox"
                          checked={propertyId.includes(PostData._id)}
                          onChange={() => PropertyIdCheck(PostData._id)}
                        />
                      </label>
                    )}
                  </p>
                </div>

                {location.pathname.includes("admin") && (
                  <div className="delete-edit-box">
                    <Link to={`/admin/post/update/${PostData._id}`}>
                      <img src="/img/edit.png" className="editIcon" />
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="three-section-data">
              <div className="Propertyfullname">
                <p className="admin-property-address">{PropertyAddress}</p>
              </div>

              <div className="Admin-main-data-section">
                <div className="admin-Price-section-card">
                  <div className="Reserveprice-sec">
                    <p className="admin-price-pr-anwser">
                      {/* Show Reserve Price  */}
                      {PostData.BasicDetails.PropertyAdType == "Sale" && (
                        <>
                          <span className="price-rp-que"> Reserve Price </span>:
                          <span className="price-section">
                            {formatReservePrice(
                              PostData.PricingDetails.ExpectedPrice
                            )}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                  {PostData.BasicDetails.PropertyAdType == "Rent" && (
                    <>
                      <>
                        <div className="admin-rent-deposite-section">
                          <div>
                            <p className="price-ans">
                              {formatReservePrice(
                                PostData.PricingDetails.ExpectedRent
                              )}
                              <span>/Month </span>
                            </p>
                            {/* <p className="question-box"> </p> */}
                          </div>
                        </div>
                      </>
                    </>
                  )}
                  <p className="admin-card-area-section">15000 per Sqft</p>
                </div>

                <div className="property-id">
                  <p className="admin-card-heading">property id</p>
                  <p className="admin-card-heading-ans">{PostData._id}</p>
                </div>

                <div className="Property-status-section">
                  <p className="admin-card-heading">Current status</p>
                  {PostData.PostExpired ? (
                    <p className="Status-section-admin inactive-sign">
                      {" "}
                      Expired
                    </p>
                  ) : (
                    <>
                      {PostData.PostVerify ? (
                        <p className="Status-section-admin active-sign">
                          Active
                        </p>
                      ) : (
                        <p className="Status-section-admin inactive-sign">
                          In-Active
                        </p>
                      )}
                    </>
                  )}
                </div>

                <div className="date-post-section">
                  <div className="poston-date">
                    <p className="admin-card-heading">Post on</p>
                    <p className="admin-card-heading-ans">
                      {formatDate.ActiveDate}
                      {/* {formatDate(PostData.PostVerifyData?.Time)} */}
                    </p>
                  </div>

                  <div className="Expire-section-section">
                    <p className="admin-card-heading">Post on</p>
                    <p className="admin-card-heading-ans">
                      {formatDate.ExpiredDate}
                    </p>
                  </div>
                </div>
              </div>

              <div className="response-section">
                <p
                  onClick={() => {
                    navigate(`/admin/schedule-visit/${PostData._id}`);
                  }}
                >
                  View All Response
                </p>
                <p
                  onClick={() => {
                    navigate(`/admin/recive-offer/${PostData._id}`);
                  }}
                >
                  View Offer Received
                </p>
                <p>Extend Duration</p>
                <div className="user-name-contact">
                  <span>Posted by : </span>

                  <span>{PostData.CreatePostUser?.Name}</span>
                </div>
                <div className="user-name-contact">
                  <span>Mobile No. : </span>
                  {/* <span>
                    {PostData.CreatPostUser &&
                    PostData.CreatPostUser.ContactNumber
                      ? PostData.CreatPostUser.ContactNumber
                      : "9999999999"}
                  </span> */}
                  <span>{PostData.CreatePostUser?.ContactNumber}</span>
                </div>
              </div>

              <div className="admin-btn-active-btn">
                <Link
                  to={`/post-detail/${PropertyAddress.toLowerCase()
                    .replaceAll(" ", "-")
                    .replace(",", "")
                    .replaceAll("/", "-")}-${PostData._id}`}
                >
                  <button className="contact-button">View Listing</button>
                </Link>
                <div className="verify-box-section">
                  {/* {location.pathname.includes("admin") && ( */}
                  {PostData.PostExpired ? (
                    <button
                      onClick={() => {
                        dispatch(ReOpenPostAction(PostData._id));
                      }}
                    >
                      Re-Open
                    </button>
                  ) : (
                    <>
                      {PostData.PostVerify ? (
                        <button
                          className="post-verify-btn In-Active-btn"
                          onClick={() => {
                            let Confrimbox = window.confirm(
                              "Are you Sure Verify This Post"
                            );
                            if (Confrimbox) {
                              let postdata = { PostVerify: false };
                              let postid = PostData._id;
                              dispatch(VerifyPostAction({ postdata }, postid));
                            }
                          }}
                        >
                          {/* Unverify  */} In-Active
                        </button>
                      ) : (
                        <button
                          className="post-verify-btn Active-btn "
                          onClick={() => {
                            let Confrimbox = window.confirm(
                              "Are you Sure Verify This Post"
                            );

                            if (Confrimbox) {
                              let postdata = { PostVerify: true };
                              let postid = PostData._id;
                              dispatch(VerifyPostAction({ postdata }, postid));
                            }
                          }}
                        >
                          {/* Verify */}
                          Active
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
