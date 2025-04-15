import React from "react";
import "./PostFreeContainer.css";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { UserContext } from "../CreateContext/CreateContext";
const PostFreeContainer = () => {
   const { setRedirectPath } =useContext(UserContext);
  const navigate = useNavigate();
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });
  return (
    <div className="home-banner-container">
      <div className="home-banner-content">
        <div className="home-banner-text">
          <h2 className="home-banner-title">
            LIST YOUR PROPERTY{" "}
            <span className="home-banner-span">WITH</span>
          </h2>
          <h3 className="home-banner-subtitle">PROPERTYDEKHO247</h3>
          <p className="home-banner-description">
            India's 1st online proptech platform that delivers real-time
            price alerts to property owners.
          </p>
          <ul className="home-banner-list">
            <li className="home-banner-list-item">
              <img
                src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/TickIconBuyer.svg"
                alt="TickIconBuyer"
                className="home-banner-icon"
              />
              <span>100% Verified Buyers</span>
            </li>
            <li className="home-banner-list-item">
              <img
                src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/TickIconBuyer.svg"
                alt="TickIconBuyer"
                srcset=""
                className="home-banner-icon"
              />
              <span>
                A real-time alert for scheduling a property visit's
              </span>
            </li>
            <li className="home-banner-list-item">
              <img
                src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/TickIconBuyer.svg"
                alt="TickIconBuyer"
                className="home-banner-icon"
              />
              <span>
                Real time notification of Price offer by buyer's
              </span>
            </li>
            <li className="home-banner-list-item">
              <img
                src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/TickIconBuyer.svg"
                alt="TickIconBuyer"

                className="home-banner-icon"
              />
              <span>Sell Property at highest price offer</span>
            </li>
          </ul>
           
            <button 
            
            onClick={() => {
              if (medata && medata.IsAuthenticated == true) {
                navigate("/user/post");
              } else {
                setRedirectPath("/user/post");
                navigate("/login");
              }
              }} 
              
              
              className="home-banner-button">GET STARTED NOW</button>
          
        </div>
        <div className="home-banner-image">
          <img
            src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/ListYourProp.png"
            alt="Illustration of people shaking hands in front of a house"
            className="home-banner-img"
          />
        </div>
      </div>
    </div>
  );
};
export default PostFreeContainer;

