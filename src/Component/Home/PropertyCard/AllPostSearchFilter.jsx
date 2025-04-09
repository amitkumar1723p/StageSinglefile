import React, { useContext, useEffect, useState } from "react";
import "./card.css";
import HomeCard from "../HomeCard";
import { UserContext } from "../../CreateContext/CreateContext";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { GetAllPostAction } from "../../../Action/postAction";
import { useDispatch, useSelector } from "react-redux";
import HeaderCard from "./HeaderCard";

const AllPostSearchFilter = () => {
  const [Filter, setFilter] = useState({});
  const [removeFilterField, setRemoveFilterField] = useState(false);
  const [isClicked, setIsClicked] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [FurnishingStatus, setFurnishingStatus] = useState("");
  const [preventScroll,setPreventScroll] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setRedirectPathIsHomeCard } = useContext(UserContext);

  const { data } = useSelector((state) => state.GetAllPost);

  // Store query parameters when they change
  useEffect(() => {
    const projectName = searchParams.get("ProjectName");
    const propertyAddType = searchParams.get("PropertyAddType");
    
    if (projectName) {
      sessionStorage.setItem("lastProjectName", projectName);
      sessionStorage.setItem("lastPropertyAddType", propertyAddType || "");
    }
  }, [searchParams]);

  // Handle navigation and restore query parameters
  useEffect(() => {
    const currentProjectName = searchParams.get("ProjectName");
    
    if (!currentProjectName) {
      const lastProjectName = sessionStorage.getItem("lastProjectName");
      const lastPropertyAddType = sessionStorage.getItem("lastPropertyAddType");
      
      if (lastProjectName) {
        const queryParams = new URLSearchParams();
        queryParams.set("ProjectName", lastProjectName);
        if (lastPropertyAddType) {
          queryParams.set("PropertyAddType", lastPropertyAddType);
        }
        navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
        return;
      }
    }

    if (currentProjectName && !data) {
      dispatch(
        GetAllPostAction({
          ProjectName: currentProjectName,
          PropertyAdType: searchParams.get("PropertyAddType"),
        })
      );
    }

    setRedirectPathIsHomeCard(true);
  }, [location.pathname, searchParams]);

  useEffect(() => {
    if (Object.keys(Filter).length > 0 || removeFilterField) {
      dispatch(
        GetAllPostAction({
          ProjectName: searchParams.get("ProjectName"),
          PropertyAdType: searchParams.get("PropertyAddType"),
          BHK: Filter.BHK,
          ApartmentType: Filter.ApartmentType,
          PropertyStatus: undefined,
          Furnishing: Filter.Furnishing,
        })
      );
    }
  }, [Filter, searchParams]);

  const handleClicked = (v) => {
    setIsClicked(v);
  };

  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle modal
  

  // Disable scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = ""; // Cleanup on unmount
    };
  }, [isOpen]);


  const closeModal = () => {
    setIsOpen(false);

    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setIsClosing(false);
    }, 300);
  };

  const bhkOptions = [1, 2, 3, 4, 5];
  const ApartmentTypeOptions = [
    "Apartment",
    "Independent House/Villa",
    "Independent/Builder Floor",
    "1 RK/Studio Apartment",
    "Serviced Apartment",
    "Plot/Land",
  ];
  const FurnishingOptions = ["Furnished", "Semi-Furnished", "Un-Furnished"];
  const PropertyAdTypeArray = ["Sale", "Rent"];

  return (
    <>
      <div className="property-post-filters-main-box">
        <div className="property-post-filters-box">
          <aside className="property-filters">
            <div className="allpost-clear-filter-title">
              <h2 className="filter-title-1">Filter Your Search</h2>
              <div className='allpost-clear-filter' onClick={() => {
                dispatch(
                  GetAllPostAction({
                    ProjectName: searchParams.get("ProjectName"),
                    PropertyAdType: searchParams.get("PropertyAddType"),
                    BHK: "",
                    ApartmentType: "",
                    PropertyStatus: undefined,
                    Furnishing: "",
                  })
                );
                setFilter({});
              }}>Clear Filter <img src="/img/clear-filter.svg" alt="" /></div>
            </div>

            <div className="filter-dummyLine"></div>
            <div className="flex">
              <div className="filter-Lookin-for">
                <p className="looking-for-data">I am looking for</p>
                {PropertyAdTypeArray.map((text) => (
                  <button
                    key={text}
                    onClick={() => {
                      setSearchParams({
                        ProjectName: searchParams.get("ProjectName"),
                        PropertyAddType: text,
                      });
                      setRemoveFilterField(true);
                    }}
                    className={`bhk-option ${searchParams.get("PropertyAddType") === text ? "selected" : ""}`}
                  >
                    {text}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-dummyLine"></div>

            <div className="filter-group">
              <h3>BHK</h3>
              <div className="button-section">
                {bhkOptions.map((bhk, i) => (
                  <button
                    key={i}
                    className={`bhk-option ${Filter.BHK === bhk ? "selected" : ""}`}
                    onClick={() => {
                      if (Filter.BHK === bhk) {
                        const { BHK, ...Filterrest } = Filter;
                        setFilter(Filterrest);
                        setRemoveFilterField(true);
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

            <div className="filter-dummyLine"></div>

            <div className="filter-group">
              <h3>Property Status</h3>
              <div className="Property-Status">
                {ApartmentTypeOptions.map((apartmenttype, i) => (
                  <React.Fragment key={i}>
                    <div className="filter-box-main">
                      <input
                        id={`${apartmenttype}${i}`}
                        value={apartmenttype}
                        type="Checkbox"
                        name="Property-Status"
                        onChange={() => {}}
                        checked={Filter.ApartmentType === apartmenttype}
                        onClick={() => {
                          if (Filter.ApartmentType === apartmenttype) {
                            const { ApartmentType, ...Filterrest } = Filter;
                            setFilter(Filterrest);
                            setRemoveFilterField(true);
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
                ))}
              </div>
            </div>

            <div className="filter-dummyLine"></div>

            <div className="filter-group">
              <h3>Furnishing Status</h3>
              <div className="button-section">
                <div className="Furnishing Status button-section">
                  {FurnishingOptions.map((option) => (
                    <button
                      key={option}
                      className={`${Filter.Furnishing === option ? "selected" : "bhk-option-1"}`}
                      onClick={() => {
                        handleClicked();
                        if (Filter.Furnishing === option) {
                          setFurnishingStatus(null);
                          const { Furnishing, ...Filterrest } = Filter;
                          setFilter(Filterrest);
                          setRemoveFilterField(true);
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

            <div className="filter-dummyLine"></div>
          </aside>

          <div>
            <HeaderCard />
            {/* <div>
              <img src="/img/VerfiledProperty.jpg" alt="VerfiledProperty" />
            </div> */}
            <div className="filter-home-card">
              <div className='total-post-length-container'>
                <p className='total-post-lable-allpost'>
                  Total result {data?.allPost?.length}
                </p>
                <button className="all-post-filter-button" onClick={() =>{ setShowModal(true);
                  setIsOpen(true)
                }}>filter</button>
              </div>
              <HomeCard />
            </div>
          </div>

          {/* Modal */}
          {showModal && (
            <div className={`all-post-filter-overlay ${isClosing ? 'closing' : ''}`} onClick={closeModal}>
              <div className="all-post-filter-content" onClick={(e) => e.stopPropagation()}>
                <div className="all-post-filter-modal">
                  <div className="filter-group">
                    <div className="allpost-clear-filter-title-2">
                      <h2>Filter Your Search</h2>
                      <div className='allpost-clear-filter' onClick={() => {
                        dispatch(
                          GetAllPostAction({
                            ProjectName: searchParams.get("ProjectName"),
                            PropertyAdType: searchParams.get("PropertyAddType"),
                            BHK: "",
                            ApartmentType: "",
                            PropertyStatus: undefined,
                            Furnishing: "",
                          })
                        );
                        setFilter({});
                      }}>Clear Filter <img src="/img/clear-filter.svg" alt="" /></div>
                    </div>

                    <div className="button-section">
                      {PropertyAdTypeArray.map((text) => (
                        <button
                          key={text}
                          onClick={() => {
                            setSearchParams({
                              ProjectName: searchParams.get("ProjectName"),
                              PropertyAddType: text,
                            });
                            setRemoveFilterField(true);
                          }}
                          className={`bhk-option ${searchParams.get("PropertyAddType") === text ? "selected" : ""}`}
                        >
                          {text}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="filter-group">
                    <h3>BHK</h3>
                    <div className="button-section">
                      {bhkOptions.map((bhk, i) => (
                        <button
                          key={i}
                          className={`bhk-option ${Filter.BHK === bhk ? "selected" : ""}`}
                          onClick={() => {
                            if (Filter.BHK === bhk) {
                              const { BHK, ...Filterrest } = Filter;
                              setFilter(Filterrest);
                              setRemoveFilterField(true);
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

                  <div className="filter-group">
                    <h3>Property Status</h3>
                    <div className="button-section">
                      {ApartmentTypeOptions.map((apartmenttype, i) => (
                        <div 
                          key={i} 
                          className={`bhk-option ${Filter.ApartmentType === apartmenttype ? "selected" : ""}`}
                          onClick={() => {
                            if (Filter.ApartmentType === apartmenttype) {
                              const { ApartmentType, ...Filterrest } = Filter;
                              setFilter(Filterrest);
                              setRemoveFilterField(true);
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

                  <div className="filter-group">
                    <h3>Furnishing Status</h3>
                    <div className="button-section">
                      {FurnishingOptions.map((option) => (
                        <button
                          key={option}
                          className={`bhk-option ${Filter.Furnishing === option ? "selected" : "bhk-option-1"}`}
                          onClick={() => {
                            handleClicked();
                            if (Filter.Furnishing === option) {
                              setFurnishingStatus(null);
                              const { Furnishing, ...Filterrest } = Filter;
                              setFilter(Filterrest);
                              setRemoveFilterField(true);
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
                <div className="all-post-filter-close" onClick={closeModal}>Close</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllPostSearchFilter;