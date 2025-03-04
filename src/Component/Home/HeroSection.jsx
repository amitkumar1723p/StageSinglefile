import React, {
  Component,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./HeroSection.css"; // Import your CSS file if you have one
import "./Navbar.css";

import FAQ from "./FAQ";
import LandLord from "./LandLord";

// import TenantDetailsForm from "./TenantDetailsForm";
import Tenant from "./Tenant";
import RentalBanner from "./RentalBanner";
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

  return (
    <><Helmet>

      {/* <title>PropertyDekho247.com - Trusted Real Estate for Resale & Rentals in Gurugram</title> */}
      <title>Buy & Sell Resale Properties in Gurgaon</title>
      <meta name="description" content="PropertyDekho247 India's 1st online Proptech Reselling platform that delivers real-time price alerts to property owners."></meta>
      <link rel="canonical" href="https://wwww.propertydekho247.com/" />
    </Helmet>


      <header className="hero-section" id="Hero-section">
        <div className="overlay">
          <img src="/img/hero-img9.png" alt="" srcset="" className="home-hero-img" />
        </div>
        <div className="hero-content">
          <div className="hero-img-section">
            {/* <div className="hero-img-section" style={{backgroundImage:"url(/img/mobile-img.svg)"}}> */}
            {/* <img
          className="hero-img-section-main-section"
          src="/img/mobile-img.svg"
          alt="hero img"
        /> */}

        {/* Do changes in hero-section */}
          </div>
          <div className="heading-hero">
            <h1>
            Fair Market Value of <span className="heading-span-h1">Property </span>  Pay the <span className="heading-span-h1">Right Price</span>
            </h1>
            <p className="sub-heading">
              India's 1st online proptech platform that delivers real-time price
              alerts to property owners.
            </p>
          </div>
          {/* nav bar search button  */}
          {
            navSearchInputVisible && <div className={`search-main-box-section-nav`}>

              <div className="search-box-nav">

                <select className="" onChange={(e) => {
                  // if (e == PropertyAddType) {
                  // setPropertyAddType("");
                  // } else {
                  setSearchPropertyAddType(e.target.value);
                  console.log(e.target.value)
                  // }
                }}>
                  <option selected={PropertyAddType === "Sale"} value="Sale">Buy</option>
                  <option selected={PropertyAddType === "Rent"} value="Rent">Rent</option>

                  {/* <option value="Noida">Noida</option>
            <option value="Delhi">Delhi</option> */}
                </select>

                <select>
                  <option value="Gurgaon">Gurgaon</option>
                  {/* <option value="Noida">Noida</option>
            <option value="Delhi">Delhi</option> */}
                </select>

                <div className="search-section-box-nav">
                  <ProjectNameSection
                    ProjectInputType={"Search"}
                    searchInput={true}
                    setrunSearchButton={setrunSearchButton}
                    inputClass={"hero-search-button"}
                    ProjectNameObjectData={ProjectNameObjectData}
                    setProjectNameObjectData={setProjectNameObjectData}
                    placeholder={"Search by Project name or society name"}
                  />
                  {/* <img
                className="img-searchbar"
                src={`data:image/svg+xml;utf8,${encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
              <path d="M10.5007 7.16634C11.3847 7.16634 12.2326 7.51753 12.8577 8.14265C13.4828 8.76777 13.834 9.61562 13.834 10.4997C13.834 11.3837 13.4828 12.2316 12.8577 12.8567C12.2326 13.4818 11.3847 13.833 10.5007 13.833C9.6166 13.833 8.76875 13.4818 8.14363 12.8567C7.51851 12.2316 7.16732 11.3837 7.16732 10.4997C7.16732 9.61562 7.51851 8.76777 8.14363 8.14265C8.76875 7.51753 9.6166 7.16634 10.5007 7.16634ZM3.04232 11.333H1.33398V9.66634H3.04232C3.41732 6.19134 6.19232 3.41634 9.66732 3.04134V1.33301H11.334V3.04134C14.809 3.41634 17.584 6.19134 17.959 9.66634H19.6673V11.333H17.959C17.584 14.808 14.809 17.583 11.334 17.958V19.6663H9.66732V17.958C6.19232 17.583 3.41732 14.808 3.04232 11.333ZM10.5007 4.66634C8.95356 4.66634 7.46982 5.28092 6.37586 6.37489C5.2819 7.46885 4.66732 8.95258 4.66732 10.4997C4.66732 12.0468 5.2819 13.5305 6.37586 14.6245C7.46982 15.7184 8.95356 16.333 10.5007 16.333C12.0477 16.333 13.5315 15.7184 14.6254 14.6245C15.7194 13.5305 16.334 12.0468 16.334 10.4997C16.334 8.95258 15.7194 7.46885 14.6254 6.37489C13.5315 5.28092 12.0477 4.66634 10.5007 4.66634Z" fill="#0078D4"/>
            </svg>
              `)}`}
                alt="tst"
              /> */}

                  {/* <img src="/img/Search-icon.svg" alt="" className="img-searchbar" /> */}

                  <button
                    disabled={
                      GetAllPostLoading || GetProjectNameLoding ? true : false
                    }
                    className="search-button-nav"
                    onClick={() => {
                      if (runSearchButton == false) {
                        return alert("Write correct ProjectName");
                      }
                      if (
                        runSearchButton == true &&
                        ProjectNameObjectData.ProjectName.length > 0
                      ) {
                        // setRedirectPath("/");
                        dispatch(
                          GetSingleProjectNameDataAction({
                            ProjectName:
                              ProjectNameObjectData.ProjectName.trim(),
                          })
                        );
                        dispatch(
                          GetAllPostAction({
                            ProjectName:
                              ProjectNameObjectData.ProjectName.trim(),
                            PropertyAdType: SearchPropertyAddType,
                          })
                        );

                        // navigate(
                        //   `home/card?Search=${ProjectNameObjectData.ProjectName.trim()}&PropertyType=${SearchPropertyAddType}`
                        // );
                      }
                    }}
                  >
                    <img
                      src="/img/Search-icon.svg"
                      alt=""
                      className="img-searchbar"
                    />
                  </button>

                </div>
              </div>
            </div>
          }
          {/* Search Container */}
          <div ref={sectionRef} className="search-container">


            <div className="search-main-box-section">
              <div className="search-options">
                {SearchTab.map((e, i) => {
                  return (
                    <div
                      key={i}
                      className={`search-tab ${e == SearchPropertyAddType ? "active" : ""
                        }
                    `}
                      onClick={() => {
                        // if (e == PropertyAddType) {
                        // setPropertyAddType("");
                        // } else {
                        setSearchPropertyAddType(e);
                        // console.log(e)
                        // }
                      }}
                    >
                      {e == "Sale" ? "Buy" : e}
                    </div>
                  );
                })}
              </div>
              <div className="search-box">
                <img
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(`
                  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                  <g clip-path="url(#clip0_2281_10206)">
                    <path d="M12.9051 9.30371L12.8965 9.32639L12.904 9.30569L12.9051 9.30371Z" fill="#0078D4"/>
                    <path d="M9.49997 0.5C6.53393 0.5 4.09961 2.9264 4.09961 5.88596C4.09961 7.03292 4.46681 8.10176 5.08601 8.97728L5.06387 8.94272L8.52095 14.9184L8.53841 14.9412C8.67773 15.123 8.81561 15.2695 8.98247 15.3799C9.14933 15.4902 9.36299 15.5599 9.57287 15.5388C9.99227 15.4967 10.236 15.2069 10.4612 14.9016L10.4752 14.8827L14.2865 8.3966L14.2896 8.3912C14.3808 8.2265 14.4469 8.06036 14.5034 7.89944C14.7647 7.26029 14.8993 6.57645 14.8996 5.88596C14.8996 2.9264 12.466 0.5 9.49997 0.5ZM9.49997 1.4C11.9757 1.4 13.9996 3.41924 13.9996 5.88596C13.9995 6.46209 13.887 7.03268 13.6684 7.56572L13.6639 7.57688L13.6599 7.58858C13.6126 7.72484 13.5611 7.8485 13.5017 7.95578L9.72911 14.3757C9.56225 14.5954 9.44561 14.6475 9.48305 14.6435C9.50231 14.6417 9.52013 14.6568 9.47891 14.6295C9.43949 14.6034 9.35903 14.5269 9.26363 14.4052L5.83301 8.474L5.82095 8.45726C5.30381 7.72646 4.99961 6.8414 4.99961 5.88596C4.99961 3.41942 7.02425 1.4 9.49997 1.4ZM9.49997 2.813C7.79681 2.813 6.41927 4.18568 6.41927 5.88596C6.41927 7.58624 7.79699 8.95892 9.49997 8.95892C11.2029 8.95892 12.5799 7.58606 12.5799 5.88596C12.5799 4.18586 11.2029 2.813 9.49997 2.813ZM9.49997 3.713C10.727 3.713 11.6799 4.6643 11.6799 5.88596C11.6799 7.10762 10.7272 8.05892 9.49997 8.05892C8.27273 8.05892 7.31927 7.10744 7.31927 5.88596C7.31927 4.6643 8.27291 3.713 9.49997 3.713Z" fill="#0078D4"/>
                    <path d="M6.62186 12.9307C4.07918 13.2899 2.30078 14.1494 2.30078 15.4147C2.30078 17.1189 5.27222 18.5004 9.50078 18.5004C13.7293 18.5004 16.7008 17.1189 16.7008 15.4147C16.7008 14.1494 14.9226 13.2899 12.3801 12.9307L12.0278 13.5304C13.9441 13.7963 15.2608 14.355 15.2608 15.0034C15.2608 15.9124 12.6819 16.6491 9.50078 16.6491C6.31964 16.6491 3.74078 15.9124 3.74078 15.0034C3.7406 14.3572 5.04866 13.799 6.97088 13.532L6.62186 12.9307Z" fill="#0078D4"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_2281_10206">
                      <rect width="18" height="18" fill="white" transform="translate(0.5 0.5)"/>
                    </clipPath>
                  </defs>
                </svg>
                  `)}`}
                  alt="test"
                />
                <select>
                  <option value="Gurgaon">Gurgaon</option>
                  {/* <option value="Noida">Noida</option>
                <option value="Delhi">Delhi</option> */}
                </select>

                <div className="search-section-box">
                  <ProjectNameSection
                    ProjectInputType={"Search"}
                    searchInput={true}
                    setrunSearchButton={setrunSearchButton}
                    inputClass={"hero-search-button"}
                    ProjectNameObjectData={ProjectNameObjectData}
                    setProjectNameObjectData={setProjectNameObjectData}
                    placeholder={"Search by Project name or society name"}
                  />
                  {/* <img
                    className="img-searchbar"
                    src={`data:image/svg+xml;utf8,${encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                  <path d="M10.5007 7.16634C11.3847 7.16634 12.2326 7.51753 12.8577 8.14265C13.4828 8.76777 13.834 9.61562 13.834 10.4997C13.834 11.3837 13.4828 12.2316 12.8577 12.8567C12.2326 13.4818 11.3847 13.833 10.5007 13.833C9.6166 13.833 8.76875 13.4818 8.14363 12.8567C7.51851 12.2316 7.16732 11.3837 7.16732 10.4997C7.16732 9.61562 7.51851 8.76777 8.14363 8.14265C8.76875 7.51753 9.6166 7.16634 10.5007 7.16634ZM3.04232 11.333H1.33398V9.66634H3.04232C3.41732 6.19134 6.19232 3.41634 9.66732 3.04134V1.33301H11.334V3.04134C14.809 3.41634 17.584 6.19134 17.959 9.66634H19.6673V11.333H17.959C17.584 14.808 14.809 17.583 11.334 17.958V19.6663H9.66732V17.958C6.19232 17.583 3.41732 14.808 3.04232 11.333ZM10.5007 4.66634C8.95356 4.66634 7.46982 5.28092 6.37586 6.37489C5.2819 7.46885 4.66732 8.95258 4.66732 10.4997C4.66732 12.0468 5.2819 13.5305 6.37586 14.6245C7.46982 15.7184 8.95356 16.333 10.5007 16.333C12.0477 16.333 13.5315 15.7184 14.6254 14.6245C15.7194 13.5305 16.334 12.0468 16.334 10.4997C16.334 8.95258 15.7194 7.46885 14.6254 6.37489C13.5315 5.28092 12.0477 4.66634 10.5007 4.66634Z" fill="#0078D4"/>
                </svg>
                  `)}`}
                    alt="tst"
                  /> */}

                  {/* <img src="/img/Search-icon.svg" alt="" className="img-searchbar" /> */}

                  <button
                    disabled={
                      GetAllPostLoading || GetProjectNameLoding ? true : false
                    }
                    className="search-button"
                    onClick={() => {
                      if (runSearchButton == false) {
                        return alert("Write correct ProjectName");
                      }
                      if (
                        runSearchButton == true &&
                        ProjectNameObjectData.ProjectName.length > 0
                      ) {
                        // setRedirectPath("/");
                        dispatch(
                          GetSingleProjectNameDataAction({
                            ProjectName:
                              ProjectNameObjectData.ProjectName.trim(),
                          })
                        );
                        dispatch(
                          GetAllPostAction({
                            ProjectName:
                              ProjectNameObjectData.ProjectName.trim(),
                            PropertyAdType: SearchPropertyAddType,
                          })
                        );

                        // navigate(
                        //   `home/card?Search=${ProjectNameObjectData.ProjectName.trim()}&PropertyType=${SearchPropertyAddType}`
                        // );
                      }
                    }}
                  >
                    <img
                      src="/img/Search-icon.svg"
                      alt=""
                      className="img-searchbar"
                    />
                  </button>

                  <button
                    disabled={
                      GetAllPostLoading || GetProjectNameLoding ? true : false
                    }
                    className="search-button-mob"
                    onClick={() => {
                      if (runSearchButton == false) {
                        return alert("Write correct ProjectName");
                      }
                      if (
                        runSearchButton == true &&
                        ProjectNameObjectData.ProjectName.length > 0
                      ) {
                        // setRedirectPath("/");
                        dispatch(
                          GetSingleProjectNameDataAction({
                            ProjectName:
                              ProjectNameObjectData.ProjectName.trim(),
                          })
                        );
                        dispatch(
                          GetAllPostAction({
                            ProjectName:
                              ProjectNameObjectData.ProjectName.trim(),
                            PropertyAdType: SearchPropertyAddType,
                          })
                        );

                        // navigate(
                        //   `home/card?Search=${ProjectNameObjectData.ProjectName.trim()}&PropertyType=${SearchPropertyAddType}`
                        // );
                      }
                    }}
                  >
                    <img
                      src="/img/Search-icon.svg"
                      alt=""
                      className="img-searchbar"
                    />
                    {GetAllPostLoading || GetProjectNameLoding
                      ? "Searching"
                      : "Search"}
                  </button>
                </div>
              </div>
            </div>


            {/* <NavLink to={"/all-post"}  className="hero-section-all-post-button">all posts</NavLink> */}
            {/* <div className="property-section">
              Property Listing Section
              <div
                className="property-link"
                onClick={() => {
                  if (medata && medata.IsAuthenticated == true) {
                    navigate("/user/post");
                  } else {
                    setRedirectPath("/user/post");
                    navigate("/login");
                  }
                }}
              >
                <div className="property-card">
                  <div className="details">
                    <h3>
                      List your property <br /> here!
                    </h3>
                    <button className="btn-hero">I am an Owner</button>
                  </div>
                  <div className="arrow">
                    <span>&#x2192;</span>
                    <div className="icon">
                      <img
                        src="/img/needbuyer.svg"
                        alt="Property Listing Icon"
                      />
                    </div>
                  </div>
                </div>
              </div>

              Property Requirement Section

              <div
                ref={PropertyRequirementBtnRef.current[0]}
                className="property-card"
                onClick={() => {
                  if (medata && medata.IsAuthenticated == true) {
                    setshowPropertyRequirement(true);
                  } else {
                    setRedirectPath("/post-requirement");
                    navigate("/login");
                  }
                }}
              >
                <div className="details">
                  <h3>
                    Post your <br /> Requirement
                  </h3>
                  <button className="btn-hero"> I am a Buyer</button>
                </div>
                <div className="arrow"><span>&#x2192;</span></div>
                <div className="icon">
                  <img src="/img/Postreqire.svg" alt="Property Listing Icon" />
                </div>
              </div> */}
              {/* </a> */}
            {/* </div> */}
          </div>

        </div>
      </header>

      <div className="requirement-container">
          <img src="/img/overlay2.svg" alt=""  className="overlay-lines"/>
      <div className="requirement-overlay">
        </div>
        <div className="requirement-main">
              <div className="requirement-heading">
                <h2 className="requirement-heading-h2">
                  Tell us what you’re looking for, and we’ll notify you when we
                  find a match!
                </h2>
              
              <div  ref={PropertyRequirementBtnRef.current[0]}
                onClick={() => {
                  if (medata && medata.IsAuthenticated == true) {
                    setshowPropertyRequirement(true);
                  } else {
                    setRedirectPath("/post-requirement");
                    navigate("/login");
                  }
                }}  className="requirement-button">
                <button className="requirement-btn"><span className="requirement-span">SHARE YOUR REQUIREMENT</span></button>
              </div>
              </div>
              <div className="requirement-svg">
                <img src="/img/House4.svg" alt="house" srcset=""  className="requirement-img"/>
              </div>
              </div>
         
            </div>

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
          <LandLord />
          <PropertyDetailsForm />
          <RentAgreement />
          <RentalBanner />
          <VerifiedComponent />
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
