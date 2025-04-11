import React, { useState } from 'react';
import { Phone, MessageSquare, ArrowUp, User, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';

const Footer = ({project, projectLogoContent}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <footer className="single-fresh-footer">
      {/* Decorative Elements */}
      <div className="single-fresh-footer__decorative">
        <div className="single-fresh-footer__decorative-circle single-fresh-footer__decorative-circle--top"></div>
        <div className="single-fresh-footer__decorative-circle single-fresh-footer__decorative-circle--bottom"></div>
      </div>

      <div className="single-fresh-footer__container">
        <div className="single-fresh-footer__grid">
          {/* Company Info */}
          <div className="single-fresh-footer__company">
            <div className="single-fresh-footer__logo-wrapper">
              <img 
                src={`${projectLogoContent?.url}`} 
                alt="Company Logo" 
                className="single-fresh-footer__logo"
              />
            </div>
            <h2 className="font-weight-bold  mb-4">{project?.projectName}</h2>
           
          </div>

          {/* Contact Info */}
          <div className="single-fresh-footer__contact-info">
            <h3 className="single-fresh-footer__heading">Contact Us</h3>
            <div className="single-fresh-footer__contact-list">
              <div className="single-fresh-footer__contact-item">
              <a href="tel:+917837840785" className="Single-fresh-contact__item">  
                <div className="single-fresh-footer__contact-icon-wrapper">
                        <Phone className="single-fresh-footer__contact-icon" /> 
                </div></a>
                <div className="single-fresh-footer__contact-details">
                  <p className="single-fresh-footer__contact-label">Call Us</p>
                  <p className="single-fresh-footer__contact-value">+91 7837840785</p>
                </div>
              </div>
              <div className="single-fresh-footer__contact-item">
              <a href="mailto:sales@propertydekho247.com" className="Single-fresh-contact__item">  
                <div className="single-fresh-footer__contact-icon-wrapper">
                  <Mail className="single-fresh-footer__contact-icon" /> 
                </div> </a>
                <div className="single-fresh-footer__contact-details">
                  <p className="single-fresh-footer__contact-label">Email Us</p>
                  <p className="single-fresh-footer__contact-value">support@propertydekho247.com</p>
                </div>
              </div>
              <div className="single-fresh-footer__contact-item">
                <div className="single-fresh-footer__contact-icon-wrapper">
                  <Clock className="single-fresh-footer__contact-icon" />
                </div>
                <div className="single-fresh-footer__contact-details">
                  <p className="single-fresh-footer__contact-label">Working Hours</p>
                  <p className="single-fresh-footer__contact-value">Mon - Sat: 9AM to 6PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="single-fresh-footer__quick-links">
            <h3 className="single-fresh-footer__heading">Quick Links</h3>
            <div className="single-fresh-footer__links-grid">
              <ul className="single-fresh-footer__links-column">
                <li className="single-fresh-footer__link-item">
                  <a href="#" className="single-fresh-footer__link">
                    <span className="single-fresh-footer__link-dot"></span>
                    <span className="single-fresh-footer__link-text">Home</span>
                  </a>
                </li>
                <li className="single-fresh-footer__link-item">
                  <a href="#Amenities" className="single-fresh-footer__link">
                    <span className="single-fresh-footer__link-dot"></span>
                    <span className="single-fresh-footer__link-text">Amenities</span>
                  </a>
                </li>
                <li className="single-fresh-footer__link-item">
                  <a href="#About" className="single-fresh-footer__link">
                    <span className="single-fresh-footer__link-dot"></span>
                    <span className="single-fresh-footer__link-text">About</span>
                  </a>
                </li>
                <li className="single-fresh-footer__link-item">
                  <a href="#Highlights" className="single-fresh-footer__link">
                    <span className="single-fresh-footer__link-dot"></span>
                    <span className="single-fresh-footer__link-text">Highlights</span>
                  </a>
                </li>
              </ul>
              <ul className="single-fresh-footer__links-column">
                <li className="single-fresh-footer__link-item">
                  <a href="#Size-Price" className="single-fresh-footer__link">
                    <span className="single-fresh-footer__link-dot"></span>
                    <span className="single-fresh-footer__link-text">Size & Price</span>
                  </a>
                </li>
                <li className="single-fresh-footer__link-item">
                  <a href="#Location" className="single-fresh-footer__link">
                    <span className="single-fresh-footer__link-dot"></span>
                    <span className="single-fresh-footer__link-text">Location</span>
                  </a>
                </li>
                <li className="single-fresh-footer__link-item">
                  <a href="#Gallery" className="single-fresh-footer__link">
                    <span className="single-fresh-footer__link-dot"></span>
                    <span className="single-fresh-footer__link-text">Gallery</span>
                  </a>
                </li>
                <li className="single-fresh-footer__link-item">
                  <a href="#Site-Map" className="single-fresh-footer__link">
                    <span className="single-fresh-footer__link-dot"></span>
                    <span className="single-fresh-footer__link-text">Site Map</span>
                  </a>
                </li>
                <li className="single-fresh-footer__link-item">
                  <a href="#Floor-Plan" className="single-fresh-footer__link">
                    <span className="single-fresh-footer__link-dot"></span>
                    <span className="single-fresh-footer__link-text">Floor Plan</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          {/* <div className="single-fresh-footer__form-container">
            <form onSubmit={handleSubmit} className="single-fresh-footer__form">
              <h3 className="single-fresh-footer__form-heading">Get Expert Advice</h3>
              
              <div className="single-fresh-footer__form-fields">
                <div className="single-fresh-footer__form-field">
                  <User className="single-fresh-footer__input-icon" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="single-fresh-footer__input"
                    placeholder="Your Full Name"
                    required
                  />
                </div>
                
                <div className="single-fresh-footer__form-field">
                  <Phone className="single-fresh-footer__input-icon" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="single-fresh-footer__input"
                    placeholder="Your Phone Number"
                    required
                    pattern="[0-9]{10}"
                  />
                </div>
                
                <div className="single-fresh-footer__form-field">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="single-fresh-footer__textarea"
                    placeholder="Your Message..."
                    rows={3}
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="single-fresh-footer__submit-btn"
                >
                  <span>Send Message</span>
                  <Send className="single-fresh-footer__submit-icon" />
                </button>
              </div>
            </form>
          </div> */}
        </div>

        {/* Bottom Bar */}
        <div className="single-fresh-footer__bottom">
          <div className="single-fresh-footer__bottom-content">
            <p className="single-fresh-footer__copyright">
            Copyright © 2024 Propfuture AI Technologies Pvt. Ltd. All Rights Reserved.
            </p>
            <div className="single-fresh-footer__legal-links">
              <a href="#" className="single-fresh-footer__legal-link">Privacy Policy</a>
              <a href="#" className="single-fresh-footer__legal-link">Terms of Service</a>
              {/* <a href="#" className="single-fresh-footer__legal-link">Cookie Policy</a> */}
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="single-fresh-footer__back-to-top"
        >
          <ArrowUp className="single-fresh-footer__back-to-top-icon" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;