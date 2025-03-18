import React from 'react'
import './ListYourProperty.css'
import { Link } from 'react-router-dom'

export default function ListYourProperty() {
  return (
    <div className='list-your-property-main-container'>
      <div className='list-your-property-text-container'>
        <div className='list-your-property-heading'>
          <h2>List Your Property with <span>Property</span>Dekho247</h2>
        </div>
        <div className='list-your-property-title'>
          <p>PropertyDekho247.com India's 1st Online Reselling platform with 100% transparency</p>
        </div>
        <div className='list-your-property-list-item'>
          <ul className='list-your-property-list'>
            <li>100% Verified Buyer's </li>
            <li> A real-time alert for scheduling a property visit's</li>
            <li>Real time notification of price offer by buyer's</li>
            <li>Sell Property at highest price offer</li>
          </ul>
        </div>
        <div className='list-your-property-button'>
          <Link to="/user/post">
            <button>Get Started</button>
          </Link>
        </div>
      </div>

      <div className='list-your-property-image'>
        <img src="/img/confuse.svg" alt="list-property-img" />
      </div>
    </div>
  )
}
