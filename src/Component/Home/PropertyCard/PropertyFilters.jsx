import React, { useContext, useEffect, useRef, useState } from "react";
import "./card.css";
import HomeCard from "../HomeCard";
import { UserContext } from "../../CreateContext/CreateContext";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { GetAllPostAction, GetSingleProjectNameDataAction } from "../../../Action/postAction";
import { useDispatch, useSelector } from "react-redux";
import HeaderCard from "./HeaderCard";
import { filter } from "lodash";
import { formatPrice } from "../../../utils/CommonFunction";
import { FileTerminal, FilterIcon, FilterX, FilterXIcon } from "lucide-react";

const AllPostSearchFilter = () => {
  const [Filter, setFilter] = useState({});
  const [removeFilterField, setRemoveFilterField] = useState(false);
  const [isClicked, setIsClicked] = useState(null);
  const [allData, setAllData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { setRedirectPathIsHomeCard } = useContext(UserContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const FurnishingOptions = ["Furnished", "Semi-Furnished", "Un-Furnished"];
  const PropertyAdTypeArray = ["Sale", "Rent"];
  const [rawValue, setRawValue] = useState(500000000); // value from slider
  const [value, setValue] = useState(500000000);       // debounced value
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [filterData, setFilterData] = useState({ BuySell: searchParams.get("PropertyAddType") });
  const searchInputRef = useRef(null);
  const typeRef = useRef(null);
  const budgetRef = useRef(null);
  const bhkRef = useRef(null);
  const statusRef = useRef(null);
  const localityRef = useRef(null);
  const furnishingRef = useRef(null);
  const sortByRef = useRef(null);

  const { data } = useSelector((state) => state.GetAllPost);
   
  useEffect(() => {
    if (!data?.allPost) return;
  
    const filtered = [...data.allPost];
    const isSale = searchParams.get("PropertyAddType") === "Sale";
  
    switch (filterData.SortBy) {
      case 'Price Low to High':
        filtered.sort((a, b) => {
          const aPrice = isSale ? a?.PricingDetails?.ExpectedPrice : a?.PricingDetails?.ExpectedRent;
          const bPrice = isSale ? b?.PricingDetails?.ExpectedPrice : b?.PricingDetails?.ExpectedRent;
          return (aPrice ?? 0) - (bPrice ?? 0);
        });
        break;
  
      case 'Price High to Low':
        filtered.sort((a, b) => {
          const aPrice = isSale ? a?.PricingDetails?.ExpectedPrice : a?.PricingDetails?.ExpectedRent;
          const bPrice = isSale ? b?.PricingDetails?.ExpectedPrice : b?.PricingDetails?.ExpectedRent;
          return (bPrice ?? 0) - (aPrice ?? 0);
        });
        break;
  
      case 'Newest First':
        filtered.sort((a, b) => {
          const aDate = isSale ? a?.BasicDetails?.PostedOn : a?.createAt;
          const bDate = isSale ? b?.BasicDetails?.PostedOn : b?.createAt;
          return new Date(bDate ?? 0) - new Date(aDate ?? 0);
        });
        break;
  
      default:
        break;
    }
  
    setAllData(() => {
      return filtered;
    });
  }, [data, filterData.SortBy, searchParams]);

  // Fetch single project data if ProjectName is available in URL
  useEffect(() => {
    const projectName = searchParams.get("ProjectName");
    if (projectName) {
      dispatch(
        GetSingleProjectNameDataAction({ ProjectName: projectName.replaceAll("-", " ") })
      );
    }
  }, [searchParams, dispatch]);

  // Store query parameters in session storage
  useEffect(() => {
    const queryParams = ["ProjectName", "PropertyAddType", "sector", "city", "locality"];
    queryParams.forEach((param) => {
      const value = searchParams.get(param) || "";
      sessionStorage.setItem(`last${param}`, value);
    });
  }, [searchParams]);

  // MERGED FETCH LOGIC: Combined the two useEffects to avoid duplicate dispatch calls
  useEffect(() => {
    const currentProjectName = searchParams.get("ProjectName")?.replaceAll("-", " ");
    const currentPropertyAddType = searchParams.get("PropertyAddType");
    const currentSector = searchParams.get("sector")?.replaceAll("-", " ");
    const currentCity = searchParams.get("city")?.replaceAll("-", " ");
    const currentLocality = searchParams.get("locality")?.replaceAll("-", " ");
    
    // Initial load or URL params change
    if ((currentProjectName || currentCity || currentSector || currentLocality || currentPropertyAddType) || 
        Object.keys(filterData).length > 0 || removeFilterField) {
      
      let payload = {
        ProjectName: currentProjectName,
        PropertyAdType: currentPropertyAddType,
        City: currentCity,
        Sector: currentSector,
        // Use URL locality param if available, otherwise use the filter locality
        Locality:   filterData?.Locality || currentLocality,
        // Add filter parameters
        BHK: filterData?.BHK?.[0],
        ApartmentType: filterData?.ApartmentType,
        PropertyStatus: filterData?.Status,
        Furnishing: filterData?.Furnishing,
        Verified: filterData?.Verified,
        Budget: value,
      };
      
      dispatch(GetAllPostAction(payload));
    }

    setRedirectPathIsHomeCard(true);
    window.scrollTo(0, 0);
  }, [filterData, searchParams, dispatch, removeFilterField, value]);

  const ApartmentTypeOptions = [
    "Apartment",
    "Independent House/Villa",
    "Independent/Builder Floor",
    "1 RK/Studio Apartment",
    "Serviced Apartment",
    "Plot/Land",
    "Pent House",
  ];
  

  const handleSelect = (category, value) => {
    if (!value) return;
    const exists = activeFilters.find(filter => filter.category === category && filter.value === value);
    if (!exists) {
      const updatedFilters = [...activeFilters.filter(filter => filter.category !== category), { category, value }];
      setActiveFilters(updatedFilters);
      setFilterData(prev => ({ ...prev, [category]: value }));
    }
  };

  const handleToggleChip = (category, value) => {
    const exists = activeFilters.find(filter => filter.category === category && filter.value === value);
    if (exists) {
      removeFilter(value);
    } else {
      setActiveFilters(prev => [...prev, { category, value }]);
      setFilterData(prev => ({ ...prev, [category]: value }));
    }
  };

  const removeFilter = (value) => {
    const updatedFilters = activeFilters.filter(filter => filter.value !== value);
    setActiveFilters(updatedFilters);
    const updatedFilterData = { ...filterData };
    for (const key in updatedFilterData) {
      if (updatedFilterData[key] === value) {
        delete updatedFilterData[key];
      }
    }
    setFilterData(updatedFilterData);
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setFilterData({ BuySell: searchParams?.get("PropertyAddType") });
    if (searchInputRef.current) searchInputRef.current.value = '';
    if (typeRef.current) typeRef.current.value = '';
    if (budgetRef.current) budgetRef.current.value = '';
    if (bhkRef.current) bhkRef.current.value = '';
    if (statusRef.current) statusRef.current.value = '';
    if (localityRef.current) localityRef.current.value = '';
    if (furnishingRef.current) furnishingRef.current.value = '';
    if (sortByRef.current) sortByRef.current.value = '';
  };

  const isChipActive = (category, value) => {
    return activeFilters.some(filter => filter.category === category && filter.value === value);
  };
  


  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(rawValue);
    }, 150); // debounce delay

    return () => clearTimeout(timer); // cleanup on re-render
  }, [rawValue]);

  const handleChange = (e) => {
    setRawValue(Number(e.target.value));
  };

 
  
   

  return (
    <>
      <div className="property-post-filters-main-box">
        <div className="property-post-filters-box">

           <div class=" accordion property-filter-parent-mob " id="accordionExample">
                  <div class="accordion-item custon-accordian-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"><FilterIcon />
                        Filter &nbsp; &nbsp; {activeFilters.length>0 && <>{ activeFilters.length } Applied filter</>}
                      </button>
        
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    
                      <div class="accordion-body">     
    

    <div className="property-filter-search-row">
    <div className="property-filter-budget">
     
     <label htmlFor="moneySlider" className="slider-label">Budget:</label>
     <div className="budget-filter-parent">
 
     <input
       type="range"
       id="moneySlider"
       min={100000}
       max={500000000}
       step={100000}
       value={value}
       onChange={handleChange}
       className="slider-input"
     />
    
     <div className="slider-value">
       {formatPrice(value)}
     </div>
     </div>
 
   </div>
      {/* <input type="text" placeholder="Enter city, locality or project" onChange={(e)=>{setQuery(e.target.value)}} className="property-filter-search-input" /> */}
    
    <div className="property-filter-type-mob">
      
      <select ref={typeRef} onChange={(e) => handleSelect('ApartmentType', e.target.value)} className="property-filter-type" defaultValue="">
        <option value="" disabled>Property Type</option>
        {
          ApartmentTypeOptions.map((value)=>{
            return <option value={value}>
              {value}
            </option>
          })
        }
  

      </select>

 
      <div className="property-filter-toggle-mob">
   
                  {PropertyAdTypeArray.map((text) => (
                <button
                  key={text}
                  onClick={() => {
                    navigate(
                      `/home/card?${searchParams.get("ProjectName") ? `ProjectName=${encodeURIComponent(searchParams.get("ProjectName"))}` : ""}
                      ${searchParams.get("sector") ? `&sector=${encodeURIComponent(searchParams.get("sector"))}` : ""}
                      ${searchParams.get("city") ? `&city=${encodeURIComponent(searchParams.get("city"))}` : ""}
                      ${searchParams.get("locality") ? `&locality=${encodeURIComponent(searchParams.get("locality"))}` : ""}
                      ${text ? `&PropertyAddType=${encodeURIComponent(text)}` : ""}`.replace(/\s+/g, "")
                    );
                    setRemoveFilterField(true);
                  }}
                  className={`property-filter-toggle-btn ${searchParams.get("PropertyAddType") === text ? "active" : ""}`}
                >
                  {text}
                </button>
                    ))}
               
    
    </div>

    </div>
  
     
    </div>

    <div className="property-filter-header">
   
  
    <div className="property-filter-options">
            <div className="property-select-div">

              <select className="property-filter-select" ref={bhkRef} onChange={(e) => handleSelect('BHK', e.target.value)} defaultValue="">
                <option value="" disabled>BHK</option>
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4 BHK">4 BHK</option>
              </select>
            </div>
              <div className="property-select-div">

              <select className="property-filter-select" ref={statusRef} onChange={(e) => handleSelect('Status', e.target.value)} defaultValue="">
                <option value="" disabled>Status</option>
                <option value="Ready to move">Ready to Move</option>
                <option value="Under Construction">Under Construction</option>
              </select>
              </div>

            <div className="property-select-div">

              <select className="property-filter-select" onChange={(e) => handleSelect('Locality', e.target.value)} defaultValue="">
                <option value="" disabled>Locality</option>
                <option value="New Gurgaon">New Gurgaon</option>
                <option value="Golf Course Extn Road">Golf Course</option>
                <option value="Southern Peripheral Road Gurgaon">SPR Road</option>
              </select>
            </div>

              <div className="property-select-div">

                            <select  className="property-filter-select" ref={furnishingRef} onChange={(e) => handleSelect('Furnishing', e.target.value)} defaultValue="">
                              <option value="" disabled>Furnishing</option>
                              <option value="Furnished">Furnished</option>
                              <option value="Semi-Furnished">Semi Furnished</option>
                              <option value="Un-Furnished">Unfurnished</option>
                            </select>
              </div>

              {/* <button
                onClick={() => handleToggleChip('Photos', 'With Photos')}
                className={`property-filter-chip ${isChipActive('Photos', 'With Photos') ? 'active-chip' : ''}`}
              >
                With Photos
              </button> */}
              <button
                onClick={() => handleToggleChip('Verified', 'Verified')}
                className={`property-filter-chip ${isChipActive('Verified', 'Verified') ? 'active-chip' : ''}`}
              >
                Verified
              </button>
              {/* <button
                onClick={() => handleToggleChip('Metro', 'Near Metro')}
                className={`property-filter-chip ${isChipActive('Metro', 'Near Metro') ? 'active-chip' : ''}`}
              >
                Near Metro
              </button> */}

                  <div className="property-select-div">
                  <select ref={sortByRef} onChange={(e) => handleSelect('SortBy', e.target.value)} className="property-filter-select" defaultValue="">
                <option value="" disabled>Sort By</option>
                <option value="Price Low to High">Price Low to High</option>
                <option value="Price High to Low">Price High to Low</option>
                <option value="Newest First">Newest First</option>
              </select>
                  </div>

   </div>

      
  
 
  </div>
 
    <div className="property-filter-active">
      <span className="property-filter-active-title">Active filters:</span>
      {activeFilters.map((filter, index) => (
        <span key={index} className="property-filter-tag">
          {filter.value} <button onClick={() => removeFilter(filter.value)}>&times;</button>
        </span>
      ))}
      {activeFilters.length > 0 && (
        <button className="property-filter-clear-btn" onClick={clearAllFilters}>Clear All</button>
      )}
      <span className="property-filter-count">{data?.allPost?.length} Properties Found</span>
    </div>
  </div>
                    </div>
                  </div>
        
                </div>

    {/* big screen filter */}

        <div className="property-filter-main-dev">
          
            <div className="property-filter-parent">
          

            <div className="property-filter-search-row">
              {/* <input type="text" placeholder="Enter city, locality or project" onChange={(e)=>{setQuery(e.target.value)}} className="property-filter-search-input" /> */}
           <div className="property-select-div-type">
           <select ref={typeRef} onChange={(e) => handleSelect('ApartmentType', e.target.value)} className="property-filter-select-type" defaultValue="">
                <option value="" disabled>Property Type</option>
                
                {
          ApartmentTypeOptions.map((value)=>{
            return <option value={value}>
              {value}
            </option>
          })
        }
              </select>
          
           </div>
              <div className="property-filter-budget">
            
            <label htmlFor="moneySlider" className="slider-label">Budget:</label>
            <div className="budget-filter-parent">

            <input
              type="range"
              id="moneySlider"
              min={100000}
              max={500000000}
              step={100000}
              value={value}
              onChange={handleChange}
              className="slider-input"
            />
          
            <div className="slider-value">
              {formatPrice(value)}
            </div>
            </div>

          </div>
          <div className="property-filter-toggle">
     
     {PropertyAdTypeArray.map((text) => (
   <button
     key={text}
     onClick={() => {
       navigate(
         `/home/card?${searchParams.get("ProjectName") ? `ProjectName=${encodeURIComponent(searchParams.get("ProjectName"))}` : ""}
         ${searchParams.get("sector") ? `&sector=${encodeURIComponent(searchParams.get("sector"))}` : ""}
         ${searchParams.get("city") ? `&city=${encodeURIComponent(searchParams.get("city"))}` : ""}
         ${searchParams.get("locality") ? `&locality=${encodeURIComponent(searchParams.get("locality"))}` : ""}
         ${text ? `&PropertyAddType=${encodeURIComponent(text)}` : ""}`.replace(/\s+/g, "")
       );
       
       
       //   ProjectName: searchParams.get("ProjectName") && searchParams.get("ProjectName"),
       //   city:searchParams.get("city"),
       //   sector:searchParams.get("sector"),
       //   PropertyAddType: text,
       // });
       setRemoveFilterField(true);
     }}
     className={`property-filter-toggle-btn ${searchParams.get("PropertyAddType") === text ? "active" : ""}`}
   >
     {text}
   </button>
       ))}
     </div>

                      
          <div className="property-filter-options">
            <div className="property-select-div">

              <select className="property-filter-select" ref={bhkRef} onChange={(e) => handleSelect('BHK', e.target.value)} defaultValue="">
                <option value="" disabled>BHK</option>
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4 BHK">4 BHK</option>
              </select>
            </div>
              <div className="property-select-div">

              <select className="property-filter-select" ref={statusRef} onChange={(e) => handleSelect('Status', e.target.value)} defaultValue="">
                <option value="" disabled>Status</option>
                <option value="Ready to move">Ready to Move</option>
                <option value="Under Construction">Under Construction</option>
              </select>
              </div>

            <div className="property-select-div">

              <select className="property-filter-select" ref={localityRef} onChange={(e) => handleSelect('Locality', e.target.value)} defaultValue="">
                <option value="" disabled>Locality</option>
                <option value="New Gurgaon">New Gurgaon</option>
                <option value="Golf Course Extn Road">Golf Course</option>
                <option value="Southern Peripheral Road Gurgaon">SPR Road</option>
              </select>
            </div>

              <div className="property-select-div">

                            <select  className="property-filter-select" ref={furnishingRef} onChange={(e) => handleSelect('Furnishing', e.target.value)} defaultValue="">
                              <option value="" disabled>Furnishing</option>
                              <option value="Furnished">Furnished</option>
                              <option value="Semi-Furnished">Semi Furnished</option>
                              <option value="Un-Furnished">Unfurnished</option>
                            </select>
              </div>

              {/* <button
                onClick={() => handleToggleChip('Photos', 'With Photos')}
                className={`property-filter-chip ${isChipActive('Photos', 'With Photos') ? 'active-chip' : ''}`}
              >
                With Photos
              </button> */}
              <button
                onClick={() => handleToggleChip('Verified', 'Verified')}
                className={`property-filter-chip ${isChipActive('Verified', 'Verified') ? 'active-chip' : ''}`}
              >
                Verified
              </button>
              {/* <button
                onClick={() => handleToggleChip('Metro', 'Near Metro')}
                className={`property-filter-chip ${isChipActive('Metro', 'Near Metro') ? 'active-chip' : ''}`}
              >
                Near Metro
              </button> */}

                  <div className="property-select-div">
                  <select ref={sortByRef} onChange={(e) => handleSelect('SortBy', e.target.value)} className="property-filter-select" defaultValue="">
                <option value="" disabled>Sort By</option>
                <option value="Price Low to High">Price Low to High</option>
                <option value="Price High to Low">Price High to Low</option>
                <option value="Newest First">Newest First</option>
              </select>
                  </div>

            </div>

            </div>
            
            {/* <div className="property-filter-header">
            
           
              
          
        
          </div> */}
        
        <div className="porpety-filter-active-filter-parent">
        <div className="property-filter-active">
              <span className="property-filter-active-title">Active filters:</span>
              {activeFilters.map((filter, index) => (
                <span key={index} className="property-filter-tag">
                  {filter.value} <button onClick={() => removeFilter(filter.value)}>&times;</button>
                </span>
              ))}
              {/* {activeFilters.length > 0 && (
                <button className="property-filter-clear-btn" onClick={clearAllFilters}>Clear All</button>
              )} */}
        
            </div>
            <div className="clear-btn-and-length">
              <span>    {activeFilters.length > 0 && (
        <button className="property-filter-clear-btn" onClick={clearAllFilters}>Clear All</button>
      )}</span>
              <span className="property-filter-count">{data?.allPost?.length} properties found</span>
              </div>
        </div>
          
              
          </div>

          </div>
    

          <div className="property-filter-allpost-main">
            {/* <HeaderCard /> */}

            {
              searchParams.get("PropertyAddType") =="Sale" && <div className="header-img-section">
              <img className="header-img-section-img"  src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/VerfiledProperty.jpg" alt="VerfiledProperty" />
            </div>
            }
             

            <div className="filter-home-card">
              <div className='total-post-length-container'>
                <p className='total-post-lable-allpost'>
                  Total result {data?.allPost?.length}
                </p>
               
              </div>
              <HomeCard data={allData} />
            </div>
          </div>

       
        </div>
      </div>
    </>
  );
};

export default AllPostSearchFilter;