import React, { useContext, useEffect, useRef, useState } from "react";
import "./SinglePostDetails.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetSinglePostAction } from "../../../Action/postAction";
import Loader from "../../Loader/Loader";
import "./ReportListingForm.css";
import PropertyDataBox from "./PropertyDataBox";

import ExpressionOfInterestForm from "./ExpressionOfInterest";
import BiddingForm from "./BiddingForm";
// import { GetPost_BiddingDocumentAction } from "../../../Action/userAction";
import BiddingData from "./BiddingData";
import ScheduleYourVisit from "./ScheduleYourVisit";

import SinglePostImageSlider from "./SinglePostImageSlider";
import ProjectNameSection from "../ProjectName";
import WindowComponent from "../../WindowComponent";
import CreateTenantPostResponse from "./CreateTenantPostResponse";
import MakeOfferSuccessAlert from "./MakeOfferSuccessAlert";
import { UserContext } from "../../CreateContext/CreateContext";

import ShowSinglePostImages from "./ShowSinglePostImages";
import ReportListingForm from "./ReportListingForm";
// import AreaGraphIcon from './Images/AreaGraph.png'
export default function SinglePostDetails() {
  const dispatch = useDispatch();
  const Params = useParams();
  const Tenant_PostResponseBtnRef = useRef(null);
  const BiddingFormOpenBtnRef = useRef(null);
  const ScheduleYourVisitOpenBtnRef = useRef(null);
  const SupspiciousListingBtn = useRef(null);
  const navigate = useNavigate();
  const [SinglePostId, setSinglePostId] = useState("");
  const { setRedirectPath, RedirectPath } = useContext(UserContext);
  const [showMakeOfferSuccessAlert, setshowMakeOfferSuccessAlert] =
    useState(false);

  // const copyToClipboard = () => {
  //   const url = window.location.href; // Get the current page URL
  //   navigator.clipboard.writeText(url).then(
  //     () => {
  //       alert("URL copied to clipboard!");
  //     },
  //     () => {
  //       alert("Failed to copy URL.");
  //     }
  //   );
  // };
  const location = useLocation();
  const [showBiddingForm, setshowBiddingForm] = useState(false);
  const [showScheduleVisitForm, setshowScheduleVisitForm] = useState(false);
  const [PropertyAddress, setPropertyAddress] = useState("");
  const [showTenant_PostResponseForm, setshowTenant_PostResponseForm] =
    useState(false);
  const [areaDetails, setAreaDetails] = useState(null);
  const [floorDetails, setFloorDetails] = useState("");
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });
  const { loading, data: getSinglePostData } = useSelector((state) => {
    return state.GetSinglePost;
  });

  useEffect(() => {
    let postaddresh = Params.PostAddresh;
    let postId = postaddresh.substring(postaddresh.lastIndexOf("-") + 1);
    setSinglePostId(postId);
    dispatch(GetSinglePostAction(postId));
  }, []);

  useEffect(() => {
    if (getSinglePostData && getSinglePostData.success == true) {
      setPropertyAddress(
        `${`${getSinglePostData.SinglePost.PropertyDetails.BHKType} BHK`} ${
          getSinglePostData.SinglePost.BasicDetails.ApartmentType
        } For ${getSinglePostData.SinglePost.BasicDetails.PropertyAdType} In  ${
          getSinglePostData.SinglePost.LocationDetails.ProjectName
        } ${getSinglePostData.SinglePost.LocationDetails.Landmark}  ${
          getSinglePostData.SinglePost.LocationDetails.Locality
        }`
      );

      const areaDetailsData = getSinglePostData?.SinglePost?.AreaDetails;
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
            label: "Super-Built-up Area",
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

      const floorDetailsData = getSinglePostData?.SinglePost?.FloorDetails;

      if (floorDetailsData) {
        const { PropertyOnFloor, TotalFloors } = floorDetailsData;
        const propertyOnFloorText = PropertyOnFloor
          ? `${PropertyOnFloor} out of`
          : "";
        const totalFloorsText = TotalFloors ? ` ${TotalFloors}` : "";
        setFloorDetails(`${propertyOnFloorText}${totalFloorsText}`);
      }
    }
  }, [getSinglePostData, Params.PostAddresh]);

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

  useEffect(() => {
    if (medata && medata.IsAuthenticated == true) {
      if (sessionStorage.getItem("RedirectPath") == "/show-scheduleVisit") {
        setshowScheduleVisitForm(true);
      } else if (sessionStorage.getItem("RedirectPath") == "/show-offerForm") {
        setshowBiddingForm(true);
      } else if (
        sessionStorage.getItem("RedirectPath") ==
        "/show-Supspicious-Listing-Form"
      ) {
        setOpenReportForm(true);
      } else if (
        sessionStorage.getItem("RedirectPath") == "/show-TenantResponseForm"
      ) {
        setshowTenant_PostResponseForm(true);
      }

      sessionStorage.removeItem("RedirectPath");
      setRedirectPath("");
    }
  }, [medata]);

  // useEffect(() => {
  //   const unlisten = navigate((state) => {
  //     console.log(state)
  //     // console.log("Navigated to:", location.pathname);
  //     // if (state.action === "POP") {
  //     //   console.log("User used Back or Forward button.");
  //     //   // Perform actions based on Back or Forward button navigation
  //     // }
  //   });

  //   // return () => {
  //   //   unlisten();
  //   // };
  // }, [navigate, location.pathname]);
  // let loadings =true

  // open report form
  const [openReportForm, setOpenReportForm] = useState(false);
  const [reportdata, setReportData] = useState("");
  const handleReportFormOpen = (e) => {
    setOpenReportForm(true);
  };
  const closehandleReportForm = (e) => {
    setOpenReportForm(false);
  };

  return (
    <>
      {/* {openReportForm === true ? (
        <div className="report-form-container">
          <div className="report-form-header">
            <span className="report-form-title">Report Listing</span>
            <button className="close-button" onClick={closehandleReportForm}>
              ×
            </button>
          </div>
          <ReportListingForm propertyId= {getSinglePostData.SinglePost._id}/>
        </div>
      ) : null} */}

      {loading ? (
        <Loader className="windowloader" />
      ) : (
        getSinglePostData &&
        getSinglePostData.success === true && (
          <div className="property-details-container">
            {/* <!-- Left side: Property Image --> */}

            <div className="property-image">
              <div></div>
              <ShowSinglePostImages
                Images={getSinglePostData.SinglePost.PropertyImages}
              />

              {/* Single Post First Card  */}
              <div className="property-info">
                <div className="property-location">
                  <p className="Property-detail-heading"> {PropertyAddress}</p>
                </div>
                <div className="prop-grid">
                  <div className="property-info-tags">
                    <img
                      className="icon-detials"
                      src="/img/typology.png"
                      alt="icon"
                    />
                    <div className="img-box-imp-data">
                      <span className="img-box-details-span">
                        {`${getSinglePostData.SinglePost.PropertyDetails.BHKType} BHK`}
                        {getSinglePostData.SinglePost.PropertyDetails?.OtherRoom.map(
                          (text) => {
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
                          }
                        )}
                      </span>
                      <p> Type </p>
                    </div>
                  </div>
                  <div className="property-info-tags">
                    <img
                      className="icon-detials"
                      src="/img/area.png"
                      alt="icon"
                    />
                    <div className="img-box-imp-data">
                      {areaDetails ? (
                        <div className="img-box-details-span">
                          <span>
                            {`${areaDetails.value} ${areaDetails.unit}`}
                          </span>
                          <br />
                          <p>{areaDetails.label}</p>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="property-info-tags">
                    <img
                      className="icon-detials"
                      src="/img/furnish.png"
                      alt="icon"
                    />
                    <div className="img-box-imp-data">
                      <span className="img-box-details-span">
                        {
                          getSinglePostData.SinglePost.AmenitiesDetails
                            .Furnishing
                        }
                      </span>
                      <p>Furnishing Details</p>
                    </div>
                  </div>

                  <div className="property-info-tags">
                    <img
                      className="icon-detials"
                      src="/img/overlooking.png"
                      alt="icon"
                    />
                    <div className="img-box-imp-data">
                      <span className="img-box-details-span">
                        {
                          getSinglePostData.SinglePost.FloorDetails
                            .OverLookingView[0]
                        }
                      </span>
                      <p> Overlooking View </p>
                    </div>
                  </div>

                  <div className="property-info-tags">
                    <img
                      className="icon-detials"
                      src="/img/floor.png"
                      alt="icon"
                    />
                    <div className="img-box-imp-data">
                      <span className="img-box-details-span">
                        {floorDetails}
                      </span>
                      <p> Floor</p>
                    </div>
                  </div>
                  {(getSinglePostData.SinglePost.PropertyDetails.Parking
                    .CoveredParking > 0 ||
                    getSinglePostData.SinglePost.PropertyDetails.Parking
                      .OpenParking > 0) && (
                    <div className="property-info-tags">
                      <img
                        className="icon-detials"
                        src="/img/parking.png"
                        alt="icon"
                      />
                      <div className="img-box-imp-data">
                        <span className="img-box-details-span">
                          {getSinglePostData.SinglePost.PropertyDetails.Parking
                            .CoveredParking +
                            getSinglePostData.SinglePost.PropertyDetails.Parking
                              .OpenParking}
                        </span>
                        <p> Parking </p>
                      </div>
                    </div>
                  )}
                </div>
                {/* BiddingFormRef */}

                <div className="property-pricing">
                  <div className="property-price">
                    {getSinglePostData.SinglePost.BasicDetails.PropertyAdType ==
                      "Sale" && (
                      <>
                        <span>
                          Reserve Price :{" "}
                          <span className="price-value-in-span">
                            {formatReservePrice(
                              getSinglePostData.SinglePost.PricingDetails
                                .ExpectedPrice
                            )}
                          </span>
                        </span>

                        {!["Owner", "Admin"].includes(medata?.user?.Role) && (
                          <span
                            className="original-price"
                            ref={BiddingFormOpenBtnRef}
                            onClick={() => {
                              if (medata && medata.IsAuthenticated == true) {
                                setshowBiddingForm(true);
                              } else {
                                setRedirectPath("/show-offerForm");
                                navigate("/login");
                              }
                            }}
                          >
                            Make Your Offer
                          </span>
                        )}
                      </>
                    )}
                    {getSinglePostData.SinglePost.BasicDetails.PropertyAdType ==
                      "Rent" && (
                      <>
                        <span>
                          <span>
                            Rent Price
                            {formatReservePrice(
                              getSinglePostData.SinglePost.PricingDetails
                                .ExpectedRent
                            )}
                          </span>
                          <br />
                          <span>
                            {" "}
                            DepositePrice Price{" "}
                            {formatReservePrice(
                              getSinglePostData.SinglePost.PricingDetails
                                .DepositePrice
                            )}
                          </span>
                        </span>

                        {!["Owner", "Admin"].includes(medata?.user?.Role) &&
                          getSinglePostData.SinglePost.CreatePostUser !==
                            medata?.user?._id && (
                            <span
                              className="original-price"
                              ref={Tenant_PostResponseBtnRef}
                              onClick={() => {
                                if (medata && medata.IsAuthenticated == true) {
                                  setshowTenant_PostResponseForm(true);
                                } else {
                                  setRedirectPath("show-TenantResponseForm");
                                  navigate("/login");
                                }
                              }}
                            >
                              Create Response
                            </span>
                          )}
                      </>
                    )}
                  </div>
                </div>

                <div className="property-actions">
                  {!["Owner", "Admin"].includes(medata?.user?.Role) && (
                    <>
                      {" "}
                      <button
                        ref={ScheduleYourVisitOpenBtnRef}
                        className="contact-expert-btn"
                        onClick={() => {
                          if (medata && medata.IsAuthenticated == true) {
                            setshowScheduleVisitForm(true);
                          } else {
                            setRedirectPath("/show-scheduleVisit");
                            navigate("/login");
                          }
                        }}
                      >
                        Schedule Your Visit
                      </button>
                    </>
                  )}

                  <Link
                    to="https://wa.me/9560509397?text=Hello"
                    target="_blank"
                    className="contact-expert-btn"
                  >
                    {/* <button className="contact-expert-btn"> */}
                    <img
                      className="icon-detial"
                      src="/img/whatapp.png"
                      alt="icon"
                    />
                    WhatsApp
                    {/* </button> */}
                  </Link>
                </div>
                {getSinglePostData.SinglePost.PostVerifyData?.Time && (
                  <div className="posted-by-section">
                    <img
                      src={`data:image/svg+xml;utf8,${encodeURIComponent(`
   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M15.7741 4.63696L12.4718 4.63697V3.81501C12.4718 3.58715 12.2872 3.40259 12.0594 3.40259C11.8315 3.40259 11.647 3.58715 11.647 3.81501V4.63677H8.34757V3.81501C8.34757 3.58715 8.16301 3.40259 7.93514 3.40259C7.70728 3.40259 7.52272 3.58715 7.52272 3.81501V4.63677H4.22621C3.77069 4.63677 3.40137 5.00609 3.40137 5.46161V15.7722C3.40137 16.2277 3.77069 16.5971 4.22621 16.5971H15.7741C16.2296 16.5971 16.5989 16.2277 16.5989 15.7722V5.46161C16.5989 5.00629 16.2296 4.63696 15.7741 4.63696ZM15.7741 15.7722H4.22621V5.46161H7.52272V5.87713C7.52272 6.10498 7.70728 6.28955 7.93514 6.28955C8.16301 6.28955 8.34757 6.10498 8.34757 5.87713V5.46182H11.647V5.87734C11.647 6.1052 11.8315 6.28976 12.0594 6.28976C12.2872 6.28976 12.4718 6.1052 12.4718 5.87734V5.46182H15.7741V15.7722ZM12.8871 9.99847H13.712C13.9396 9.99847 14.1244 9.8137 14.1244 9.58605V8.7612C14.1244 8.53354 13.9396 8.34877 13.712 8.34877H12.8871C12.6595 8.34877 12.4747 8.53354 12.4747 8.7612V9.58605C12.4747 9.8137 12.6595 9.99847 12.8871 9.99847ZM12.8871 13.2977H13.712C13.9396 13.2977 14.1244 13.1131 14.1244 12.8852V12.0604C14.1244 11.8327 13.9396 11.648 13.712 11.648H12.8871C12.6595 11.648 12.4747 11.8327 12.4747 12.0604V12.8852C12.4747 13.1133 12.6595 13.2977 12.8871 13.2977ZM10.4126 11.648H9.58773C9.36007 11.648 9.1753 11.8327 9.1753 12.0604V12.8852C9.1753 13.1131 9.36007 13.2977 9.58773 13.2977H10.4126C10.6402 13.2977 10.825 13.1131 10.825 12.8852V12.0604C10.825 11.8329 10.6402 11.648 10.4126 11.648ZM10.4126 8.34877H9.58773C9.36007 8.34877 9.1753 8.53354 9.1753 8.7612V9.58605C9.1753 9.8137 9.36007 9.99847 9.58773 9.99847H10.4126C10.6402 9.99847 10.825 9.8137 10.825 9.58605V8.7612C10.825 8.53333 10.6402 8.34877 10.4126 8.34877ZM7.11318 8.34877H6.28833C6.06068 8.34877 5.87591 8.53354 5.87591 8.7612V9.58605C5.87591 9.8137 6.06068 9.99847 6.28833 9.99847H7.11318C7.34084 9.99847 7.52561 9.8137 7.52561 9.58605V8.7612C7.52561 8.53333 7.34084 8.34877 7.11318 8.34877ZM7.11318 11.648H6.28833C6.06068 11.648 5.87591 11.8327 5.87591 12.0604V12.8852C5.87591 13.1131 6.06068 13.2977 6.28833 13.2977H7.11318C7.34084 13.2977 7.52561 13.1131 7.52561 12.8852V12.0604C7.52561 11.8329 7.34084 11.648 7.11318 11.648Z" fill="#0078D4"/>
</svg>
  `)}`}
                      alt="post-img"
                    />
                    <p>
                      Posted On :{" "}
                      <span>
                        {
                          new Date(
                            getSinglePostData.SinglePost.PostVerifyData.Time
                          )
                            .toISOString()
                            .split("T")[0]
                        }
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Single Post Second Card  */}
            <div className="prop-content-main">
              <div className="prop-left">
                <div className="overviwe-main">
                  <div className="details-heading-section">
                    <h3>Property Details</h3>
                    <div className="property-id-leanding">
                      <span className="prop-id-name">
                        <img
                          className="home-icon"
                          src="/img/Home-id.png"
                          alt="Home-logo"
                        />
                        Property Id :
                      </span>

                      <span className="prop-id-number">
                        {getSinglePostData.SinglePost._id}
                      </span>
                    </div>
                  </div>
                  <div className="overbox-icon">
                    {/* ApartmentType */}
                    <PropertyDataBox
                      Answer={
                        getSinglePostData.SinglePost.BasicDetails.ApartmentType
                      }
                      Icon="/img/floor.png"
                      Data={"Property Type"}
                    />
                    {/* PropertyStatus */}
                    {getSinglePostData.SinglePost.BasicDetails
                      .PropertyStatus && (
                      <PropertyDataBox
                        Answer={
                          getSinglePostData.SinglePost.BasicDetails
                            .PropertyStatus
                        }
                        Icon="/img/status.png"
                        Data={"Status"}
                      />
                    )}

                    {/* BHKType */}
                    <PropertyDataBox
                      Answer={`${getSinglePostData.SinglePost.PropertyDetails.BHKType} BHK`}
                      Icon="/img/typology.png"
                      Data={"BHK Type"}
                    />
                    {/* areaDetails */}
                    {areaDetails && (
                      <PropertyDataBox
                        Answer={`${areaDetails.value} ${areaDetails.unit}`}
                        Icon="/img/area.png"
                        Data={areaDetails.label}
                      />
                    )}
                    {/* Bathroom */}
                    {getSinglePostData.SinglePost.PropertyDetails?.Bathroom >
                      0 && (
                      <PropertyDataBox
                        Answer={
                          getSinglePostData.SinglePost.PropertyDetails.Bathroom
                        }
                        Icon="/img/bathroom.png"
                        Data={"Bathrooms"}
                      />
                    )}
                    {/* Balcony */}
                    {getSinglePostData.SinglePost.PropertyDetails?.Balcony >
                      0 && (
                      <PropertyDataBox
                        Answer={
                          getSinglePostData.SinglePost.PropertyDetails.Balcony
                        }
                        Icon="/img/balcony.png"
                        Data={"Balconies"}
                      />
                    )}

                    {/* Furnishing */}
                    <PropertyDataBox
                      Answer={
                        getSinglePostData.SinglePost.AmenitiesDetails.Furnishing
                      }
                      Icon="/img/furnish.png"
                      Data={"Furnishing Details"}
                    />
                    {/* FloorDetails */}

                    <PropertyDataBox
                      Id={"property-dir"}
                      Answer={
                        getSinglePostData.SinglePost.FloorDetails
                          .PropertyDirection
                      }
                      Icon="/img/facing.png"
                      Data={"Property Direction"}
                    />

                    {/* <PropertyDataBox
                      Answer={"Overlooking View"}
                      Icon="/img/area.png"
                      Data={"Park, Pool"}
                    /> */}

                    {/* Property on Floor  */}
                    {getSinglePostData.SinglePost.BasicDetails.PropertyAdType ==
                      "Rent" && (
                      <PropertyDataBox
                        Answer={floorDetails}
                        Icon="/img/floorss.png"
                        Data={"Property on Floor"}
                      />
                    )}
                    {/* Property on Floor  , Total Floors" */}
                    {getSinglePostData.SinglePost.BasicDetails.PropertyAdType ==
                      "Sale" && (
                      <>
                        {getSinglePostData.SinglePost.FloorDetails
                          .PropertyOnFloor && (
                          <PropertyDataBox
                            Answer={`${getSinglePostData.SinglePost.FloorDetails.PropertyOnFloor}`}
                            Icon="/img/total-floor.png"
                            Data={"Property on Floor"}
                          />
                        )}
                        <PropertyDataBox
                          Answer={`${getSinglePostData.SinglePost.FloorDetails.TotalFloors}`}
                          Icon="/img/total-floor.png"
                          Data={"Total Floors"}
                        />
                      </>
                    )}
                    {getSinglePostData.SinglePost.PropertyDetails.Parking
                      ?.OpenParking > 0 && (
                      <PropertyDataBox
                        Answer={
                          getSinglePostData.SinglePost.PropertyDetails.Parking
                            .OpenParking
                        }
                        Icon="/img/parking.png"
                        Data={"Open Parking"}
                      />
                    )}

                    {getSinglePostData.SinglePost.PropertyDetails.Parking
                      ?.CoveredParking > 0 && (
                      <PropertyDataBox
                        Answer={
                          getSinglePostData.SinglePost.PropertyDetails.Parking
                            .CoveredParking
                        }
                        Icon="/img/parking.png"
                        Data={"Cover Parking"}
                      />
                    )}
                    {/* Parking  */}

                    {/* Flooring Type */}
                    <PropertyDataBox
                      Answer={`${getSinglePostData.SinglePost.PropertyDetails.FlooringType}`}
                      Icon="/img/Flooring-Type.png"
                      Data={"Flooring Type"}
                    />
                    {/* Power BackUp */}
                    <PropertyDataBox
                      Answer={`${getSinglePostData.SinglePost.AmenitiesDetails.PowerBackUp}`}
                      Icon="/img/power-backup.png"
                      Data={"Power BackUp"}
                    />

                    {/* Water Source */}
                    <PropertyDataBox
                      Answer={`${getSinglePostData.SinglePost.AmenitiesDetails.WaterSource}`}
                      Icon="/img/water.png"
                      Data={"Water Source"}
                    />

                    {/* Property Age */}
                    {getSinglePostData.SinglePost.BasicDetails.PropertyAge && (
                      <PropertyDataBox
                        Answer={`${getSinglePostData.SinglePost.BasicDetails.PropertyAge} Year`}
                        Icon="/img/bathroom.png"
                        Data={"Property Age"}
                      />
                    )}

                    {getSinglePostData.SinglePost.BasicDetails.PropertyAdType ==
                      "Rent" && (
                      <>
                        <PropertyDataBox
                          Answer={`${getSinglePostData.SinglePost.BasicDetails.AvailableFrom}`}
                          Icon="/img/bathroom.png"
                          Data={"Available From"}
                        />

                        {getSinglePostData.SinglePost.PricingDetails
                          .AdditionalDetails?.PreferredTenant && (
                          <PropertyDataBox
                            Answer={`${getSinglePostData.SinglePost.PricingDetails.AdditionalDetails?.PreferredTenant.map(
                              (text) => {
                                return text;
                              }
                            )}`}
                            Icon="/img/bathroom.png"
                            Data={"Preferred Tenant"}
                          />
                        )}

                        <PropertyDataBox
                          Answer={`${getSinglePostData.SinglePost.PricingDetails.ExpectedRent}`}
                          Icon="/img/bathroom.png"
                          Data={"Expected Rent"}
                        />

                        <PropertyDataBox
                          Answer={`${getSinglePostData.SinglePost.PricingDetails.DepositePrice}`}
                          Icon="/img/Property-age.png"
                          Data={"Security Deposit"}
                        />
                      </>
                    )}
                  </div>
                </div>
                {!["Admin", "Owner"].includes(medata?.user?.Role) && (
                  <div className="map-loc">
                    <div className="location-section">
                      <h3 className="section-title">
                        Explore the Neighborhood
                      </h3>
                      <p className="map-para">
                        Discover your future home’s surroundings with our
                        interactive map. Zoom in, pan, and explore key locations
                        nearby to get a feel for the convenience and lifestyle
                        your new property offers.
                      </p>
                      <div className="map-container">
                        <iframe
                          title="map"
                          src="https://www.google.com/maps/embed?..."
                          className="map-iframe"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {!["Admin", "Owner"].includes(medata?.user?.Role) && (
                <div className="prop-right">
                  <div className="action-bar" ref={SupspiciousListingBtn}>
                    <p
                      onClick={() => {
                        if (medata && medata.IsAuthenticated == true) {
                          setOpenReportForm(true);
                        } else {
                          setRedirectPath("/show-Supspicious-Listing-Form");
                          navigate("/login");
                        }
                      }}
                    >
                      <img src="/img/warning.png" alt="warning" /> Found
                      suspicious listing? Report here!
                    </p>
                  </div>

                  {/* <ExpressionOfInterestForm /> */}
                  {showBiddingForm && (
                    <WindowComponent
                      Component={BiddingForm}
                      SetShow={setshowBiddingForm}
                      BtnRef={BiddingFormOpenBtnRef}
                      SinglePostData={getSinglePostData}
                      PropertyAddress={PropertyAddress}
                      // setshowMakeOfferSuccessAlert ={setshowMakeOfferSuccessAlert}
                    />
                  )}

                  {/* Schedule Your Visit */}
                  {showScheduleVisitForm && (
                    <WindowComponent
                      Component={ScheduleYourVisit}
                      SetShow={setshowScheduleVisitForm}
                      BtnRef={ScheduleYourVisitOpenBtnRef}
                      SinglePostData={getSinglePostData}
                      PropertyAddress={PropertyAddress}
                    />
                  )}

                  {/* View Response Form  */}

                  {showTenant_PostResponseForm && (
                    <WindowComponent
                      Component={CreateTenantPostResponse}
                      SetShow={setshowTenant_PostResponseForm}
                      BtnRef={Tenant_PostResponseBtnRef}
                      SinglePostData={getSinglePostData}
                      PropertyAddress={PropertyAddress}
                    />
                  )}

                  {/* <ReportListingForm propertyId= {getSinglePostData.SinglePost._id}/> */}
                  {openReportForm && (
                    <WindowComponent
                      Component={ReportListingForm}
                      SetShow={setOpenReportForm}
                      BtnRef={SupspiciousListingBtn}
                      SinglePostData={getSinglePostData}
                      // PropertyAddress={PropertyAddress}
                    />
                  )}

                  {/* <div className="loan-available-card">
                    <div className="loan-available-card-image">
                      <img src="/img/loanman.jpg" alt="Loan Image" />
                    </div>
                    <div className="loan-available-card-content">
                      <h4>List your Property Online</h4>
                      <p>
                        Save your time and enjoy hassle free experience with our
                        expert guidance.
                      </p>
                      <p>
                        <b>Hurry up </b>now to avail extra benefits.
                      </p>
                    </div>
                    <div className="loan-available-card-buttons">
                      <button className="loan-available-card-primary-button">
                        Free property Listing
                      </button>
                      <button className="loan-available-card-secondary-button">
                        Loan Available
                      </button>
                    </div>
                  </div> */}

                  {/* 2nd card option */}

                  {/* <div className="loan-available-card">
                    <div className="loan-available-card-image">
                      <img src="/img/loanman.jpg" alt="Loan Image" />
                    </div>
                    <div className="loan-available-card-content">
                      <h4>List your Property Online</h4>
                      <p>
                        Save your time and enjoy hassle free experience with our
                        expert guidance.
                      </p>
                      <p>
                        <b>Hurry up </b>now to avail extra benefits.
                      </p>
                    </div>
                    <div className="loan-available-card-buttons">
                      <div className="loan-available-card-primary-button2">
                        Avail Offers
                      </div>
                      <button className="loan-available-card-secondary-button2">
                        Home Loan Available
                      </button>
                    </div>
                  </div> */}

                  {/* rental Agrement */}

                  {/* <div className="rental-agreement-card">
                    <div className="rental-agreement-icons">
                      <img src="/img/agremnet.png" alt="Document Icon" />
                      <img src="/img/stamp.png" alt="Stamp Icon" />
                      <img src="/img/truck.png" alt="Delivery Icon" />
                    </div>
                    <div className="rental-agreement-content">
                      <h2 className="rental-agreement-title">
                        Rental Agreement
                      </h2>
                      <p className="rental-agreement-description">
                        Stamp, Notarize and deliver at just ₹999
                      </p>
                    </div>
                    <div className="rental-agreement-image">
                      <img src="/img/board.png" alt="Rental Agreement Image" />
                    </div>
                    <button className="rental-agreement-button">Start</button>
                  </div> */}
                </div>
              )}

              {/* {className CreateNewDiv} End */}
            </div>
            {/* {getSinglePostData.SinglePost.BasicDetails.PropertyAdType ==
              "Sale" && (
              <>
                {getSinglePostData.BiddingDocument?.length > 0 &&
                  ["Admin", "Owner"].includes(medata?.user?.Role) && (
                    <BiddingData SinglePostData={getSinglePostData} />
                  )}
              </>
            )} */}
          </div>
        )
      )}

      {/* {showMakeOfferSuccessAlert && (
        <WindowComponent
          Component={MakeOfferSuccessAlert}
          SetShow={setshowMakeOfferSuccessAlert}
          BtnRef={null}
        />
      )} */}
    </>
  );
}
