// PropertyFilters.js
import React, { useContext, useEffect, useRef, useState } from "react";
import "./card.css";
import HomeCard from "../HomeCard";
import { Helmet } from "react-helmet";
import { UserContext } from "../../CreateContext/CreateContext";
// import _ from "lodash";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  GetAllPostAction,
  GetSingleProjectNameDataAction,
} from "../../../Action/postAction";
import { useDispatch, useSelector } from "react-redux";
import HeaderCard from "./HeaderCard";
const PropertyFilters = () => {
  // const [Budget, setBudget] = useState(0);
  const path = useLocation();

  const previousValue = useRef(null);
  const [SelectedApartmentType, setSelectedApartmentType] = useState("");
  const [ConstructionStatus, setConstructionStatus] = useState("");
  const [postedBy, setPostedBy] = useState([]);
  const [purchaseType, setPurchaseType] = useState([]);
  const [FurnishingStatus, setFurnishingStatus] = useState("");
  const [Filter, setFilter] = useState({});
  const [removeFilterField, setremoveFilterField] = useState(false);
  const [isClicked, setIsClicked] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const handleCheckboxChange = (event, setter) => {
    const { name, checked } = event.target;
    setter((prev) =>
      checked ? [...prev, name] : prev.filter((item) => item !== name)
    );
  };
  const { data } = useSelector((state) => {
    return state.GetAllPost;
  });
  // console.log(data);

  const handleClicked = (v) => {
    setIsClicked(v);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isFirstLoad, setIsFirstLoad] = useState(false);
  const [isRefreshed, setIsRefreshed] = useState(false);
  const [message, setMessage] = useState("");
  const { setRedirectPath, RedirectPath, setRedirectPathIsHomeCard } =
    useContext(UserContext);

  const { loading, data: GetAllPostData } = useSelector((state) => {
    return state.GetAllPost;
  });

  const { data: SingleProjectData } = useSelector((state) => {
    return state.SingleProjectName;
  });

  // Replace your current modal close handler with this
  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setIsClosing(false);
    }, 300); // Match this timeout with your animation duration
  };
  // eslint-disable-next-line
  const [querry, setquerry] = useSearchParams();

  useEffect(() => {
    if (Object.keys(Filter).length > 0 || removeFilterField == true) {
      dispatch(
        GetAllPostAction({
          ProjectName: querry.get("ProjectName"),
          PropertyAdType: querry.get("PropertyAddType"),
          BHK: Filter.BHK,
          ApartmentType: Filter.ApartmentType,
          PropertyStatus: undefined,
          Furnishing: Filter.Furnishing,
        })
      );
    }

    // eslint-disable-next-line
  }, [Filter, querry]);

  useEffect(() => {
    if (!querry.get("ProjectName") || !querry.get("PropertyAddType")) {
      return navigate("/");
    } else {
      // Check if it is the first page load
      if (!sessionStorage.getItem("isFirstLoad")) {
        sessionStorage.setItem("isFirstLoad", "true");
        dispatch(
          GetSingleProjectNameDataAction({
            ProjectName: querry.get("ProjectName"),
          })
        );
        dispatch(
          GetAllPostAction({
            ProjectName: querry.get("ProjectName"),
            PropertyAdType: querry.get("PropertyAddType"),
          })
        );
      }

      // Detect page refresh
      if (sessionStorage.getItem("isReloaded")) {
        sessionStorage.removeItem("isReloaded");


        dispatch(
          GetSingleProjectNameDataAction({
            ProjectName: querry.get("ProjectName"),
          })
        );
        dispatch(
          GetAllPostAction({
            ProjectName: querry.get("ProjectName"),
            PropertyAdType: querry.get("PropertyAddType"),
          })
        );
      }

      // Handle page unload event for refresh detection
      const handleBeforeUnload = () => {
        if (sessionStorage.getItem("isFirstLoad")) {
          sessionStorage.setItem("isReloaded", "true");
        }
      };

      window.addEventListener("beforeunload", handleBeforeUnload);
      // setRedirectPath(location.pathname);
      // setRedirectPath(location.pathname);
      setRedirectPathIsHomeCard(true);
      // Cleanup event listeners on component unmount
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
        sessionStorage.removeItem("isFirstLoad");
      };
    }
  }, []);

  const bhkOptions = [1, 2, 3, 4, 5];
  const ApartmentTypeOptions = [
    "Apartment",
    "Independent House/Villa",
    "Independent/Builder Floor",
    "1 RK/Studio Apartment",
    "Serviced Apartment",
    "Plot/Land",
  ];
  const ConstructionStatusOptions = ["Ready to move", "Under Construction"];
  const postedByOptions = ["Owner", "Builder", "Our Team"];
  const purchaseTypeOptions = ["Sale", "New Booking"];
  const FurnishingOptions = ["Furnished", "Semi-Furnished", "Un-Furnished"];
  const PropertyAdTypeArray = ["Sale", "Rent"];

  // handle window.history button
  useEffect(() => {
    const handlePopState = (event) => {
      // Prevent the back/forward action by pushing the current state again
      // window.history.pushState(null, null, window.location.href);
      navigate("/");
    };

    // Add the event listener for popstate
    window.addEventListener("popstate", handlePopState);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []); // Empty dependency array ensures this effect runs once on mount and unmount
   
  return (
    <>
      <div className="property-post-filters-main-box">
        <Helmet>
          <title>{`${SingleProjectData?.SingleProjectName?.["Project Name"]} - ${SingleProjectData?.SingleProjectName?.["Apartment Type"]},${SingleProjectData?.SingleProjectName?.City} | Premium Living in ${SingleProjectData?.SingleProjectName?.Locality} `}</title>
          <meta
            name="description"
            content={`Discover your dream ${SingleProjectData?.SingleProjectName?.["Apartment Type"]} at ${SingleProjectData?.SingleProjectName?.["Project Name"]} in ${SingleProjectData?.SingleProjectName?.Locality}, ${SingleProjectData?.SingleProjectName?.City}. Located in ${SingleProjectData?.SingleProjectName.Sector}, this modern apartment offers spacious living with top-tier amenities. Enjoy easy access to key transport routes, shopping, schools, and more. With its prime location in Gurgaon, Sunrise Heights provides the perfect balance of comfort, convenience, and luxury. Don’t miss out on this exceptional opportunity!`}
          ></meta>
          {/* <link rel="canonical" href="https://www.propertydekho247.com/home/card?ProjectName=DLF%20The%20Primus&&PropertyAddType=Sale" /> */}
        </Helmet>
        <div className="property-post-filters-box">
          <aside className="property-filters">
            <div className="allpost-clear-filter-title">
              <h2 className="filter-title-1">Filter Your Search</h2>

              <div
                className="allpost-clear-filter"
                onClick={() => {
                  dispatch(
                    GetAllPostAction({
                      ProjectName: querry.get("ProjectName"),
                      PropertyAdType: querry.get("PropertyAddType"),
                      BHK: "",
                      ApartmentType: "",
                      PropertyStatus: undefined,
                      Furnishing: "",
                    })
                  );
                  setFilter({});
                }}
              >
                Clear Filter <img src="/img/clear-filter.svg" alt="" />
              </div>
            </div>
            <div className="filter-title">
              <h2 className="filter-title-1">Filter Your Search</h2>
              {/* <p className="filter-title-1">clear Filter</p> */}
            </div>

            <div className="filter-dummyLine"></div>
            <div className="flex">
              <div className="filter-Lookin-for">
                <p className="looking-for-data">I am looking for</p>
                {PropertyAdTypeArray.map((text) => {
                  return (
                    <button
                      onClick={() => {
                        setquerry({
                          ProjectName: querry.get("ProjectName"),
                          PropertyAddType: `${text}`,
                        });
                        setremoveFilterField(true);
                      }}
                      className={`bhk-option ${
                        querry.get("PropertyAddType") == text ? "selected" : ""
                      }`}
                    >
                      {text}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="filter-dummyLine"></div>

            {/* Budget Filter */}
            {/* <div className="filter-group">
            <h3>Budget</h3>
            <input
              style={{ cursor: "pointer", opacity: Budget == 0 ? "0.5" : "1" }}
              type="range"
              min="0"
              max="100"
              step={5}
              value={Budget}
              onChange={(e) => {
                // setquerry({ Search: "" });

                debouncedSetBudget(e.target.value);
                // setBudget(e.target.value)
              }}
              className="Budget-slider"
            />
            <span>{Budget} </span>
          </div> */}

            {/* BHK Filter */}
            <div className="filter-group">
              <h3>BHK</h3>
              <div className="button-section">
                {bhkOptions.map((bhk, i) => (
                  <button
                    key={i}
                    className={`bhk-option ${
                      Filter.BHK === bhk ? "selected" : ""
                    }`}
                    onClick={() => {
                      if (Filter.BHK === bhk) {
                        const { BHK, ...Filterrest } = Filter;
                        setFilter(Filterrest);
                        setremoveFilterField(true);
                      } else {
                        setFilter({ ...Filter, BHK: bhk });
                      }
                    }}
                  >
                    {bhk} BHK{" "}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-dummyLine"></div>

            {/* Property Status Filter */}
            <div className="filter-group">
              <h3>Property Status</h3>
              <div className="Property-Status">
                {ApartmentTypeOptions.map((apartmenttype, i) => {
                  return (
                    <React.Fragment key={i}>
                      <div className="filter-box-main">
                        <input
                          id={`${apartmenttype}${i}`}
                          value={apartmenttype}
                          type="Checkbox"
                          name="Property-Status"
                          onChange={() => {}} // Add this to suppress the warning
                          checked={Filter.ApartmentType === apartmenttype}
                          onClick={(e) => {
                            if (Filter.ApartmentType === apartmenttype) {
                              const { ApartmentType, ...Filterrest } = Filter;
                              setFilter(Filterrest);
                              setremoveFilterField(true);
                            } else {
                              setFilter({
                                ...Filter,
                                ApartmentType: apartmenttype,
                              });
                            }
                          }}
                        />
                        <label htmlFor={`${apartmenttype}${i}`}>
                          {apartmenttype}
                        </label>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
            <div className="filter-dummyLine"></div>

            {/* Construction Status Filter */}
            {/* {querry.get("PropertyType") === "Sale" && (
            <div className="filter-group">
              <h3>Construction Status</h3>
              <div className="Property-Status">
                {ConstructionStatusOptions.map((status, i) => (
                  <React.Fragment key={i}>
                    <div className="Con-status">
                      <input
                        id={`${status}${i}`}
                        value={status}
                        type="radio"
                        name="Property-Construction-Status"
                        onChange={() => {}} // Add this to suppress the warning
                        checked={ConstructionStatus === status}
                        onClick={(e) => {
                          if (ConstructionStatus === status) {
                            setConstructionStatus(null); // Deselect if same radio button is clicked
                          } else {
                            setConstructionStatus(status); // Set selected apartment type
                          }
                          // setquerry({ Search: "" });
                        }}
                      />

                      <label htmlFor={`${status}${i}`}>{status}</label>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          )} */}

            {/* Posted By Filter
          <div className="filter-group">
            <h3>Posted by</h3>
            <div className="Postedby">
              {postedByOptions.map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    name={option}
                    checked={postedBy.includes(option)}
                    onChange={(e) => handleCheckboxChange(e, setPostedBy)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div> */}

            {/* Purchase Type Filter
          <div className="filter-group">
            <h3>Purchase Type</h3>
            <div className="Postedby">
              {purchaseTypeOptions.map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    name={option}
                    checked={purchaseType.includes(option)}
                    onChange={(e) => handleCheckboxChange(e, setPurchaseType)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div> */}

            {/* Furnishing Status Filter */}
            <div className="filter-group">
              <h3>Furnishing Status</h3>
              <div className="button-section">
                <div className="Furnishing Status button-section">
                  {FurnishingOptions.map((option) => (
                    <button
                      key={option}
                      className={`  ${
                        Filter.Furnishing === option
                          ? " selected"
                          : "bhk-option-1"
                      }`}
                      onClick={() => {
                        handleClicked();
                        if (Filter.Furnishing === option) {
                          setFurnishingStatus(null);
                          const { Furnishing, ...Filterrest } = Filter;
                          setFilter(Filterrest);
                          setremoveFilterField(true);
                        } else {
                          // setFurnishingStatus(option);
                          setFilter({ ...Filter, Furnishing: option });
                        }
                        // setquerry({ Search: "" });
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {/* {bhkOptions.map((bhk, i) => (
                <button
                  key={i}
                  className={`bhk-option ${
                    SelectedBHK === bhk ? "selected" : ""
                  }`}
                  onClick={() => {
                    if (SelectedBHK === bhk) {
                     
                      
                    } else {
               
                      
                    }
                    setquerry({ Search: "" });
                  }}
                >
                  {bhk} BHK{" "}
                </button>
              ))} */}
              </div>
            </div>
            <div className="filter-dummyLine"></div>
          </aside>
          <div>
            <HeaderCard />
            <div className="filter-home-card">
              <div className="total-post-length-container">
                <p className="total-post-lable-allpost">
                  Showing {data?.allPost?.length} Lisitng
                </p>

                <button
                  className="all-post-filter-button"
                  onClick={() => setShowModal(true)}
                >
                  Filter
                </button>
              </div>
              <HomeCard />
            </div>
          </div>
          {/* Modal */}
          {showModal && (
            <div
              className={`all-post-filter-overlay  ${
                isClosing ? "closing" : ""
              }`}
              onClick={closeModal}
            >
              <div
                className="all-post-filter-content"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="all-post-filter-modal">
                  {/* Property Type Filter */}
                  <div className="filter-group">
                    <div className="allpost-clear-filter-title-2">
                      <h2 className="">Filter Your Search</h2>

                      <div
                        className="allpost-clear-filter"
                        onClick={() => {
                          dispatch(
                            GetAllPostAction({
                              ProjectName: querry.get("ProjectName"),
                              PropertyAdType: querry.get("PropertyAddType"),
                              BHK: "",
                              ApartmentType: "",
                              PropertyStatus: undefined,
                              Furnishing: "",
                            })
                          );
                          setFilter({});
                        }}
                      >
                        Clear Filter <img src="/img/clear-filter.svg" alt="" />
                      </div>
                    </div>

                    <div className="button-section">
                      {PropertyAdTypeArray.map((text) => (
                        <button
                          key={text}
                          onClick={() => {
                            setquerry({
                              ProjectName: querry.get("ProjectName"),
                              PropertyAddType: `${text}`,
                            });
                            setremoveFilterField(true);
                          }}
                          className={`bhk-option ${
                            querry.get("PropertyAddType") === text
                              ? "selected"
                              : ""
                          }`}
                        >
                          {text}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* BHK Filter */}
                  <div className="filter-group">
                    <h3>BHK</h3>
                    <div className="button-section">
                      {bhkOptions.map((bhk, i) => (
                        <button
                          key={i}
                          className={`bhk-option ${
                            Filter.BHK === bhk ? "selected" : ""
                          }`}
                          onClick={() => {
                            if (Filter.BHK === bhk) {
                              const { BHK, ...Filterrest } = Filter;
                              setFilter(Filterrest);
                              setremoveFilterField(true);
                            } else {
                              setFilter({ ...Filter, BHK: bhk });
                            }
                          }}
                        >
                          {bhk} BHK
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Property Status Filter */}
                  <div className="filter-group">
                    <h3>Property Status</h3>
                    <div className="button-section">
                      {ApartmentTypeOptions.map((apartmenttype, i) => (
                        <div
                          key={i}
                          className={`bhk-option  ${
                            Filter.ApartmentType === apartmenttype
                              ? "selected"
                              : ""
                          } `}
                          name="Property-Status"
                          onChange={() => {}}
                          onClick={() => {
                            if (Filter.ApartmentType === apartmenttype) {
                              const { ApartmentType, ...Filterrest } = Filter;
                              setFilter(Filterrest);
                              setremoveFilterField(true);
                            } else {
                              setFilter({
                                ...Filter,
                                ApartmentType: apartmenttype,
                              });
                            }
                          }}
                        >
                          {apartmenttype}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Furnishing Status Filter */}
                  <div className="filter-group">
                    <h3>Furnishing Status</h3>
                    <div className="button-section">
                      {FurnishingOptions.map((option) => (
                        <button
                          key={option}
                          className={`bhk-option ${
                            Filter.Furnishing === option
                              ? "selected"
                              : "bhk-option-1"
                          }`}
                          onClick={() => {
                            handleClicked();
                            if (Filter.Furnishing === option) {
                              setFurnishingStatus(null);
                              const { Furnishing, ...Filterrest } = Filter;
                              setFilter(Filterrest);
                              setremoveFilterField(true);
                            } else {
                              setFilter({ ...Filter, Furnishing: option });
                            }
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="all-post-filter-close" onClick={closeModal}>
                  Close
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PropertyFilters;
