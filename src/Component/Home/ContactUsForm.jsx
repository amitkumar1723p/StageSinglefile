import React, { useState } from 'react';
import "./ContactUsForm.css";

const ContactUsForm = ( {setContactUs}) => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="contactus-container">
      <div className="contactus-card">
        <div className="contactus-left">
          <div className='contactus-left-content-container'>

          <h1 className="contactus-title">Contact Us!</h1>
          <p className="contactus-subtitle">
            Any question or remarks? Just write us a message!
          </p>
          
          <div className="contactus-info">
            <div className="contactus-info-item">
              <div className="contactus-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92V19.92C22 20.4704 21.7893 20.9996 21.4142 21.3747C21.0391 21.7498 20.5099 21.9605 19.96 21.96C18.14 21.96 16.36 21.58 14.68 20.84C13.1222 20.1539 11.7018 19.1844 10.48 17.98C9.27572 16.7582 8.30618 15.3378 7.62 13.78C6.88 12.1 6.5 10.32 6.5 8.5C6.49952 7.95007 6.71017 7.42088 7.08524 7.04581C7.46031 6.67074 7.9895 6.46009 8.54 6.46H11.54C11.9834 6.45603 12.413 6.61436 12.7489 6.90898C13.0848 7.2036 13.3014 7.61258 13.36 8.05C13.46 8.84 13.64 9.61 13.9 10.34C14.0315 10.6706 14.0638 11.0346 13.9928 11.3843C13.9218 11.734 13.7505 12.0527 13.5 12.3L12.44 13.36C13.0725 14.9641 14.0361 16.4139 15.27 17.62C16.4761 18.8539 17.9259 19.8175 19.53 20.45L20.59 19.39C20.8373 19.1395 21.156 18.9682 21.5057 18.8972C21.8554 18.8262 22.2194 18.8585 22.55 18.99C23.28 19.25 24.05 19.43 24.84 19.53C25.2815 19.5899 25.6931 19.8109 25.9877 20.1532C26.2822 20.4955 26.4368 20.932 26.43 21.38L22 16.92Z" fill="#3B82F6"/>
                </svg>
              </div>
              <span>+91 9087690990</span>
            </div>
            
            <div className="contactus-info-item">
              <div className="contactus-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#3B82F6"/>
                </svg>
              </div>
              <span>support@propertydekho247.com</span>
            </div>
            
            <div className="contactus-info-item">
              <div className="contactus-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#3B82F6"/>
                </svg>
              </div>
              <span>sales@propertydekho247.com</span>
            </div>
          </div>
            
          </div>
      
        </div>
        
        <div className="contactus-right">
        <div className="contactus-close" onClick={() => setContactUs(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <form onSubmit={handleSubmit} className="contactus-form">
            <div className="contactus-form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder=""
              />
            </div>
            
            <div className="contactus-form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            
            <div className="contactus-form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div className="contactus-form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message"
              ></textarea>
            </div>
            
            <button type="submit" className="contactus-submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};




export default ContactUsForm;