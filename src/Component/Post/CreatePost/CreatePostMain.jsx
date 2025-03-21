import React, { useEffect, useRef, useState } from "react";
import LocationDetailsSection from "./LocationDetails.jsx";
import BasicDetailsSection from "./BasicDetails.jsx";
import CreatePostImageUploadSection from "./CreatePostImageUpload.jsx";
import "./CreatePost.css";
import { GetSinglePostAction } from "../../../Action/postAction.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../../Loader/Loader.jsx";
import { Helmet } from "react-helmet";
import PropertyDetailsAreaDetailsOtherDetailsFloorDetailsAmenitiesDetailsSection from "./PropertyDetails_AreaDetails_OtherDetails_FloorDetails_AmenitiesDetails.jsx";
import PricingDetailsSection from "./PricingDetails.jsx";
import { StoreDataInSession } from "../../../utils/SessionStorage.js";
import WindowComponent from "../../WindowComponent.jsx";
import CreatePostSubmitAlert from "./CreatePostSubmitAlert.jsx";

export default function CreatePostMain() {
  const dispatch = useDispatch();
  const Params = useParams();
  const location = useLocation();

  const update = location.pathname.includes("update");
  const navigate = useNavigate();
  // Data State

  const [BasicDetailsData, setBasicDetailsData] = useState({});
  const [LocationDetailsData, setLocationDetailsData] = useState({});
  const [PropertyDetailsData, setPropertyDetailsData] = useState({});
  const [OtherDetailsData, setOtherDetailsData] = useState({});
  const [AreaDetailsData, setAreaDetailsData] = useState({});

  const [FloorDetailsData, setFloorDetailsData] = useState({});
  const [AmenitiesDetailsData, setAmenitiesDetailsData] = useState({});
  const [PricingDetailsData, setPricingDetailsData] = useState({});
  const [show_Maintenance_Charges, setshow_Maintenance_Charges] =
    useState(false);

  const [next, setnext] = useState(0);
  const [uploadimages, setuploadimages] = useState([]);
  const [previewImage, setpreviewImage] = useState([]);
  const [update_RemoveImage, setupdate_RemoveImage] = useState([]);
  const [uploadimagesName, setuploadimagesName] = useState([]);

  //  Form Submit  State

  //  Update Post Logic

  // const []
  // show submit alert
  const [showCreatePostSubmitAlert, setshowCreatePostSubmitAlert] =
    useState(false);

  const CreatePostRef = useRef(null);

  //  GetSinglePostAction
  useEffect(() => {
    if (update) {
      dispatch(GetSinglePostAction(Params.PostId));
    }
     

    // eslint-disable-next-line
  }, [update]);

  // getSingle PostData

  const BasicDetailsForm = useRef(null);

  const handleNextClick = () => {
    if (BasicDetailsForm.current) {
      BasicDetailsForm.current.submit(); // This will trigger form submission
    }
  };
  // const handleNextClick = () => {
  //   if (formRef.current) {
  //     // formRef.current.submit();   // This will trigger form submission
  //   }
  // };
  console.log(BasicDetailsData)
  // Form Submit  Start
  //  BasicDetils Component submit -- Start
  const ApartMentTypeArrayRemovePlotAndLand = [
    "Apartment",
    "Independent House/Villa",
    // "1 RK/Studio Apartment",
    "Studio Apartment",
    "1 RK/PG",
    "Independent/Builder Floor",
    "Serviced Apartment",
  ];

  // userstates for alert  shake
  const [propertyTypeShake, setPropertyTypeShake] = useState(false);

  const BasicDetailsFormSubmit = () => {
    if (!BasicDetailsData.PropertyType) {
      return alert(" Poperty Type is Required");
    }

    if (!BasicDetailsData.PropertyAdType) {
      return alert("Property Ad Type is Required");
    }
    if (!BasicDetailsData.ApartmentType) {
      return alert("Apartment Type is Required");
    }
    const isValidTransitionType = update
    ? ["Registry Case", "Transfer Case"].includes(
        getSinglePostData.SinglePost?.BasicDetails?.TransitionType
      )
    : true;
    if (
      BasicDetailsData.PropertyAdType === "Sale" &&!BasicDetailsData.TransitionType &&isValidTransitionType 
    ) {
      return alert("Transition Type is Required");
    }
    if (
      BasicDetailsData.PropertyAdType === "Rent" &&
      !BasicDetailsData.AvailableFrom
    ) {
      return alert("Available From is Required");
    }

    if (
      BasicDetailsData.PropertyAdType === "Rent" &&
      BasicDetailsData.AvailableFrom
    ) {
      // const currentDate = new Date(Date.now());
      const currentDate = new Date().toISOString().split("T")[0];
      const selectedDate = BasicDetailsData.AvailableFrom;

      if (selectedDate < currentDate) {
        return alert("Enter valid Date");
      }

      // if (selectedDate >= currentDate) {
      //   setBasicDetailsData({
      //     ...BasicDetailsData,
      //     AvailableFrom: e.target.value,
      //   });
      // }
    }

    if (
      BasicDetailsData.PropertyAdType === "Sale" &&
      ApartMentTypeArrayRemovePlotAndLand.includes(
        BasicDetailsData.ApartmentType
      ) &&
      !BasicDetailsData.PropertyStatus
    ) {
      return alert("Property Status is Required");
    }
    if (
      BasicDetailsData.PropertyAdType === "Sale" &&
      ApartMentTypeArrayRemovePlotAndLand.includes(
        BasicDetailsData.ApartmentType
      ) &&
      BasicDetailsData.PropertyStatus == "Ready to move" &&
      !BasicDetailsData.CurrentPropertyStatus
    ) {
      return alert("Current Property Status is Required");
    }

    if (
      BasicDetailsData.PropertyAdType === "Sale" &&
      ApartMentTypeArrayRemovePlotAndLand.includes(
        BasicDetailsData.ApartmentType
      ) &&
      BasicDetailsData.PropertyStatus == "Ready to move" &&
      !BasicDetailsData.PropertyAge
    ) {
      return alert("PropertyAge is Required");
    }

    if (
      BasicDetailsData.PropertyAdType === "Sale" &&
      ApartMentTypeArrayRemovePlotAndLand.includes(
        BasicDetailsData.ApartmentType
      ) &&
      BasicDetailsData.PropertyStatus == "Under Construction" &&
      !BasicDetailsData.PossessionStatus
    ) {
      return alert("Possession Status is Required");
    }

    if (
      BasicDetailsData.ApartmentType === "Plot/Land" &&
      !BasicDetailsData.CurrentPropertyStatus
    ) {
      return alert("Current Property Status is Required");
    }
    if (
      BasicDetailsData.ApartmentType === "Plot/Land" &&
      !BasicDetailsData.PossessionStatus
    ) {
      return alert("Possession Status is Required");
    }

    if (!update) {
      // StoreDataInSession("BasicDetailsDataUpdate", BasicDetailsData);
      StoreDataInSession("BasicDetailsData", BasicDetailsData);
      StoreDataInSession("next", 1);
    }

    setnext(1);
    return true;
  };

  const LocationDetailsSubmiRef = useRef(null);
  const ApartmentFeaturesRef = useRef(null);
  const PricingDetailsRef = useRef(null);
  //  const LocationDetailsSubmit =(e) => {
  //      e.preventDefault();
  //      if (!update) {
  //        StoreDataInSession("next", 2);
  //        StoreDataInSession("LocationDetailsData", LocationDetailsData);
  //      }
  //      setnext(2);
  //    }
  // BasicDetails Component Submit  -- End

  //  LocationDetails Component Submit  -- Start

  //  Form Submit End

  const { loading: SinglePostLoading, data: getSinglePostData } = useSelector(
    (state) => {
      return state.GetSinglePost;
    }
  );
  const { data, loading, LodingType } = useSelector((state) => {
    return state.userData;
  });
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });
  useEffect(() => {
    if (update === true) {
      if (getSinglePostData) {
        if (getSinglePostData.success === true) {
          const { SinglePost } = getSinglePostData;

          const {
            BasicDetails,
            LocationDetails,
            PropertyDetails,
            FloorDetails,
            AreaDetails,
            AmenitiesDetails,
            PropertyImages,
            PricingDetails,
            OtherDetails,
          } = SinglePost;
           
          
           if(!["Admin", "Owner"].includes(medata?.user?.Role)&&BasicDetails.PropertyAdType=="Sale"){
   navigate("/user/my-listing")
           }

          if (BasicDetails.PropertyAdType === "Rent") {
            let getDate = new Date(BasicDetails?.AvailableFrom);

            let getdate = `${
              getDate.getDate() < 10
                ? `0${getDate.getDate()}`
                : `${getDate.getDate()}`
            }`;
            let getYear = getDate.getFullYear();
            let getMonth = `${
              getDate.getMonth() + 1 < 10
                ? `0${getDate.getMonth() + 1}`
                : `${getDate.getMonth() + 1}`
            }`;

            let AvailableFromDate = `${getYear}-${getMonth}-${getdate}`;

            setBasicDetailsData({
              ...BasicDetails,
              AvailableFrom: AvailableFromDate,
            });
          } else {
            setBasicDetailsData({ ...BasicDetails });
          }

          setLocationDetailsData({ ...LocationDetails });
          setPropertyDetailsData({ ...PropertyDetails });
          setFloorDetailsData({ ...FloorDetails });
          setAreaDetailsData({ ...AreaDetails });
          setAmenitiesDetailsData({ ...AmenitiesDetails });
          setPricingDetailsData({ ...PricingDetails });
          setOtherDetailsData({ ...OtherDetails });
          setpreviewImage(
            PropertyImages.map((e) => {
              return { name: e.name, url: e.url };
            })
          );
        }
      }
    } else {
      if (sessionStorage.getItem("next")) {
        setnext(JSON.parse(sessionStorage.getItem("next")));
      }

      if (sessionStorage.getItem("BasicDetailsData")) {
        setBasicDetailsData(
          JSON.parse(sessionStorage.getItem("BasicDetailsData"))
        );
      }
      if (sessionStorage.getItem("LocationDetailsData")) {
        setLocationDetailsData(
          JSON.parse(sessionStorage.getItem("LocationDetailsData"))
        );
      }
      if (sessionStorage.getItem("PropertyDetailsData")) {
        setPropertyDetailsData(
          JSON.parse(sessionStorage.getItem("PropertyDetailsData"))
        );
      }
      if (sessionStorage.getItem("AreaDetailsData")) {
        setAreaDetailsData(
          JSON.parse(sessionStorage.getItem("AreaDetailsData"))
        );
      }

      if (sessionStorage.getItem("FloorDetailsData")) {
        setFloorDetailsData(
          JSON.parse(sessionStorage.getItem("FloorDetailsData"))
        );
      }

      if (sessionStorage.getItem("AmenitiesDetailsData")) {
        setAmenitiesDetailsData(
          JSON.parse(sessionStorage.getItem("AmenitiesDetailsData"))
        );
      }

      if (sessionStorage.getItem("PropertyDetailsData")) {
        setPropertyDetailsData(
          JSON.parse(sessionStorage.getItem("PropertyDetailsData"))
        );
      }

      if (sessionStorage.getItem("OtherDetailsData")) {
        setOtherDetailsData(
          JSON.parse(sessionStorage.getItem("OtherDetailsData"))
        );
      }
    }
    // eslint-disable-next-line
  }, [getSinglePostData, update]);

  //  Rent And Sale   Validate Field ()
  useEffect(() => {
    if (BasicDetailsData.PropertyAdType === "Rent") {
      setshow_Maintenance_Charges(true);

      const {
        PropertyStatus,
        CurrentPropertyStatus,
        PropertyAge,
        PossessionStatus,
        TransitionType ,
        ...BasicDetailsData_Rest
      } = BasicDetailsData; // Destructure to remove PropertyStatus

      if (
        ["Plot/Land", "Studio Apartment"].includes(
          BasicDetailsData.ApartmentType
        )
      ) {
        delete BasicDetailsData_Rest.ApartmentType;
      }
      delete BasicDetailsData_Rest.NoOfOpenSide;
      // delete BasicDetailsData_Rest.CurrentPropertyStatus;
      // delete BasicDetailsData_Rest.PossessionStatus;
      setBasicDetailsData(BasicDetailsData_Rest);

      //  if(A)
      if (sessionStorage.getItem("BasicDetailsData")) {
        StoreDataInSession("BasicDetailsData", BasicDetailsData_Rest);
      }
      const {
        ExpectedPrice,
        PricePerSqFt,
        PricePerSqYd,
        ...PricingDetailsData_Rest
      } = PricingDetailsData;

      delete PricingDetailsData_Rest.AdditionalDetails?.MonthlyExpectedRent;
      setPricingDetailsData(PricingDetailsData_Rest);

      if (sessionStorage.getItem("PricingDetailsData")) {
        StoreDataInSession("PricingDetailsData", PricingDetailsData_Rest);
      }
    } else if (BasicDetailsData.PropertyAdType === "Sale") {
      const { AvailableFrom, ...BasicDetailsData_Rest } = BasicDetailsData; // Destructure to remove PropertyStatus

      if (
        ["Serviced Apartment", "1 RK/PG"].includes(
          BasicDetailsData.ApartmentType
        )
      ) {
        delete BasicDetailsData_Rest.ApartmentType;
      }

      // remove price field

      const {
        ExpectedRent,
        DepositePrice,

        // PreferredTenant,
        ...PricingDetailsData_Rest
      } = PricingDetailsData;
      delete PricingDetailsData_Rest.AdditionalDetails?.PreferredTenant;
      delete PricingDetailsData_Rest.AdditionalDetails
        ?.ElectrictyAndWaterCharges;

      if (BasicDetailsData.ApartmentType === "Plot/Land") {
        if (
          !["Vacant", "Boundary Wall", "Construction Done"].includes(
            BasicDetailsData_Rest.CurrentPropertyStatus
          )
        ) {
          delete BasicDetailsData_Rest.CurrentPropertyStatus;
        }
        BasicDetailsData_Rest.NoOfOpenSide = 1;
        delete BasicDetailsData_Rest.PropertyStatus;

        delete BasicDetailsData_Rest.PropertyAge;

        // // Area details validation
        const {
          BuiltUpArea,
          CarpetArea,
          PlotArea,
          SuperBuiltUpArea,
          ...AreaDetailsData_Rest
        } = AreaDetailsData;

        setAreaDetailsData(AreaDetailsData_Rest);
        if (sessionStorage.getItem("AreaDetailsData")) {
          StoreDataInSession("AreaDetailsData", AreaDetailsData_Rest);
        }

        //  Flooring data
        setFloorDetailsData({});
        if (sessionStorage.getItem("FloorDetailsData")) {
          StoreDataInSession("FloorDetailsData", {});
        }

        // property details data

        setPropertyDetailsData({});
        if (sessionStorage.getItem("PropertyDetailsData")) {
          StoreDataInSession("PropertyDetailsData", {});
        }

        // Amenities Details

        const {
          Furnishing,
          FurnishingOption,
          SocietyAndBuildingFeature,
          ...AmenitiesDetailsData_Rest
        } = AmenitiesDetailsData;

        setAmenitiesDetailsData(AmenitiesDetailsData_Rest);
        if (sessionStorage.getItem("AmenitiesDetailsData")) {
          StoreDataInSession("AmenitiesDetailsData", AmenitiesDetailsData_Rest);
        }

        // remove price details
        delete PricingDetailsData_Rest.PricePerSqFt;
        delete PricingDetailsData_Rest.AdditionalDetails?.MonthlyExpectedRent;
      } else if (
        [
          "Independent House/Villa",
          "Apartment",
          "Independent/Builder Floor",
          // "1 RK/Studio Apartment",
          "Studio Apartment",
          "1 RK/PG",
          "Serviced Apartment",
        ].includes(BasicDetailsData.ApartmentType)
      ) {
        if (
          !["Vacant", "Rented", "Self Occupied"].includes(
            BasicDetailsData_Rest.CurrentPropertyStatus
          )
        ) {
          delete BasicDetailsData_Rest.CurrentPropertyStatus;
        }

        delete BasicDetailsData_Rest.NoOfOpenSide;

        // Area Details Sort
        const { PlotSize, PlotDimensions, ...AreaDetailsData_Rest } =
          AreaDetailsData;

        if (
          ["Independent House/Villa"].includes(BasicDetailsData.ApartmentType)
        ) {
          // Floor Details Sort
          const { PropertyOnFloor, ...FloorDetailsData_Rest } =
            FloorDetailsData;
          setFloorDetailsData(FloorDetailsData_Rest);

          if (sessionStorage.getItem("FloorDetailsData")) {
            StoreDataInSession("FloorDetailsData", FloorDetailsData_Rest);
          }
        } else if (
          [
            "Apartment",
            // "1 RK/Studio Apartment",
            "Studio Apartment",
            "1 RK/PG",
            "Serviced Apartment",
          ].includes(BasicDetailsData.ApartmentType)
        ) {
          delete AreaDetailsData_Rest.PlotArea;
        }

        // Remove Basement Filed

        setAreaDetailsData(AreaDetailsData_Rest);
        if (sessionStorage.getItem("AreaDetailsData")) {
          StoreDataInSession("AreaDetailsData", AreaDetailsData_Rest);
        }

        //  Other details Sort
        setOtherDetailsData({});

        if (sessionStorage.getItem("OtherDetailsData")) {
          StoreDataInSession("OtherDetailsData", {});
        }

        //  Amenities Details  Sort

        const {
          ProjectAmmenities,
          OtherFeature,
          ...AmenitiesDetailsData_Rest
        } = AmenitiesDetailsData;

        if (BasicDetailsData.PropertyStatus == "Under Construction") {
          delete AmenitiesDetailsData_Rest.WaterSource;
        }
        setAmenitiesDetailsData(AmenitiesDetailsData_Rest);
        if (sessionStorage.getItem("AmenitiesDetailsData")) {
          StoreDataInSession("AmenitiesDetailsData", AmenitiesDetailsData_Rest);
        }

        // delete Price Per Sq. Yd
        delete PricingDetailsData_Rest.PricePerSqYd;
      }

      if (BasicDetailsData.PropertyStatus === "Ready to move") {
        delete BasicDetailsData_Rest.PossessionStatus;
      } else if (BasicDetailsData.PropertyStatus === "Under Construction") {
        delete BasicDetailsData_Rest.CurrentPropertyStatus;
        delete BasicDetailsData_Rest.PropertyAge;
      }
      setBasicDetailsData(BasicDetailsData_Rest);
      if (sessionStorage.getItem("BasicDetailsData")) {
        StoreDataInSession("BasicDetailsData", BasicDetailsData_Rest);
      }

      setPricingDetailsData(PricingDetailsData_Rest);
      if (sessionStorage.getItem("PricingDetailsData")) {
        StoreDataInSession("PricingDetailsData", PricingDetailsData_Rest);
      }
    }
    //  Remove Basement
    if (
      [
        "Apartment",
        "Independent House/Villa",
        "Plot/Land",
        "Studio Apartment",
        "1 RK/PG",
        "Serviced Apartment",
      ].includes(BasicDetailsData.ApartmentType)
    ) {
      const { Basement, BasementArea, ...PropertyDetailsData_Rest } =
        PropertyDetailsData; // Destructure to remove PropertyStatus
    
      if (PropertyDetailsData_Rest?.OtherRoom?.includes("Terrace")) {
        PropertyDetailsData_Rest.OtherRoom =
          PropertyDetailsData_Rest?.OtherRoom?.filter((text) => {
            return text !== "Terrace";
          });
      }
      // PropertyDetailsData_Rest.
      setPropertyDetailsData(PropertyDetailsData_Rest);
    }

    // eslint-disable-next-line
  }, [
    BasicDetailsData.PropertyAdType,
    BasicDetailsData.ApartmentType,
    BasicDetailsData.PropertyStatus,
  ]);

  useEffect(() => {
    if (data) {
      if (data.success === true) {
        if (["Admin", "Owner"].includes(medata?.user?.Role)) {
          navigate("/admin/allpost");
        } else {
          if (LodingType == "UpdatePostRequest") {
            navigate("/user/my-listing");
          }
        }
      }
      if (data.success === false) {
        setshowCreatePostSubmitAlert(false);
        if (data.IsAuthenticated === false) {
          navigate("/");
        }
      }
    }
    // eslint-disable-next-line
  }, [data]);

  // Store Data  in session Data Storeage
  useEffect(() => {
    if (!update) {
      if (sessionStorage.getItem("next")) {
        setnext(JSON.parse(sessionStorage.getItem("next")));
      }

      if (sessionStorage.getItem("BasicDetailsData")) {
        setBasicDetailsData(
          JSON.parse(sessionStorage.getItem("BasicDetailsData"))
        );
      }
      if (sessionStorage.getItem("LocationDetailsData")) {
        setLocationDetailsData(
          JSON.parse(sessionStorage.getItem("LocationDetailsData"))
        );
      }
      if (sessionStorage.getItem("PropertyDetailsData")) {
        setPropertyDetailsData(
          JSON.parse(sessionStorage.getItem("PropertyDetailsData"))
        );
      }
      if (sessionStorage.getItem("AreaDetailsData")) {
        setAreaDetailsData(
          JSON.parse(sessionStorage.getItem("AreaDetailsData"))
        );
      }

      if (sessionStorage.getItem("FloorDetailsData")) {
        setFloorDetailsData(
          JSON.parse(sessionStorage.getItem("FloorDetailsData"))
        );
      }

      if (sessionStorage.getItem("AmenitiesDetailsData")) {
        setAmenitiesDetailsData(
          JSON.parse(sessionStorage.getItem("AmenitiesDetailsData"))
        );
      }

      if (sessionStorage.getItem("PropertyDetailsData")) {
        setPropertyDetailsData(
          JSON.parse(sessionStorage.getItem("PropertyDetailsData"))
        );
      }
      if (sessionStorage.getItem("PricingDetailsData")) {
        setPricingDetailsData(
          JSON.parse(sessionStorage.getItem("PricingDetailsData"))
        );
      }
    }

    // eslint-disable-next-line
  }, []);

  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);
  const [fourth, setFourth] = useState();
  useDispatch(() => {
    if (next == 1) {
      setFirst(true);
    } else if (next == 2) {
      setSecond(true);
    } else if (next == 3) {
      setThird(true);
    } else if (next == 4) {
      setFourth(true);
    }
  });

  useEffect(() => {
    if (showCreatePostSubmitAlert === "showLoading") {
      const timer = setTimeout(() => {
        setshowCreatePostSubmitAlert(true);
      }, 2000);

      return () => clearTimeout(timer); // Cleanup function to prevent memory leaks
    }
  }, [showCreatePostSubmitAlert]);

  //  create post alert
  //  this use effect run show cretepost alert and user refresh this page
  useEffect(() => {
    if (sessionStorage.getItem("CreatePostAlertIsRefreshed")) {
      sessionStorage.removeItem("CreatePostAlertIsRefreshed");
      sessionStorage.removeItem("next");
      sessionStorage.removeItem("BasicDetailsData");
      sessionStorage.removeItem("LocationDetailsData");
      sessionStorage.removeItem("PropertyDetailsData");
      sessionStorage.removeItem("AreaDetailsData");
      sessionStorage.removeItem("FloorDetailsData");
      sessionStorage.removeItem("AmenitiesDetailsData");
      sessionStorage.removeItem("PropertyDetailsData");
      sessionStorage.removeItem("PricingDetailsData");
      navigate("/user/my-listing");
    }
  }, [sessionStorage.getItem("CreatePostAlertIsRefreshed")]);
  return (
    <>
      {SinglePostLoading ||
      showCreatePostSubmitAlert == "showLoading" ||
      (loading && LodingType == "UpdatePostRequest") ? (
        <Loader className="windowloader" />
      ) : (
        <>
          <div className="ProgressBarMain py-3 pb-0 ">
            <Helmet>
              <title>Free Property Posting on PropertyDekho247.com</title>
              <meta
                name="description"
                content="Welcome to PropertyDekho247.com, your go-to platform for posting resale properties absolutely free! Whether you're looking to sell or rent a property, our easy-to-use platform allows you to reach a wide audience and connect with potential buyers or tenants. Simply post your property listing without any charges and showcase it to people actively searching for resale properties. Get started today and make your property visible to thousands of potential buyers!"
              ></meta>
              <link
                rel="canonical"
                href="https://www.propertydekho247.com/user/post/"
              />
            </Helmet>
            {/* step 1 */}
            <div>
              <div className="d-flex justify-content-center">
                {next + 1 === 1 ? (
                  <div className="spinner-border " role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : next + 1 >= 1 ? (
                  <span
                    className=" text-white fw-normal   completecircleForm d-flex justify-content-center align-items-center cursor-pointer"
                    onClick={() => setnext(0)}
                  >
                    &#10003;
                  </span>
                ) : (
                  <span className="text-primary fw-normal  penddingCircleForm"></span>
                )}
              </div>

              <div className="">
                <p className="d-flex flex-column mb-3">
                  <span className="text-secondary text-opacity-75 d-flex justify-content-center ">
                    Step 1
                  </span>
                  <span className=" click-section-here  text-secondary fw-normal  d-flex justify-content-center">
                    Sell or Rent
                  </span>
                  <span className="text-primary fw-normal  ">
                    {next + 1 === 1 ? (
                      <span className="text-primary fw-normal  d-flex justify-content-center">
                        Progress
                      </span>
                    ) : next + 1 >= 1 ? (
                      <span
                        className="text-primary fw-normal  d-flex justify-content-center cursor-pointer"
                        onClick={() => {
                          setnext(0);
                        }}
                      >
                        Edit
                      </span>
                    ) : (
                      <span className="text-primary fw-normal  d-flex justify-content-center">
                        pending
                      </span>
                    )}
                  </span>
                </p>
              </div>
            </div>
            <hr className="progressLine  border border-primary border-3 opacity-75 d-flex justify-content-center" />
            {/* step 2 */}
            <div>
              <div className="d-flex justify-content-center">
                {next + 1 === 2 ? (
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : next + 1 >= 2 ? (
                  <span
                    className="text-white fw-normal   completecircleForm  d-flex justify-content-center align-items-center cursor-pointer"
                    onClick={() => BasicDetailsFormSubmit()}
                  >
                    &#10003;
                  </span>
                ) : (
                  <>
                    {Object.keys(LocationDetailsData).length > 0 ? (
                      <span
                        className="text-white fw-normal   completecircleForm d-flex justify-content-center align-items-center cursor-pointer"
                        onClick={() => BasicDetailsFormSubmit()}
                      >
                        &#10003; {/* This is the checkmark (tick) symbol */}
                      </span>
                    ) : (
                      <span className="text-primary fw-normal   penddingCircleForm"></span> // This is an empty circle when LocationDetailsData is empty
                    )}
                  </>
                )}
              </div>

              <div className="">
                <p className="d-flex flex-column mb-3">
                  <span className="text-secondary text-opacity-75   d-flex justify-content-center">
                    Step 2
                  </span>
                  <span className="  click-section-here text-secondary fw-normal   d-flex justify-content-center">
                    Location Details
                  </span>
                  <span>
                    {next + 1 === 2 ? (
                      <span className="text-primary fw-normal   d-flex justify-content-center">
                        Progress
                      </span>
                    ) : next + 1 >= 2 ? (
                      <span
                        className="text-primary fw-normal   d-flex justify-content-center cursor-pointer"
                        onClick={() => {
                          BasicDetailsFormSubmit();
                        }}
                      >
                        Edit{" "}
                      </span>
                    ) : (
                      <span className="text-secondary fw-normal   d-flex justify-content-center">
                        pending
                      </span>
                    )}
                  </span>
                </p>
              </div>
            </div>

            {next + 1 === 3 ? (
              <hr className="progressLine   border border-primary border-3 opacity-75" />
            ) : next + 1 >= 3 ? (
              <hr className="progressLine  border border-primary border-3 opacity-75" />
            ) : (
              <hr className="progressLine   border border-secondary border-3 opacity-75 " />
            )}

            {/* step 3 */}
            <div>
              <div>
                <div className="d-flex justify-content-center">
                  {next + 1 === 3 ? (
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : next + 1 >= 3 ? (
                    <span
                      className="text-white fw-normal   completecircleForm d-flex justify-content-center align-items-center cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        BasicDetailsFormSubmit(e);
                        setTimeout(() => {
                          LocationDetailsSubmiRef?.current?.requestSubmit(); // ✅ This triggers validation
                        }, 0);
                      }}
                    >
                      &#10003;
                    </span>
                  ) : (
                    <>
                      {Object.keys(
                        BasicDetailsData.ApartmentType == "Plot/Land"
                          ? {
                              ...AreaDetailsData,
                              ...AmenitiesDetailsData,
                              ...OtherDetailsData,
                            }
                          : {
                              ...AreaDetailsData,
                              ...AmenitiesDetailsData,
                              ...FloorDetailsData,
                              ...PropertyDetailsData,
                            }
                      ).length > 0 ? (
                        <span
                          className="text-white fw-normal   completecircleForm d-flex justify-content-center align-items-center cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            BasicDetailsFormSubmit(e);

                            setTimeout(() => {
                              LocationDetailsSubmiRef?.current?.requestSubmit(); // ✅ This triggers validation
                            }, 0);
                          }}
                        >
                          &#10003; {/* This is the checkmark (tick) symbol */}
                        </span>
                      ) : (
                        <span className="text-primary fw-normal   penddingCircleForm"></span> // This is an empty circle or different style when locationDetails is null
                      )}
                    </>
                  )}
                </div>

                <div className="">
                  <p className="d-flex flex-column mb-3">
                    <span className="text-secondary text-opacity-75   d-flex justify-content-center">
                      Step 3
                    </span>
                    <span className="click-section-here  text-secondary fw-normal   d-flex justify-content-center">
                      Apartment Features
                    </span>
                    <span className="text-primary fw-normal  ">
                      {next + 1 === 3 ? (
                        <span className="text-primary fw-normal   d-flex justify-content-center">
                          Progress
                        </span>
                      ) : next + 1 >= 3 ? (
                        <span
                          className="text-primary fw-normal   d-flex justify-content-center cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            BasicDetailsFormSubmit(e);

                            setTimeout(() => {
                              LocationDetailsSubmiRef?.current?.requestSubmit(); // ✅ This triggers validation
                            }, 0);
                          }}
                        >
                          Edit
                        </span>
                      ) : (
                        <span className="text-secondary fw-normal   d-flex justify-content-center">
                          pending
                        </span>
                      )}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            {next + 1 === 4 ? (
              <hr className="progressLine  border border-primary border-3 opacity-75" />
            ) : next + 1 >= 4 ? (
              <hr className="progressLine  border border-primary border-3 opacity-75" />
            ) : (
              <hr className="progressLine   border border-secondary border-3 opacity-75" />
            )}
            {/* step 4 */}
            <div>
              <div>
                <div className="d-flex justify-content-center">
                  {next + 1 === 4 ? (
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : next + 1 >= 4 ? (
                    <span
                      className="text-white fw-normal   completecircleForm d-flex justify-content-center align-items-center cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        BasicDetailsFormSubmit(e);
                        setTimeout(() => {
                          LocationDetailsSubmiRef?.current?.requestSubmit();
                          setTimeout(() => {
                            ApartmentFeaturesRef?.current?.requestSubmit();
                          }, 100);
                        }, 50);
                      }}
                    >
                      &#10003;
                    </span>
                  ) : (
                    <>
                      {Object.keys(PricingDetailsData).length > 0 ? (
                        <span
                          className="text-white fw-normal   completecircleForm d-flex justify-content-center align-items-center cursor-pointer"
                          onClick={(e) => {
                            // e.preventDefault();
                            BasicDetailsFormSubmit(e);
                            setTimeout(() => {
                              LocationDetailsSubmiRef?.current?.requestSubmit();
                              setTimeout(() => {
                                ApartmentFeaturesRef?.current?.requestSubmit();
                              }, 100);
                            }, 50);
                          }}
                        >
                          &#10003; {/* This is the checkmark (tick) symbol */}
                        </span>
                      ) : (
                        <span className="text-primary fw-normal   penddingCircleForm"></span> // This is an empty circle or different style when locationDetails is null
                      )}
                    </>
                  )}
                </div>

                <div className="">
                  <p className="d-flex flex-column mb-3">
                    <span className="text-secondary text-opacity-75   d-flex justify-content-center">
                      Step 4
                    </span>
                    <span className="click-section-here  text-secondary fw-normal   d-flex justify-content-center">
                      Price Detail
                    </span>
                    <span className="text-primary fw-normal  ">
                      {next + 1 === 4 ? (
                        <span className="text-primary fw-normal   d-flex justify-content-center">
                          Progress
                        </span>
                      ) : next + 1 >= 4 ? (
                        <span
                          className="text-primary fw-normal   d-flex justify-content-center cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            BasicDetailsFormSubmit(e);
                            setTimeout(() => {
                              LocationDetailsSubmiRef?.current?.requestSubmit();
                              setTimeout(() => {
                                ApartmentFeaturesRef?.current?.requestSubmit();
                              }, 100);
                            }, 50);
                          }}
                        >
                          Edit
                        </span>
                      ) : (
                        <span className="text-secondary fw-normal   d-flex justify-content-center">
                          pending
                        </span>
                      )}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            {next + 1 === 5 ? (
              <hr className="progressLine   border border-primary border-3 opacity-75" />
            ) : next + 1 >= 5 ? (
              <hr className="progressLine   border border-primary border-3 opacity-75" />
            ) : (
              <hr className="progressLine   border border-secondary border-3 opacity-75" />
            )}

            {/* step 5 */}
            <div>
              <div className="d-flex justify-content-center">
                {next + 1 === 5 ? (
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : next + 1 >= 5 ? (
                  <span
                    className="text-white fw-normal   completecircleForm d-flex justify-content-center align-items-center cursor-pointer"
                    onClick={(e) => {
                      // e.preventDefault();
                      BasicDetailsFormSubmit(e);
                      setTimeout(() => {
                        LocationDetailsSubmiRef?.current?.requestSubmit();
                        setTimeout(() => {
                          ApartmentFeaturesRef?.current?.requestSubmit();
                          setTimeout(() => {
                            PricingDetailsRef?.current?.requestSubmit();
                          }, 150);
                        }, 100);
                      }, 50);
                    }}
                  >
                    &#10003;
                  </span>
                ) : (
                  <>
                    {uploadimages.length !== 0 || previewImage.length !== 0 ? (
                      <span
                        className="text-white fw-normal   completecircleForm d-flex justify-content-center align-items-center cursor-pointer"
                        // onClick={() => setnext(4)}

                        onClick={(e) => {
                          e.preventDefault();
                          BasicDetailsFormSubmit(e);
                          setTimeout(() => {
                            LocationDetailsSubmiRef?.current?.requestSubmit();
                            setTimeout(() => {
                              ApartmentFeaturesRef?.current?.requestSubmit();
                              setTimeout(() => {
                                PricingDetailsRef?.current?.requestSubmit();
                              }, 150);
                            }, 100);
                          }, 50);
                        }}
                      >
                        &#10003; {/* This is the checkmark (tick) symbol */}
                      </span>
                    ) : (
                      <span className="text-primary fw-normal   penddingCircleForm"></span> // This is an empty circle or different style when locationDetails is null
                    )}
                  </>
                )}
              </div>

              <div className="">
                <p className="d-flex flex-column mb-3">
                  <span className="text-secondary text-opacity-75   d-flex justify-content-center">
                    Step 5
                  </span>
                  <span className="text-secondary fw-normal  d-flex justify-content-center">
                    Upload Image
                  </span>
                  <span className="text-primary fw-normal  ">
                    {next + 1 === 5 ? (
                      <span className="text-primary fw-normal   d-flex justify-content-center">
                        Progress
                      </span>
                    ) : next + 1 >= 5 ? (
                      <span
                        className="text-primary fw-normal   d-flex justify-content-center"
                        onClick={(e) => {
                          e.preventDefault();
                          BasicDetailsFormSubmit(e);
                          setTimeout(() => {
                            LocationDetailsSubmiRef?.current?.requestSubmit();
                            setTimeout(() => {
                              ApartmentFeaturesRef?.current?.requestSubmit();
                              setTimeout(() => {
                                PricingDetailsRef?.current?.requestSubmit();
                              }, 150);
                            }, 100);
                          }, 50);
                        }}
                      >
                        Edit
                      </span>
                    ) : (
                      <span className="text-secondary fw-normal   d-flex justify-content-center">
                        pending
                      </span>
                    )}
                  </span>
                </p>
              </div>
            </div>
            {/* {Array.from({ length: next }, (_, index) => (
              <div className="ProgressBar" key={index}>
                {index >= 0 ? <></> : null}
                <hr className="progressLine pb-5 mb-5" />{" "}
              </div>
            ))} */}
          </div>

          {next === 0 && (
            <BasicDetailsSection
              BasicDetailsData={BasicDetailsData}
              setBasicDetailsData={setBasicDetailsData}
              setnext={setnext}
              update={update}
              PricingDetailsData={PricingDetailsData}
              setPricingDetailsData={setPricingDetailsData}
              // setBasicDetailsSubmit ={setBasicDetailsSubmit}
              BasicDetailsFormSubmit={BasicDetailsFormSubmit}
              // BasicDetailsFormRef={BasicDetailsFormRef}
              CreatePostRef={CreatePostRef}
               SinglePost ={getSinglePostData?.SinglePost}
            />
          )}
          {next === 1 && (
            <LocationDetailsSection
              LocationDetailsData={LocationDetailsData}
              setLocationDetailsData={setLocationDetailsData}
              setnext={setnext}
              update={update}
              LocationDetailsSubmiRef={LocationDetailsSubmiRef}
              CreatePostRef={CreatePostRef}
            />
          )}
          {next === 2 && (
            <PropertyDetailsAreaDetailsOtherDetailsFloorDetailsAmenitiesDetailsSection
              BasicDetailsData={BasicDetailsData}
              setnext={setnext}
              update={update}
              PropertyDetailsData={PropertyDetailsData}
              setPropertyDetailsData={setPropertyDetailsData}
              AreaDetailsData={AreaDetailsData}
              setAreaDetailsData={setAreaDetailsData}
              OtherDetailsData={OtherDetailsData}
              setOtherDetailsData={setOtherDetailsData}
              AmenitiesDetailsData={AmenitiesDetailsData}
              setAmenitiesDetailsData={setAmenitiesDetailsData}
              // floor and Amenities
              FloorDetailsData={FloorDetailsData}
              setFloorDetailsData={setFloorDetailsData}
              ApartmentFeaturesRef={ApartmentFeaturesRef}
              CreatePostRef={CreatePostRef}
            />
          )}
          {next === 3 && (
            <PricingDetailsSection
              BasicDetailsData={BasicDetailsData}
              update={update}
              show_Maintenance_Charges={show_Maintenance_Charges}
              setshow_Maintenance_Charges={setshow_Maintenance_Charges}
              setnext={setnext}
              AreaDetailsData={AreaDetailsData}
              PricingDetailsData={PricingDetailsData}
              setPricingDetailsData={setPricingDetailsData}
              next={next}
              PricingDetailsRef={PricingDetailsRef}
              CreatePostRef={CreatePostRef}
            />
          )}
          {next === 4 && (
            <CreatePostImageUploadSection
              setnext={setnext}
              next={next}
              uploadimages={uploadimages}
              setuploadimages={setuploadimages}
              previewImage={previewImage}
              setpreviewImage={setpreviewImage}
              update={update}
              PostId={Params.PostId}
              update_RemoveImage={update_RemoveImage}
              setupdate_RemoveImage={setupdate_RemoveImage}
              uploadimagesName={uploadimagesName}
              setuploadimagesName={setuploadimagesName}
              // new form object

              BasicDetailsData={BasicDetailsData}
              LocationDetailsData={LocationDetailsData}
              PropertyDetailsData={PropertyDetailsData}
              AreaDetailsData={AreaDetailsData}
              FloorDetailsData={FloorDetailsData}
              AmenitiesDetailsData={AmenitiesDetailsData}
              PricingDetailsData={PricingDetailsData}
              OtherDetailsData={OtherDetailsData}
              //  submit Alert
              setPricingDetailsData={setPricingDetailsData}
              setshowCreatePostSubmitAlert={setshowCreatePostSubmitAlert}
              CreatePostRef={CreatePostRef}

              // BasicDetailsForm
            />
          )}

          {showCreatePostSubmitAlert == true && (
            <WindowComponent
              SetShow={setshowCreatePostSubmitAlert}
              Component={CreatePostSubmitAlert}
              BtnRef={CreatePostRef}
              className={"create-post-submit-alert-window-main"}
              Type={"CreatePostSubmitAlert"}
            />
          )}
        </>
      )}
    </>
  );
}
