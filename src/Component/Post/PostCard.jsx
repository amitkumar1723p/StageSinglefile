import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate, Navigate } from "react-router-dom";
import { IoMdShareAlt } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

import "./Post.css";
import {
  AddFavouriteAndUnFavouriteAction,
  GetMeDetailsAction,
} from "../../Action/userAction";

export default function PostCard({ PostData, index }) {
  const navigate = useNavigate();

  const { medata } = useSelector((state) => {
    return state.meDetails;
  });
  const { data, LodingType } = useSelector((state) => {
    return state.userData;
  });
  const [floorDetails, setFloorDetails] = useState("");

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

  const shareUrl = () => {
   
     
    navigator.clipboard.writeText(window.location.href);
  };


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
      `${PostData.PropertyDetails.BHKType} BHk ${PostData.BasicDetails.ApartmentType} For ${PostData.BasicDetails.PropertyAdType} In ${PostData.LocationDetails.Locality}`
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
        <div className="IconBox">
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
        </div>

        <div className="imageSlide">
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
        </div>
        <div className="property-card-info">
          <div className="heading-name">
            {PostData.LocationDetails.ProjectName}
            {/* <IoMdShareAlt />  */}
            {/* <img onClick={toggleShare}  src="/img/share.png" alt="" /> */}
            {/* share button */}
       <div className="postcard-share-parent">
           {/* <button onClick={toggleShare} className="share-btn"> share
           </button> */}
 
            </div>  
            {!["Owner", "Admin"].includes(medata?.user?.Role) && (
              <div className={`add-favourite-box `}>
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
                      String(fav.PostData.PostId?._id) === String(PostData._id)
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
              </div>
            )}
          </div>
          <div>
            <p className="property-address">{PropertyAddress}</p>
          </div>
          <div className="details-about-property">
            <div className="main-class--property">
              <div className="img-box-imp-data-card">
                <p className=" answer-box">
                  {`${PostData.PropertyDetails.BHKType} BHK`}{" "}
                  {PostData.PropertyDetails?.OtherRoom.map((text) => {
                    return `+ ${
                      text == "Pooja Room"
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
                <p className="question-box">Type </p>
              </div>
            </div>
            <div>
              <div className="Area-answer">
                {areaDetails ? (
                  <div className="area-card-box">
                    <p className="answer-box">
                      {`${areaDetails.value} ${areaDetails.unit}`}
                    </p>
                    <p className="question-box">{areaDetails.label}</p>
                  </div>
                ) : null}
              </div>
            </div>
            <div>
              <div className="property-status-floor">
                <p className="answer-box">{floorDetails}</p>
                <p className="question-box"> Floor </p>
              </div>
            </div>
            <div>
              {" "}
              <div className="property-status">
                <p className="answer-box">
                  {PostData.AmenitiesDetails.Furnishing}
                </p>
                <p className="question-box"> Furnishing Details</p>
              </div>
            </div>
          </div>
          <div className="Price-section-card">
            <div className="Reserveprice-sec">
              <p className="price-pr-anwser">
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
                        <div className="price-pr-anwser">
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
          <p className="Date-of-post">
            Posted On :{" "}
            <span id="postdate">
              {formatDate(PostData.PostVerifyData?.Time)}
            </span>
          </p>

          <Link
            to={`/post-detail/${PropertyAddress.toLowerCase()
              .replaceAll(" ", "-")
              .replace(",", "")
              .replaceAll("/", "-")}-${PostData._id}`}
          >
            <button className="contact-button">View More</button>
          </Link>
        </div>
      </div>
      </div>
      {/* share card  */}

      {isShare && (
        <div className="share1">
 <div className="share2">
  <p className="sharehead">Share Property with Your Friends !</p>
          <ul className="containerBox">
            <li className="share_options">
              <Link to={`https://t.me/share/url?url=${window.location.href}`} target="_blank" rel="noopener noreferrer"  className="share_options">
              Telegram
              </Link>
            </li>
            <li className="share_options">
              <Link to={`https://wa.me/?text=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="share_options">
               WhatsApp
              </Link>
            </li>
            <li className="share_options">
              <p onClick={shareUrl}>
                Copy URL
              </p>
            </li>
          </ul>
       
          <button className="shareButton"><span style={{padding:"2px"}}>Close</span></button>
        
          </div>
        
        </div>
      )}

    
    </>
  );
}
