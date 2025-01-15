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
          <span>What is a reserve price, and how is it calculated?</span>
          <span className="toggle-icon">{activeIndex === 1 ? "-" : "+"}</span>
        </div>
        {/* {activeIndex === 1 && (
          <div className="faq-answer">
            <p className="faq-answer1">
              Prop future Offer provides you with a GUARANTEED SELLING PRICE for
              your home. And if we are unable to sell it in 3 months, you can
              forfeit a part of our token!
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
          <span>How much time will it take to sell my property?</span>
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
          <span>
            <span>What happens when I receive more than one offer for my property?</span>
          </span>
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
          <span>
          What happens if my property doesn't sell within the expected timeframe?
          </span>
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
          <span>Who will take care of the registration paperwork?</span>
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
          <span>How can I verify if a buyer is serious?</span>
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
      <div className={`faq-item ${activeIndex === 7 ? "active" : ""}`}>
        <div className="faq-question" onClick={() => toggleAnswer(7)}>
          <span>Is it possible to revise my price during the sale process?</span>
          <span className="toggle-icon">{activeIndex === 5 ? "-" : "+"}</span>
        </div>
        {/* {activeIndex === 7 && (
          <div className="faq-answer">
            <p className="faq-answer1">
              <b>Ans:</b> Yes, REimagineHome is free to use. You can explore all
              the services, view properties, and get personalized suggestions
              without any cost.
            </p>
          </div>
        )} */}
      </div>
      <div className={`faq-item ${activeIndex === 8 ? "active" : ""}`}>
        <div className="faq-question" onClick={() => toggleAnswer(8)}>
          <span>What if I change my mind about selling my property ?</span>
          <span className="toggle-icon">{activeIndex === 8 ? "-" : "+"}</span>
        </div>
        {/* {activeIndex === 8 && (
          <div className="faq-answer">
            <p className="faq-answer1">
              <b>Ans:</b> Yes, REimagineHome is free to use. You can explore all
              the services, view properties, and get personalized suggestions
              without any cost.
            </p>
          </div>
        )} */}
      </div>
      <div className={`faq-item ${activeIndex === 9 ? "active" : ""}`}>
        <div className="faq-question" onClick={() => toggleAnswer(9)}>
          <span>Do I have to accept every offer I receive?</span>
          <span className="toggle-icon">{activeIndex === 9 ? "-" : "+"}</span>
        </div>
        {/* {activeIndex === 9 && (
          <div className="faq-answer">
            <p className="faq-answer1">
              <b>Ans:</b> Yes, REimagineHome is free to use. You can explore all
              the services, view properties, and get personalized suggestions
              without any cost.
            </p>
          </div>
        )} */}
      </div>
      <div className={`faq-item ${activeIndex === 10 ? "active" : ""}`}>
        <div className="faq-question" onClick={() => toggleAnswer(10)}>
          <span>Can I remove my listing?</span>
          <span className="toggle-icon">{activeIndex === 10 ? "-" : "+"}</span>
        </div>
        {/* {activeIndex === 10 && (
          <div className="faq-answer">
            <p className="faq-answer1">
              <b>Ans:</b> Yes, REimagineHome is free to use. You can explore all
              the services, view properties, and get personalized suggestions
              without any cost.
            </p>
          </div>
        )} */}
      </div>

      <div className={`faq-item ${activeIndex === 11 ? "active" : ""}`}>
        <div className="faq-question" onClick={() => toggleAnswer(11)}>
          <span> Is my personal information secure on the platform?</span>
          <span className="toggle-icon">{activeIndex === 11 ? "-" : "+"}</span>
        </div>
        {/* {activeIndex === 10 && (
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
