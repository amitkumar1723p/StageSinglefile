// import React from 'react';
// import { Mail, Phone, Linkedin, Instagram, Facebook, Twitter } from 'lucide-react';
// import "./Footer.css";

// const Footer = () => {
//   const socialIcons = [
//     { Icon: Linkedin, link: "javascript:void(0)" },
//     { Icon: Instagram, link: "javascript:void(0)" },
//     { Icon: Facebook, link: "javascript:void(0)" },
//     { Icon: Twitter, link: "javascript:void(0)" }
//   ];

//   const scrollUp = (height) => {
//     window.scrollBy({
//       top: -height, // Scroll up by the specified height
//       behavior: 'smooth'
//     });
//   };
//   const vv =window.innerWidth <= 768 
//   console.log(vv)

//   const quickLinks = [
//     { name: 'Home', hash: "" },
//     { name: 'About Us', hash: "" },
//     { name: 'Services', hash:  vv ? 5900:3520 }
//   ];

//   const companyLinks = [
//     { name: 'Privacy Policy', hash: '/privacy-policy' },
//     { name: 'Terms and Conditions', hash: '/terms-and-conditions' },
//     { name: 'FAQs', hash: "" },
//     { name: 'Careers', hash: "" },
//     { name: 'Testimonials', hash:vv ? 2600: 1140 }
//   ];

//   return (
//     <footer className="footer">
//       <div className="footer__background">
//         <svg className="footer__decoration footer__decoration--right" viewBox="0 0 100 100">
//           <path d="M0,50 a1,1 0 0,0 100,0" fill="currentColor" />
//         </svg>
//         <svg className="footer__decoration footer__decoration--left" viewBox="0 0 100 100">
//           <rect x="10" y="10" width="80" height="80" fill="currentColor" />
//         </svg>
//       </div>

//       <div className="footer__container">
//         <div className="footer__main">
//           {/* Company Info */}
//           <div className="footer__company">
//             <div className="company__branding">
//               <h3 className="company__title">PropertyDekho247</h3>
//               <div className="company__underline"></div>
//             </div>
//             <p className="company__description">
//               Your trusted partner in finding the perfect property. Discover your dream home with our AI-powered property search.
//             </p>
//             <div className="company__social">
//               {socialIcons.map(({ Icon, link }, index) => (
//                 <a key={index} href={link} className="social__link">
//                   <Icon className="social__icon" />
//                 </a>
//               ))}
//             </div>
//           </div>

//           <div className='Links-div'>
//             {/* Quick Links */}
//             <div className="footer__links">
//               <h4 className="links__title">Quick Links</h4>
//               <ul className="links__list">
//                 {quickLinks.map((item) => (
//                   <li key={item.name} className="links__item">
//                     <a
//                       onClick={(e) => {
//                         if (typeof item.hash === "number" && item.hash > 0) {
//                           e.preventDefault();
//                           scrollUp(item.hash);
//                         }
//                       }}
//                       href={typeof item.hash === "string" ? item.hash : "javascript:void(0)"}
//                       className="links__link"
//                     >
//                       <span className="links__dot"></span>
//                       <span className='list__Name'>{item.name}</span>
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Company Links */}
//             <div className="footer__links">
//               <h4 className="links__title">Company</h4>
//               <ul className="links__list">
//                 {companyLinks.map((item) => (
//                   <li key={item.name} className="links__item">
//                     <a
//                       onClick={(e) => {
//                         if (typeof item.hash === "number" && item.hash > 0) {
//                           e.preventDefault();
//                           scrollUp(item.hash);
//                         }
//                       }}
//                       href={typeof item.hash === "string" ? item.hash : "javascript:void(0)"}
//                       className="links__link"
//                     >
//                       <span className="links__dot"></span>
//                       <span className='list__Name'>{item.name}</span>
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* Contact */}
//           <div className="footer__contact">
//             <h4 className="contact__title">Get in Touch</h4>
//             <div className="contact__list">
//               <a href="tel:+917837840785" className="contact__item">
//                 <div className="contact__icon-wrapper">
//                   <Phone className="contact__icon" />
//                 </div>
//                 <div className="contact__info">
//                   <p className="contact__label">Call Us</p>
//                   <p className="contact__value">+91 783-784-0785</p>
//                 </div>
//               </a>

//               <a href="mailto:support@propertydekho247.com" className="contact__item">
//                 <div className="contact__icon-wrapper">
//                   <Mail className="contact__icon" />
//                 </div>
//                 <div className="contact__info">
//                   <p className="contact__label">Support</p>
//                   <p className="contact__value">support@propertydekho247.com</p>
//                 </div>
//               </a>

//               <a href="mailto:sales@propertydekho247.com" className="contact__item">
//                 <div className="contact__icon-wrapper">
//                   <Mail className="contact__icon" />
//                 </div>
//                 <div className="contact__info">
//                   <p className="contact__label">Sales</p>
//                   <p className="contact__value">sales@propertydekho247.com</p>
//                 </div>
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Copyright */}
//         <div className="footer__copyright">
//           <p>Copyright © 2024 Propfuture AI Technologies Pvt. Ltd. All Rights Reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



import React from 'react';
import { Mail, Phone, Linkedin, Instagram, Facebook, Twitter } from 'lucide-react';
import "./Footer.css";

const Footer = () => {
  const socialIcons = [
    { Icon: Linkedin, link: 'https://www.linkedin.com/company/propertydekho247' },
    { Icon: Instagram, link: 'https://www.instagram.com/propertydekho24x7/' },
    { Icon: Facebook, link: 'https://www.facebook.com/people/PropertyDekho247/61572085979323/' },
    { Icon: Twitter, link: 'https://x.com/PropetyDekho247' }
  ];

  // Function to scroll to a section while accounting for the sticky navbar height
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const navbarHeight = document.querySelector(".navbar")?.offsetHeight || 80; // Adjust height if needed
      const offsetTop = section.offsetTop - navbarHeight - 5; // Adjusted offset

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  const quickLinks = [
    { name: 'Home', hash: "Hero-section" },
    { name: 'About Us', hash: "WHO-WE-ARE" },
    { name: 'Services', hash: "select-option-section" } // Make sure the section has this ID in your home page
  ];

  const companyLinks = [
    { name: 'FAQs', hash: 'FAQ-SECTION' },
    { name: 'Careers', hash: '' },
    { name: 'Testimonials', hash: "testimonials" } // Ensure section ID exists in home page
  ];

  return (
    <footer className="footer">
      <div className="footer__background">
        <svg className="footer__decoration footer__decoration--right" viewBox="0 0 100 100">
          <path d="M0,50 a1,1 0 0,0 100,0" fill="currentColor" />
        </svg>
        <svg className="footer__decoration footer__decoration--left" viewBox="0 0 100 100">
          <rect x="10" y="10" width="80" height="80" fill="currentColor" />
        </svg>
      </div>

      <div className="footer__container">
        {/* Main Content */}
        <div className="footer__main">
          {/* Company Info */}
          <div className="footer__company">
            <div className="company__branding">
              <h3 className="company__title">PropertyDekho247.com</h3>
              <div className="company__underline"></div>
            </div>
            <p className="company__description">
              Your trusted partner in finding the perfect property. Discover your dream home with our Smart property search.
            </p>
            <div className="company__social">
              {socialIcons.map(({ Icon, link }, index) => (
                <a key={index} href={link} className="social__link">
                  <Icon className="social__icon" />
                </a>
              ))}
            </div>
          </div>

          <div className='Links-div'>
            {/* Quick Links */}
            <div className="footer__links">
              <h4 className="links__title">Quick Links</h4>
              <ul className="links__list">
                {quickLinks.map((item, index) => (
                  <li key={index} className="links__item">
                    <a
                      onClick={(e) => {
                        if (item.hash) {
                          e.preventDefault();
                          scrollToSection(item.hash);
                        }
                      }}
                      href=""
                      className="links__link"
                    >
                      <span className="links__dot"></span>
                      <span className='list__Name'>{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className="footer__links">
              <h4 className="links__title">Company</h4>
              <ul className="links__list">
              <li  className="links__item">
                    <a
                    target='blank'
                      href="/privacy-policy"
                      className="links__link"
                    >
                      <span className="links__dot"></span>
                      <span className='list__Name'>Privacy Policy</span>
                    </a>
                  </li>
                  <li  className="links__item">
                    <a
                     
                      href="/terms-and-conditions"
                      target='blank'
                      className="links__link"
                    >
                      <span className="links__dot"></span>
                      <span className='list__Name'>Terms & Conditions</span>
                    </a>
                  </li>
                {companyLinks.map((item, index) => (
                  <li key={index} className="links__item">
                    <a
                      onClick={(e) => {
                        if (item.hash) {
                          e.preventDefault();
                          scrollToSection(item.hash);
                        }
                      }}
                      
                      className="links__link"
                    >
                      <span className="links__dot"></span>
                      <span className='list__Name'>{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="footer__contact">
            <h4 className="contact__title">Get in Touch</h4>
            <div className="contact__list">
              <a href="tel:+917837840785" className="contact__item">
                <div className="contact__icon-wrapper">
                  <Phone className="contact__icon" />
                </div>
                <div className="contact__info">
                  <p className="contact__label">Call Us</p>
                  <p className="contact__value">+91 783-784-0785</p>
                </div>
              </a>

              <a href="mailto:support@propertydekho247.com" className="contact__item">
                <div className="contact__icon-wrapper">
                  <Mail className="contact__icon" />
                </div>
                <div className="contact__info">
                  <p className="contact__label">Support</p>
                  <p className="contact__value">support@propertydekho247.com</p>
                </div>
              </a>
              <a href="mailto:sales@propertydekho247.com" className="contact__item">
                <div className="contact__icon-wrapper">
                  <Mail className="contact__icon" />
                </div>
                <div className="contact__info">
                  <p className="contact__label">Sales</p>
                  <p className="contact__value">sales@propertydekho247.com</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer__copyright">
          <p>Copyright © 2024 Propfuture AI Technologies Pvt. Ltd. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
