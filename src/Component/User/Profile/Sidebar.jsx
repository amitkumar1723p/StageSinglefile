import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Sidebar.css"; // Import the regular CSS file

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  let startX = 0; // To track swipe start position

  const location = useLocation();
  const handleSwipe = (event) => {
    if (event.type === "touchstart") {
      startX = event.touches[0].clientX;
    } else if (event.type === "touchmove") {
      const diffX = event.touches[0].clientX - startX;
      if (diffX > 50) {
        setIsOpen(true); // Open sidebar on swipe
      }
    }
  };

  return (
    <>
      {/* Overlay to close sidebar when clicking outside */}
      {isOpen && (
        <div className="overlay" onClick={() => setIsOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside
        className={`sidebar-profile ${isOpen ? "open" : ""}`}
        onTouchStart={handleSwipe}
        onTouchMove={handleSwipe}
      >
        <div className="logo"></div>
        <nav>
          <ul className="navList">
            <NavLink to="/user">
              <li
                className={`navItem ${
                  location.pathname == "/user" ? "active-btn-nav" : ""
                }`}
              >
                <img className="" src="/img/Profile.svg" alt="profile" />
                Profile
              </li>
            </NavLink>
            <NavLink to="/user/my-listing ">
              <li
                className={`navItem ${
                  location.pathname == "/user/my-listing"
                    ? "active-btn-nav"
                    : ""
                } `}
              >
                <img className="" src="/img/MyListing.svg" alt="my listing" />
                My Listing
              </li>
            </NavLink>
            <NavLink to="/user/my-post/all-visits">
              <li className="navItem mob-hide ">
                <img
                  className="icons"
                  src="/img/NewLeads.svg"
                  alt="my-visits"
                />
                All Response
              </li>
            </NavLink>
            <NavLink to="/user/post">
              <li className="navItem mob-hide">
                <img
                  className=""
                  src="/img/PostProperty.svg"
                  alt="post property"
                />
                Post Property - Free
              </li>
            </NavLink>
            <NavLink to="/user/favourite-post">
              <li
                className={`navItem ${
                  location.pathname == "/user/favourite-post"
                    ? "active-btn-nav"
                    : ""
                }`}
              >
                <img className="" src="/img/Fav-Post.svg" alt="shortlisted" />
                Shortlisted Property
              </li>
            </NavLink>
            {/* <NavLink to="#">
              <li className="navItem mob-hide">
                <img
                  className="icons"
                  src="/img/Transactions.svg"
                  alt="transactions"
                />
                Transactions
              </li>
            </NavLink> */}
            <NavLink to="/user/my-visits">
              <li
                className={`navItem ${
                  location.pathname == "/user/my-visits" ? "active-btn-nav" : ""
                }`}
              >
                <img className="" src="/img/admin.svg" alt="my-visits" />
                Schedule Visit
              </li>
            </NavLink>

            <NavLink to="#">
              <li className="navItem mob-hide">
                <img
                  className=""
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                    <g clip-path="url(#clip0_2521_14624)">
                    <path d="M16.2628 17.9095C16.4838 17.9095 16.6957 17.8217 16.852 17.6654C17.0083 17.5091 17.0961 17.2972 17.0961 17.0762V16.0378C17.0994 13.6995 13.7844 11.8678 10.4294 11.8678C7.07442 11.8678 3.76276 13.6995 3.76276 16.0378V17.0762C3.76276 17.2972 3.85055 17.5091 4.00683 17.6654C4.16311 17.8217 4.37508 17.9095 4.59609 17.9095H16.2628ZM13.4328 6.32951C13.4328 6.72391 13.3551 7.11445 13.2041 7.47883C13.0532 7.84321 12.832 8.1743 12.5531 8.45318C12.2742 8.73207 11.9431 8.95329 11.5787 9.10422C11.2144 9.25515 10.8238 9.33284 10.4294 9.33284C10.035 9.33284 9.64448 9.25515 9.2801 9.10422C8.91572 8.95329 8.58463 8.73207 8.30575 8.45318C8.02686 8.1743 7.80564 7.84321 7.6547 7.47883C7.50377 7.11445 7.42609 6.72391 7.42609 6.32951C7.42609 5.53297 7.74251 4.76906 8.30575 4.20583C8.86898 3.64259 9.63289 3.32617 10.4294 3.32617C11.226 3.32617 11.9899 3.64259 12.5531 4.20583C13.1163 4.76906 13.4328 5.53297 13.4328 6.32951Z" stroke="#0078D4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M17.462 13.5748C17.8554 13.206 18.0961 12.6766 18.0961 12.0748C18.0961 10.9224 17.2116 10.0332 16.0611 10.0332C14.9145 10.0332 14.0128 10.906 14.0128 12.0633C14.0128 12.6088 14.2066 13.1334 14.5945 13.5247C14.6114 13.5418 14.6285 13.5585 14.646 13.5748H14.2211V14.5748V19.5748V20.5748H15.2211H16.8878H17.8878V19.5748V14.5748V13.5748H17.462Z" fill="#0078D4" stroke="white" stroke-width="2"/>
                    </g>
                     <defs>
                     <clipPath id="clip0_2521_14624">
                      <rect width="20" height="20" fill="white" transform="translate(0.429443 0.617188)"/>
                     </clipPath>
                     </defs>
                    </svg>
                  `)}`}
                  alt="about us"
                />
                About Us
              </li>
            </NavLink>
            <NavLink to="/terms-and-conditions">
              <li className="navItem mob-hide">
                <img
                  className=""
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(`
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="17" viewBox="0 0 15 17" fill="none">
                  <path d="M1.43044 2.61719C1.43044 2.08675 1.64116 1.57805 2.01623 1.20297C2.3913 0.827901 2.90001 0.617188 3.43044 0.617188H8.01544C8.21253 0.61723 8.40768 0.656111 8.58973 0.731608C8.77178 0.807106 8.93717 0.91774 9.07644 1.05719L12.9904 4.97119C13.2718 5.25222 13.4301 5.6335 13.4304 6.03119V7.69919C13.7225 7.80291 13.9752 7.99454 14.1539 8.24774C14.3327 8.50094 14.4285 8.80327 14.4284 9.11319V13.1162C14.4285 13.4261 14.3327 13.7284 14.1539 13.9816C13.9752 14.2348 13.7225 14.4265 13.4304 14.5302V14.6172C13.4304 15.1476 13.2197 15.6563 12.8447 16.0314C12.4696 16.4065 11.9609 16.6172 11.4304 16.6172H3.42944C2.89901 16.6172 2.3903 16.4065 2.01523 16.0314C1.64016 15.6563 1.42944 15.1476 1.42944 14.6172V14.5302C1.13719 14.4269 0.884121 14.2355 0.705049 13.9825C0.525976 13.7295 0.429694 13.4272 0.429443 13.1172V9.11419C0.429488 8.80403 0.525674 8.50152 0.70476 8.24829C0.883846 7.99506 1.13703 7.80357 1.42944 7.70019L1.43044 2.61719ZM12.4304 6.61719H8.93044C8.73338 6.61732 8.53822 6.57862 8.35611 6.50329C8.17401 6.42797 8.00853 6.3175 7.86914 6.1782C7.72974 6.0389 7.61916 5.8735 7.54372 5.69144C7.46828 5.50939 7.42944 5.31425 7.42944 5.11719V1.61719H3.42944C3.16423 1.61719 2.90987 1.72254 2.72234 1.91008C2.5348 2.09762 2.42944 2.35197 2.42944 2.61719V7.61319H12.4294L12.4304 6.61719ZM2.42944 14.6162C2.42931 14.7476 2.45508 14.8777 2.50528 14.9992C2.55547 15.1206 2.62911 15.231 2.72198 15.3239C2.81485 15.4169 2.92514 15.4907 3.04653 15.541C3.16792 15.5913 3.29804 15.6172 3.42944 15.6172H11.4294C11.5609 15.6172 11.691 15.5913 11.8124 15.541C11.9338 15.4907 12.044 15.4169 12.1369 15.3239C12.2298 15.231 12.3034 15.1206 12.3536 14.9992C12.4038 14.8777 12.4296 14.7476 12.4294 14.6162H2.42944ZM8.42944 1.82419V5.11719C8.42944 5.2498 8.48212 5.37697 8.57589 5.47074C8.66966 5.56451 8.79684 5.61719 8.92944 5.61719H12.2214L8.42944 1.82419ZM1.93144 8.61319C1.79884 8.61319 1.67166 8.66587 1.57789 8.75963C1.48412 8.8534 1.43144 8.98058 1.43144 9.11319V13.1162C1.43144 13.2488 1.48412 13.376 1.57789 13.4697C1.67166 13.5635 1.79884 13.6162 1.93144 13.6162H12.9284C13.0611 13.6162 13.1882 13.5635 13.282 13.4697C13.3758 13.376 13.4284 13.2488 13.4284 13.1162V9.11319C13.4284 8.98058 13.3758 8.8534 13.282 8.75963C13.1882 8.66587 13.0611 8.61319 12.9284 8.61319H1.93144Z" fill="#0078D4"/>
                  </svg>
                  `)}`}
                  alt="terms and conditions"
                />
                Terms and Conditions
              </li>
            </NavLink>
            <NavLink to="#">
              <li className="navItem mob-hide">
                <img className="" src="/img/support.png" alt="support" />
                Support
              </li>
            </NavLink>
            <NavLink to="#">
              <li className="navItem mob-hide">
                <img className="" src="/img/FAQs.svg" alt="FAQs" />
                FAQs
              </li>
            </NavLink>
            <NavLink to="/user/post/response">
              <li className="navItem mob-hide">
                <img
                  className=""
                  src="/img/MyListing.svg"
                  alt="post response"
                />
                Your Post Response
              </li>
            </NavLink>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
