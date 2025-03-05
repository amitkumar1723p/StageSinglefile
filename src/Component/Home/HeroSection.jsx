import React, {
  Component,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./HeroSection.css"; // Import your CSS file if you have one
import "./Navbar.css";
import './Search.css';

import FAQ from "./FAQ";
import LandLord from "./LandLord";

// import TenantDetailsForm from "./TenantDetailsForm";
import Tenant from "./Tenant";
import RentalBanner from "./RentalBanner";
import ListYourProperty from "./ListYourProperty.jsx";
import RentAuthentication from "./RentAuthentication.jsx";
import BrowseProperties from "./BrowseProperties";
// import LandLord from "./LandLord";

import PropertyDetailsForm from "./PropertyDetailsForm";

// import RentAgreement from "./RentAgreement";

import PropertyListingBanner from "./PropertyListingBanner";

import FutureAsist from "./FutureAsist";

import WhoWeAre from "./WhoWeAre";

import SimpleSteps from "./SimpleSteps";
import FaqBuyer from "./FaqBuyer";
import ProjectNameSection from "../Post/ProjectName";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  GetAllPostAction,
  GetSingleProjectNameDataAction,
} from "../../Action/postAction";
import { useDispatch, useSelector } from "react-redux";
import Testimonials from "./Testimonials";
//  import PostFree from './PostFree'
import PostFreeContainer from "./PostFreeContainer";
import PostPropertyRequerment from "./PostPropertyRequerment";
import SimpleStepsBuyer from "./SimpleStepsBuyer";
import WindowComponent from "../WindowComponent";

import EndToEndSupport from "./EndToEndSupport";
import ComparisonTableBuyer from "./ComparisonTableBuyer";
import EndToEndSupportSeller from "./EndToEndSupportSeller";
import ComparisonTableSeller from "./ComparisonTableSeller";
import { motion } from "framer-motion";
// import { useState, useEffect, useRef } from "react";
import "./BuyingSellingTenant.css";
import Services from "./Services";

import { UserContext } from "../CreateContext/CreateContext";
import RentAgreement from "./RentAgreement";
// import TenantDetailsForm from "./TenantDetailsForm";
import PrivacyPolicy from "./PrivacyPolicy";
import FurtherAssistance from "./FurtherAssistance";
import { toast } from "react-toastify";

import ChannelPartnerForm from "./ChannelPartnerForm.jsx";
import DreamHomeBanner from "./DreamHomeBanner.jsx";
// import BuyingSellingTenant from "./BuyingSellingTenant.jsx";
import BuyingSellingTenant from "./BuyingSellingTenant";
// import DreamHomeBanner from "./DreamHomeBanner.jsx";
import { Helmet } from "react-helmet";
import VerifiedComponent from "./VerifiedComponent.jsx";
import Search from "./Search.jsx";
const HeroSection = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("buy");
  const [runSearchButton, setrunSearchButton] = useState(false);
  // const handleTabClick = (tab) => {
  //   setActiveTab(tab);

  // };
  const [activeIndex, setActiveIndex] = useState(0);
  const [position, setPosition] = useState({ width: 0, left: 0, height: 0, top: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const updatePosition = () => {
      if (containerRef.current?.children[activeIndex]) {
        const activeButton = containerRef.current.querySelector(`button:nth-child(${activeIndex + 2})`);
        if (activeButton) {
          const buttonRect = activeButton.getBoundingClientRect();
          const containerRect = containerRef.current.getBoundingClientRect();

          setPosition({
            width: buttonRect.width,
            height: buttonRect.height,
            left: activeButton.offsetLeft,
            top: activeButton.offsetTop
          });
        }
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [activeIndex]);


  const { setRedirectPath, RedirectPathIsHomeCard, setRedirectPathIsHomeCard } =
    useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });
  const [isHidden, setIsHidden] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  // Function to handle the resize event and detect if the keyboard is open
  const handleResize = () => {
    // Detect if the window height has decreased significantly
    const isMobile = window.innerWidth <= 768; // Adjust this breakpoint for mobile
    if (isMobile && window.innerHeight < 500) {
      setIsKeyboardOpen(true); // Keyboard is likely open
      setIsHidden(true); // Hide the element when the keyboard is open
    } else {
      setIsKeyboardOpen(false); // Keyboard is likely closed
      setIsHidden(false); // Show the element again when the keyboard is closed
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Run the check on initial load
    handleResize();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);




  const [navSearchInputVisible, setnavSearchInputVisible] = useState(false);
  const sectionRef = useRef(null); // Reference to track the target section

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setnavSearchInputVisible(!entry.isIntersecting); // Show if section is in view
      },
      { threshold: 0.5 } // Trigger when 50% of section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);


  const SearchTab = ["Sale", "Rent"];
  const Tab = ["Buy", "Sale", "Rent"];
  const [PropertyAddType, setPropertyAddType] = useState("Buy");
  const [SearchPropertyAddType, setSearchPropertyAddType] = useState("Sale");
  const [ProjectNameObjectData, setProjectNameObjectData] = useState({
    ProjectName: "",
  });

  const [showPropertyRequirement, setshowPropertyRequirement] = useState(false);
  const { loading: GetAllPostLoading, data: AllPostData } = useSelector(
    (state) => {
      return state.GetAllPost;
    }
  );
  const { data: GetProjectNameData, loading: GetProjectNameLoding } =
    useSelector((state) => {
      return state.SingleProjectName;
    });

  const PropertyRequirementBtnRef = useRef([]);
  const SearchContainerRef = useRef(null);

  useEffect(() => {
    if (AllPostData && GetProjectNameData) {
      if (AllPostData.success == true && GetProjectNameData.success == true) {
        if (RedirectPathIsHomeCard == false) {
          //  `/post-detail/${PropertyAddress.toLowerCase()
          //   .replaceAll(" ", "-")
          //   .replace(",", "")
          //   .replaceAll("/", "-")}-${PostData._id}`

          navigate(
            `/home/card?ProjectName=${ProjectNameObjectData.ProjectName.trim()}&&PropertyAddType=${SearchPropertyAddType}`
          );
          // navigate(
          //   `/home/card?ProjectName=${ProjectNameObjectData.ProjectName?.toLowerCase()
          //       .replaceAll(" ", "-")
          //       .replaceAll(",", "")
          //      .replaceAll("/", "-")}&&PropertyAddType=${SearchPropertyAddType}`
          // );
        }
      }
    }
  }, [AllPostData, GetProjectNameData]);

  useEffect(() => {
    if (medata && medata.IsAuthenticated == true) {
      if (sessionStorage.getItem("RedirectPath") == "/post-requirement") {
        setshowPropertyRequirement(true);
        sessionStorage.removeItem("RedirectPath");
        setRedirectPath("");
      }
    }
  }, [medata]);
  useEffect(() => {
    dispatch({ type: "GetAllPostClear" });
    dispatch({ type: "GetSingleProjectNameDataClear" });
    setRedirectPathIsHomeCard(false);
    PropertyRequirementBtnRef.current[0] = React.createRef();
    PropertyRequirementBtnRef.current[1] = React.createRef();
    sessionStorage.removeItem("RedirectPath");
    // sessionStorage.removeItem("isFirstLoad");
    setRedirectPath("");
  }, []);

  // console.log(PropertyAddType)

  const [query, setQuery] = useState('');
  const [typeOfProperty, setTypeOfProperty] = useState('Rent');  // Example type of property

  // Function to update the query
  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
  };

  // Function to update propertyAddType
  const handlePropertyAddTypeChange = (type) => {
    setTypeOfProperty(type); // Set the selected property type
  };
  return (
    <><Helmet>

      {/* <title>PropertyDekho247.com - Trusted Real Estate for Resale & Rentals in Gurugram</title> */}
      <title>Buy & Sell Resale Properties in Gurgaon</title>
      <meta name="description" content="PropertyDekho247 India's 1st online Proptech Reselling platform that delivers real-time price alerts to property owners."></meta>
      <link rel="canonical" href="https://wwww.propertydekho247.com/" />
    </Helmet>

{/* searching start  */}
<div className="container-fluid shadow-sm p-2 mb-2 bg-body-tertiary rounded mainImage h-75">
  {/* Content goes here */}
  <div className="heading-hero r">
            <h1>
            Market Value of Property  Pay the Right Price
            </h1>
            <p className=" d-flex justify-content-center">
              India's 1st online proptech platform that delivers real-time price
              alerts to property owners.
            </p>
          </div>

  <div className="">

      <div className=" d-flex  " style={{paddingLeft:"421px"}} >
      
        <small className="  bg-body-tertiary rounded-start py-1" onClick={() => handlePropertyAddTypeChange('Sale')}  style={{ padding: '4px 8px', fontSize: '12px' }}>Buy</small>
        <small className=" bg-body-tertiary py-1" onClick={() => handlePropertyAddTypeChange('Rent')}  style={{ padding: '4px 8px', fontSize: '12px' }}>Rent</small>
        <small className="  bg-body-tertiary  rounded-end py-1" onClick={() => handlePropertyAddTypeChange('Sale')}  style={{ padding: '4px 8px', fontSize: '12px' }}>Sale</small> {/* You can add more options here */}
      </div>
</div>

      {/* Pass query and propertyAddType to Search (Component B) */}
      <div className="">
      <div className="d-flex justify-content-center">
      <Search
        query={query}
        typeOfProperty={typeOfProperty} // This is the selected property type
        onQueryChange={handleQueryChange}  // If you want to update the query in A
      />
      </div>
      </div>
    
   
    </div>
  






{/* searching start  */}







            {/* changes is complete in hero-section */}

      {!isHidden && (
        <div className="floating-buttons ">
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
            <img src="/img/whatapp.png" alt="WhatsApp" />
          </Link>
        </div>
      )}

      <div className="select-options" id="select-option-section">
        <div className="sell-rent-buy">
          <div className="heading-section-all">
            <h2 className="underline-on-text hero-h2 logo-heading-navbar">
              <span> Discover </span> All Things <span>Property </span>
            </h2>
          </div>
          <div className="rent-sell">
            {/* {Tab.map((e, i) => {
              return (
                <div
                  key={i}
                  className={`search-tab-ing ${
                    e == PropertyAddType ? "active" : ""
                  }
              `}
                  onClick={() => {
                    // if (e == PropertyAddType) {
                    // setPropertyAddType("");
                    // } else {
                    setPropertyAddType(e);
                    // }
                  }}
                >
                  {e == "Sale" ? "Sell" : e}ing
                </div>
              );
            })}

              <BuyingSellingTenant /> */}
            <div
              ref={containerRef}
              className="AnimatedNav-container"
            >
              <motion.div
                className="AnimatedNav-slider"
                animate={{
                  width: position.width,
                  height: position.height,
                  left: position.left,
                  top: position.top
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              <button
                key="seller"
                onClick={() => {
                  setActiveIndex(0);
                  setPropertyAddType("Buy")
                }}
                className={`AnimatedNav-button ${activeIndex === 0 ? 'AnimatedNav-button--active' : ''}`}
              >
                Buying
              </button>
              <button
                key="buyer"
                onClick={() => {
                  setActiveIndex(1);
                  setPropertyAddType("Sale")
                }}
                className={`AnimatedNav-button ${activeIndex === 1 ? 'AnimatedNav-button--active' : ''}`}
              >
                Selling
              </button>
              <button
                key="tenant"
                onClick={() => {
                  setActiveIndex(2);
                  setPropertyAddType("Rent")
                }}
                className={`AnimatedNav-button ${activeIndex === 2 ? 'AnimatedNav-button--active' : ''}`}
              >
                Renting
              </button>
            </div>

          </div>
        </div>
      </div>
      <div></div>

      {PropertyAddType == "Buy" && (
        <>
          {/* <RentSale /> */}

          <SimpleStepsBuyer />

          <ComparisonTableBuyer />
          <EndToEndSupport />
          <PropertyListingBanner
            showPropertyRequirement={showPropertyRequirement}
            setshowPropertyRequirement={setshowPropertyRequirement}
            PropertyRequirementBtnRef={PropertyRequirementBtnRef.current[1]}
            SearchContainerRef={SearchContainerRef}
          />
          <Services />
          {/* <FutureAsist /> */}
          <div id="testimonials">
            <Testimonials />
          </div>
          <div id="WHO-WE-ARE">
            <WhoWeAre />
          </div>
          <div id="FAQ-SECTION">
            <FaqBuyer />
          </div>
        </>
      )}
      {/* Sale Component  */}
      {PropertyAddType == "Sale" && (
        <>
          <SimpleSteps />
          {/* <PrivacyPolicy/> */}
          {/* <ReportListingForm/> */}
          {/* <TermsAndConditions/> */}
          <ComparisonTableSeller />
          <EndToEndSupportSeller />
          {/* <DreamHomeBanner/> */}

          <PostFreeContainer />
          <Services />
          <FutureAsist />
          <div id="testimonials">
            <Testimonials />
          </div>
          <div id="WHO-WE-ARE">
            <WhoWeAre />
          </div>
          <div id="FAQ-SECTION">
            <FAQ />
          </div>
        </>
      )}

      {/* Rent Component./ */}
      {PropertyAddType == "Rent" && (
        <>
          <Tenant />
          <BrowseProperties />
          <ListYourProperty/>
          <LandLord />
          <PropertyDetailsForm />
          <RentAgreement />
          <RentalBanner />
          {/* <VerifiedComponent /> */}
          <RentAuthentication/>
          {/* <TenantDetailsForm /> */}
        </>
      )}
      {/* <TenantDetailsForm /> */}
      {/* Buy Component  */}

      {showPropertyRequirement && (
        <WindowComponent
          Component={PostPropertyRequerment}
          SetShow={setshowPropertyRequirement}
          BtnRef={PropertyRequirementBtnRef}
        />
      )}
    </>
  );
};

export default HeroSection;
