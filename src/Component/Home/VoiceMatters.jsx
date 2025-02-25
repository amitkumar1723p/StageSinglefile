import React from 'react'
import './VoiceMatters.css';
export default function VoiceMatters() {
  return (
    <div className='voice-container'>
        <div className='voice-content'>
            <div className='voice-headings'>
                <h2> Your <span>Voice matters</span></h2>
                <h2>Help Us <span>Improve</span></h2>
                <h2>PropertyDekho247.com</h2>
            </div>
            <div className='voice-paragraph'>
                <p>We strive to deliver the best service possible. Share your experience, highlight challenges, or suggest enhancements to help us improve and refine our platform.</p>
            </div>
        </div>
        <div className='voice-img-container'>
            <img
            src='/img/voice-matters.svg'
            alt='voice-matters'
            ></img>
        </div>
      
    </div>
  );
}
