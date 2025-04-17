import React, { useEffect } from "react";
import "./SimpleSteps.css";

const SimpleSteps = () => {
  useEffect(() => {
    const cards = document.querySelectorAll(".simple-step-card");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-card");
        }
      });
    }, { threshold: 0.5 });

    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="simple-steps-section">
      <div className="simple-steps-container">
        <div className="simple-step-card" id="step1">
          <div className="howwework-data">
          <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/IntroduceyourProperty.png" alt="Start Exploring" />
            <h3>Introduce yourself and your property</h3>
            <p>
              Discover your property's market value - Let's calculate and decide
              with confidence!
            </p>
          </div>
          {/* <div className="deal">
            <img
              src="/img/sellall.png"
              alt="Property Requirement Icon"
              className="step-image"
            />
          </div> */}
        </div>

        <div className="simple-step-card" id="step2">
          <div className="howwework-data">
          <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/ListyourPropertyFree.png" alt="Start Exploring" />
            <h3> List Your Property Free</h3>
            <p>
              List your property on our website with pictures, videos, and other
              important information like the price, size, location, etc.
            </p>
          </div>
          {/* <div className="deal">
            <img
              src="/img/sellall.png"
              alt="Property Requirement Icon"
              className="step-image"
            />
          </div> */}
        </div>

        <div className="simple-step-card" id="step3">
          <div className="howwework-data">
          <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/GetOffersOnline.png" alt="Start Exploring" />
            <h3>Get Real Time Offers</h3>
            <p>
              Interested buyers will submit their offer prices online, and you'll
              get real-time notifications.
            </p>
          </div>
          {/* <div className="deal">
            <img
              src="/img/sellall.png"
              alt="Property Requirement Icon"
              className="step-image"
            />
          </div> */}
        </div>

        <div className="simple-step-card" id="step4">
          <div className="howwework-data">
          <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/AcceptOffer.png" alt="Start Exploring" />
            <h3>Get Close</h3>
            <p>
              Let's accept the offer and invite the prospective buyer to finalize the transaction.
            </p>
          </div>
          {/* <div className="deal">
            <img
              src="/img/sellall.png"
              alt="Property Requirement Icon"
              className="step-image"
            />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default SimpleSteps;
