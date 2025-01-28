import React from "react";
import "./HowItWorks";

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <h2>How it Works</h2>
      <div className="steps-container">
        <div className="step" id="step1">
          <div className="step-number">Step 1</div>
          <p>The team should conduct a proof of concept.</p>
        </div>
        <div className="step" id="step2">
          <div className="step-number">Step 2</div>
          <p>The team should start by outlining the milestones.</p>
        </div>
        <div className="step" id="step3">
          <div className="step-number">Step 3</div>
          <p>The team should monitor the process efficiency.</p>
        </div>
        <div className="step" id="step4">
          <div className="step-number">Step 4</div>
          <p>The team makes final adjustments to the process.</p>
        </div>
        <div className="step" id="step5">
          <div className="step-number">Step 5</div>
          <p>The team should create a visual representation.</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
