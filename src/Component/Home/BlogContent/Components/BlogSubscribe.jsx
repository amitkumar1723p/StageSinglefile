import React from 'react'
import { Link } from 'react-router-dom';
import './BlogSubscribe.css';
import { useState } from 'react';

export default function BlogSubscribe() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(' ');
  const [shake, setShake] = useState(false);
  const [inputShake, setInputShake] = useState(false);



  const handleSubmit = (e) =>{
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(email ===''){
      setError("Email cannot be empty. ");
      setShake(true);
      setInputShake(true);
      setTimeout(()=>setError(''),2000);
      setTimeout(()=>setShake(false),600);
      setTimeout(()=>setInputShake(false),600);
    } else if( !emailPattern.test(email)){
      setShake(true);
      setError('Please enter a valid email address ')
      setInputShake(true);
      setTimeout(()=>setError(''),2000);
      setTimeout(() => setShake(false), 500);
      setTimeout(()=>setInputShake(false),500);
    }else{
      setError('');
      alert("Thank you for Subscribing ");
      setEmail('');
    }
  }


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
                      <div className={`blog-input-wrapper ${inputShake? 'inputShake' : ''}`}>
                        <div className='blog-email-svg'>
                          <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/blog-email-logo.svg" alt="email-logo" />
                        </div>
                      <input type='email' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Email Id'className={`${shake ? 'shake' : ''} `} ></input>
                      
                      </div>
                       
                        <button className='blog-subscribe-button' onClick={handleSubmit} >Subscribe</button>
                    </div>

                  <div className='blog-subscribe-error'>{error && <p style={{color: 'red', fontSize: '12px' }}>{error}</p>}</div>
                  <div className='blog-subscribe-links'>
                    <p>By Subscribing, you agree to our <span><Link to="/terms-and-conditions" >Terms & Conditions</Link> </span>and <span><Link to="/privacy-policy" >Privacy Policy</Link>.</span></p>
                    <p><span><Link to="/" >Unsubscribe</Link> </span> anytime.</p>
                  </div>
                </div>
            </div>
            <div className='blog-subscribe-image'>
            <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/blog-subscribe-img.svg" alt="subscribe-img" />
            </div>
        </div>
    </div>
  )
}
