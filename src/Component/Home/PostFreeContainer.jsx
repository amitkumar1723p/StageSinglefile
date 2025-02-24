import React from "react";
import "./PostFreeContainer.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const PostFreeContainer = () => {
  const navigate = useNavigate();
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });
  return (
    <div className="property-list-container">
    <div className="property-list">
    <div className="property-list-left">
        <img
          alt="landlord-img"
          src="/img/postfreepost.svg"
        />
      </div>
      <div className="property-list-right">
      <div className="property-list-heading-container">
      <h2 className="property-list-heading">List Your Property with PropertyDekho247</h2>


       {/* <p className="post-free-description">
            Typically, when an owner seeks to sell their property, they rely on
            various stakeholders or property listing portals. However, due to
            limited options or a lack of market insight, sellers often struggle
            to achieve the best price. Our technology platform simplifies and
            enhances the selling process, ensuring sellers achieve the best
            price through direct buyer offers.
          </p> */}
      <p >PropertyDekho247.com India's 1st Online Reselling platform with 100% transparency</p>
      </div>
        
        <ul className="property-list-content">
            <li><span>&#x2713;</span> 100% Verified Buyer’s</li>
            <li> <span>&#x2713;</span> A real-time alert for scheduling a
            property visit’s</li>
            <li> <span>&#x2713;</span> Real time notification of Price offer by
            buyer's</li>
            <li><span>&#x2713;</span> Sell Property at highest price offer
            </li>
        </ul>
        <button
            className="property-list-button"
            onClick={() => {
              if (medata && medata.IsAuthenticated === true) {
                navigate("/user/post");
              } else {
                navigate("/login");
              }
            }}
          >
            Get Started !
          </button>
      </div>
    </div>
      
    </div>
  );
};
export default PostFreeContainer;
