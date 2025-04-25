import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link, useNavigate, Navigate } from "react-router-dom";
import { GetAllAdminAction } from "../../Action/userAction";
import {
  Admin_OwnerGetAllScheduleVisits,
  adminAssigned,
  DeleteAndRestorePostAction,
  PermanentPostDeleteAction,
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
import { FormatDate } from "../../utils/CommonFunction";

export default function AdminListingCard({
  PostData,
  index,
  setAssignProperty,
  AssignProperty,
  selectAllProperty,
  itemsPerPage,
  page,

  activeFilter,
  SearchPostId,
  propertAdType,
  postPerPage,
  onPageActive,
  currenSelected,
  MarkUpdatedPost,
  sortOrder
}) {
  const [formatDate, setFormatDate] = useState({
    ActiveDate: "",
    ExpiredDate: "",
  });
  const navigate = useNavigate();
  const formatReservePrice = (price) => {
    if (price >= 10000000) {
      const value = Math.floor(price / 100000) / 100;
      return `₹ ${value % 1 === 0 ? value.toFixed(0) : value.toFixed(2)} Cr`;
    } else if (price >= 100000) {
      const value = Math.floor(price / 1000) / 100;
      return `₹ ${value % 1 === 0 ? value.toFixed(0) : value.toFixed(2)} L`;
    } else if (price >= 1000) {
      const value = Math.floor(price / 10) / 100;
      return `₹ ${value % 1 === 0 ? value.toFixed(0) : value.toFixed(2)} K`;
    } else {
      return `₹ ${price.toFixed(2)}`;
    }
  };
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });
  useEffect(() => {
    let dateString = PostData?.PostVerifyData?.Time;
    //  console.log( "post id with date",PostData._id ,PostData)
    if (!dateString) {
      setFormatDate({
        ExpiredDate: "Invalid Date",
        ActiveDate: "Invalid Date",
      });
    } else {
      const date = new Date(dateString);
      const After90Days = new Date(date.getTime() + 90 * 24 * 60 * 60 * 1000);
      // Define month names (abbreviated)
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      // Format Active Date as DD-Month-YY
      let activedate = `${("0" + date.getDate()).slice(-2)}-${monthNames[date.getMonth()]
        }-${date.getFullYear().toString().slice(-2)}`;
      // Format Expired Date as DD-Month-YY (90 days after)
      let postExpireddate = `${("0" + After90Days.getDate()).slice(-2)}-${monthNames[After90Days.getMonth()]
        }-${After90Days.getFullYear().toString().slice(-2)}`;
      setFormatDate({ ActiveDate: activedate, ExpiredDate: postExpireddate });
    }
  }, [PostData?.PostVerifyData?.Time]);


  const location = useLocation();
  const dispatch = useDispatch();
  const [isAssignedToAnyUser, setisAssignedToAnyUser] = useState([]);
  const [PropertyAddress, setPropertyAddress] = useState("");
  const [ToggleBtn, setToggleBtn] = useState(false);
  const [VisitAndOfferLength, setVisitAndOfferLength] = useState(undefined);
  useEffect(() => {
    setPropertyAddress(
      `${PostData?.PropertyDetails?.BHKType
        ? `${PostData?.PropertyDetails?.BHKType} BHk`
        : ""
      }  ${PostData?.BasicDetails?.ApartmentType} For  ${PostData?.BasicDetails?.PropertyAdType
      } In ${PostData?.LocationDetails?.Landmark}  ${PostData?.LocationDetails?.City
      }`
    );
  }, [PostData]);
  // ====================================== Store the id on click property id
  const { loading, data } = useSelector((state) => {
    return state.AdminData;
  });

  const { data: AssignPostData } = useSelector((state) => {
    return state.AssignPropertys;
  });

  const { data: VistAndOfferData } = useSelector((state) => {
    return state.VistAndOffer;
  });

  useEffect(() => {
    if (PostData?.PostVerifyShow) {
      setToggleBtn(true);
    } else {
      setToggleBtn(false);
    }
  }, [PostData?.PostVerifyShow]);

  useEffect(() => {
    if (AssignPostData?.success == true) {
      let AssingPosts = AssignPostData?.AssignProperty?.filter((item) => {
        return (
          item.AssignedPropertys.some(
            (item) => item.PostId === PostData?._id
          ) && item.AdminId._id !== medata?.user?._id
        );
      });

      setisAssignedToAnyUser(AssingPosts);
    }
  }, [AssignPostData, PostData?._id]);

  useEffect(() => {
    if (VistAndOfferData?.success == true) {
      let VisitsAndOffers_Data = VistAndOfferData?.VisitAndOffer?.find(
        (item) => {
          return PostData?._id == item.PostId;
        }
      );
      if (VisitsAndOffers_Data) {
        setVisitAndOfferLength(VisitsAndOffers_Data);
      } else {
        setVisitAndOfferLength(undefined);
      }
    }
  }, [VistAndOfferData, PostData]);

  // these are use for manage checked box
  const endIndex = itemsPerPage * page;
  const startIndex = endIndex - itemsPerPage;

  const isChecked = (index) => {
    if (selectAllProperty === true) {
      return index >= startIndex && index <= endIndex;
    }
    return index === 0;
  };


  return (
    <div className="Admin-property-post-card-main-box" id={PostData?._id} style={{ outline: MarkUpdatedPost == PostData._id ? "1px solid red" : "" }}>
      <div className="Admin-property-post-card-main">
        <div className="property-post-card" id="property-card-1">
          {medata?.user?.Role != "Agent" && AssignProperty && (
            <>
              {selectAllProperty === true ? (
                <div className="Assing-to">
                  <label>
                    <input
                      type="checkbox"
                      // checked={isChecked(index)}
                      checked={
                        // selectAllProperty ||
                        AssignProperty.some(
                          (item) => item.PostId === PostData?._id
                        )
                      }
                    />
                  </label>
                </div>
              ) : (
                <>
                  <div className="Assing-to">
                    <label>
                      <input
                        type="checkbox"
                        checked={AssignProperty.some(
                          (item) => item.PostId === PostData?._id
                        )}
                        onChange={(e) => {
                          if (e.target.checked == true) {
                            setAssignProperty([
                              ...AssignProperty,

                              // PostData?._id,
                              {
                                PostId: PostData?._id,
                                CreatedBy: medata?.user?._id,
                              },
                            ]);
                          }
                          if (e.target.checked == false) {
                            let removeAssignProperty = AssignProperty.filter(
                              (e) => {
                                return e.PostId != PostData?._id;
                              }
                            );
                            setAssignProperty(removeAssignProperty);
                          }
                        }}
                      />
                    </label>
                  </div>
                </>
              )}
            </>
          )}
          <div className="admin-property-card-info">
            <div className="heading-name">
              {PostData?.LocationDetails?.ProjectName}
              {medata?.user?.Role != "Agent" && (
                <>
                  <div className="edit-del-section">
                    {/* {AssignProperty && ( */}
                    <div className="asign-user">
                      {isAssignedToAnyUser.length > 0 && (
                        <div className="show-admin-data">
                          {isAssignedToAnyUser.map((AssignPropertys, i) => {
                            return (
                              <div
                                key={i}
                                className="adminNameButton"
                                onClick={() => {
                                  if (
                                    PostData?.PostDelete?.Status !== "delete"
                                  ) {
                                    const RemoveAssignProperty = {
                                      AdminId: AssignPropertys.AdminId._id,
                                      PostId: PostData?._id,
                                    };

                                    let confrim = window.confirm(
                                      "Are You Sure About This "
                                    );
                                    if (confrim) {
                                      dispatch(
                                        RemoveAssignPropertyAction({
                                          RemoveAssignProperty,
                                        })
                                      );
                                    }
                                  }
                                }}
                              >
                                {AssignPropertys.AdminId?.Name} - (
                                {AssignPropertys.AdminId?.Role}){" "}
                                {PostData?.PostDelete?.Status != "delete" && (
                                  <span>🗑️</span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                    {/* // )} */}

                    {location.pathname.includes("admin") && (
                      <>
                        {medata?.user?.Role == "Owner" &&
                          (PostData?.PostDelete?.Status == "delete" ? (
                            <>
                              <div>
                                <button
                                  className="px-1 py-2 mx-3 py bg-primary bg-opacity-10 border border-info-subtle rounded"
                                  //  className="post-verify-btn"
                                  onClick={(e) => {
                                    let confirm = window.confirm(
                                      "Are you sure Restore This Post"
                                    );
                                    if (confirm) {
                                      dispatch(
                                        DeleteAndRestorePostAction({
                                          // postId: PostData?._id,
                                          postData: [{ PostId: PostData?._id }],
                                          Status: "restore",
                                        })
                                      );
                                    }
                                  }}
                                >
                                  Restore
                                </button>
                                {/* <button
                                  onClick={() => {
                                    let confrim = window.confirm(
                                      "Are You Sure Parmanent Delete This Post"
                                    );

                                    if (confrim) {
                                      dispatch(PermanentPostDeleteAction());
                                    }
                                  }}
                                >
                                  {" "}
                                  Permanent delete
                                </button> */}
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="delete-edit-box">
                                {/* <Link
                                  to={{
                                    pathname: `/admin/post/update/${PostData?._id}`,
                                    hash :"k33",
                                    state  :{amit:"ekj"}
                                  // Passing the PageNo data here, // Here, you store the PostData in state
                                  }}
                                   
                                >
                                  <img
                                  loading="lazy"
                                    src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/edit.png"
                                    className="editIcon"
                                  />
                                </Link> */}

                                <img
                                loading="lazy"
                                  src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/edit.png"
                                  className="editIcon"
                                  onClick={(e) => {
                                    const queryParams = new URLSearchParams(
                                      location.search
                                    );
                                    // Dynamically get all query parameters (key-value pairs)
                                    const queryObjectArray = Array.from(
                                      queryParams.entries()
                                    ).map(([key, value]) => ({
                                      [key]: value,
                                    }));
                                    navigate(
                                      `/admin/post/update/${PostData?._id}`,

                                      {
                                        state: {
                                          pageNo: page,
                                          querry: queryObjectArray,
                                          activeFilter: activeFilter,
                                          SearchPostId: SearchPostId,
                                          propertAdType: propertAdType,
                                          postPerPage: postPerPage,
                                          onPageActive: onPageActive,
                                          currenSelected: currenSelected,
                                          sortOrder: sortOrder
                                        },
                                      }
                                    );
                                  }}
                                />
                              </div>{" "}
                              <div
                                className="PostData?.PostDelete?.Status-edit-box"
                                onClick={(e) => {
                                  const confrim = window.confirm(
                                    `Are you sure you want to delete the post with ID (${PostData?._id})`
                                  );
                                  if (confrim) {
                                    dispatch(
                                      DeleteAndRestorePostAction({
                                        postData: [{ PostId: PostData?._id }],
                                        Status: "delete",
                                      })
                                    );
                                  }
                                }}
                              >
                                <img
                                loading="lazy"
                                  src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/delete.png"
                                  className="editIcon"
                                />
                              </div>{" "}
                            </>
                          ))}
                      </>
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
                      {PostData?.BasicDetails?.PropertyAdType == "Sale" && (
                        <>
                          <span className="price-rp-que"> Reserve Price </span>:
                          <span className="price-section">
                            {formatReservePrice(
                              PostData?.PricingDetails?.ExpectedPrice
                            )}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                  {PostData?.BasicDetails?.PropertyAdType == "Rent" && (
                    <>
                      <div className="admin-rent-deposite-section">
                        <div>
                          <p className="price-ans">
                            <span className="rent-admin-section">Rent : </span>
                            {formatReservePrice(
                              PostData?.PricingDetails?.ExpectedRent
                            )}
                            <span>/Month </span>
                          </p>
                          {/* <p className="question-box"> </p> */}
                        </div>
                      </div>
                    </>
                  )}
                  <p className="admin-card-area-section">
                    {PostData?.PricingDetails?.PricePerSqFt} Per sqft
                  </p>
                </div>

                <div className="property-id">
                  <p className="admin-card-heading">property id</p>
                  <p className="admin-card-heading-ans">{PostData?._id}</p>
                </div>

                <div className="Property-status-section">
                  <p className="admin-card-heading">Current status</p>
                  {PostData?.PostExpired ? (
                    <p className="Status-section-admin inactive-sign">

                      Expired
                    </p>
                  ) : (
                    <>
                      {PostData?.PostVerify ? (
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
                    <p className="admin-card-heading">Create on</p>
                    <p className="admin-card-heading-ans">
                      {FormatDate(PostData?.createAt)}
                      {/* {new Date(PostData?.createAt).toLocaleDateString("en-GB", {
                        day: '2-digit',
                        month: 'short',
                        year: '2-digit'
                      })} */}
                    </p>
                  </div>

                  <div className="poston-date">
                    <p className="admin-card-heading">Active on</p>
                    <p className="admin-card-heading-ans">
                      {formatDate.ActiveDate}
                      {/* {formatDate(PostData?.PostVerifyData?.Time)} */}
                    </p>
                  </div>

                  <div className="Expire-section-section">
                    <p className="admin-card-heading">Expire on</p>
                    <p className="admin-card-heading-ans">
                      {formatDate.ExpiredDate}
                    </p>
                  </div>
                </div>
              </div>

              <div className="response-section">
                <div className="admin-section-section-response">

                  <p
                    // className={location.pathname.includes("schedule-visit"?"select":"")}
                    className={`admin-response-section  ${location.pathname.includes("/admin/schedule-visit")
                      ? "active-btn"
                      : ""
                      }`}
                    onClick={() => {
                      if (
                        medata?.user?.Role == "Owner" &&
                        PostData?.PostDelete?.Status == "delete"
                      ) {
                        // schedule-visit/deleted-post
                        navigate(
                          `/admin/schedule-visit/deleted-post/${PostData?._id}`
                        );
                      } else {
                        navigate(`/admin/schedule-visit/${PostData?._id}`);
                      }
                    }}
                  >
                    Visit (
                    {VisitAndOfferLength
                      ? VisitAndOfferLength.schedulevisit
                      : "0"}
                    )
                  </p>
                  <p
                    className={`admin-response-section ${location.pathname.includes("/admin/recive-offer")
                      ? "active-btn"
                      : ""
                      }`}
                    onClick={() => {
                      if (
                        medata?.user?.Role == "Owner" &&
                        PostData?.PostDelete?.Status == "delete"
                      ) {
                        navigate(
                          `/admin/recive-offer/deleted-post/${PostData?._id}`
                        );
                      } else {
                        navigate(`/admin/recive-offer/${PostData?._id}`);
                      }
                    }}
                  >
                    Offer  (
                    {VisitAndOfferLength ? VisitAndOfferLength.makeoffer : "0"})
                  </p>

                </div>

                {/* <p>Extend Duration</p> */}


                <>
                  <div className="user-name-contact">
                    <span>Posted by : </span>
                    <span><b>  {PostData?.CreatePostUser?.Name} {PostData?.CreatePostUser?.LastName}    </b>
                      &nbsp;

                      ({PostData?.CreatePostUser?.Role})
                    </span><br />
                  </div>
                  <div className="user-name-contact">
                    <span>Mobile No. : </span>
                    <span>{PostData?.CreatePostUser?.ContactNumber}</span>
                  </div>
                  <div className="user-name-contact">
                    <span>Email : </span>
                    <span>{PostData?.CreatePostUser?.email}</span>
                  </div>
                </>

              </div>

              <div className="admin-btn-active-btn">
                <button
                  className="contact-button btn-sm"
                  onClick={async () => {
                    const basePath =
                      medata?.user?.Role === "Owner" && PostData?.PostDelete?.Status === "delete"
                        ? "/admin/deleted-post"
                        : "/post-detail";

                    const formattedAddress = `${PropertyAddress.toLowerCase()
                      .replaceAll(" ", "-")
                      .replace(",", "")
                      .replaceAll("/", "-")}`;

                    const finalUrl = `${basePath}/${formattedAddress}-${PostData?._id}`;

                    try {
                      const response = await fetch(finalUrl, { method: "HEAD" });

                      if (response.ok) {
                        window.open(finalUrl, "_blank");
                      } else {
                        alert("The listing you're trying to view doesn't exist.");
                      }
                    } catch (error) {
                      console.error("Error checking listing:", error);
                      alert("Could not verify the listing.");
                    }
                  }}
                >
                  View Listing
                </button>


                {PostData?.PostDelete?.Status != "delete" && (
                  <div className="d-flex gap-5">
                    <div className="Verified-lable">
                      <p className="varified-lable">Verified lable :</p>
                      <label className="toggle-switch-container">
                        <input
                          type="checkbox"
                          checked={ToggleBtn}
                          onChange={(e) => {
                            setToggleBtn(!ToggleBtn);
                            if (e.target.checked == true) {
                              let postdata = { PostVerifyShow: true };
                              let postid = PostData?._id;
                              dispatch(
                                showVeirifyPostIconAction({ postdata }, postid)
                              );
                            }
                            if (e.target.checked == false) {
                              let postdata = { PostVerifyShow: false };
                              let postid = PostData?._id;
                              dispatch(
                                showVeirifyPostIconAction({ postdata }, postid)
                              );
                            }
                          }}
                          className="toggle-switch-input"
                        />
                        <span className="toggle-btn-slider"></span>
                      </label>
                    </div>
                    {medata?.user?.Role != "Agent" && (
                      <div className="verify-box-section">
                        {/* {location.pathname.includes("admin") && ( */}
                        {PostData?.PostExpired ? (
                          <button
                            className="re-open-btn-admin"
                            onClick={() => {
                              dispatch(ReOpenPostAction(PostData?._id, "AdminRoutes"));
                            }}
                          >
                            Re-Open
                          </button>
                        ) : (
                          <>
                            {PostData?.PostVerify ? (
                              <button
                                className="post-verify-btn In-Active-btn"
                                onClick={() => {
                                  let Confrimbox = window.confirm(
                                    "Are you Sure In-Active This Post"
                                  );
                                  if (Confrimbox) {
                                    let postdata = { PostVerify: false };
                                    let postid = PostData?._id;
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
                                    "Are you sure you want to activate this post?"
                                  );

                                  if (Confrimbox) {
                                    let postdata = { PostVerify: true };
                                    let postid = PostData?._id;
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
