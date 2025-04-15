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
import "./singlefreshfooter.css"



const Footer = () => {
  


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
    // { name: 'Services', hash: "OurService" } // Make sure the section has this ID in your home page
    { name: "Services", url: "/Our-Service" }
  ];

  const companyLinks = [
    { name: 'FAQs', hash: 'FAQ-SECTION' },
    // { name: 'Careers', url: "/Career" },
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
            India's first online Proptech platform that delivers real-time price alerts to property owners. We focused on building Transparency, Trust with fair price value.

            </p>
            {/* <div className="company__social">
              {socialIcons.map(({ Icon, link }, index) => (
                <a key={index} href={link} className="social__link">
                  <Icon className="social__icon" />
                </a>
              ))}
            </div> */}
             <div className="single-fresh-footer__social-links">
            <ul className='Single-Fresh-booking-footer-link'>
  <li className="icon-content">
    <a
      href="https://www.linkedin.com/company/propertydekho247/"
      aria-label="LinkedIn"
      data-social="linkedin"
    >
      <div className="filled" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="currentColor"
        className="bi bi-linkedin"
        viewBox="0 0 16 17"
        xmlSpace="preserve"
      >
        <path
          d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"
          fill="currentColor"
        />
      </svg>
    </a>
    <div className="Single-fresh-footer-tooltip">LinkedIn</div>
  </li>
 
  <li className="icon-content">
    <a
      href="https://www.instagram.com/propertydekho24x7/"
      aria-label="Instagram"
      data-social="instagram"
    >
      <div className="filled" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="currentColor"
        className="bi bi-instagram"
        viewBox="0 0 16 16"
        xmlSpace="preserve"
      >
        <path
          d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"
          fill="currentColor"
        />
      </svg>
    </a>
    <div className="Single-fresh-footer-tooltip">Instagram</div>
  </li>
  <li className="icon-content">
    <a href="https://www.facebook.com/people/PropertyDekho247/61572085979323/" aria-label="facebook" data-social="facebook">
      <div className="filled" />
      <svg
  xmlns="http://www.w3.org/2000/svg"
  width={16}
  height={16}
  fill="currentColor"
  viewBox="0 0 24 24"
>
  <path d="M22.675 0h-21.35C.592 0 0 .593 0 1.326v21.348C0 23.406.592 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.796.143v3.24l-1.918.001c-1.504 0-1.796.716-1.796 1.765v2.317h3.59l-.467 3.622h-3.123V24h6.127C23.407 24 24 23.406 24 22.674V1.326C24 .593 23.407 0 22.675 0z"/>
</svg>
    </a>
    <div className="Single-fresh-footer-tooltip">Facebook</div>
  </li>
  <li className="icon-content">
    <a href="https://x.com/PropetyDekho247" aria-label="twitter" data-social="twitter">
      <div className="filled" />
      <svg
  xmlns="http://www.w3.org/2000/svg"
  width={16}
  height={16}
  fill="currentColor"
  viewBox="0 0 24 24"
>
  <path d="M21.27 2H17.7L12.42 8.6L6.91 2H2L9.61 10.65L2.25 21.96H5.91L11.66 14.76L17.58 21.96H22L14.06 12.72L21.27 2ZM16.59 3.5H18.31L9.7 18.47H7.95L16.59 3.5Z"/>
</svg>
    </a>
    <div className="Single-fresh-footer-tooltip">Twitter</div>
  </li>
  </ul>
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
                      href={item.url} target="_blank"
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

              {/* <a
                    target='blank'
                      href="/Career"
                      className="links__link"
                    >
                      <span className="links__dot"></span>
                      <span className='list__Name'>Career</span>
                    </a> */}

              {/* <a
                    target='blank'
                      href="/Our-Service"
                      className="links__link"
                    >
                      <span className="links__dot"></span>
                      <span className='list__Name'>Services</span>
                    </a> */}
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
                     
                      href="/Report"
                      target='blank'
                      className="links__link"
                    >
                      <span className="links__dot"></span>
                      <span className='list__Name'>Report</span>
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
                  <li  className="links__item">
                    <a
                     
                      href="/blog-page"
                      target='blank'
                      className="links__link"
                    >  
                      <span className="links__dot"></span>
                      <span className='list__Name'>Blogs</span>
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
                      href={item.url} target="_blank"
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
