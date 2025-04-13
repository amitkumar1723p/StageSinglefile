import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import PostCard from "./PostCard";
import "./AllPostRender.css";
import "../Home/PropertyCard/card.css";
import NotifyMe from "../Home/PropertyCard/NotifyMe";
import SingleCard from "./SingleCard";
import ScrollToTop from "../../ScrollToTop";
import { getPostsByAddress } from "../../Action/postAction";
import { useNavigate, useParams } from "react-router-dom";
import { formatPrice } from "../../utils/CommonFunction";
import { FilterIcon } from "lucide-react";

const AllPostRender = () => {





  const dispatch = useDispatch();
  const{data:GetAllPostData,loading}=useSelector(store=>store.postByAddress)
  const {type}= useParams("type");
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(allProperties)
    if(!GetAllPostData?.properties){
      dispatch(getPostsByAddress());
    }
  }, []);



const [query,setQuery]=useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [filterData, setFilterData] = useState({ BuySell: type });
  const searchInputRef = useRef(null);
  const typeRef = useRef(null);
  const budgetRef = useRef(null);
  const bhkRef = useRef(null);
  const statusRef = useRef(null);
  const localityRef = useRef(null);
  const furnishingRef = useRef(null);
  const sortByRef = useRef(null);

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
    setFilterData({ BuySell: type });
    if (searchInputRef.current) searchInputRef.current.value = '';
    if (typeRef.current) typeRef.current.value = '';
    if (budgetRef.current) budgetRef.current.value = '';
    if (bhkRef.current) bhkRef.current.value = '';
    if (statusRef.current) statusRef.current.value = '';
    if (localityRef.current) localityRef.current.value = '';
    if (furnishingRef.current) furnishingRef.current.value = '';
    if (sortByRef.current) sortByRef.current.value = '';
  };

  const handleToggleBuySell = (type) => {
    setFilterData(prev => ({ ...prev, BuySell: type }));
  };

  const isChipActive = (category, value) => {
    return activeFilters.some(filter => filter.category === category && filter.value === value);
  };



  const ApartmentTypeOptions = [
    "Apartment",
    "Independent House/Villa",
    "Independent/Builder Floor",
    "1 RK/Studio Apartment",
    "Serviced Apartment",
    "Plot/Land",
  ];

  const [filters, setFilters] = useState({
    propertyType: "",
    bhk: "",
    apartmentType: "",
    furnishing: "",
  });
  const [isClosing, setIsClosing] = useState(false);

  // Replace your current modal close handler with this
  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setIsClosing(false);
    }, 300); // Match this timeout with your animation duration
  };

  const [filteredData, setFilteredData] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [GetAllPostData?.properties, setGetAllData] = useState([]);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [filterdPost, setFilterdPost] = useState([]);

  useEffect(() => {
    if (!GetAllPostData?.properties) return;

    const soldOut = GetAllPostData?.properties.filter(
      (item) => item.propertyStatus?.currentPropertyStatus === "sold out"
    );
    const available = GetAllPostData?.properties.filter(
      (item) => item.propertyStatus?.currentPropertyStatus !== "sold out"
    );

    setFilterdPost([...available, ...soldOut]);
  }, [GetAllPostData?.properties]);

  // const { data: SingleProjectData } = useSelector((state) => state.SingleProjectName);

  const [value, setValue] = useState(500000000); // default 10L

  const handleChange = (e) => {
    setValue(Number(e.target.value));
  };
 

  
  useEffect(() => {
    if (!GetAllPostData?.properties?.length) return;
  
    let filtered = [...filterdPost];
  console.log(filterData)
    if (filterData?.BuySell) {
      filtered = filtered.filter(post => post.BasicDetails?.PropertyAdType?.toLowerCase() == filterData.BuySell.toLowerCase());
    }
  
    if (filterData?.Type) {
      filtered = filtered.filter(post => post.BasicDetails?.PropertyType === filterData.Type);
    }
  
    if (filterData?.BHK) {
      // console.log("datat ",filterData.BHK)
      // console.log(filtered)
      filtered = filtered.filter(post => {return post.PropertyDetails?.BHKType == filterData.BHK[0]});
    }
  
    if (filterData?.Furnishing) {
      filtered = filtered.filter(post => post.AmenitiesDetails?.Furnishing == filterData.Furnishing);
    }
  
    if (filterData?.ApartmentType) {
      filtered = filtered.filter(post => post.BasicDetails?.ApartmentType == filterData.ApartmentType);
    }
  
    if (filterData?.Status) {
      filtered = filtered.filter(post => post.BasicDetails?.PropertyStatus == filterData.Status);
    }
    if (filterData?.Verified) {
      filtered = filtered.filter(post => post.PostVerifyShow == true);
    }
    console.log(filterData)
  
    if (filterData?.Locality) {
      // console.log(filterData.Locality)
      filtered = filtered.filter(post => post.LocationDetails?.Landmark == filterData.Locality || post.LocationDetails?.Locality == filterData?.Locality);
    }
    if(query){
      filtered = filtered.filter(post=>{
        return post?.LocationDetails?.Landmark.toLowerCase().includes(query) || post?.LocationDetails?.Locality.toLowerCase().includes(query) || post?.LocationDetails?.ProjectName.toLowerCase().includes(query) ||
        post?.LocationDetails?.City.toLowerCase().includes(query)  })
    }
    if(value){
      filtered = filtered.filter(post => post.PricingDetails?.ExpectedPrice <= value || post.PricingDetails?.ExpectedRent <=value);
    }
  
    if (filterData?.SortBy) {
      if(filterData?.BuySell==="Sale"){
        if (filterData.SortBy == 'Price Low to High') {
          filtered = filtered.sort((a, b) => a.PricingDetails?.ExpectedPrice - b.PricingDetails?.ExpectedPrice);
        } else if (filterData.SortBy == 'Price High to Low') {
          filtered = filtered.sort((a, b) => b.PricingDetails?.ExpectedPrice - a.PricingDetails?.ExpectedPrice);
        } else if (filterData.SortBy == 'Newest First') {
          filtered = filtered.sort((a, b) => new Date(b.BasicDetails?.PostedOn) - new Date(a.BasicDetails?.PostedOn));
        }
      }else{
        if (filterData.SortBy == 'Price Low to High') {
          filtered = filtered.sort((a, b) => a.PricingDetails?.ExpectedRent - b.PricingDetails?.ExpectedRent);
        } else if (filterData.SortBy == 'Price High to Low') {
          filtered = filtered.sort((a, b) => b.PricingDetails?.ExpectedRent - a.PricingDetails?.ExpectedRent);
        } else if (filterData.SortBy == 'Newest First') {
          filtered = filtered.sort((a, b) => new Date(b?.createAt) - new Date(a?.createAt));
        }
      }
      
    }
  
    window.scrollTo(0, 0);
    setFilteredData(filtered);
  }, [filterData, GetAllPostData?.properties, filterdPost,query,value]);
  
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? "" : value,
    }));
  };

  return (
    <>
   
      <div className="property-post-filters-box-allpost">


      <div class=" accordion property-filter-parent-mob " id="accordionExample">
          <div class="accordion-item custon-accordian-item">
            <h2 class="accordion-header" id="headingOne">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
               <FilterIcon/>&nbsp; Filter &nbsp; &nbsp; {activeFilters.length>0 && <>{ activeFilters.length } applied filter</>}
              </button>

            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div class="accordion-body">
            
            

            <div className="property-filter-search-row">
              <input type="text" placeholder="Enter city, locality or project" onChange={(e)=>{setQuery(e.target.value)}} className="property-filter-search-input" />
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
              {/* <select ref={budgetRef} onChange={(e) => handleSelect('Budget', e.target.value)} className="property-filter-budget" defaultValue="">
                <option value="" disabled>Budget</option>
                <option value="₹50L - ₹1Cr">₹50L - ₹1Cr</option>
                <option value="₹1Cr - ₹2Cr">₹1Cr - ₹2Cr</option>
              </select> */}
              {/* <input type="range" /> */}
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
            </div>
            <div className="property-filter-header">
            
            <div className="property-filter-toggle">
              <button className={`property-filter-toggle-btn ${filterData.BuySell === 'Sale' ? 'active' : ''}`} onClick={() => handleToggleBuySell('Sale')}>Buy</button>
              <button className={`property-filter-toggle-btn ${filterData.BuySell === 'Rent' ? 'active' : ''}`} onClick={() => handleToggleBuySell('Rent')}>Rent</button>
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
                <option value="Ready to Move">Ready to Move</option>
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
              <span className="property-filter-count">{filteredData.length} Properties Found</span>
            </div>
        
              </div>
            </div>
          </div>

        </div>

{/* big screen filter */}
  <div className="property-filter-main-dev">
          
      <div className="property-filter-parent">
    

    <div className="property-filter-search-row">
      <input type="text" placeholder="Enter city, locality or project" onChange={(e)=>{setQuery(e.target.value)}} className="property-filter-search-input" />
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
      {/* <select ref={budgetRef} onChange={(e) => handleSelect('Budget', e.target.value)} className="property-filter-budget" defaultValue="">
        <option value="" disabled>Budget</option>
        <option value="₹50L - ₹1Cr">₹50L - ₹1Cr</option>
        <option value="₹1Cr - ₹2Cr">₹1Cr - ₹2Cr</option>
      </select> */}
      {/* <input type="range" /> */}
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
    </div>
    <div className="property-filter-header">
    
    <div className="property-filter-toggle">
      <button className={`property-filter-toggle-btn ${filterData.BuySell === 'Sale' ? 'active' : ''}`} onClick={() => handleToggleBuySell('Sale')}>Buy</button>
      <button className={`property-filter-toggle-btn ${filterData.BuySell === 'Rent' ? 'active' : ''}`} onClick={() => handleToggleBuySell('Rent')}>Rent</button>
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
                <option value="Ready to Move">Ready to Move</option>
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
      <span className="property-filter-count">{filteredData.length} Properties Found</span>
    </div>
  </div>
        </div>

        {/* Posts or Skeleton Loader */}
        <div className="home-postContainer all-post-showpost">
       

          <div className="total-post-length-container">
            <p className="total-post-lable-allpost">
              Showing {filteredData?.length} Listing
            </p>

        
          </div>
          {loading ? (
            <div className="allPostrender-showpost">
             
             {Array.from({ length: 8 }).map((_, index) => (
                <AllPostSkeleton key={index} />
              ))}
           
            </div>
          ) : filteredData?.length === 0 ? (
            <NotifyMe />
          ) : (
            <div className="allPostrender-showpost">
                <ScrollToTop />
              {filteredData?.map((e, i) => (
                <SingleCard key={i} PostData={e} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>


      {/* Modal */}
      {showModal && (
        <div
          className={`all-post-filter-overlay ${isClosing ? "closing" : ""}`}
          onClick={closeModal}
        >
          <div
            className="all-post-filter-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="all-post-filter-modal">
              <div className="filter-group">
                <div className="allpost-clear-filter-title-2">
                  <h2 className="">Filter Your Search</h2>

                  <div
                    className="allpost-clear-filter"
                    onClick={() =>
                      setFilters({
                        propertyType: "",
                        bhk: "",
                        apartmentType: "",
                        furnishing: "",
                      })
                    }
                  >
                    Clear Filter <img src="./img/clear-filter.svg" alt="" />
                  </div>
                </div>

                <div className="button-section">
                  {["Sale", "Rent"].map((text) => (
                    <button
                      key={text}
                      onClick={() => handleFilterChange("propertyType", text)}
                      className={`bhk-option ${
                        filters.propertyType === text ? "selected" : ""
                      }`}
                    >
                      {text}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h3>BHK</h3>
                <div className="button-section">
                  {[1, 2, 3, 4, 5].map((bhk) => (
                    <button
                      key={bhk}
                      onClick={() => handleFilterChange("bhk", bhk)}
                      className={`bhk-option ${
                        filters.bhk === bhk ? "selected" : ""
                      }`}
                    >
                      {bhk} BHK
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h3>Apartment Type</h3>
                <div className="button-section">
                  {[
                    "Apartment",
                    "Independent House/Villa",
                    "Independent/Builder Floor",
                    // "1 RK/Studio Apartment",
                    "Studio Apartment",
                    "1 RK/PG",
                    "Serviced Apartment",
                    "Plot/Land",
                  ].map((type) => (
                    <button
                      key={type}
                      onClick={() => handleFilterChange("apartmentType", type)}
                      className={`bhk-option ${
                        filters.apartmentType === type ? "selected" : ""
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h3>Furnishing Status</h3>
                <div className="button-section">
                  {["Furnished", "Semi-Furnished", "Un-Furnished"].map(
                    (option) => (
                      <button
                        key={option}
                        onClick={() => handleFilterChange("furnishing", option)}
                        className={`bhk-option ${
                          filters.furnishing === option ? "selected" : ""
                        }`}
                      >
                        {option}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="all-post-filter-close" onClick={closeModal}>
              Close
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllPostRender;

const AllPostSkeleton = () => {
  return (
    
    <div className="all-post-skeleton-card">
      <div className="all-post-skeleton-image"></div>

      <div className="all-post-skeleton-text all-post-skeleton-title"></div>
      <div className="all-post-skeleton-text all-post-skeleton-subtitle-1"></div>
      <div className="all-post-skeleton-text all-post-skeleton-subtitle"></div>

      <div className="all-post-skeleton-info-container">
        <div className="all-post-skeleton-info"></div>
        <div className="all-post-skeleton-info"></div>
      </div>

      <div className="all-post-skeleton-footer">
        <div className="all-post-skeleton-button"></div>
        <div className="all-post-skeleton-button"></div>
      </div>
    </div>
  );
};
