import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import PostCard from './PostCard';
import './AllPostRender.css';

const AllPostRender = () => {
  const [filters, setFilters] = useState({
    propertyType: '',
    bhk: '',
    apartmentType: '',
    furnishing: '',
  });

  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [GetAllPostData, setGetAllData] = useState([]);

  const { data: SingleProjectData } = useSelector((state) => state.SingleProjectName);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/post/all-property/`);
        if (res.data.success) {
          setGetAllData(res.data.properties);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    if (!GetAllPostData.length) return;

    let filtered = [...GetAllPostData];

    if (filters.propertyType) {
      filtered = filtered.filter((post) => post.BasicDetails?.PropertyAdType === filters.propertyType);
    }
    if (filters.bhk) {
      filtered = filtered.filter((post) => post.PropertyDetails?.BHKType === filters.bhk);
    }
    if (filters.apartmentType) {
      filtered = filtered.filter((post) => post.BasicDetails?.ApartmentType === filters.apartmentType);
    }
    if (filters.furnishing) {
      filtered = filtered.filter((post) => post.AmenitiesDetails?.Furnishing === filters.furnishing);
    }

    setFilteredData(filtered);
  }, [filters, GetAllPostData]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? '' : value,
    }));
  };

  return (
    <>
      <div className="All-post-filters-main-box">
        {/* <Helmet>
          <title>{`${SingleProjectData?.SingleProjectName?.['Project Name']} - ${SingleProjectData?.SingleProjectName?.['Apartment Type']}, ${SingleProjectData?.SingleProjectName?.City}`}</title>
          <meta
            name="description"
            content={`Discover your dream ${SingleProjectData?.SingleProjectName?.['Apartment Type']} at ${SingleProjectData?.SingleProjectName?.['Project Name']}`}
          />
        </Helmet> */}

        <div className="property-post-filters-box">
          <aside className="property-filters">
            <div className="filter-title">
              <h2 className="filter-title-1">Filter Your Search</h2>
            </div>

            <div className="filter-dummyLine"></div>

            {/* Property Type Filter */}
            <div className="flex">
              <div className="filter-Lookin-for">
                <p className="looking-for-data">I am looking for</p>
                {['Sale', 'Rent'].map((text) => (
                  <button
                    key={text}
                    onClick={() => handleFilterChange('propertyType', text)}
                    className={`bhk-option ${filters.propertyType === text ? 'selected' : ''}`}
                  >
                    {text}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-dummyLine"></div>

            {/* BHK Filter */}
            <div className="filter-group">
              <h3>BHK</h3>
              <div className="button-section">
                {[1, 2, 3, 4, 5].map((bhk) => (
                  <button
                    key={bhk}
                    className={`bhk-option ${filters.bhk === bhk ? 'selected' : ''}`}
                    onClick={() => handleFilterChange('bhk', bhk)}
                  >
                    {bhk} BHK
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-dummyLine"></div>

            {/* Apartment Type Filter */}
            <div className="filter-group">
              <h3>Property Status</h3>
              <div className="Property-Status">
                {[
                  'Apartment',
                  'Independent House/Villa',
                  'Independent/Builder Floor',
                  '1 RK/Studio Apartment',
                  'Serviced Apartment',
                  'Plot/Land',
                ].map((type, i) => (
                  <div key={i} className="filter-box-main">
                    <input
                      id={`${type}${i}`}
                      type="checkbox"
                      checked={filters.apartmentType === type}
                      onChange={() => handleFilterChange('apartmentType', type)}
                    />
                    <label htmlFor={`${type}${i}`}>{type}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="filter-dummyLine"></div>

            {/* Furnishing Status Filter */}
            <div className="filter-group">
              <h3>Furnishing Status</h3>
              <div className="button-section">
                {['Furnished', 'Semi-Furnished', 'Un-Furnished'].map((option) => (
                  <button
                    key={option}
                    className={`bhk-option ${filters.furnishing === option ? 'selected' : ''}`}
                    onClick={() => handleFilterChange('furnishing', option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-dummyLine"></div>
          </aside>

          {/* Posts or Skeleton Loader */}
          <div className="home-postContainer">
            {loading ? 
              Array.from({ length: 8 }).map((_, index) => (
                <AllPostSkeleton key={index} />
              ))
             : (
              <div className="home-showpost">
                {filteredData.map((e, i) => (
                  <PostCard key={i} PostData={e} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllPostRender;

const AllPostSkeleton = () => {
  return (
    <div className="all-post-skeleton">
      <div className="all-post-skeleton-image skeleton"></div>
      <div className="all-post-skeleton-content">
        <div className="all-post-skeleton-title skeleton"></div>
        <div className="all-post-skeleton-text skeleton"></div>
        <div className="all-post-skeleton-row">
          <div className="all-post-skeleton-info skeleton"></div>
          <div className="all-post-skeleton-info skeleton"></div>
        </div>
        <div className="all-post-skeleton-row">
          <div className="all-post-skeleton-info skeleton"></div>
          <div className="all-post-skeleton-info skeleton"></div>
        </div>
        <div className="all-post-skeleton-footer">
          <div className="all-post-skeleton-inactive skeleton"></div>
          <div className="all-post-skeleton-button skeleton"></div>
        </div>
      </div>
    </div>
  );
};
