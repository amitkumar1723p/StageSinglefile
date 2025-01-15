import React, { useState } from "react";
import "./FAQ.css";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Collapse the answer if clicked again
    } else {
      setActiveIndex(index); // Open the clicked answer
    }
  };

  return (
    <div className="faq-container">
       
       <h2 className="underline-on-text">
         Frequently Asked  <span>Questions</span>
      </h2>
      <p className="faq-heading">
        Get Quick Solutions and Expert Advice for All Your Real Estate Needs
      </p>

      {/* FAQ Item 1 */}
      <div className={`faq-item ${activeIndex === 1 ? "active" : ""}`}>
        <div className="faq-question" onClick={() => toggleAnswer(1)}>
          <span> Meaning of reserve price ?</span>
          <span className="toggle-icon">{activeIndex === 1 ? "-" : "+"}</span>
        </div>
        {/* {activeIndex === 1 && (
          <div className="faq-answer">
            <p className="faq-answer1">
            Meaning of reserve price ?
              <br />
              Our offer price is determined based on our proprietary algorithms
              which track 80 lacs+ property registrations and market surveys,
              thereby offering you a fair and transparent property evaluation.
              <br />
              If we sell your home at a price above the guaranteed price, you
              will also receive 50% of the upside.
            </p>
          </div>
        )} */}
      </div>

      {/* FAQ Item 2 */}
      <div className={`faq-item ${activeIndex === 2 ? "active" : ""}`}>
        <div className="faq-question" onClick={() => toggleAnswer(2)}>
          <span>Meaning of Verified Property ?</span>
          <span className="toggle-icon">{activeIndex === 2 ? "-" : "+"}</span>
        </div>
        {/* {activeIndex === 2 && (
          <div className="faq-answer">
            <p className="faq-answer1">
              <b>Ans:</b> Yes, REimagineHome is free to use. You can explore all
              the services, view properties, and get personalized suggestions
              without any cost.
            </p>
          </div>
        )} */}
      </div>

      {/* FAQ Item 3 */}
      <div className={`faq-item ${activeIndex === 3 ? "active" : ""}`}>
        <div className="faq-question" onClick={() => toggleAnswer(3)}>
          <span>How I can schedule a property visit ?</span>
          <span className="toggle-icon">{activeIndex === 3 ? "-" : "+"}</span>
        </div>
        {/* {activeIndex === 3 && (
          <div className="faq-answer">
            <p className="faq-answer1">
              <b>Ans:</b> Yes, REimagineHome is free to use. You can explore all
              the services, view properties, and get personalized suggestions
              without any cost.
            </p>
          </div>
        )} */}
      </div>

      {/* FAQ Item 4 */}
      <div className={`faq-item ${activeIndex === 4 ? "active" : ""}`}>
        <div className="faq-question" onClick={() => toggleAnswer(4)}>
          <span>If I am interested to close the deal, what is the next step ?</span>
          <span className="toggle-icon">{activeIndex === 4 ? "-" : "+"}</span>
        </div>
        {/* {activeIndex === 4 && (
          <div className="faq-answer">
            <p className="faq-answer1">
              <b>Ans:</b> Yes, REimagineHome is free to use. You can explore all
              the services, view properties, and get personalized suggestions
              without any cost.
            </p>
          </div>
        )} */}
      </div>

      {/* FAQ Item 5 */}
      <div className={`faq-item ${activeIndex === 5 ? "active" : ""}`}>
        <div className="faq-question" onClick={() => toggleAnswer(5)}>
          <span>How can I see how many others have placed offers and their amounts</span>
          <span className="toggle-icon">{activeIndex === 5 ? "-" : "+"}</span>
        </div>
        {/* {activeIndex === 5 && (
          <div className="faq-answer">
            <p className="faq-answer1">
              <b>Ans:</b> Yes, REimagineHome is free to use. You can explore all
              the services, view properties, and get personalized suggestions
              without any cost.
            </p>
          </div>
        )} */}
      </div>
      <div className={`faq-item ${activeIndex === 6 ? "active" : ""}`}>
        <div className="faq-question" onClick={() => toggleAnswer(6)}>
          <span>Can I modify my offer when someone exceeds my offered Price ?</span>
          <span className="toggle-icon">{activeIndex === 6 ? "-" : "+"}</span>
        </div>
        {/* {activeIndex === 6 && (
          <div className="faq-answer">
            <p className="faq-answer1">
              <b>Ans:</b> Yes, REimagineHome is free to use. You can explore all
              the services, view properties, and get personalized suggestions
              without any cost.
            </p>
          </div>
        )} */}
      </div>
      
    </div>
  );
};

export default FAQ;
