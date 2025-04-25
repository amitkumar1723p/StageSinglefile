import React from "react";
import "./AuctionCard.css"; // Importing the CSS file
import {Link} from 'react-router-dom'
const AuctionCard = () => {
  return (
    <section className="card-section">

      <div className="auction-card-container">
        {/* Auction Card 1 */}
        <div className="auction-card">
          <div className="card-image">
            <img
            loading="lazy"
              src="/img/Krisumi Waterfall Residences.jpg"
              alt="Krisumi Waterside Residence"
            />
            <div className="discount-badge">- 25%</div>
          </div>
          <div className="card-content">
            <h3 className="property-title">Krisumi Waterside Residence</h3>
            <p className="location">
              <i className="fas fa-location-dot"></i> Sector 36A, Gurgaon
            </p>
            <p className="location">
              <i className="fas fa-chart-area"></i> 2700 Sq.Ft.
            </p>
            <p className="price">
              <span className="material-symbols-outlined">apartment</span> 1, 2
              & 3 LDK Apartments
            </p>
            <button className="auction-button">Reserve Price ₹ 4.97</button>
            <div className="auction-timer">
              <span className="time-text"> Auction Start Date</span>
              <span className="time">7 d 6 hours</span>
            </div>
            <div className="date-timer">
              <span className="time-text">20-Oct-2024</span>
            </div>
          </div>
          <div className="card-footer">
            <Link to="#" className="auction-details">
              More Details
            </Link>
            <p className="auction-id">Prop ID: 123</p>
          </div>

          
        </div>

      </div>

      
    </section>
  );
};

export default AuctionCard;
