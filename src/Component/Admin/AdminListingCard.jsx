import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link, useNavigate, Navigate } from "react-router-dom";
import { GetAllAdminAction } from "../../Action/userAction";
import {
  adminAssigned,
  showVeirifyPostIconAction,
} from "../../Action/postAction";
import { RemoveAssignPropertyAction } from "../../Action/postAction";
import { useDispatch, useSelector } from "react-redux";
import {
  // AddPriceAction,
  ReOpenPostAction,
  VerifyPostAction,
} from "../../Action/postAction";
import "./AdminListingCard.css";
import { UserContext } from "../CreateContext/CreateContext";

export default function AdminListingCard({
  PostData,
  index,
  setAssignProperty,
  AssignProperty,
}) {
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
  const [isAssignedToAnyUser, setisAssignedToAnyUser] = useState([]);
  const [PropertyAddress, setPropertyAddress] = useState("");
  const [ToggleBtn, setToggleBtn] = useState(false);

  useEffect(() => {
    setPropertyAddress(
      `${PostData.PropertyDetails.BHKType} BHk ${PostData.BasicDetails.ApartmentType} For  ${PostData.BasicDetails.PropertyAdType} In ${PostData.LocationDetails.Locality}`
    );
  }, [PostData]);

  // ====================================== Store the id on click property id
  const { loading, data } = useSelector((state) => {
    return state.AdminData;
  });

  const { data: AssignPostData } = useSelector((state) => {
    return state.AssignPropertys;
  });

  // ====================================== Store the id on click property id
  // Check if no user is assigned
  // const isAssignedToAnyUser = data?.Admin?.some((user) =>
  //   user.AssignedPropertyId.includes(PostData?._id)
  // );
  // remove from Assign work start here


  useEffect(() => {
    if (PostData?.PostVerifyShow) {
      setToggleBtn(true);
    } else {
      setToggleBtn(false);
    }
  }, [PostData?.PostVerifyShow]);

  useEffect(() => {
    if (AssignPostData?.success == true) {
      let AssingPosts = AssignPostData.AssignProperty.filter((item) => {
        return (
          item.AssignedPropertys.some((item) => item.PostId === PostData._id) &&
          item.AdminId._id !== medata?.user?._id
        );
      });

      setisAssignedToAnyUser(AssingPosts);
    }
  }, [AssignPostData]);
  // console.log(AssignProperty,"dfkfvgguervyv")
  // end here remove assign work

  return (
    <div className="Admin-property-post-card-main-box">
      <div className="Admin-property-post-card-main">
        <div className="property-post-card" id="property-card-1">
          {medata?.user?.Role != "Agent" &&
            AssignProperty &&
            isAssignedToAnyUser.length <= 0 && (
              <div className="Assing-to">
                <label>
                  <input
                    type="checkbox"
                    checked={AssignProperty.some(
                      (item) => item.PostId === PostData._id
                    )}
                    onChange={(e) => {
                      if (e.target.checked == true) {
                        setAssignProperty([
                          ...AssignProperty,

                          // PostData._id,
                          {
                            PostId: PostData._id,
                            CreatedBy: medata?.user?._id,
                          },
                        ]);
                      }
                      if (e.target.checked == false) {
                        let removeAssignProperty = AssignProperty.filter(
                          (e) => {
                            return e.PostId != PostData._id;
                          }
                        );
                        setAssignProperty(removeAssignProperty);
                      }
                    }}
                  />
                </label>
              </div>
            )}
          <div className="admin-property-card-info">
            <div className="heading-name">
              {PostData.LocationDetails.ProjectName}
              {medata?.user?.Role != "Agent" && (
                <>
                  <div className="edit-del-section">
                    {AssignProperty && (
                      <div className="asign-user">
                        {isAssignedToAnyUser.length > 0 && (
                          <div className="show-admin-data">
                            {isAssignedToAnyUser.map((AssignPropertys, i) => {
                              return (
                                <div
                                  key={i}
                                  className="adminNameButton"
                                  onClick={() => {
                                    const RemoveAssignProperty = {
                                      AdminId: AssignPropertys.AdminId._id,
                                      PostId: PostData._id,
                                    };

                                    let confrim = window.confirm(
                                      "Are You Sure About This"
                                    );
                                    if (confrim) {
                                      dispatch(
                                        RemoveAssignPropertyAction({
                                          RemoveAssignProperty,
                                        })
                                      );
                                    }
                                  }}
                                >
                                  {AssignPropertys.AdminId?.Name} - (
                                  {AssignPropertys.AdminId?.Role}){" "}
                                  <span>🗑️</span>{" "}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}

                    {location.pathname.includes("admin") && (
                      <div className="delete-edit-box">
                        <Link to={`/admin/post/update/${PostData._id}`}>
                          <img src="/img/edit.png" className="editIcon" />
                        </Link>
                      </div>
                    )}
                  </div>
                </>
              )}
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
                  )}
                  <p className="admin-card-area-section">
                    {PostData.PricingDetails.PricePerSqFt} Per sqft
                  </p>
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
                  // className={location.pathname.includes("schedule-visit"?"select":"")}
                  className={`${
                    location.pathname.includes("/admin/schedule-visit")
                      ? "active-btn"
                      : ""
                  }`}
                  onClick={() => {
                    navigate(`/admin/schedule-visit/${PostData._id}`);
                  }}
                >
                  Schedule Visit
                </p>
                <p
                  className={`${
                    location.pathname.includes("/admin/recive-offer")
                      ? "active-btn"
                      : ""
                  }`}
                  onClick={() => {
                    navigate(`/admin/recive-offer/${PostData._id}`);
                  }}
                >
                  View Offer Received
                </p>
                <p>Extend Duration</p>

                {medata.user.Role != "Agent" && (
                  <>
                    <div className="user-name-contact">
                      <span>Posted by : </span>

                      <span>{PostData.CreatePostUser?.Name}</span>
                    </div>
                    <div className="user-name-contact">
                      <span>Mobile No. : </span>
                      <span>{PostData.CreatePostUser?.ContactNumber}</span>
                    </div>{" "}
                  </>
                )}
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

                {medata?.user?.Role != "Agent" && (
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
                                "Are you Sure In-Active This Post"
                              );
                              if (Confrimbox) {
                                let postdata = { PostVerify: false };
                                let postid = PostData._id;
                                dispatch(
                                  VerifyPostAction({ postdata }, postid)
                                );
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
                                "Are you Sure Active This Post"
                              );

                              if (Confrimbox) {
                                let postdata = { PostVerify: true };
                                let postid = PostData._id;
                                dispatch(
                                  VerifyPostAction({ postdata }, postid)
                                );
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
                )}
              </div>

              {/* <div className="post-verify-trademark">
                {PostData.PostVerifyShow ? (
                  <button
                    onClick={() => {
                      let Confrimbox = window.confirm(
                        "Are you Sure Un-Veirify This Post"
                      );
                      if (Confrimbox) {
                        let postdata = { PostVerifyShow: false };
                        let postid = PostData._id;

                        dispatch(
                          showVeirifyPostIconAction({ postdata }, postid)
                        );
                      }
                    }}
                  >
                    Un-Veirify
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      let Confrimbox = window.confirm(
                        "Are you Sure Verify This Post"
                      );
                      if (Confrimbox) {
                        let postdata = { PostVerifyShow: true };
                        let postid = PostData._id;
                        dispatch(
                          showVeirifyPostIconAction({ postdata }, postid)
                        );
                      }
                    }}
                  >
                    Veirify
                  </button>
                )}
              </div> */}

              <label className="toggle-switch-container">
                <input
                  type="checkbox"
                  checked={ToggleBtn}
                  onChange={(e) => {
                    setToggleBtn(!ToggleBtn);
                    if (e.target.checked == true) {
                      let postdata = { PostVerifyShow: true };
                      let postid = PostData._id;
                      dispatch(showVeirifyPostIconAction({ postdata }, postid));
                    }
                    if (e.target.checked == false) {
                      let postdata = { PostVerifyShow: false };
                      let postid = PostData._id;
                      dispatch(showVeirifyPostIconAction({ postdata }, postid));
                    }

                    //  if(){

                    //  }
                  }}
                  // onChange={}
                  // onClick={}
                  className="toggle-switch-input"
                />

                <span className="toggle-btn-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
