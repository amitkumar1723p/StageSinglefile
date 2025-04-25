import React from 'react';
import './RentAuthentication.css';

export default function RentAuthentication() {
  return (
    <div className='rent-auth-container'>
      <div className='rent-auth-headings'>
        <h2> What Does <span>Verified</span> Means in propertydekho247.com</h2>
        <p >Every listing on Propertydekho247.com goes through a verification process. Say goodbye to fake listings and enjoy a secure rental experience.</p>
      </div>
      <div className='rent-auth-main-content'>
        <div className='rent-auth-image-container'>
            <img
                      loading="lazy" src="/img/rent-auth-image.svg" alt="rent-image" />
        </div>
        <div className='rent-auth-cards-container'>
            <div className='rent-auth-card'>
                <div className='rent-auth-card-image'>
                    <img
                      loading="lazy" src="/img/rent-identify-authentication.svg" alt="rent-card-img" />
                </div>
                <div className='rent-auth-card-text'>
                    <h2>Identify Authentication</h2>
                    <p>Every listing features verified property documents, ensuring authenticity and transparency.</p>
                </div>
            </div>
            <div className='rent-auth-card'>
                <div className='rent-auth-card-image'>
                    <img
                      loading="lazy" src="/img/rent-otp-authentication.svg" alt="rent-card-img" />
                </div>
                <div className='rent-auth-card-text'>
                    <h2>OTP Authentication</h2>
                    <p>Secure validation through OTP based verification</p>
                </div>
            </div>
            <div className='rent-auth-card'>
                <div className='rent-auth-card-image'>
                    <img
                      loading="lazy" src="/img/rent-authentic.svg" alt="rent-card-img" />
                </div>
                <div className='rent-auth-card-text'>
                    <h2>Authentic Property Images</h2>
                    <p>Each listing showcases verified images that accurately depict the property’s current condition.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
