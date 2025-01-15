import React, { useEffect, useState } from "react";
import LocationDetailsSection from "./LocationDetails.jsx";
import BasicDetailsSection from "./BasicDetails.jsx";
import CreatePostImageUploadSection from "./CreatePostImageUpload.jsx";
import "./CreatePost.css";
import { GetSinglePostAction } from "../../../Action/postAction.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../../Loader/Loader.jsx";

import PropertyDetailsAreaDetailsConstructionDetailsFloorDetailsAmenitiesDetailsSection from "./PropertyDetails_AreaDetails_ConstructionDetails_FloorDetails_AmenitiesDetails.jsx";
import PricingDetailsSection from "./PricingDetails.jsx";
import { StoreDataInSession } from "../../../utils/SessionStorage.js";

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
  const [ConstructionDetailsData, setConstructionDetailsData] = useState({});
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

  //  Update Post Logic

  //  GetSinglePostAction
  useEffect(() => {
    if (update) {
      dispatch(GetSinglePostAction(Params.PostId));
    }

    // eslint-disable-next-line
  }, [update]);

  // getSingle PostData

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
          } = SinglePost;

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

          setpreviewImage(
            PropertyImages.map((e) => {
              return { name: e.name, url: e.url };
            })
          );
        }
      }
    } else {
      // sessionStorage.removeItem("next");
      // sessionStorage.removeItem("BasicDetailsData");
      // sessionStorage.removeItem("LocationDetailsData");
      // sessionStorage.removeItem("PropertyDetailsData");
      // sessionStorage.removeItem("AreaDetailsData");
      // sessionStorage.removeItem("FloorDetailsData");
      // sessionStorage.removeItem("AmenitiesDetailsData");
      // sessionStorage.removeItem("PropertyDetailsData");
      // sessionStorage.removeItem("PricingDetailsData");

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

      // setBasicDetailsData({});
      // setLocationDetailsData({});
      // setPropertyDetailsData({});
      // setConstructionDetailsData({});
      // setAreaDetailsData({});
      // setFloorDetailsData({});
      // setAmenitiesDetailsData({});
      // setPricingDetailsData({});
      // setshow_Maintenance_Charges(false);
      // setuploadimages([]);
      // setpreviewImage([]);
    }
    // eslint-disable-next-line
  }, [getSinglePostData, update]);

  //  Rent And Sale   Validate Field
  useEffect(() => {
    if (BasicDetailsData.PropertyAdType === "Rent") {
      setshow_Maintenance_Charges(true);

      const {
        PropertyStatus,
        CurrentPropertyStatus,
        PropertyAge,
        PossessionStatus,

        ...BasicDetailsData_Rest
      } = BasicDetailsData; // Destructure to remove PropertyStatus

      if (BasicDetailsData.ApartmentType === "Plot/Land") {
        delete BasicDetailsData_Rest.ApartmentType;
      }
      delete BasicDetailsData_Rest.NoOfOpenSide;
      // delete BasicDetailsData_Rest.CurrentPropertyStatus;
      // delete BasicDetailsData_Rest.PossessionStatus;
      setBasicDetailsData(BasicDetailsData_Rest);

      if (sessionStorage.getItem("BasicDetailsData")) {
        StoreDataInSession("BasicDetailsData", BasicDetailsData_Rest);
      }
      const {
        ExpectedPrice,
        PricePerSqFt,

        ...PricingDetailsData_Rest
      } = PricingDetailsData;

      delete PricingDetailsData_Rest.AdditionalDetails?.MonthlyExpectedRent;
      setPricingDetailsData(PricingDetailsData_Rest);

      if (sessionStorage.getItem("PricingDetailsData")) {
        StoreDataInSession("PricingDetailsData", PricingDetailsData_Rest);
      }
    } else if (BasicDetailsData.PropertyAdType === "Sale") {
      const { AvailableFrom, ...BasicDetailsData_Rest } = BasicDetailsData; // Destructure to remove PropertyStatus

      if (BasicDetailsData.ApartmentType === "Plot/Land") {
        BasicDetailsData_Rest.NoOfOpenSide = 0;
        delete BasicDetailsData_Rest.PropertyStatus;
        delete BasicDetailsData_Rest.CurrentPropertyStatus;
        delete BasicDetailsData_Rest.PropertyAge;
      } else if (
        [
          "Apartment",
          "Independent/Builder Floor",
          "1 RK/Studio Apartment",
          "Serviced Apartment",
        ].includes(BasicDetailsData.ApartmentType)
      ) {
        delete BasicDetailsData_Rest.NoOfOpenSide;
        // delete BasicDetailsData_Rest.CurrentPropertyStatus;
        // delete BasicDetailsData_Rest.PossessionStatus;
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
      const {
        ExpectedRent,
        DepositePrice,
        // PreferredTenant,
        ...PricingDetailsData_Rest
      } = PricingDetailsData;
      delete PricingDetailsData_Rest.AdditionalDetails?.PreferredTenant;
      delete PricingDetailsData_Rest.AdditionalDetails
        ?.ElectrictyAndWaterCharges;
      setPricingDetailsData(PricingDetailsData_Rest);
      if (sessionStorage.getItem("PricingDetailsData")) {
        StoreDataInSession("PricingDetailsData", PricingDetailsData_Rest);
      }
    }

    if (["Independent House/Villa"].includes(BasicDetailsData.ApartmentType)) {
      const {
        BuiltUpArea,
        CarpetArea,
        SuperBuiltUpArea,
        ...AreaDetailsData_Rest
      } = AreaDetailsData;
      setAreaDetailsData(AreaDetailsData_Rest);
      if (sessionStorage.getItem("AreaDetailsData")) {
        StoreDataInSession("AreaDetailsData", AreaDetailsData_Rest);
      }
      const { PropertyOnFloor, ...FloorDetailsData_Rest } = FloorDetailsData;
      setFloorDetailsData(FloorDetailsData_Rest);

      if (sessionStorage.getItem("FloorDetailsData")) {
        StoreDataInSession("FloorDetailsData", FloorDetailsData_Rest);
      }
    } else if (
      [
        "Apartment",
        "Independent/Builder Floor",
        "1 RK/Studio Apartment",
        "Serviced Apartment",
      ].includes(BasicDetailsData.ApartmentType)
    ) {
      const { PlotArea, ...AreaDetailsData_Rest } = AreaDetailsData;
      setAreaDetailsData(AreaDetailsData_Rest);
      if (sessionStorage.getItem("AreaDetailsData")) {
        StoreDataInSession("AreaDetailsData", AreaDetailsData_Rest);
      }
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
        sessionStorage.removeItem("next");
        sessionStorage.removeItem("BasicDetailsData");
        sessionStorage.removeItem("LocationDetailsData");
        sessionStorage.removeItem("PropertyDetailsData");
        sessionStorage.removeItem("AreaDetailsData");
        sessionStorage.removeItem("FloorDetailsData");
        sessionStorage.removeItem("AmenitiesDetailsData");
        sessionStorage.removeItem("PropertyDetailsData");
        sessionStorage.removeItem("PricingDetailsData");

        if (["Admin", "Owner"].includes(medata.user.Role)) {
          navigate("/admin/allpost");
        } else {
          navigate("/user");
        }
      }
      if (data.success === false) {
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

  const[first,setFirst]=useState(false)
  const[second,setSecond]=useState(false)
  const[third,setThird]=useState(false)
  const[fourth,setFourth]=useState()
  useDispatch(()=>{
    if(next==1){
      setFirst(true)
    }else if(next==2){
      setSecond(true)
    }else if(next==3){
      setThird(true)
    }else if(next==4){
      setFourth(true)
    }
  })
  return (
    <>
      {(LodingType &&
        ["CreatePostRequest", "UpdatePostRequest"].includes(LodingType) &&
        loading) ||
      SinglePostLoading ? (
        // {  loadings? (
        <Loader className="windowloader" />
      ) : (
        <>
       
          {" "}
          <div className="ProgressBarMain"> 
          {Array.from({ length:next }, (_, index) => (
        <div className="ProgressBar" key={index} >
          {index>=0?
           <span className="okkSymbolProgress"><span style={{padding:"7px"}}>&#10003;</span></span>
           :null}
          <hr className="progressLine" /> {/* Make hr take available space */}
         
         
        </div>
      ))}
    
    <span className="progressLoader">loader</span>
   
          </div>
         
          {next === 0 && (
            
            <BasicDetailsSection
              BasicDetailsData={BasicDetailsData}
              setBasicDetailsData={setBasicDetailsData}
              setnext={setnext}
              update={update}
              PricingDetailsData={PricingDetailsData}
              setPricingDetailsData={setPricingDetailsData}
            />
          )}
          {next === 1 && (
            <LocationDetailsSection
              LocationDetailsData={LocationDetailsData}
              setLocationDetailsData={setLocationDetailsData}
              setnext={setnext}
              update={update}
            />
          )}
          {next === 2 && (
            <PropertyDetailsAreaDetailsConstructionDetailsFloorDetailsAmenitiesDetailsSection
              BasicDetailsData={BasicDetailsData}
              setnext={setnext}
              update={update}
              PropertyDetailsData={PropertyDetailsData}
              setPropertyDetailsData={setPropertyDetailsData}
              AreaDetailsData={AreaDetailsData}
              setAreaDetailsData={setAreaDetailsData}
              ConstructionDetailsData={ConstructionDetailsData}
              setConstructionDetailsData={setConstructionDetailsData}
              AmenitiesDetailsData={AmenitiesDetailsData}
              setAmenitiesDetailsData={setAmenitiesDetailsData}
              // floor and Amenities
              FloorDetailsData={FloorDetailsData}
              setFloorDetailsData={setFloorDetailsData}
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
            />
          )}
          {next === 4 && (
            <CreatePostImageUploadSection
              setnext={setnext}
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
            />
          )}
        </>
      )}
    </>
  );
}
