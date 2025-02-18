import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import PostCard from './PostCard';
import './AllPostRender.css';
import "../Home/PropertyCard/card.css"

const AllPostRender = () => {
    const [filters, setFilters] = useState({
        propertyType: '',
        bhk: '',
        apartmentType: '',
        furnishing: '',
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
    const [loading, setLoading] = useState(false);
    const [GetAllPostData, setGetAllData] = useState([]);
    const [showModal, setShowModal] = useState(false);  // Modal visibility state

    // const { data: SingleProjectData } = useSelector((state) => state.SingleProjectName);

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
            <div className="property-post-filters-box-allpost">
                <aside className="property-filters">
                    <div className="allpost-clear-filter-title">
                        <h2 className="filter-title-1">Filter Your Search</h2>

                        <div className='allpost-clear-filter' onClick={() => setFilters({
                            propertyType: '',
                            bhk: '',
                            apartmentType: '',
                            furnishing: '',
                        })}>Clear Filter <img src="./img/clear-filter.svg" alt="" /></div>
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
                <div className="home-postContainer all-post-showpost">
                <p className='total-post-lable-allpost-1' >
                        Total result {filteredData?.length}
                    </p>
                    <div className='total-post-length-container'>
                    
                    <p className='total-post-lable-allpost' >
                        Total result {filteredData?.length}
                    </p>

                    <button className='all-post-filter-button' onClick={() => setShowModal(true)}> filter</button>

                    </div>
                    {loading ? (
                        <div className="home-showpost">
                            {Array.from({ length: 8 }).map((_, index) => (
                                <AllPostSkeleton key={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="home-showpost">
                            {filteredData.map((e, i) => (
                                <PostCard key={i} PostData={e} index={i} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
    <div className={`all-post-filter-overlay ${isClosing ? 'closing' : ''}`} onClick={closeModal}>
        <div className="all-post-filter-content" onClick={(e) => e.stopPropagation()}>
            <div className="all-post-filter-modal">
                <div className="filter-group">
                  


                <div className="allpost-clear-filter-title-2">
                        <h2 className="">Filter Your Search</h2>

                        <div className='allpost-clear-filter' onClick={() => setFilters({
                            propertyType: '',
                            bhk: '',
                            apartmentType: '',
                            furnishing: '',
                        })}>Clear Filter <img src="./img/clear-filter.svg" alt="" /></div>
                    </div>

                  
                    <div className="button-section">
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

                <div className="filter-group">
                    <h3>BHK</h3>
                    <div className="button-section">
                        {[1, 2, 3, 4, 5].map((bhk) => (
                            <button
                                key={bhk}
                                onClick={() => handleFilterChange('bhk', bhk)}
                                className={`bhk-option ${filters.bhk === bhk ? 'selected' : ''}`}
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
                            'Apartment',
                            'Independent House/Villa',
                            'Independent/Builder Floor',
                            '1 RK/Studio Apartment',
                            'Serviced Apartment',
                            'Plot/Land',
                        ].map((type) => (
                            <button
                                key={type}
                                onClick={() => handleFilterChange('apartmentType', type)}
                                className={`bhk-option ${filters.apartmentType === type ? 'selected' : ''}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="filter-group">
                    <h3>Furnishing Status</h3>
                    <div className="button-section">
                        {['Furnished', 'Semi-Furnished', 'Un-Furnished'].map((option) => (
                            <button
                                key={option}
                                onClick={() => handleFilterChange('furnishing', option)}
                                className={`bhk-option ${filters.furnishing === option ? 'selected' : ''}`}
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

