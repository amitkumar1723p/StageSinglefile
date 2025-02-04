import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" custom-footer bg-[var(--main-light-clr)] font-sans pt-[30px]">
      <div className="footer-container flex justify-evenly max-w-[1200px] mx-auto flex-wrap">
        {/* Logo and Description */}
        <div className="footer-column     ">
          <h3 className="footer-heading text-[20px] mb-[20px] text-white font-bold">
            Property<span>Dekho247.com </span>
          </h3>

          <div className="social-icons flex">
            <Link to="https://www.linkedin.com/in/property-dekho-231b66346">
              <img
                className="footer-img text-white w-[25px] mr-2 text-xl transition-colors duration-300 ease-in-out no-underline"
                src="/img/linkin.png"
                alt="linkedin"
              />
            </Link>
            <Link to="https://www.instagram.com/propertydekho24x7/">
              <img
                className="footer-img text-white w-[25px] mr-2 text-xl transition-colors duration-300 ease-in-out no-underline"
                src="/img/insta.png"
                alt="instagram"
              />
            </Link>
            <Link to="https://www.facebook.com/profile.php?id=61572085979323 ">
              <img
                className="footer-img text-white w-[25px] mr-2 text-xl transition-colors duration-300 ease-in-out no-underline"
                src="/img/fb.png"
                alt="fb"
              />
            </Link>
            <Link to="https://x.com/PropetyDekho247">
              <img 
              className="footer-img text-white w-[25px] mr-2 text-xl transition-colors duration-300 ease-in-out no-underline" 
              src="/img/Tw.png" alt="tw" />
            </Link>
            {/* <Link to="#">
              <img
                className="footer-img"
                src="/img/yt.png"
                alt="yt"
              />
            </Link> */}
           
          </div>
        </div>
        {/* Product Links */}
        <div className="footer-column text-[20px]  text-white fond-bold">
          <h3 className="font-bold text-white">Quick Links</h3>
          <ul>
            <li>
              <Link
              className="font-light text-sm text-white no-underline "
               to="/">Home</Link>
            </li>
            <li  className="mb-[10px]">
              <Link
              className="font-light text-sm text-white no-underline " 
              to="#">About Us</Link>
            </li >
            {/* <li  className="mb-[10px]">
                <Link
                className="font-light text-sm text-white no-underline" 
                to="#">Buy with Us</Link>
            </li> */}
          </ul>
        </div>
        {/* Useful Links */}
        <div className="footer-column text-[20px] ">
          <h3 className="font-bold text-white">Company</h3>
          <ul className="list-none">
            <li className="mb-[10px]">
              <Link
              className="font-light text-sm text-white no-underline "
                to="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </Link>
            </li>
            <li className="mb-[10px]">
             
              <Link
              className="font-light text-sm text-white no-underline"
                to="/terms-and-conditions"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms and Conditions
              </Link>
            </li>
            <li className="mb-[10px]">
              <Link
              className="font-light text-sm text-white no-underline" 
              to="#"
              >FAQs</Link>
            </li>
            {/* <li className="mb-[10px]">
              <Link
              className="font-light text-sm text-white no-underline " 
              to="#">Blogs</Link>
            </li> */}
          </ul>
        </div>

        {/* Address Section */}
        <div className="footer-column text-[20px] ">
          <h3 className="font-bold text-white">Contact</h3>
          <p className="text-[14px] text-white mb-[15px] font-medium">+91 783-784-0785</p>
          <p className="text-[14px] text-white mb-[15px] font-medium">Support@propertydekho247.com</p>
          <p className="text-[14px] text-white mb-[15px] font-medium">Sales@propertydekho247.com</p>
        </div>
        <div>
          <p className="text-white text-sm font-medium leading-normal mx-2 pb-0.5 text-center ">
            Copyright © 2024 Propfuture AI Technologies Pvt. Ltd. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
