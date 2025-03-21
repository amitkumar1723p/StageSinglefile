import React, { useContext, useEffect, useRef, useState } from "react";
import "./SinglePostDetails.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import {
  GetSinglePostAction,
  LoginUserPostAction,
  SimilarProperty,
} from "../../../Action/postAction";
import Loader from "../../Loader/Loader";
import "./ReportListingForm.css";
import PropertyDataBox from "./PropertyDataBox";

import ExpressionOfInterestForm from "./ExpressionOfInterest";
import BiddingForm from "./BiddingForm";
// import { GetPost_BiddingDocumentAction } from "../../../Action/userAction";

import ScheduleYourVisit from "./ScheduleYourVisit";

import WindowComponent from "../../WindowComponent";
import ViewOwnerDetailsAlert from "./ViewOwnerDetailsAlert";

import { UserContext } from "../../CreateContext/CreateContext";

import ShowSinglePostImages from "./ShowSinglePostImages";
import ReportListingForm from "./ReportListingForm";
import FurnishDetails from "./FurnishDetails";
import {
  getPaidPropertyAction,
  TenentResponseIsExitAction,
  ViewOwnerDetailsAction,
} from "../../../Action/userAction";
import { StoreDataInSession } from "../../../utils/SessionStorage";
import TanantDetailsForm from "../SinglePostDetails/TenantDetailsForm";
import ViewOwnerDetails from "./ViewOwnerDetailsAlert";
import { retry } from "@reduxjs/toolkit/query";
import SocietyAndBuildingFeature from "./SocietyAndBuildingFeature";
import { FormatDate } from "../../../utils/CommonFunction";
// import PayButton from "./PayButton";
// import AreaGraphIcon from './Images/AreaGraph.png'
export default function SinglePostDetails() {
  const dispatch = useDispatch();
  const Params = useParams();

  const BiddingFormOpenBtnRef = useRef(null);
  const ScheduleYourVisitOpenBtnRef = useRef(null);
  const SupspiciousListingBtn = useRef(null);
  const showOwnerDetailsFormRef = useRef(null);
  const navigate = useNavigate();
  const [SinglePostId, setSinglePostId] = useState("");
  const { setRedirectPath, RedirectPath } = useContext(UserContext);
  const [showMakeOfferSuccessAlert, setshowMakeOfferSuccessAlert] =
    useState(false);

  const location = useLocation();
  const [showBiddingForm, setshowBiddingForm] = useState(false);
  const [showScheduleVisitForm, setshowScheduleVisitForm] = useState(false);
  const [PropertyAddress, setPropertyAddress] = useState("");
  const [showTenant_PostResponseForm, setshowTenant_PostResponseForm] =
    useState(false);

  const [showTenantDetailsForm, setshowTenantDetailsForm] = useState(false); // Open Tenant Details Form

  const [areaDetails, setAreaDetails] = useState(null); // Plot-Area // builup-area //  super-builtup-area //carpet-area
  const [OtherArea, setOtherArea] = useState(null); // builup-area //  super-builtup-area //carpet-area
  const [floorDetails, setFloorDetails] = useState("");
  // payment
  const [status, setStatus] = useState(false);
  const [showOwnerDetailsForm, setshowOwnerDetailsForm] = useState(false);

  // payment
  const { data: paidPropertyData } = useSelector((state) => {
    return state.paidPropertyData;
  });

  const { medata } = useSelector((state) => {
    return state.meDetails;
  });
  const { loading, data: getSinglePostData } = useSelector((state) => {
    return state.GetSinglePost;
  });
  const {
    loading: AlertLoding,
    data: AlertData,
    LodingType: AlertType,
  } = useSelector((state) => {
    return state.userData;
  });

  const { data: SimilarPropertyData } = useSelector((state) => {
    return state.SimilarProperty;
  });

  // Get All Post by Login User
  const { data: myListing } = useSelector((state) => {
    return state.GetPost;
  });

  //  Check Tenant Fill Response Form  (get Data)
  const { data: TenentResponseIsExitData } = useSelector((state) => {
    return state.TenentResponseIsExit;
  });

  useEffect(() => {
    if (getSinglePostData && getSinglePostData.success == true) {
      setPropertyAddress(
        `${`${getSinglePostData.SinglePost?.PropertyDetails?.BHKType
          ? `${getSinglePostData.SinglePost?.PropertyDetails?.BHKType} BHK`
          : ""
        }`} ${getSinglePostData?.SinglePost?.BasicDetails.ApartmentType} For ${getSinglePostData?.SinglePost?.BasicDetails?.PropertyAdType
        } In ${getSinglePostData?.SinglePost?.LocationDetails?.ProjectName}   ${getSinglePostData?.SinglePost?.LocationDetails?.Landmark
        } ${getSinglePostData?.SinglePost?.LocationDetails?.City} `
      );

      const areaDetailsData = getSinglePostData?.SinglePost?.AreaDetails;

      if (areaDetailsData) {
        const {
          PlotArea,
          PlotSize,
          SuperBuiltUpArea,
          CarpetArea,
          BuiltUpArea,
        } = areaDetailsData;
        if (PlotSize?.value) {
          setAreaDetails({
            value: PlotSize?.value,
            unit: PlotSize?.unit,
            label: "Plot Size",
          });
        } else if (PlotArea?.value) {
          setAreaDetails({
            value: PlotArea?.value,
            unit: PlotArea?.unit,
            label: "Plot Area",
          });
        } else if (SuperBuiltUpArea?.value) {
          setAreaDetails({
            value: SuperBuiltUpArea?.value,
            unit: SuperBuiltUpArea?.unit,
            label: "Super-Built-up Area",
          });
        } else if (CarpetArea?.value && !BuiltUpArea?.value) {
          setAreaDetails({
            value: CarpetArea?.value,
            unit: CarpetArea?.unit,
            label: "Carpet Area",
          });
        } else if (BuiltUpArea?.value && !CarpetArea?.value) {
          setAreaDetails({
            value: BuiltUpArea?.value,
            unit: BuiltUpArea?.unit,
            label: "Built-up Area",
          });
        } else if (BuiltUpArea?.value || CarpetArea?.value) {
          if (CarpetArea?.value > BuiltUpArea?.value) {
            setAreaDetails({
              value: CarpetArea?.value,
              unit: CarpetArea?.unit,
              label: "CarpetArea Area",
            });
            setOtherArea({
              value: CarpetArea?.value,
              unit: CarpetArea?.unit,
              label: "CarpetArea Area",
            });
          } else {
            setAreaDetails({
              value: BuiltUpArea?.value,
              unit: BuiltUpArea?.unit,
              label: "Built-up Area",
            });
          }
        }

        if (PlotArea?.value) {
          if (SuperBuiltUpArea?.value) {
            setOtherArea({
              value: SuperBuiltUpArea?.value,
              unit: SuperBuiltUpArea?.unit,
              label: "Super-Built-up Area",
            });
          } else if (CarpetArea?.value && !BuiltUpArea?.value) {
            setOtherArea({
              value: CarpetArea?.value,
              unit: CarpetArea?.unit,
              label: "Carpet Area",
            });
          } else if (BuiltUpArea?.value && !CarpetArea?.value) {
            setOtherArea({
              value: BuiltUpArea.value,
              unit: BuiltUpArea.unit,
              label: "Built-up Area",
            });
          } else if (BuiltUpArea?.value || CarpetArea?.value) {
            if (CarpetArea?.value > BuiltUpArea?.value) {
              setAreaDetails({
                value: CarpetArea?.value,
                unit: CarpetArea?.unit,
                label: "CarpetArea Area",
              });
            } else {
              setAreaDetails({
                value: BuiltUpArea?.value,
                unit: BuiltUpArea?.unit,
                label: "Built-up Area",
              });
            }
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
  }, [getSinglePostData, Params.PostAddress]);

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
        sessionStorage.getItem("RedirectPath") == "/view-owner-details" &&
        medata?.user?.Role == "Tenant"
      ) {
        setshowOwnerDetailsForm(true);
        // setshowTenantDetailsForm(true);
      }

      sessionStorage.removeItem("RedirectPath");
      setRedirectPath("");
    }
  }, [medata]);

  useEffect(() => {
    if (sessionStorage.getItem("TenentFillForm")) {
      return sessionStorage.removeItem("TenentFillForm");
    }
    if (TenentResponseIsExitData?.TenantDetails?.Tenant) {
      setshowTenantDetailsForm(false);
    }
  }, [TenentResponseIsExitData]);

  // let loadings =true

  // open report form
  const [openReportForm, setOpenReportForm] = useState("");
  const [reportdata, setReportData] = useState("");
  const handleReportFormOpen = (e) => {
    setOpenReportForm(true);
  };
  const closehandleReportForm = (e) => {
    setOpenReportForm(false);
  };

  //  Open Owner Details Alert  (T)

  useEffect(() => {
    if (AlertData?.success && AlertType == "ViewOwnerDetailsRequest") {
      StoreDataInSession("OwnerDetails", AlertData.OwnerDetails);
      setshowOwnerDetailsForm(true);
      setshowTenantDetailsForm(false);

      // if (!TenentResponseIsExitData?.TenantDetails) {
      //   sessionStorage.setItem("TenentFillForm", true);
      //   dispatch(TenentResponseIsExitAction(SinglePostId));
      // }
      // setTenantsDetails({
      //   FamilyDetails: { Adults: 0, Children: 0, Pets: null },
      //   ProfessionDetails: { WorkType: "" },
      // });
    }

    if (AlertData?.success && AlertType == "ReportSuspiciousPropertyRequest") {
      setOpenReportForm(false);
      ;
    }
  }, [AlertData, AlertType]);

  // Check Tenent Response IsExit  Dispatch
  // useEffect(() => {
  //   if (!SinglePostId || medata?.user?.Role !== "Tenant") return;
  //   dispatch(TenentResponseIsExitAction(SinglePostId));
  // }, [SinglePostId, medata?.user?.Role]);

  useEffect(() => {
    if (!Params?.PostAddress) return; // Avoid running when undefined

    let postaddress = Params.PostAddress;
    let postId = postaddress.substring(postaddress.lastIndexOf("-") + 1);
    if (location.pathname.includes("/admin/deleted-post")) {
      dispatch(GetSinglePostAction(postId, true));
    } else {
      //  function not get single-post-details
      dispatch(GetSinglePostAction(postId));
      dispatch(SimilarProperty(postId));
    }
  }, [Params?.PostAddress]);
  // payment

  const updateStatus = (newStatus) => {
    setStatus(newStatus);
  };
  useEffect(() => {
    if (getSinglePostData || status) {
      if (medata?.IsAuthenticated === true) {
        dispatch(getPaidPropertyAction(getSinglePostData?.SinglePost?._id));
      }
    }

    if (status !== false) {
      setshowOwnerDetailsForm(true);
    }
  }, [status, getSinglePostData, medata]);

  // payment success  refresh data
  useEffect(() => {
    // console.log("gkgtj")
    if (status !== false) {
      dispatch(GetSinglePostAction(getSinglePostData?.SinglePost?._id));
    }
  }, [status]);

  //  useEffect(()=>{
  //   // AlertData
  //   // AlertType
  //  },[AlertData])

  return (
    <>
      <Helmet>
        <title>{PropertyAddress}</title>
        <meta
          name="description"
          content={`Explore this spacious ${PropertyAddress}. Located in a prime area, this ${getSinglePostData?.SinglePost?.BasicDetails?.ApartmentType} offers modern amenities, comfort, and easy access to key transport routes, shopping, and schools. Perfect for those seeking a high-quality living experience in ${getSinglePostData?.SinglePost?.LocationDetails?.City}!`}
        ></meta>
        <link
          rel="canonical"
          href={`https://propertydekho247.com/post-detail/${Params?.PostAddress}`}
        />
      </Helmet>
      <div className="floating-buttons">
        {/* Call Button */}
        <Link to="tel:+917837840785" className="call-button">
          <img src="/img/call.png" alt="Call" />
        </Link>
        {/* WhatsApp Button */}
        <Link
          to="https://wa.me/7837840785"
          target="_blank"
          rel="noopener noreferrer"
          className="whatapps-section-floating"
        >
          <img
            className="whatapp-ing-section"
            src="/img/whatapp.png"
            alt="WhatsApp"
          />
        </Link>
      </div>
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
              {/* post verified-section-start */}
              <div className="icon-box">
                {getSinglePostData?.SinglePost?.PostVerifyShow ? (
                  getSinglePostData?.SinglePost?.PostVerify ? (
                    <div className="active-post">
                      <img src="/img/verified-tag.svg" alt="verified-tag" />
                      <p className="active-post-para">Verified</p>
                    </div>
                  ) : null // If PostVerifyShow is true but PostVerify is false, show nothing
                ) : null}{" "}
                {/* If PostVerifyShow is false, show nothing */}
              </div>

              <ShowSinglePostImages
                Images={getSinglePostData?.SinglePost?.PropertyImages}
              />
              {/* Single Post First Card  */}

              <div className="property-info">
                <div className="property-location">
                  <p className="Property-detail-heading"> {PropertyAddress}</p>
                </div>

                <div className="prop-grid">
                  {getSinglePostData?.SinglePost?.BasicDetails?.ApartmentType !=
                    "Plot/Land" && (
                      <>
                        <div className="property-info-tags">
                          <img
                            className="icon-detials"
                            src="/img/typology.png"
                            alt="icon"
                          />
                          <div className="img-box-imp-data">
                            <span className="img-box-details-span">
                              {`${getSinglePostData?.SinglePost?.PropertyDetails?.BHKType} BHK`}
                              {getSinglePostData?.SinglePost?.PropertyDetails?.OtherRoom?.map(
                                (text) => {
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
                                }
                              )}
                            </span>
                            <p> Type </p>
                          </div>
                        </div>
                      </>
                    )}

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
                            {`${areaDetails?.value} ${areaDetails?.unit}`}
                          </span>
                          <br />
                          <p>{areaDetails?.label}</p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {getSinglePostData?.SinglePost?.BasicDetails?.ApartmentType !=
                    "Plot/Land" && (
                      <>
                        <div className="property-info-tags">
                          <img
                            className="icon-detials"
                            src="/img/furnish.png"
                            alt="icon"
                          />
                          <div className="img-box-imp-data">
                            <span className="img-box-details-span">
                              {
                                getSinglePostData?.SinglePost?.AmenitiesDetails
                                  ?.Furnishing
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

                          {getSinglePostData?.SinglePost?.FloorDetails
                            ?.OverLookingView && (
                              <>
                                <div className="img-box-imp-data">
                                  <span className="img-box-details-span">
                                    {
                                      getSinglePostData?.SinglePost?.FloorDetails
                                        ?.OverLookingView[0]
                                    }
                                  </span>
                                  {/* <p> Overlooking View </p> */}
                                </div>
                              </>
                            )}
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

                        {getSinglePostData?.SinglePost?.PropertyDetails?.Parking
                          ?.CoveredParking > 0 ||
                          getSinglePostData?.SinglePost?.PropertyDetails?.Parking
                            ?.OpenParking > 0 ? (
                          <div className="property-info-tags">
                            <img
                              className="icon-detials"
                              src="/img/parking.png"
                              // src="/img/Plot-Dimension.svg"
                              alt="icon"
                            />
                            <div className="img-box-imp-data">
                              <span className="img-box-details-span">
                                {getSinglePostData?.SinglePost?.PropertyDetails
                                  ?.Parking?.CoveredParking +
                                  getSinglePostData?.SinglePost?.PropertyDetails
                                    ?.Parking?.OpenParking}
                              </span>
                              <p> Parking </p>
                            </div>
                          </div>
                        ) : getSinglePostData?.SinglePost?.BasicDetails
                          ?.PropertyStatus ? (
                          <div className="property-info-tags">
                            <img
                              className="icon-detials"
                              src="/img/possession_.svg"
                              alt="icon"
                            />
                            <div className="img-box-imp-data">
                              <span className="img-box-details-span">
                                {
                                  getSinglePostData?.SinglePost?.BasicDetails
                                    ?.PropertyStatus
                                }
                              </span>
                              <p> Status</p>
                            </div>
                          </div>
                        ) : (
                          <div className="property-info-tags">
                            <img
                              className="icon-detials"
                              src="/img/current_prop_status.svg"
                              alt="icon"
                            />

                            <div className="img-box-imp-data">
                              <span className="img-box-details-span">
                                {
                                  getSinglePostData?.SinglePost?.AmenitiesDetails
                                    ?.PowerBackUp
                                }
                              </span>
                              <p> Power BackUp</p>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                  {getSinglePostData?.SinglePost?.BasicDetails?.ApartmentType ==
                    "Plot/Land" && (
                      <>
                        {/* PlotDimensions */}

                        <div className="property-info-tags">
                          <img
                            className="icon-detials"
                            src="/img/parking.png"
                            alt="icon"
                          />
                          <div className="img-box-imp-data">
                          <span className="img-box-details-span">
                            {typeof getSinglePostData?.SinglePost?.AreaDetails
                              ?.PlotDimensions == "string"
                              ? getSinglePostData?.SinglePost?.AreaDetails
                                  ?.PlotDimensions
                              : <> <span>
                              {
                                getSinglePostData?.SinglePost?.AreaDetails
                                  ?.PlotDimensions.Length
                              }
                            </span>
                            <span> X </span>
                            <span>
                              {" "}
                              {
                                getSinglePostData?.SinglePost?.AreaDetails
                                  ?.PlotDimensions.Breadth
                              }
                            </span></>}
                           
                          </span>

                            <p> Plot Dimensions</p>
                          </div>
                        </div>

                        {/* Possission Status  */}
                        <div className="property-info-tags">
                          <img
                            className="icon-detials"
                            src="/img/Flooring-Type.png"
                            alt="icon"
                          />
                          <div className="img-box-imp-data">
                            <span className="img-box-details-span">
                              {
                                getSinglePostData?.SinglePost?.BasicDetails
                                  ?.PossessionStatus
                              }
                            </span>
                            <p> Possission Status</p>
                          </div>
                        </div>

                        {/* current property status  */}
                        <div className="property-info-tags">
                          <img
                            className="icon-detials"
                            src="/img/bathroom.png"
                            alt="icon"
                          />
                          <div className="img-box-imp-data">
                            <span className="img-box-details-span">
                              {
                                getSinglePostData?.SinglePost?.BasicDetails
                                  ?.CurrentPropertyStatus
                              }
                            </span>
                            <p> Current Property Status</p>
                          </div>
                        </div>

                        {/* Plot direction  */}

                        <div className="property-info-tags">
                          <img
                            className="icon-detials"
                            src="/img/facing.png"
                            alt="icon"
                          />
                          <div className="img-box-imp-data">
                            <span className="img-box-details-span">
                              {
                                getSinglePostData?.SinglePost?.OtherDetails
                                  ?.PlotDirection
                              }
                            </span>
                            <p>Plot Direction</p>
                          </div>
                        </div>

                        {/* Plot Facing  */}
                        <div className="property-info-tags">
                          <img
                            className="icon-detials"
                            src="/img/floor.png"
                            alt="icon"
                          />
                          <div className="img-box-imp-data">
                            <span className="img-box-details-span">
                              {
                                getSinglePostData?.SinglePost?.OtherDetails
                                  ?.PlotFacing
                              }
                            </span>
                            <p>Plot Facing </p>
                          </div>
                        </div>
                      </>
                    )}
                  {/* {getSinglePostData.SinglePost.BasicDetails
                      .PropertyStatus && (
                      <PropertyDataBox
                        Answer={
                          getSinglePostData.SinglePost.BasicDetails
                            .PropertyStatus
                        }
                        Icon="/img/status.png"
                        Data={"Status"}
                      />
                    )} */}
                </div>
                {/* BiddingFormRef */}

                <div className="property-pricing">
                  <div className="property-price">
                    {getSinglePostData?.SinglePost?.BasicDetails
                      ?.PropertyAdType == "Sale" && (

                        <>
                          <span className="ReservePrice-section">
                            Reserve Price :{" "}
                            <span className="price-value-in-span">
                              {formatReservePrice(
                                getSinglePostData?.SinglePost?.PricingDetails
                                  ?.ExpectedPrice
                              )}
                            </span>
                            {getSinglePostData?.SinglePost?.BasicDetails
                              ?.ApartmentType == "Plot/Land" ? (
                              <>
                                <p className="lisitng-area-section">
                                  ₹
                                  {String(
                                    getSinglePostData?.SinglePost?.PricingDetails
                                      ?.PricePerSqYd
                                  ).replace(/\B(?=(\d{3})+(?!\d))/g, ",")

                                  }
                                  Per sq.yd
                                </p>
                              </>
                            ) : (
                              <>
                                <p className="lisitng-area-section">
                                  ₹{" "}
                                  {String(
                                    getSinglePostData?.SinglePost?.PricingDetails
                                      ?.PricePerSqFt
                                  ).replace(/\B(?=(\d{3})+(?!\d))/g, ",")

                                  }
                                  {" "}
                                  Per sqft
                                </p>
                              </>



                            )}
                          </span>

                          {!["Owner", "Admin"].includes(medata?.user?.Role) && (
                            <span
                              className="original-price"
                              ref={BiddingFormOpenBtnRef}
                              onClick={() => {
                                if (medata && medata.IsAuthenticated === true) {
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
                    {getSinglePostData?.SinglePost?.BasicDetails
                      ?.PropertyAdType == "Rent" && (
                        <>
                          <div className="rent-main-section">
                            <div>
                              <p className="rent-price-main">
                                {formatReservePrice(
                                  getSinglePostData?.SinglePost?.PricingDetails
                                    ?.ExpectedRent
                                )}{" "}
                                <span>/Month</span>
                              </p>
                              <p className="rent-ques-section">Rent Price</p>
                            </div>

                            <div>
                              <p className="rent-price-main">
                                {formatReservePrice(
                                  getSinglePostData?.SinglePost?.PricingDetails
                                    ?.DepositePrice
                                )}
                              </p>
                              <p className="rent-ques-section">Deposite Price</p>
                            </div>
                          </div>

                          {/* {!medata || !medata.IsAuthenticated ? (
                          <span
                            className="original-price"
                            onClick={() => {
                              setRedirectPath("/view-owner-details");
                              navigate("/login");
                            }}
                          >
                            View Owner Details
                          </span>
                        ) : (
                          ["Tenant"].includes(medata?.user?.Role) && (
                            <span
                              ref={TenantDetailsFormBtnRef}
                              className="original-price"
                              onClick={() => {
                                if (!TenentResponseIsExitData?.TenantDetails) {
                                  setshowTenantDetailsForm(true);
                                } else {
                                  dispatch(
                                    ViewOwnerDetailsAction({
                                      PostId:
                                        getSinglePostData?.SinglePost?._id,
                                    })
                                  );
                                  //  dispatch(ViewOwnerDetailsAction({postId}))
                                }
                              }}
                            >
                              View Owner Details
                            </span>
                          )
                        )} */}
                        </>
                      )}
                  </div>
                </div>

                <div
                  className={`property-actions ${getSinglePostData.SinglePost.BasicDetails.PropertyAdType ==
                      "Rent"
                      ? "property-actions-rent"
                      : "property-actions-sale"
                    }`}
                >
                  {!["Owner", "Admin"].includes(medata?.user?.Role) &&
                    getSinglePostData?.SinglePost?.BasicDetails
                      ?.PropertyAdType != "Rent" && (
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
                    to="https://wa.me/7837840785"
                    target="_blank"
                    className="contact-expert-btn"
                  >
                    {/* <button className="contact-expert-btn"> */}
                    <img
                      className="whatapp-ing-section-details"
                      src="/img/whatapp.png"
                      alt="icon"
                    />
                    WhatsApp
                    {/* </button> */}
                  </Link>

                  {/* <button
                    className="original-price border-0"
                    ref={showOwnerDetailsFormRef}
                    onClick={() => {
                      setshowOwnerDetailsForm(true);
                    }}
                  >
                    View Number
                  </button> */}
                  {getSinglePostData?.SinglePost?.BasicDetails
                    ?.PropertyAdType === "Rent" ? (
                    <div>
                      {!medata || !medata.IsAuthenticated ? (
                        <span
                          className="original-price"
                          onClick={() => {
                            setRedirectPath("/view-owner-details");
                            navigate("/login");
                          }}
                        >
                          View Number
                        </span>
                      ) : (
                        <>
                          <button
                            className="original-price border-0"
                            ref={showOwnerDetailsFormRef}
                            onClick={() => {
                              setshowOwnerDetailsForm(true);
                            }}
                          >
                            View Number
                          </button>

                          {/* <>  

                         Rozer pay Logic
                          {
                            // Check if paidPropertyData?.data contains data and satisfies the condition
                            Array.isArray(paidPropertyData?.data) &&
                            paidPropertyData?.data.length > 0 &&
                            paidPropertyData?.data[0]?.userId ===
                              medata?.user?._id ? (
                              <button
                                className="original-price border-0"
                                ref={showOwnerDetailsFormRef}
                                onClick={() => {
                                  setshowOwnerDetailsForm(true);
                                }}
                              >
                                View Number
                              </button>
                            ) : (
                              <PayButton
                                PostId={getSinglePostData?.SinglePost?._id}
                                onSuccess={updateStatus}
                              />
                            ) // Show PayButton if the condition is not satisfied
                          }
                           </> */}
                        </>
                      )}
                    </div>
                  ) : null}
                </div>
                {getSinglePostData?.SinglePost?.PostVerifyData?.Time && (
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

                        {FormatDate(getSinglePostData?.SinglePost?.PostVerifyData?.Time)}

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
                    <h3>
                      Property <br /> Information
                    </h3>
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
                        {getSinglePostData?.SinglePost?._id}
                      </span>
                    </div>
                  </div>
                  <div className="overbox-icon">
                    {/* ApartmentType */}
                    <PropertyDataBox
                      Answer={
                        getSinglePostData?.SinglePost?.BasicDetails
                          ?.ApartmentType
                      }
                      Icon="/img/floor.png"
                      Data={"Property Type"}
                    />
                    {/* PropertyStatus */}
                    {getSinglePostData?.SinglePost?.BasicDetails
                      ?.PropertyStatus && (
                        <PropertyDataBox
                          Answer={
                            getSinglePostData?.SinglePost?.BasicDetails
                              ?.PropertyStatus
                          }
                          Icon="/img/status.png"
                          Data={"Status"}
                        />
                      )}

                    {/* areaDetails */}
                    {areaDetails && (
                      <PropertyDataBox
                        Answer={`${areaDetails?.value} ${areaDetails?.unit}`}
                        Icon="/img/area.png"
                        Data={areaDetails?.label}
                      />
                    )}

                    {getSinglePostData?.SinglePost?.BasicDetails
                      ?.ApartmentType != "Plot/Land" && (
                        <>
                          {/* BHKType */}
                          <PropertyDataBox
                            Answer={`${getSinglePostData?.SinglePost?.PropertyDetails?.BHKType} BHK`}
                            Icon="/img/typology.png"
                            Data={"BHK Type"}
                          />

                          {OtherArea && (
                            <PropertyDataBox
                              Answer={`${OtherArea?.value} ${OtherArea?.unit}`}
                              Icon="/img/area.png"
                              Data={OtherArea?.label}
                            />
                          )}

                          {/* Bathroom */}
                          {getSinglePostData?.SinglePost?.PropertyDetails
                            ?.Bathroom > 0 && (
                              <PropertyDataBox
                                Answer={
                                  getSinglePostData?.SinglePost?.PropertyDetails
                                    ?.Bathroom
                                }
                                Icon="/img/bathroom.png"
                                Data={"Bathrooms"}
                              />
                            )}

                          {/* Balcony */}
                          {getSinglePostData?.SinglePost?.PropertyDetails
                            ?.Balcony > 0 && (
                              <PropertyDataBox
                                Answer={
                                  getSinglePostData?.SinglePost?.PropertyDetails
                                    ?.Balcony
                                }
                                Icon="/img/balcony.png"
                                Data={"Balconies"}
                              />
                            )}

                          {/* Furnishing */}
                          <PropertyDataBox
                            Answer={
                              getSinglePostData?.SinglePost?.AmenitiesDetails
                                ?.Furnishing
                            }
                            Icon="/img/furnish.png"
                            Data={"Furnishing Details"}
                          />

                          {/* FloorDetails */}

                          <PropertyDataBox
                            Id={"property-dir"}
                            Answer={
                              getSinglePostData?.SinglePost?.FloorDetails
                                ?.PropertyDirection
                            }
                            Icon="/img/facing.png"
                            Data={"Property Direction"}
                          />
                          {/* OverLookingView */}
                          <PropertyDataBox
                            Answer={
                              getSinglePostData?.SinglePost?.FloorDetails
                                ?.OverLookingView
                            }
                            Icon="/img/area.png"
                            Data={"Overlooking View"}
                          />

                          {/* Possission Status  */}
                          {getSinglePostData?.SinglePost?.FloorDetails
                            ?.PossessionStatus && (
                              <PropertyDataBox
                                Answer={
                                  getSinglePostData?.SinglePost?.BasicDetails
                                    ?.PossessionStatus
                                }
                                Icon="/img/area.png"
                                Data={" Possission Status"}
                              />
                            )}
                          {/* additional pricing details */}
                          {getSinglePostData?.SinglePost?.PricingDetails
                            ?.AdditionalDetails?.MaintenanceCharges && (
                              <PropertyDataBox
                                Answer={
                                  getSinglePostData?.SinglePost?.PricingDetails
                                    ?.AdditionalDetails?.MaintenanceCharges
                                }
                                Icon="/img/area.png"
                                Data={"Maintanance Details"}
                              />
                            )}

                          {/* additional pricing details */}
                          {getSinglePostData?.SinglePost?.PricingDetails
                            ?.AdditionalDetails?.MonthlyExpectedRent && (
                              <PropertyDataBox
                                Answer={
                                  getSinglePostData?.SinglePost?.PricingDetails
                                    ?.AdditionalDetails?.MonthlyExpectedRent
                                }
                                Icon="/img/area.png"
                                Data={"Monthly Expected Rent"}
                              />
                            )}

                          {/* current property status  */}

                          {getSinglePostData?.SinglePost?.BasicDetails
                            ?.CurrentPropertyStatus && (
                              <PropertyDataBox
                                Answer={
                                  getSinglePostData?.SinglePost?.BasicDetails
                                    ?.CurrentPropertyStatus
                                }
                                Icon="/img/area.png"
                                Data={"Current Property Status"}
                              />
                            )}

                          {/* Property on Floor  , Total Floors" */}
                          {getSinglePostData?.SinglePost?.BasicDetails
                            ?.PropertyAdType == "Sale" && (
                              <>
                                {getSinglePostData?.SinglePost?.FloorDetails
                                  ?.PropertyOnFloor && (
                                    <PropertyDataBox
                                      Answer={`${getSinglePostData?.SinglePost?.FloorDetails?.PropertyOnFloor}`}
                                      Icon="/img/total-floor.png"
                                      Data={"Property on Floor"}
                                    />
                                  )}
                                <PropertyDataBox
                                  Answer={`${getSinglePostData?.SinglePost?.FloorDetails?.TotalFloors}`}
                                  Icon="/img/total-floor.png"
                                  Data={"Total Floors"}
                                />
                              </>
                            )}

                          {/* Flooring Type */}
                          <PropertyDataBox
                            Answer={`${getSinglePostData?.SinglePost?.PropertyDetails?.FlooringType}`}
                            Icon="/img/Flooring-Type.png"
                            Data={"Flooring Type"}
                          />
                        </>
                      )}

                    {/* Property on Floor  */}
                    {getSinglePostData?.SinglePost?.BasicDetails
                      ?.PropertyAdType == "Rent" && (
                        <PropertyDataBox
                          Answer={floorDetails}
                          Icon="/img/total-floor.png"
                          Data={"Property on Floor"}
                        />
                      )}

                    {getSinglePostData?.SinglePost?.PropertyDetails?.Parking
                      ?.OpenParking > 0 && (
                        <PropertyDataBox
                          Answer={
                            getSinglePostData?.SinglePost?.PropertyDetails
                              ?.Parking?.OpenParking
                          }
                          Icon="/img/parking.png"
                          Data={"Open Parking"}
                        />
                      )}

                    {getSinglePostData?.SinglePost?.PropertyDetails?.Parking
                      ?.CoveredParking > 0 && (
                        <PropertyDataBox
                          Answer={
                            getSinglePostData?.SinglePost?.PropertyDetails
                              ?.Parking?.CoveredParking
                          }
                          Icon="/img/parking.png"
                          Data={"Covered Parking"}
                        />
                      )}
                    {/* Parking  */}

                    {/* Power BackUp */}
                    <PropertyDataBox
                      Answer={`${getSinglePostData?.SinglePost?.AmenitiesDetails?.PowerBackUp}`}
                      Icon="/img/power-backup.png"
                      Data={"Power BackUp"}
                    />
                    {getSinglePostData?.SinglePost?.AmenitiesDetails
                      ?.WaterSource && (
                        <>
                          {/* Water Source */}
                          <PropertyDataBox
                            Answer={`${getSinglePostData?.SinglePost?.AmenitiesDetails?.WaterSource}`}
                            Icon="/img/Water.png"
                            Data={"Water Source"}
                          />
                        </>
                      )}
                    {(getSinglePostData?.SinglePost?.PropertyDetails
                      ?.Basement == true ||
                      getSinglePostData?.SinglePost?.PropertyDetails
                        ?.Basement == false) && (
                        <PropertyDataBox
                          Answer={`${getSinglePostData?.SinglePost?.PropertyDetails
                              ?.Basement == true
                              ? "Yes"
                              : getSinglePostData?.SinglePost?.PropertyDetails
                                ?.Basement == false
                                ? "No"
                                : ""
                            } `}
                          Icon="/img/parking.png"
                          Data={"Basment"}
                        />
                      )}

                    {/* Property Age */}
                    {getSinglePostData?.SinglePost?.BasicDetails
                      ?.PropertyAge && (
                        <PropertyDataBox
                          Answer={`${getSinglePostData?.SinglePost?.BasicDetails?.PropertyAge} Year`}
                          Icon="/img/Property-Age.png"
                          Data={"Property Age"}
                        />
                      )}

                    {getSinglePostData?.SinglePost?.BasicDetails
                      ?.PropertyAdType == "Rent" && (
                        <>

                          <PropertyDataBox
                            Answer={FormatDate(getSinglePostData?.SinglePost?.BasicDetails?.AvailableFrom)}
                            Icon="/img/bathroom.png"
                            Data={"Available From"}
                          />

                          {getSinglePostData.SinglePost.PricingDetails
                            .AdditionalDetails?.PreferredTenant?.length > 0 && (
                              <PropertyDataBox
                                Answer={`${new Date(
                                  getSinglePostData?.SinglePost?.BasicDetails?.AvailableFrom
                                ).getDate()}-${new Date(
                                  getSinglePostData?.SinglePost?.BasicDetails?.AvailableFrom
                                ).getMonth() + 1
                                  }-${new Date(
                                    getSinglePostData?.SinglePost?.BasicDetails?.AvailableFrom
                                  ).getFullYear()}`}
                                Icon="/img/Available-From.svg"
                                Data={"Available From"}
                              />
                            )}

                        {getSinglePostData.SinglePost.PricingDetails
                          .AdditionalDetails?.PreferredTenant?.length > 0 && (
                          <PropertyDataBox
                            Answer={`${getSinglePostData?.SinglePost?.PricingDetails?.AdditionalDetails?.PreferredTenant?.map(
                              (text) => {
                                return text;
                              }
                            )}`}
                            Icon="/img/preferred-tenant.svg"
                            Data={"Preferred Tenant"}
                          />
                        )}

                        <PropertyDataBox
                          Answer={`${getSinglePostData?.SinglePost?.PricingDetails?.ExpectedRent}`}
                          Icon="/img/Expected-rent.svg"
                          Data={"Expected Rent"}
                        />

                        <PropertyDataBox
                          Answer={`${getSinglePostData?.SinglePost?.PricingDetails?.DepositePrice}`}
                          Icon="/img/Security-deposit.svg"
                          Data={"Security Deposit"}
                        />
                      </>
                    )}

                    {/* Plot Land  */}
                    {getSinglePostData?.SinglePost?.BasicDetails
                      ?.ApartmentType == "Plot/Land" && (
                        <>
                          {" "}
                          {/* Plot Land Other Details  */}
                          {/* Plot Direction  */}
                          <PropertyDataBox
                            Id={"plot-dir"}
                            Answer={`${getSinglePostData?.SinglePost?.OtherDetails?.PlotDirection}`}
                            Icon="/img/facing.png"
                            Data={"Plot Direction"}
                          />
                          {/* Plot Facing  */}
                          <PropertyDataBox
                            Answer={`${getSinglePostData?.SinglePost?.OtherDetails?.PlotFacing}`}
                            Icon="/img/Property-age.png"
                            Data={"Plot Facing"}
                          />
                          {/* Plot openside  */}
                          <PropertyDataBox
                            Answer={`${getSinglePostData?.SinglePost?.BasicDetails?.NoOfOpenSide}`}
                            Icon="/img/Property-age.png"
                            Data={"Plot Facing"}
                          />
                          <PropertyDataBox
                            Answer={`${getSinglePostData?.SinglePost?.OtherDetails?.FrontRoadWidth}`}
                            Icon="/img/total-floor.png"
                            Data={"Front Road Width"}
                          />
                          {/* Other Feature   */}
                          {getSinglePostData?.SinglePost?.AmenitiesDetails
                            ?.OtherFeature?.length > 0 && (
                              <div className="overview-box">
                                <div className="img-icon">
                                  <img
                                    className="icon-overview"
                                    src={"/img/bathroom.png"}
                                    alt="icon"
                                  />
                                </div>
                                <div className="para-span">
                                  <p className="p-ans">{"Other Feature"}</p>

                                  <p className="p-deta">
                                    {getSinglePostData?.SinglePost?.AmenitiesDetails?.OtherFeature?.map(
                                      (text, i) => {
                                        const isLast =
                                          i ===
                                          getSinglePostData.SinglePost
                                            .AmenitiesDetails.OtherFeature.length -
                                          1;
                                        return (
                                          <span key={i}>
                                            {text}
                                            {!isLast && ", "}
                                          </span>
                                        );
                                      }
                                    )}
                                  </p>
                                </div>
                              </div>
                            )}
                        </>
                      )}
                  </div>
                </div>
                {/* furnishing details */}
                
                
                {getSinglePostData?.SinglePost?.BasicDetails
                      ?.ApartmentType !== "Plot/Land" &&
                  <FurnishDetails
                    furnishD={getSinglePostData?.SinglePost?.AmenitiesDetails}
                  />
                }
                {/* society features */}

                {getSinglePostData?.SinglePost?.AmenitiesDetails
                  ?.SocietyAndBuildingFeature && (
                    <SocietyAndBuildingFeature
                      feature={
                        getSinglePostData?.SinglePost?.AmenitiesDetails
                          ?.SocietyAndBuildingFeature
                      }
                    />
                  )}
                {/* plot features */}
                {getSinglePostData?.SinglePost?.AmenitiesDetails
                  ?.ProjectAmmenities && (
                    <SocietyAndBuildingFeature
                      feature={
                        getSinglePostData?.SinglePost?.AmenitiesDetails
                          ?.ProjectAmmenities
                      }
                    />
                  )}

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

                  {/* similar property */}

                  <div className="similar-main-box">
                    <h3 className="similar-heading-box">Similar Property</h3>
                    {SimilarPropertyData?.similarProperties?.map((item) => {
                      return (
                        <Link
                          to={`/post-detail/${`${item?.PropertyDetails?.BHKType} BHk ${item?.BasicDetails?.ApartmentType} For ${item?.BasicDetails?.PropertyAdType} In ${item?.LocationDetails?.Landmark} ${item?.LocationDetails?.City}`
                            .toLowerCase()
                            .replaceAll(" ", "-")
                            .replace(",", "")
                            .replaceAll("/", "-")}-${item._id}`}
                        >
                          <div className="similar-property-main-box">
                            <div className="similar-property-box1">
                              <div className="similar-property-main">
                                <div className="similar-left-right">
                                  <div className="similar-img-box">
                                    <img
                                      src={item.PropertyImages[0]?.url}
                                      alt="property"
                                    />
                                  </div>
                                  <div className="similar-right-section">
                                    <div className="similar-data-section">
                                      <div className="similar-prop-heading">
                                        <p className="similar-prop-heading-p">
                                          {`${item?.PropertyDetails?.BHKType} BHK ${item?.BasicDetails?.ApartmentType} For ${item?.BasicDetails?.PropertyAdType} In ${item?.LocationDetails?.ProjectName} ${item?.LocationDetails?.Landmark} ${item?.LocationDetails?.City}`}
                                        </p>
                                      </div>
                                      <div className="similar-prop-address">
                                        <p className="similar-prop-address-p">
                                          {item?.LocationDetails?.Locality},
                                          {item?.LocationDetails?.City}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="similar-area-price-box">
                                      {/* <p className="similar-area-area">
                                        {item?.AreaDetails?.BuiltUpArea?.value}
                                        {item?.AreaDetails?.BuiltUpArea?.unit}

                                        <span> Built-Up Area</span>
                                      </p> */}
                                      {item?.BasicDetails?.PropertyAdType ==
                                        "Rent" && (
                                          <>
                                            <div className="similar-area-price">
                                              <div className="similar-area-price-rent-price">
                                                {formatReservePrice(
                                                  item?.PricingDetails
                                                    ?.ExpectedRent
                                                )}{" "}
                                                <span>/Month</span>
                                              </div>

                                              <span className="rent-price-section-similar-property">
                                                {" "}
                                                Rent Price{" "}
                                              </span>
                                            </div>
                                          </>
                                        )}
                                      {item?.BasicDetails?.PropertyAdType ==
                                        "Sale" && (
                                          <>
                                            <div className="similar-area-price">
                                              {formatReservePrice(
                                                item?.PricingDetails
                                                  ?.ExpectedPrice
                                              )}
                                              <span> Reserved price </span>
                                            </div>
                                          </>
                                        )}

                                      <button className="view-more-btn-3rd">
                                        View More
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {/* similar property */}

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

                  {showTenantDetailsForm && (
                    <WindowComponent
                      Component={TanantDetailsForm}
                      SetShow={setshowTenantDetailsForm}
                      SinglePostData={getSinglePostData}
                    // PropertyAddress={PropertyAddress}
                    />
                  )}

                  {showOwnerDetailsForm && (
                    <WindowComponent
                      Component={ViewOwnerDetailsAlert}
                      SetShow={setshowOwnerDetailsForm}
                      BtnRef={showOwnerDetailsFormRef}
                      Contact={"7837840785"}
                    // PropertyAddress={PropertyAddress}
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
            </div>
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
