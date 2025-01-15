import React from 'react';
import './NoListThere.css';

const NoListThere = () => {
  return (
    <div className="no-list-there-container">
      <div className="no-list-there-content">
        <img
          src="/img/NoListThere.jpg" // Replace with the actual image path
          alt="No Listings"
          className="no-list-there-image"
        />
        <h2 className="no-list-there-title">You haven’t listed anything yet!</h2>
        <p className="no-list-there-description">
          You will see your search listing here, once you start listing for properties, projects, localities, or cities.
        </p>
        <button className="no-list-there-button">+ Add Listings</button>
      </div>
    </div>
  );
};

export default NoListThere;
