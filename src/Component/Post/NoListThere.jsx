import React from 'react';
import './NoListThere.css';
import { useNavigate } from 'react-router-dom';

const NoListThere = () => {
  const navigate = useNavigate()
  return (
    <div className="no-list-there-container">
      <div className="no-list-there-content">
        <img
          src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/NoListThere.jpg" 
          alt="No Listings"
          className="no-list-there-image"
        />
        <h2 className="no-list-there-title">You haven’t listed anything yet!</h2>
        <p className="no-list-there-description">
          You will see your search listing here, once you start listing for properties, projects, localities, or cities.
        </p>
        <button   className="no-list-there-button" 
          onClick={() => {
            navigate("/user/post")}} > + Add Listings</button>
      </div>
    </div>
  );
};

export default NoListThere;
