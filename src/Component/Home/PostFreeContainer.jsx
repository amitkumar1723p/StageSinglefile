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
    <div className="post-free-container">
      <div className="post-free-content">
        <div className="post-free-image">
          <img
            src="/img/postfreepost.svg"
            alt="Couple on device"
            className="post-free-img"
          />
        </div>
        <div className="post-free-text">
          <div className="Post-free-heading-box">
            <h2 className="post-free-title">
              List Your Property with PropertyDekho247
            </h2>
           
            {/* <p className="post-free-description">
            Typically, when an owner seeks to sell their property, they rely on
            various stakeholders or property listing portals. However, due to
            limited options or a lack of market insight, sellers often struggle
            to achieve the best price. Our technology platform simplifies and
            enhances the selling process, ensuring sellers achieve the best
            price through direct buyer offers.
          </p> */}
          
            <p className="post-free-call">
              PropertyDekho247.com India’s 1st Online Reselling platform with
              100% transparency
            </p>
          </div>
          <div className="point-in-post-free">
            <p className="post-free-p">
              <span>&#x2713;</span> 100% Verified Buyer’s
            </p>
            <p className="post-free-p">
              <span>&#x2713;</span> A real-time alert for scheduling a
              property visit’s
            </p>
            <p className="post-free-p">
              <span>&#x2713;</span> Real time notification of Price offer by
              buyer's
            </p>
            <p className="post-free-p">
              <span>&#x2713;</span> Sell Property at highest price offer
            </p>
          </div>
          <button
            className="post-free-button"
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
