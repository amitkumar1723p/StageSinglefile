import React from "react";
import "./WhoWeAre.css"; // Importing the updated CSS file

const WhoWeAre = () => {
  return (
    <div className="who-we-are-main-container">
      <div className="who-we-are">
        <div className="whoweare-heading">
          <h2 className="whoweare-h2 ">Who We Are</h2>
          {/* <p className="whoweare-p">
            A Seamless and Reliable Path to Your New Home, with Services
            Designed for Your Confidence and Convenience.
          </p> */}
        </div>
        <div className="who-we-are-box">
          <div className="quote-left">“</div>
          <p className="description">
            PropertyDekho247.com is an innovative Proptech platform that
            transforms the traditional property buying and selling process into
            a fully digital experience. As the first online platform to provide
            real-time price alerts to property owners, we ensure complete
            transparency and a seamless user journey. Our platform targets to ensure the best market prices and offers comprehensive transaction support,
            including legal documentation and property registration, ensuring a
            smooth and hassle-free process from start to finish.
          </p>
          <div className="quote-right">”</div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
