import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate, Navigate } from "react-router-dom";
import {
  IoIosCopy,
  IoLogoFacebook,
  IoLogoInstagram,
  IoMdAddCircle,
  IoMdSend,
  IoMdShareAlt,
} from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

import "./Post.css";
import {
  AddFavouriteAndUnFavouriteAction,
  GetMeDetailsAction,
} from "../../Action/userAction";
import ShareModal from "./SinglePostDetails/ShareModal";

export default function PostCard({ PostData, index }) {
  const navigate = useNavigate();

  const { medata } = useSelector((state) => {
    return state.meDetails;
  });
  const { data, LodingType } = useSelector((state) => {
    return state.userData;
  });
  const [floorDetails, setFloorDetails] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const shareUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    // You could add a toast notification here
  };

  // const platforms = [
  //   {
  //     name: 'WhatsApp',
  //     icon: <IoMdAddCircle className="w-5 h-5" />,
  //     color: 'bg-green-500 hover:bg-green-600',
  //     textColor: 'text-white',
  //     url: `https://wa.me/?text=${window.location.href}`
  //   },
  //   {
  //     name: 'Telegram',
  //     icon: <IoMdSend className="w-5 h-5" />,
  //     color: 'bg-blue-500 hover:bg-blue-600',
  //     textColor: 'text-white',
  //     url: `https://t.me/share/url?url=${window.location.href}`
  //   },
  //   {
  //     name: 'Facebook',
  //     icon: <IoLogoFacebook className="w-5 h-5" />,
  //     color: 'bg-blue-600 hover:bg-blue-700',
  //     textColor: 'text-white',
  //     url: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`
  //   },
  //   {
  //     name: 'Instagram',
  //     icon: <IoLogoInstagram className="w-5 h-5" />,
  //     color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
  //     textColor: 'text-white',
  //     url: `https://www.instagram.com/` // Note: Instagram doesn't support direct sharing via URL
  //   },
  //   {
  //     name: 'Copy Link',
  //     icon: <IoIosCopy className="w-5 h-5" />,
  //     color: 'bg-gray-100 hover:bg-gray-200',
  //     textColor: 'text-gray-800',
  //     onClick: shareUrl
  //   }
  // ];

  // Stop Re-Rendring This Function

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
  // Stop Re-Rendring This Function
  const formatDate = (dateString) => {
    if (!dateString) {
      return "Invalid Date";
    }

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

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
        if (PostData.PropertyImages.length <= 1) {
          setImageTranlate(0);
        }

        if (PostData.PropertyImages.length > 1) {
          if (
            Number(String(ImageTranlate).replace("-", "")) + 1 <
            PostData.PropertyImages.length
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
        dispatch(GetMeDetailsAction());
      }
    }
  }, [data]);

  useEffect(() => {
    const areaDetailsData = PostData.AreaDetails;

    if (areaDetailsData) {
      const { PlotArea, SuperBuiltUpArea, CarpetArea, BuiltUpArea } =
        areaDetailsData;

      if (PlotArea) {
        setAreaDetails({
          value: PlotArea.value,
          unit: PlotArea.unit,
          label: "Plot Area",
        });
      } else if (SuperBuiltUpArea.value) {
        setAreaDetails({
          value: SuperBuiltUpArea.value,
          unit: SuperBuiltUpArea.unit,
          label: "Super Area",
        });
      } else if (CarpetArea.value && !BuiltUpArea.value) {
        setAreaDetails({
          value: CarpetArea.value,
          unit: CarpetArea.unit,
          label: "Carpet Area",
        });
      } else if (BuiltUpArea.value && !CarpetArea.value) {
        setAreaDetails({
          value: BuiltUpArea.value,
          unit: BuiltUpArea.unit,
          label: "Built-up Area",
        });
      } else if (BuiltUpArea.value || CarpetArea.value) {
        if (CarpetArea.value > BuiltUpArea.value) {
          setAreaDetails({
            value: CarpetArea.value,
            unit: CarpetArea.unit,
            label: "CarpetArea Area",
          });
        } else {
          setAreaDetails({
            value: BuiltUpArea.value,
            unit: BuiltUpArea.unit,
            label: "Built-up Area",
          });
        }
      }
    }
    const floorDetailsData = PostData.FloorDetails;

    if (floorDetailsData) {
      const { PropertyOnFloor, TotalFloors } = floorDetailsData;
      const propertyOnFloorText = PropertyOnFloor
        ? `${PropertyOnFloor} out of`
        : "";
      const totalFloorsText = TotalFloors ? ` ${TotalFloors}` : "";
      setFloorDetails(`${propertyOnFloorText}${totalFloorsText}`);
    }

    setPropertyAddress(
      `${PostData.PropertyDetails.BHKType} BHk ${PostData.BasicDetails.ApartmentType} For ${PostData.BasicDetails.PropertyAdType} In ${PostData.LocationDetails.Landmark} ${PostData.LocationDetails.City}`
    );
  }, [PostData]);

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
      <div className="prop-card-main-box ">
        {PostData?.propertyStatus?.currentPropertyStatus==="sold out" && <div className="sold-out-blur-img sold-img-blur glass-effect">
          <img src="/img/sold-out.svg" alt="" className="sold-img-blu blur-img"/>
          {/* <p className="sold-out-lable">This property is sold out</p> */}
          </div>
          }
        <div className="property-post-card-main">
          <div
            className="property-post-card"
            id="property-card-1"
            onMouseOver={() => {
              setRunInterval(true);
              setRunImageSlider(true);
            }}
            onMouseLeave={() => {
              setRunImageSlider(false);
            }}
          >
            <div className="icon-box">
              {PostData.PostVerifyShow ? (
                PostData.PostVerify ? (
                  <div className="active-post">
                    <img src="/img/verified-tag.svg" alt="verified-tag" />
                    <p className="active-post-para">Verified</p>
                  </div>
                ) : (
                  <div className="inactive-post">
                    <p className="inactive-post-para">Inactive</p>
                  </div>
                )
              ) : null}
              {/* If PostVerifyShow is false, show nothing */}
            </div>

            {/* <div className="IconBox">
            <div className="edit-delete-Icon-box">
              {location.pathname.includes("user/my-listing") &&
                PostData.BasicDetails.PropertyAdType == "Rent" && (
                  <>
                    <Link to={`/user/post/update/${PostData._id}`}>
                      <img src="/img/edit.png" className="editIcon" />
                    </Link>
                  </>
                )}
            </div>
          </div> */}

            {PostData?.propertyStatus?.currentPropertyStatus!=="sold out" ? <div className="imageSlide">
              {PostData.PropertyImages.map((Post, i) => {
                return (
                  <img
                    key={i}
                    src={Post.url}
                    alt="PropertyPost"
                    style={{
                      transform: `translateX(${ImageTranlate}00%)`,
                      transition:
                        RunImageSlider === true &&
                        RunInterval === true &&
                        "all 1s ease-in-out",
                    }}
                  />
                );
              })}
            </div>:
          <div className="imageSlide">
                <img
                    // key={}
                    src={PostData.PropertyImages[0].url}
                    alt="PropertyPost"
                    style={{
                      transform: `translateX(${ImageTranlate}00%)`,
                      transition:
                        RunImageSlider === true &&
                        RunInterval === true &&
                        "all 1s ease-in-out",
                    }}
                  />

          </div>
                  }
            <div className="property-card-info ">
              <div className={`heading-name  ${PostData?.propertyStatus?.currentPropertyStatus!=="sold out" ? "" : "sold-out"} `}>
                {PostData.LocationDetails.ProjectName}

               {PostData?.propertyStatus?.currentPropertyStatus!=="sold out" && <div className="share-fav-main-box">
                  <div className="postcard-share-parent">
                    <div onClick={() => setIsModalOpen(true)}>
                      <img
                        src="/img/share-btn.svg"
                        className="img-fluid img-thumbnail"
                        alt="..."
                      ></img>
                    </div>
                    {/* share button end */}
                  </div>
                  {!["Owner", "Admin"].includes(medata?.user?.Role) && (
                    <div className={`add-favourite-box  flex`}>
                      <button
                        className={`add-favourite-btn ${index}`}
                        onClick={() => {
                          if (medata && medata.IsAuthenticated == true) {
                            dispatch(
                              AddFavouriteAndUnFavouriteAction({
                                PostData: { PostId: PostData._id },
                              })
                            );
                          } else {
                            navigate("/login");
                          }
                        }}
                      >
                        {medata?.user?.FavouritePost?.some(
                          (fav) =>
                            String(fav.PostData.PostId?._id) ===
                            String(PostData._id)
                        ) ? (
                          <img
                            className="fav-icon"
                            src="/img/Un-Fav-Post.svg"
                            alt="Fav-icon"
                          />
                        ) : (
                          <img
                            className="fav-icon"
                            src="/img/Fav-Post.svg"
                            alt="Fav-icon"
                          />
                        )}
                      </button>
                      {location.pathname.includes("user/my-listing") &&
                        PostData.BasicDetails.PropertyAdType == "Rent" && (
                          <>
                            <Link to={`/user/post/update/${PostData._id}`}>
                              <img src="/img/edit.png" className="editIcon" />
                            </Link>
                          </>
                        )}
                    </div>
                  )}
                </div>}
              </div>
              <div>
                <p className={`  property-address ${PostData?.propertyStatus?.currentPropertyStatus!=="sold out" ? "" : "sold-out"}`}>{PropertyAddress}</p>
              </div>
              <div className="details-about-property">
                <div className="main-class--property">
                  <div className="img-box-imp-data-card">
                    <p className={`  answer-box  ${PostData?.propertyStatus?.currentPropertyStatus!=="sold out" ? "" : "sold-out"}`}>
                      {`${PostData.PropertyDetails.BHKType} BHK`}{" "}
                      {PostData.PropertyDetails?.OtherRoom?.map((text) => {
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
                      })}
                    </p>
                    <p className={`question-box ${PostData?.propertyStatus?.currentPropertyStatus!=="sold out" ? "" : "sold-out"} `}>Type </p>
                  </div>
                </div>
                <div>
                  <div className="Area-answer">
                    {areaDetails ? (
                      <div className="area-card-box ">
                        <p className={` answer-box ${PostData?.propertyStatus?.currentPropertyStatus!=="sold out" ? "" : "sold-out"} `}>
                          {`${areaDetails.value} ${areaDetails.unit}`}
                        </p>
                        <p className={` question-box ${PostData?.propertyStatus?.currentPropertyStatus!=="sold out" ? "" : "sold-out"}`}>{areaDetails.label}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div>
                  <div className="property-status-floor">
                    <p className={` answer-box ${PostData?.propertyStatus?.currentPropertyStatus!=="sold out" ? "" : "sold-out"}`}>{floorDetails}</p>
                    <p className={`question-box ${PostData?.propertyStatus?.currentPropertyStatus!=="sold out" ? "" : "sold-out"}`}> Floor </p>
                  </div>
                </div>
                <div>
                  {" "}
                  <div className="property-status">
                    <p className={` answer-box ${PostData?.propertyStatus?.currentPropertyStatus!=="sold out" ? "" : "sold-out"}`}>
                      {PostData.AmenitiesDetails.Furnishing}
                    </p>
                    <p className={`question-box ${PostData?.propertyStatus?.currentPropertyStatus!=="sold out" ? "" : "sold-out"}`}> Furnishing Details</p>
                  </div>
                </div>
              </div>
              <div className="Price-section-card">
                <div className="Reserveprice-sec">
                  <p className={`price-pr-anwser ${PostData?.propertyStatus?.currentPropertyStatus!=="sold out" ? "" : "sold-out"}`}>
                    {/* Show Reserve Price  */}
                    {PostData.BasicDetails.PropertyAdType == "Sale" && (
                      <>
                        <div>
                          <div className="price-section-sale">
                            <span className={`price-rp-que ${PostData?.propertyStatus?.currentPropertyStatus!=="sold out" ? "" : "sold-out"} `}>
                              {" "}
                              Reserve Price{" "}
                            </span>
                            :
                            <span className={` price-section ${PostData?.propertyStatus?.currentPropertyStatus!=="sold out" ? "" : "sold-out"} `}>
                              {formatReservePrice(
                                PostData.PricingDetails.ExpectedPrice
                              )}
                            </span>
                          </div>
                          <p className={`post-card-section ${false ? "" : "sold-out"} `}>
                            ₹ {PostData.PricingDetails.PricePerSqFt} Per sqft
                          </p>
                        </div>
                      </>
                    )}
                  </p>
                </div>
                {PostData.BasicDetails.PropertyAdType == "Rent" && (
                  <>
                    <>
                      <div className="rent-deposite-section">
                        <div>
                          <p className="price-ans">
                            {formatReservePrice(
                              PostData.PricingDetails.ExpectedRent
                            )}
                            <span>/Month </span>
                          </p>
                          <p className="question-box">Rent </p>
                        </div>
                        <div>
                          <div className="Reserveprice-sec">
                            <div className="Reserveprice-sec-grid">
                              <p className="price-ans">
                                {formatReservePrice(
                                  PostData.PricingDetails.DepositePrice
                                )}
                              </p>
                              <p className="question-box">Deposit Amount </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  </>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="price-details">
             {
               PostData?.propertyStatus?.currentPropertyStatus==="sold out" ?  <p className=""></p>:<div className="Date-of-post">
               {PostData.PostVerify ? (
                 <p>
                   Posted On:{" "}
                   <span id="postdate">
                     {formatDate(PostData.PostVerifyData?.Time)}
                   </span>
                 </p>
               ) : (
                 <p className="inative-post-status">
                   This post is currently{" "}
                   <span className="span-inactive-post"> Inactive</span>
                 </p>
               )}
             </div>
             }

              <Link
                to={`/post-detail/${PropertyAddress.toLowerCase()
                  .replaceAll(" ", "-")
                  .replace(",", "")
                  .replaceAll("/", "-")}-${PostData._id}`}
              >
                <button className={`contact-button ${PostData?.propertyStatus?.currentPropertyStatus!=="sold out" ? "" : "sold-out-button"}`} disabled={PostData?.propertyStatus?.currentPropertyStatus!=="sold out" ? false: true}>View More</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* share card begin  */}

      <ShareModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        propid={`${window.location.origin
          }/post-detail/${PropertyAddress.toLowerCase()
            .replaceAll(" ", "-")
            .replace(",", "")
            .replaceAll("/", "-")}-${PostData._id}`}
      />

      {/* share card end  */}
    </>
  );
}
