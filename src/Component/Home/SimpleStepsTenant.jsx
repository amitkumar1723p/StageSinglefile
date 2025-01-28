import React, { useEffect } from "react";
import "./SimpleSteps.css";

const SimpleStepsBuyer = () => {
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
            <img src="/img/StartExploring.png" alt="Start Exploring" />
            <h3>Start Exploring</h3>
            <p>
              Start exploring our verified listings & select a property that
              meets your requirements.
            </p>
          </div>
          
        </div>

        <div className="simple-step-card" id="step2">
          <div className="howwework-data">
          <img src="/img/ConnectwithUs.png" alt="Start Exploring" />
            <h3>Lets Connect</h3>
            <p>For more details about property, speak to our representative.</p>
          </div>
        
        </div>

        <div className="simple-step-card" id="step3">
          <div className="howwework-data">
          <img src="/img/ScheduleyourVisit.png" alt="Start Exploring" />
            <h3>Schedule Property Visit</h3>
            <p>
              Give us the opportunity to showcase your selected property in person.
            </p>
          </div>
          
        </div>

        <div className="simple-step-card" id="step4">
          <div className="howwework-data">
          <img src="/img/SubmityourOffer.png" alt="Start Exploring" />
            <h3>Submit your offer</h3>
            <p>
              Offer your best price online by researching the current market
              value, considering the property's conditions.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default SimpleStepsBuyer;
