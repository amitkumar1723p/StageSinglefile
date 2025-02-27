import React from 'react'
import { Link } from 'react-router-dom';
import './BlogSubscribe.css';

export default function BlogSubscribe() {
  return (
    <div className='blog-subscribe-main-container'>
        <div className='blog-subscribe-container'>
            <div className='blog-subscribe-form-container'>
                <div className='blog-subscribe-headings'>
                <h2>Subscribe to Our Blog for Exclusive Real Estate Insights!</h2>
                <p>Get the latest trends, investment tips & home-buying guides right in your inbox.</p>
                </div>
                <div className='blog-subscribe-form'>
                    <div className='blog-subscribe-input'>
                      <div className='blog-input-wrapper'>
                        <div className='blog-email-svg'>
                          <img src="/img/blog-email-logo.svg" alt="email-logo" />
                        </div>
                      <input type='email' placeholder='Email Id' ></input>
                      </div>
                        
                        <button className='blog-subscribe-button' >Subscribe</button>
                    </div>
                  
                  <div className='blog-subscribe-links'>
                    <p>By Subscribing, you agree to our <span><Link to="/terms-and-conditions" >Terms & Conditions</Link> </span>and <span><Link to="/privacy-policy" >Privacy Policy</Link>.</span></p>
                    <p><span><Link to="#" >Unsubscribe</Link> </span> anytime.</p>
                  </div>
                </div>
            </div>
            <div className='blog-subscribe-image'>
            <img src="/img/blog-subscribe-img.svg" alt="subscribe-img" />
            </div>
        </div>
    </div>
  )
}
