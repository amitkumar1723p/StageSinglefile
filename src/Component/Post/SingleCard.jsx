import "./SingleCard.css";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, Link, useNavigate, Navigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import "./Post.css";
import {
  AddFavouriteAndUnFavouriteAction,
  GetMeDetailsAction,
} from "../../Action/userAction";
import ShareModal from "./SinglePostDetails/ShareModal";
import { FormatDate } from "../../utils/CommonFunction";
import { MarkRentOutProperty, ReOpenPostAction } from "../../Action/postAction";
import { isBuffer } from "lodash";
const SingleCard = ({
  PostData,
  index,
  setMarkRentOutPropertyId,
  MarkRentOutPropertyId,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const { medata } = useSelector((state) => {
    return state.meDetails;
  });
  const { data, LodingType } = useSelector((state) => {
    return state.userData;
  });

  const [floorDetails, setFloorDetails] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [EditPost, setEditPost] = useState(false);

  const shareUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    // You could add a toast notification here
  };

  //aminities section scroll button start
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -310, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 310, behavior: "smooth" });
    }
  };
  //aminities section scroll button start

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
  // Stop Re-Rendring This Function
  const formatDate = (dateString) => {
    if (!dateString) {
      return "Invalid Date";
    }

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

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

    // Get day, month, and year in desired format
    const day = ("0" + date.getDate()).slice(-2); // Ensure two-digit day
    const month = monthNames[date.getMonth()]; // Get abbreviated month name
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year

    return `${day}-${month}-${year}`; // Format as DD-Month-YY
  };

  const MarkRentOutPosts = JSON.parse(
    sessionStorage.getItem("RentOutPropertyId") || "[]"
  )?.includes(PostData?._id);

  const RemoveRentOutPost = JSON.parse(
    sessionStorage.getItem("ReOpenPropertyId") || "[]"
  );

  // Check if the current Post ID exists in the RemoveRentOutPost array
  const isRemoved =
    Array.isArray(RemoveRentOutPost) &&
    RemoveRentOutPost.includes(PostData?._id);
  const location = useLocation();
  const dispatch = useDispatch();
  const [ImageTranlate, setImageTranlate] = useState(0);
  const [RunImageSlider, setRunImageSlider] = useState(false);
  const [RunInterval, setRunInterval] = useState(false);
  const [PropertyAddress, setPropertyAddress] = useState("");
  const [areaDetails, setAreaDetails] = useState(null);
  //AC
  const [isShare, setIIshare] = useState(false);

  const toggleShare = () => {
    setIIshare(!isShare);
  };

  // const shareUrl = () => {
  //   navigator.clipboard.writeText(window.location.href);
  // };

  useEffect(() => {
    let slider;
    if (ImageTranlate == 0 && RunImageSlider == true) {
      setTimeout(() => {
        setRunInterval(true);
      }, 500);
    }

    if (RunInterval === true) {
      slider = setInterval(() => {
        if (PostData?.PropertyImages?.length <= 1) {
          setImageTranlate(0);
        }

        if (PostData?.PropertyImages?.length > 1) {
          if (
            Number(String(ImageTranlate).replace("-", "")) + 1 <
            PostData?.PropertyImages?.length
          ) {
            setImageTranlate(ImageTranlate - 1);
          } else {
            setRunInterval(false);
          }
        }
      }, 1500);
    }

    if (RunImageSlider == false) {
      setRunInterval(false);
      clearInterval(slider);
      setTimeout(() => {
        setImageTranlate(0);
      }, 500);
    }

    if (RunInterval === false && RunImageSlider == true) {
      clearInterval(slider);
      setTimeout(() => {
        setImageTranlate(0);
      }, 500);
    }

    return () => {
      clearInterval(slider);
    };
  }, [RunImageSlider, ImageTranlate, RunInterval]);

  useEffect(() => {
    if (data && LodingType == "AddFavouriteAndUnFavouriteRequest") {
      if (data.success == true) {
        // alert("run")
        dispatch(GetMeDetailsAction());
      }
    }
  }, [data]);

  useEffect(() => {
    if (!PostData) return;
    const areaDetailsData = PostData?.AreaDetails;

    if (areaDetailsData) {
      const { PlotArea, SuperBuiltUpArea, CarpetArea, BuiltUpArea, PlotSize } =
        areaDetailsData;

      if (PlotSize) {
        setAreaDetails({
          value: PlotSize?.value,
          unit: PlotSize?.unit,
          label: "Plot Size",
        });
      } else if (PlotArea) {
        // alert("PlotArea")
        setAreaDetails({
          value: PlotArea?.value,
          unit: PlotArea?.unit,
          label: "Plot Area",
        });
      } else if (SuperBuiltUpArea?.value) {
        setAreaDetails({
          value: SuperBuiltUpArea?.value,
          unit: SuperBuiltUpArea.unit,
          label: "Super Area",
        });
      } else if (CarpetArea?.value && !BuiltUpArea?.value) {
        // alert("CarpetArea?.value && !BuiltUpArea?.value")
        setAreaDetails({
          value: CarpetArea?.value,
          unit: CarpetArea?.unit,
          label: "Carpet Area",
        });
      } else if (BuiltUpArea?.value && !CarpetArea?.value) {
        // alert("BuiltUpArea?.value && !CarpetArea?.value")
        setAreaDetails({
          value: BuiltUpArea?.value,
          unit: BuiltUpArea.unit,
          label: "Built-up Area",
        });
      } else if (BuiltUpArea?.value || CarpetArea?.value) {
        if (CarpetArea?.value > BuiltUpArea?.value) {
          // alert("BuiltUpArea?.value || CarpetArea?.value")
          setAreaDetails({
            value: CarpetArea?.value,
            unit: CarpetArea.unit,
            label: "CarpetArea Area",
          });
        } else {
          // alert("BuiltUpArea?.value || CarpetArea?.value")
          setAreaDetails({
            value: BuiltUpArea?.value,
            unit: BuiltUpArea?.unit,
            label: "Built-up Area",
          });
        }
      } else {
        setAreaDetails(null);
      }
    }
    const floorDetailsData = PostData?.FloorDetails;

    if (floorDetailsData) {
      const { PropertyOnFloor, TotalFloors } = floorDetailsData;
      const propertyOnFloorText = PropertyOnFloor
        ? `${PropertyOnFloor} out of`
        : "";
      const totalFloorsText = TotalFloors ? ` ${TotalFloors}` : "";
      setFloorDetails(`${propertyOnFloorText}${totalFloorsText}`);
    } else {
      setFloorDetails("");
    }

    setPropertyAddress(
      `${
        PostData?.PropertyDetails?.BHKType
          ? `${PostData?.PropertyDetails?.BHKType} BHK`
          : ""
      } ${PostData?.BasicDetails?.ApartmentType} For ${
        PostData?.BasicDetails?.PropertyAdType
      } In ${PostData?.LocationDetails?.Landmark} ${
        PostData?.LocationDetails?.City
      }`
    );
  }, [PostData]);

  const selectRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setEditPost(false);
      }
    }

    if (EditPost) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [EditPost]);

  const closeShareBox = (event) => {
    if (!event.target.matches(".share-btn")) {
      setIIshare(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeShareBox);
    return () => {
      document.removeEventListener("click", closeShareBox);
    };
  }, []);

  return (
    <>
      <div
        className="single-card"
        onMouseOver={() => {
          setRunInterval(true);
          setRunImageSlider(true);
        }}
        onMouseLeave={() => {
          setRunImageSlider(false);
        }}
      >
        {PostData?.propertyStatus?.currentPropertyStatus === "sold out" && (
          <div className="sold-out-blur-img sold-img-blur glass-effect">
            <img
              src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/sold-out.svg"
              alt=""
              className="sold-img-blu blur-img"
            />
            {/* <p className="sold-out-lable">This property is sold out</p> */}
          </div>
        )}
        {/* Property Image with Verified Badge */}
        <div className="single-card-image-container">
          {/* <img
                        src="https://i.pinimg.com/736x/01/1e/65/011e655237835f908bfd1f8a872e2d6a.jpg"
                        alt="DLF Primus Building"
                        className="single-card-image"
                    /> */}
          <Link
            target="_blank"
            className=""
            to={`/post-detail/${PropertyAddress.toLowerCase()
              .replaceAll(" ", "-")
              .replace(",", "")
              .replaceAll("/", "-")}-${PostData?._id}`}
          >
            <img
              // key={}
              src={PostData?.PropertyImages[0]?.url}
              alt="PropertyPost"
              className="single-card-image"
            />
          </Link>

          {/* { PostData?.PostVerify? (
            PostData?.PostVerifyShow ? (
              <div className="single-card-verified-badge">
                <img
                  src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/verified-tag.svg"
                  className="single-card-verified-icon"
                  alt="verified-tag"
                />
                <p className="active-post-para">Verified</p>
              </div>
            ) : (
              null
            )
          ) :<div className="inactive-post">
          <p className="inactive-post-para">Inactive</p>
        </div>} */}

          {/* to be fixed */}

          {PostData?.PostVerify ? (
            PostData?.PostVerifyShow && (
              <div className="single-card-verified-badge">
                <img
                  src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/verified-tag.svg"
                  className="single-card-verified-icon"
                  alt="verified-tag"
                />
                <p className="active-post-para">Verified</p>
              </div>
            )
          ) : (
            <>
              {
                <div className="inactive-post">
                  {/* <p>your post is currently inactive please contact our support team</p> */}
                  <p className="inactive-post-para">
                    Your listing is under review and will be activated soon.
                  </p>
                </div>
              }
            </>
          )}
        </div>

        {/* Property Title Section */}
        <div className="single-card-title-section">
          <div className="single-card-title-actions-container">
            <h2
              className={`single-card-property-title  ${
                PostData?.propertyStatus?.currentPropertyStatus !== "sold out"
                  ? ""
                  : "sold-out"
              }`}
            >
              {PostData?.LocationDetails?.ProjectName}
            </h2>
            {/* <div className="single-card-action-icons">
                            <button
                                onClick={() => setIsFavorite(!isFavorite)}
                                className="single-card-icon-button"
                            >
                                <Heart fill={isFavorite ? "1877f2" : "none"} color={isFavorite ? "1877f2" : "#9CA3AF"} size={20} />
                            </button>
                            <button className="single-card-icon-button">
                                <Share2 size={20} color="#9CA3AF" />
                            </button>
                        </div> */}
            <div className="share-fav-main-box">
              <div className="postcard-share-parent">
                <button
                  className="single-page-share-button"
                  disabled={
                    PostData?.propertyStatus?.currentPropertyStatus !==
                    "sold out"
                      ? false
                      : true
                  }
                  onClick={() => setIsModalOpen(true)}
                >
                  <img
                    src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/share-btn.svg"
                    className="img-fluid img-thumbnail"
                    alt="..."
                  ></img>
                </button>
              </div>
              {!["Owner", "Admin"].includes(medata?.user?.Role) && (
                <div className={`add-favourite-box  flex`}>
                  <button
                    disabled={
                      PostData?.propertyStatus?.currentPropertyStatus !==
                      "sold out"
                        ? false
                        : true
                    }
                    className={`add-favourite-btn ${index}`}
                    onClick={() => {
                      if (medata && medata.IsAuthenticated == true) {
                        dispatch(
                          AddFavouriteAndUnFavouriteAction({
                            PostData: { PostId: PostData?._id },
                          })
                        );
                      } else {
                        navigate("/login");
                      }
                    }}
                  >
                    {medata?.user?.FavouritePost?.some(
                      (fav) =>
                        String(fav?.PostData?.PostId?._id) ===
                        String(PostData?._id)
                    ) ? (
                      <img
                        className="fav-icon"
                        src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/Un-Fav-Post.svg"
                        alt="Fav-icon"
                      />
                    ) : (
                      <img
                        className="fav-icon"
                        src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/Fav-Post.svg"
                        alt="Fav-icon"
                      />
                    )}
                  </button>
                  {location.pathname.includes("user/my-listing") &&
                    PostData?.BasicDetails?.PropertyAdType == "Rent" && (
                      <>
                     
                        <img
                         src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/edit.png"
                          className="editIcon"
                          onClick={() => {
                            setEditPost(!EditPost);
                          }}
                        />
                        {EditPost == true && (
                          <select
                            ref={selectRef}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value == "post-edit") {
                                // navigate(`/user/post/update/${PostData?._id}`);

                                window.open(
                                  `/user/post/update/${PostData?._id}`,
                                  "EditPostTab"
                                );
                              } else if (value == "rent-out-post") {
                                let postdata = { PostVerify: false };
                                let postid = PostData?._id;
                                dispatch(
                                  MarkRentOutProperty({ postdata }, postid)
                                );
                              } else if (value == "Re-Open-Post") {
                                dispatch(
                                  ReOpenPostAction(PostData?._id, "UserRoutes")
                                );
                              }
                              if (e.target.value != "") {
                                setEditPost(false);
                              }
                            }}
                          >
                            <option value={""}>Select</option>
                            <option value="post-edit">Edit-Post</option>

                            {PostData?.BasicDetails?.PropertyAdType ===
                              "Rent" &&
                            PostData?.PostExpired?.ExpiredStatus === true ? (
                              <option value="Re-Open-Post">Re-Open</option>
                            ) : (
                              <option value="rent-out-post">Rent Out</option>
                            )}
                          </select>
                        )}
                        
                      </>
                    )}
                </div>
              )}
            </div>
          </div>
          <p
            className={`single-card-property-location truncate-text  ${
              PostData?.propertyStatus?.currentPropertyStatus !== "sold out"
                ? ""
                : "sold-out"
            }`}
          >
            {PropertyAddress}
          </p>
        </div>

        {/* Property Details Grid */}
        {/* <div className="single-card-details-slide">
                    <div className="single-card-detail-item">
                        <div className="single-card-detail-icon-container">
                        <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/washing-machine.svg" className='single-card-detail-icon-container' alt="" />
                        </div>
                        <div className="single-card-detail-text">
                            <p className="single-card-detail-title"> {PostData?.AmenitiesDetails.Furnishing}</p>
                            <p className="single-card-detail-subtitle">Furnishing Details</p>
                        </div>
                    </div>

                    <div className="single-card-detail-item">
                        <div className="single-card-detail-icon-container">
                            <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/floor.png" className='single-card-detail-icon-container'  alt="" />
                        </div>
                        <div className="single-card-detail-text">
                            <p className="single-card-detail-title">{floorDetails}</p>
                            <p className="single-card-detail-subtitle">Floor</p>
                        </div>
                    </div>

                    <div className="single-card-detail-item">
                        <div className="single-card-detail-icon-container">
                        <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/area.png" className='single-card-detail-icon-container'  alt="" />
                        </div>
                        <div className="single-card-detail-text">
                            <p className="single-card-detail-title"> {`${areaDetails?.value} ${areaDetails?.unit}`}.</p>
                            <p className="single-card-detail-subtitle">{areaDetails?.label}</p>
                        </div>
                    </div>

                    <div className="single-card-detail-item">
                        <div className="single-card-detail-icon-container">
                            <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/typology.png" className='single-card-detail-icon-container'  alt="" />
                        </div>
                        <div className="single-card-detail-text">
                            <p className="single-card-detail-title">     {`${PostData?.PropertyDetails.BHKType} BHK`}{" "}
                      {PostData?.PropertyDetails?.OtherRoom?.map((text) => {
                        return `+ ${text == "Pooja Room"
                            ? "Pooja"
                            : text == "Servant Room"
                              ? "SQ"
                              : text == "Study Room"
                                ? "Study"
                                : text == "Store Room"
                                  ? "Store"
                                  : ""
                          }`;
                      })}</p>

                       
                            <p className="single-card-detail-subtitle">Type</p>

                        </div>
                    </div>
                </div> */}

        <div
          className={`single-card-details-container  ${
            PostData?.propertyStatus?.currentPropertyStatus !== "sold out"
              ? ""
              : "sold-out"
          }`}
        >
          {/* Left Button */}
          {/* <button
            className={`slider-btn slider-btn-left ${
              PostData?.propertyStatus?.currentPropertyStatus !== "sold out"
                ? ""
                : "sold-out"
            }`}
            disabled={
              PostData?.propertyStatus?.currentPropertyStatus !== "sold out"
                ? false
                : true
            }
            onClick={scrollLeft}
          >
            <FaChevronLeft size={17} />
          </button> */}

          {/* Scrollable Container */}
          <div
            ref={sliderRef}
            className={`single-card-details-slide ${
              PostData?.propertyStatus?.currentPropertyStatus !== "sold out"
                ? ""
                : "sold-out"
            } `}
          >
            {PostData?.BasicDetails?.ApartmentType == "Plot/Land" ? (
              <div className="single-card-detail-item">
                <div className="single-card-detail-icon-container">
                  <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/typology.png" alt="Typology" />
                </div>
                <div className="single-card-detail-text">
                  <p
                    className={`single-card-detail-title  ${
                      PostData?.propertyStatus?.currentPropertyStatus !==
                      "sold out"
                        ? ""
                        : "sold-out"
                    }`}
                  >
                    {PostData?.OtherDetails?.PlotDirection}
                  </p>
                  <p
                    className={`single-card-detail-subtitle  ${
                      PostData?.propertyStatus?.currentPropertyStatus !==
                      "sold out"
                        ? ""
                        : "sold-out"
                    }`}
                  >
                    Plot Direction
                  </p>
                </div>
              </div> //  bhk and room
            ) : (
              <div className="single-card-detail-item">
                <div className="single-card-detail-icon-container">
                  <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/typology.png" alt="Typology" />
                </div>
                <div className="single-card-detail-text">
                  <p
                    className={`single-card-detail-title  ${
                      PostData?.propertyStatus?.currentPropertyStatus !==
                      "sold out"
                        ? ""
                        : "sold-out"
                    }`}
                  >
                    {`${PostData?.PropertyDetails?.BHKType} BHK`}{" "}
                    {PostData?.PropertyDetails?.OtherRoom?.map((text) => {
                      return `+ ${
                        text === "Pooja Room"
                          ? "Pooja"
                          : text === "Servant Room"
                          ? "SQ"
                          : text === "Study Room"
                          ? "Study"
                          : text === "Store Room"
                          ? "Store"
                          : ""
                      }`;
                    })}
                  </p>
                  <p
                    className={`single-card-detail-subtitle  ${
                      PostData?.propertyStatus?.currentPropertyStatus !==
                      "sold out"
                        ? ""
                        : "sold-out"
                    }`}
                  >
                    Type
                  </p>
                </div>
              </div>
            )}

            <div className="single-card-detail-item">
              <div className="single-card-detail-icon-container">
                <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/area.png" alt="Area" />
              </div>
              <div className="single-card-detail-text">
                <p
                  className={`single-card-detail-title  ${
                    PostData?.propertyStatus?.currentPropertyStatus !==
                    "sold out"
                      ? ""
                      : "sold-out"
                  }`}
                >
                  {`${areaDetails?.value} ${areaDetails?.unit}`}
                </p>
                <p
                  className={`single-card-detail-subtitle  ${
                    PostData?.propertyStatus?.currentPropertyStatus !==
                    "sold out"
                      ? ""
                      : "sold-out"
                  }`}
                >
                  {areaDetails?.label}
                </p>
              </div>
            </div>

            {/* Furnishing and Plot Dimensions  */}

            {PostData?.BasicDetails?.ApartmentType == "Plot/Land" ? (
              <div className="single-card-detail-item">
                <div className="single-card-detail-icon-container">
                  <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/washing-machine.svg" alt="Washing Machine" />
                </div>

                <div className="single-card-detail-text ">
                  <p
                    className={`single-card-detail-title  ${
                      PostData?.propertyStatus?.currentPropertyStatus !==
                      "sold out"
                        ? ""
                        : "sold-out"
                    }`}
                  >
                    {typeof PostData?.AreaDetails?.PlotDimensions ==
                    "string" ? (
                      PostData?.AreaDetails?.PlotDimensions
                    ) : (
                      <>
                        {" "}
                        <span>
                          {PostData?.AreaDetails?.PlotDimensions?.Length}
                        </span>
                        <span> X </span>
                        <span>
                          {PostData?.AreaDetails?.PlotDimensions?.Breadth}
                        </span>
                      </>
                    )}
                  </p>
                  <p
                    className={`single-card-detail-subtitle  ${
                      PostData?.propertyStatus?.currentPropertyStatus !==
                      "sold out"
                        ? ""
                        : "sold-out"
                    }`}
                  >
                    Plot Dimensions
                  </p>
                </div>
              </div>
            ) : (
              <div className="single-card-detail-item">
                <div className="single-card-detail-icon-container">
                  <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/furnish.png" alt="FurnishDetail" />
                </div>

                <div className="single-card-detail-text ">
                  <p
                    className={`single-card-detail-title  ${
                      PostData?.propertyStatus?.currentPropertyStatus !==
                      "sold out"
                        ? ""
                        : "sold-out"
                    }`}
                  >
                    {PostData?.AmenitiesDetails.Furnishing}
                  </p>
                  <p
                    className={`single-card-detail-subtitle  ${
                      PostData?.propertyStatus?.currentPropertyStatus !==
                      "sold out"
                        ? ""
                        : "sold-out"
                    }`}
                  >
                    Furnishing Details
                  </p>
                </div>
              </div>
            )}

            {/* floor and plot facing  */}
            {PostData?.BasicDetails?.ApartmentType == "Plot/Land" ? (
              <div className="single-card-detail-item">
                <div className="single-card-detail-icon-container">
                  <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/floor.png" alt="Total Floor" />
                </div>
                <div className="single-card-detail-text">
                  <p
                    className={`single-card-detail-title  ${
                      PostData?.propertyStatus?.currentPropertyStatus !==
                      "sold out"
                        ? ""
                        : "sold-out"
                    }`}
                  >
                    {PostData?.OtherDetails?.PlotFacing}
                  </p>
                  <p
                    className={`single-card-detail-subtitle  ${
                      PostData?.propertyStatus?.currentPropertyStatus !==
                      "sold out"
                        ? ""
                        : "sold-out"
                    }`}
                  >
                    Plot Facing
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="single-card-detail-item">
                  <div className="single-card-detail-icon-container">
                    <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/floor.png" alt="Total Floor" />
                  </div>
                  <div className="single-card-detail-text">
                    <p
                      className={`single-card-detail-title  ${
                        PostData?.propertyStatus?.currentPropertyStatus !==
                        "sold out"
                          ? ""
                          : "sold-out"
                      }`}
                    >
                      {floorDetails}
                    </p>
                    <p
                      className={`single-card-detail-subtitle  ${
                        PostData?.propertyStatus?.currentPropertyStatus !==
                        "sold out"
                          ? ""
                          : "sold-out"
                      }`}
                    >
                      Floor
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right Button */}
          {/* <button
            className={`slider-btn slider-btn-right ${
              PostData?.propertyStatus?.currentPropertyStatus !== "sold out"
                ? ""
                : "sold-out"
            }`}
            disabled={
              PostData?.propertyStatus?.currentPropertyStatus !== "sold out"
                ? false
                : true
            }
            onClick={scrollRight}
          >
            <FaChevronRight size={17} />
          </button> */}
        </div>

        {/* Price and Date Section */}
        <div className="">
          {/* <p className="single-card-price-text">
                        <span className="single-card-price-label">Reserve Price : </span>
                        <span className="single-card-price-value">
                            {formatReservePrice(
                                PostData?.PricingDetails?.ExpectedPrice
                            )}</span>
                    </p> */}
          {PostData?.BasicDetails?.PropertyAdType == "Rent" && (
            <>
              <>
                <div className="single-card-rent-price-section">
                  <div>
                    <p
                      className={`rent-price-ans  ${
                        PostData?.propertyStatus?.currentPropertyStatus !==
                        "sold out"
                          ? ""
                          : "sold-out"
                      }`}
                    >
                      {formatReservePrice(
                        PostData?.PricingDetails?.ExpectedRent
                      )}
                      <span
                        className={`rent-per-month  ${
                          PostData?.propertyStatus?.currentPropertyStatus !==
                          "sold out"
                            ? ""
                            : "sold-out"
                        }`}
                      >
                        {" "}
                        / Month
                      </span>
                    </p>
                    <p
                      className={`question-box  ${
                        PostData?.propertyStatus?.currentPropertyStatus !==
                        "sold out"
                          ? ""
                          : "sold-out"
                      }`}
                    >
                      Rent{" "}
                    </p>
                  </div>
                  <div>
                    <div className="Reserveprice-sec">
                      <div className="Reserveprice-sec-grid">
                        <p
                          className={`rent-price-ans  ${
                            PostData?.propertyStatus?.currentPropertyStatus !==
                            "sold out"
                              ? ""
                              : "sold-out"
                          }`}
                        >
                          {formatReservePrice(
                            PostData?.PricingDetails?.DepositePrice
                          )}
                        </p>
                        <p
                          className={`single-card-rent-price-value  ${
                            PostData?.propertyStatus?.currentPropertyStatus !==
                            "sold out"
                              ? ""
                              : "sold-out"
                          }`}
                        >
                          Deposit Amount{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </>
          )}

          {PostData?.BasicDetails?.PropertyAdType == "Sale" && (
            <>
              <div className="single-card-price-section-sale">
                <div className="single-card-price-section">
                  <span
                    className={`single-card-sale-price-label ${
                      PostData?.propertyStatus?.currentPropertyStatus !==
                      "sold out"
                        ? ""
                        : "sold-out"
                    } `}
                  >
                    {" "}
                    Reserve Price
                  </span>{" "}
                  :{" "}
                  <span
                    className={` single-card-price-value ${
                      PostData?.propertyStatus?.currentPropertyStatus !==
                      "sold out"
                        ? ""
                        : "sold-out"
                    } `}
                  >
                    {formatReservePrice(
                      PostData?.PricingDetails?.ExpectedPrice
                    )}
                  </span>
                </div>
                <p
                  className={`single-post-card-persqft ${
                    false ? "" : "sold-out"
                  } `}
                >
                  {/* { PostData?.BasicDetails?.ApartmentType} */}
                  {PostData?.BasicDetails?.ApartmentType == "Plot/Land" ? (
                    <>
                      {" "}
                      ₹{" "}
                      {String(PostData?.PricingDetails.PricePerSqYd).replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}{" "}
                      Per sq yard
                    </>
                  ) : (
                    <>
                      {" "}
                      ₹{" "}
                      {String(PostData?.PricingDetails.PricePerSqFt).replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}{" "}
                      Per sqft
                    </>
                  )}
                </p>
              </div>
            </>
          )}
          {PostData?.propertyStatus?.currentPropertyStatus === "sold out" ? (
            <p className="single-card-publish-date">
              Sold Out
              <span className="single-card-date-label"></span>
              <span className="single-card-date-value">
                {/* {formatDate(PostData?.PostVerifyData?.Time)} */}
              </span>
            </p>
          ) : (
            <p className="single-card-publish-date">
              <span className="single-card-date-label">Publish on: </span>
              <span className="single-card-date-value">
                {FormatDate(PostData?.PostVerifyData?.Time)}
                {/* {formatDate(PostData?.PostVerifyData?.Time)} */}
              </span>
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="single-card-action-buttons-container">
          <button
            className={`single-card-action-button-whatsapp ${
              PostData?.propertyStatus?.currentPropertyStatus !== "sold out"
                ? "whatsapp-button"
                : "sold-out-button"
            }`}
            disabled={
              PostData?.propertyStatus?.currentPropertyStatus === "sold out"
            }
            onClick={() => {
              if (
                PostData?.propertyStatus?.currentPropertyStatus !== "sold out"
              ) {
                const phoneNumber = "7837840785"; // Replace with actual phone number
                const userName = medata?.user?.name || "Interested Buyer"; // Fallback if name is unavailable
                const message = encodeURIComponent(
                  `Hello, I am interested in a ${
                    PostData?.PropertyDetails?.BHKType
                      ? `${PostData?.PropertyDetails?.BHKType} BHk`
                      : ""
                  } ${PostData?.BasicDetails.ApartmentType} In ${
                    PostData?.LocationDetails?.ProjectName
                  } For ${PostData?.BasicDetails.PropertyAdType} In ${
                    PostData?.LocationDetails?.Landmark
                  } ${
                    PostData?.LocationDetails.City
                  }. Could you please share more details?`
                );
                window.open(
                  `https://wa.me/${phoneNumber}?text=${message}`,
                  "_blank"
                );
              }
            }}
          >
            <img
              className="whatapp-img-card-post"
              src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/whatapp.png"
              alt="whatsapp"
            />
            WhatsApp
          </button>
          <Link
            target="_blank"
            className=""
            to={`/post-detail/${PropertyAddress?.trim()
              ?.toLowerCase()
              .replaceAll(" ", "-")
              .replace(",", "")
              .replaceAll("/", "-")}-${PostData?._id}`}
          >
            <button
              className={`single-card-action-button ${
                PostData?.propertyStatus?.currentPropertyStatus !== "sold out"
                  ? ""
                  : "sold-out-button"
              }`}
              disabled={
                PostData?.propertyStatus?.currentPropertyStatus !== "sold out"
                  ? false
                  : true
              }
            >
              View More <FaChevronRight size={12} />
            </button>
          </Link>
        </div>

        {location.pathname.includes("user/my-listing") &&
          PostData?.BasicDetails?.PropertyAdType === "Rent" &&
          PostData?.PostExpired?.ExpiredStatus === true && (
            <button>RentOut</button>
          )}
      </div>
      {/* share card begin  */}

      <ShareModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        propid={`${
          window.location.origin
        }/post-detail/${PropertyAddress.toLowerCase()
          .replaceAll(" ", "-")
          .replace(",", "")
          .replaceAll("/", "-")}-${PostData?._id}`}
      />

      {/* share card end  */}
    </>
  );
};

export default SingleCard;
