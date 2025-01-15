import React, { useState } from "react";
import "./SinglePostDetails.css";

export default function PropertyDataBox({ Answer, Icon, Data, Id }) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (Id) {
      setIsVisible(!isVisible);
    }
  };

  return (
    <div className="overview-box">
      <div className="img-icon">
        <img className="icon-overview" src={Icon} alt="icon" />
      </div>

      <div className="para-span" id={Id}>
        <p className="p-ans">{Answer}</p>
        <p className="p-deta">
          {Data}

          
        </p>
       

        {/* Conditional rendering of content based on visibility */}
        {isVisible && Id && (
          <div className="main_hide">
            <p className="postDirect_detail">
              Upon exiting the main door, you will be facing this direction
            </p>
          </div>
        )}
      </div>
      {Data === "Property Direction" ? (
            <button
              className="i-icon-section"
              onMouseEnter={() => setIsVisible(true)}
              onMouseOut={() => setIsVisible(false)}
            >
              <img
                onMouseEnter={() => setIsVisible(true)}
                onMouseOut={() => setIsVisible(false)}
                src="/img/i-icon.png"
                alt="Icon"
                className="hover-icon"
              />
            </button>
          ) : null}
    </div>
  );
}
