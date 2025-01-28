import React, { useState } from "react";
import "./FAQ.css";

const FAQ = () => {
  return (
    <div className="accordion" id="accordionPanelsStayOpenExample">
      <div className="heading-faq">
          <h2 className="heading-section-faq">
            Frequently Asked <span>Questions</span>
          </h2>
          <p className="faq-heading">
            Get Quick Solutions and Expert Advice for All Your Real Estate Needs
          </p>
        </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            What is a reserve price, and how is it calculated? 
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse show"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionPanelsStayOpenExample"
        >
          <div className="accordion-body">
            Reserve Price is the expected minimum price on which you propose to
            sell your property. We recommend fair market price of your property
            competitively based on various factors including but not limited to
            on online tools, market/bank valuations and recently sold out
            similar properties record in the same locality. Our Recommended
            Price Range will help you in determining the fair price for your
            property and accordingly you may fix the reserve price.
          </div>
        </div>
      </div>

      {/* <!-- FAQ Item 2 --> */}
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            How much time will it take to sell my property?
          </button>
        </h2>
        <div
          id="collapseTwo"
          className="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionPanelsStayOpenExample"
        >
          <div className="accordion-body">
            Our endeavor will be and we will put our best efforts to assist you
            in selling your property at the earliest. However the time it takes
            to sell a property online can vary depending upon various factors
            such as demand, pricing, and property condition etc. Some sellers
            may receive offers very quickly, while others may take few weeks to
            find the right buyer.
          </div>
        </div>
      </div>

      {/* <!-- FAQ Item 3 --> */}
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            What happens when I receive more than one offer for my property?
          </button>
        </h2>
        <div
          id="collapseThree"
          className="accordion-collapse collapse"
          aria-labelledby="headingThree"
          data-bs-parent="#accordionPanelsStayOpenExample"
        >
          <div className="accordion-body">
            Our efforts will aim at getting maximum offers for your property. In
            case of more than one offer, you being the Seller, will have the
            option to review and consider multiple offers from different buyers
            before making a decision. You will be provided with the option to
            negotiate terms individually with each buyer to find the best deal.
            You will have the sole discretion to choose the best suitable offer.
          </div>
        </div>
      </div>

      {/* <!-- FAQ Item 4 --> */}
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFour"
            aria-expanded="false"
            aria-controls="collapseFour"
          >
            What happens if my property doesn’t sell within the expected
            timeframe?
          </button>
        </h2>
        <div
          id="collapseFour"
          className="accordion-collapse collapse"
          aria-labelledby="headingFour"
          data-bs-parent="#accordionPanelsStayOpenExample"
        >
          <div className="accordion-body">
            Due to any reason whatsoever, if your property doesn't get sold
            within a certain timeframe, you have the option to relist it on our
            platform. Our team can provide guidance and assistance as needed on
            all related aspects viz. decision on reserve price, property
            condition improvement, details posted etc. so that you succeed in
            getting offer after relisting.
          </div>
        </div>
      </div>

      {/* <!-- FAQ Item 5 --> */}
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFive"
            aria-expanded="false"
            aria-controls="collapseFive"
          >
            Who will take care of the registration paperwork?
          </button>
        </h2>
        <div
          id="collapseFive"
          className="accordion-collapse collapse"
          aria-labelledby="headingFive"
          data-bs-parent="#accordionPanelsStayOpenExample"
        >
          <div className="accordion-body">
            Our dedicated RM will assist you in the registration process as
            well. At your discretion, we may even help you in the drafting of
            documents.
          </div>
        </div>
      </div>

      {/* <!-- FAQ Item 6 --> */}
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseSix"
            aria-expanded="false"
            aria-controls="collapseSix"
          >
            How can I verify if a buyer is serious?
          </button>
        </h2>
        <div
          id="collapseSix"
          className="accordion-collapse collapse"
          aria-labelledby="headingSix"
          data-bs-parent="#accordionPanelsStayOpenExample"
        >
          <div className="accordion-body">
            At the first point of check, our dedicated RM review and verify the
            credential of every offer received from prospective buyer. After RM
            ‘s satisfaction only, it will be shared with you for consideration.
            After connecting you with the prospective buyer, you will verify the
            offer and the offerer to your entire satisfaction and wherever our
            assistance will be required, our dedicated RM will assist.
          </div>
        </div>
      </div>

      {/* <!-- FAQ Item 7 --> */}
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseSeven"
            aria-expanded="false"
            aria-controls="collapseSeven"
          >
            Is it possible to revise my price during the sale process?
          </button>
        </h2>
        <div
          id="collapseSeven"
          className="accordion-collapse collapse"
          aria-labelledby="headingSeven"
          data-bs-parent="#accordionPanelsStayOpenExample"
        >
          <div className="accordion-body">
            Yes, the Seller will have the right and authority to amend the
            Reserve Price ONCE after discussion with us however the variation
            shall be permitted only upto the extent of 5%.
          </div>
        </div>
      </div>

      {/* <!-- FAQ Item 8 --> */}
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseEight"
            aria-expanded="false"
            aria-controls="collapseEight"
          >
            What if I change my mind about selling my property?
          </button>
        </h2>
        <div
          id="collapseEight"
          className="accordion-collapse collapse"
          aria-labelledby="headingEight"
          data-bs-parent="#accordionPanelsStayOpenExample"
        >
          <div className="accordion-body">
            Anytime you may change your mind by giving written
            confirmation/information to us. In the cases, wherein we will
            successfully arrange the offers to buy your Property at the reserve
            price or price higher than reserve price but you do not accept the
            offer then in those cases, you will be liable to pay our service
            fee/ charges.
          </div>
        </div>
      </div>

      {/* <!-- FAQ Item 9 --> */}
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseNine"
            aria-expanded="false"
            aria-controls="collapseNine"
          >
            Do I have to accept every offer I receive?
          </button>
        </h2>
        <div
          id="collapseNine"
          className="accordion-collapse collapse"
          aria-labelledby="headingNine"
          data-bs-parent="#accordionPanelsStayOpenExample"
        >
          <div className="accordion-body">
            Not really, in the cases wherein we will successfully arrange the
            offers to buy your Property then you at your sole discretion, may
            review each offer and accept the best offer for your property.
          </div>
        </div>
      </div>

      {/* <!-- FAQ Item 10 --> */}
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTen"
            aria-expanded="false"
            aria-controls="collapseTen"
          >
            Can I remove my listing?
          </button>
        </h2>
        <div
          id="collapseTen"
          className="accordion-collapse collapse"
          aria-labelledby="headingTen"
          data-bs-parent="#accordionPanelsStayOpenExample"
        >
          <div className="accordion-body">
            Yes, but have to connect with your RM and this will be subject to
            response to the above conditions.
          </div>
        </div>
      </div>

      {/* <!-- FAQ Item 11 --> */}
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseEleven"
            aria-expanded="false"
            aria-controls="collapseEleven"
          >
            Is my personal information secure on the platform?
          </button>
        </h2>
        <div
          id="collapseEleven"
          className="accordion-collapse collapse"
          aria-labelledby="headingEleven"
          data-bs-parent="#accordionPanelsStayOpenExample"
        >
          <div className="accordion-body">
            <strong>
              Yes, our platform and your information with us are secure.
            </strong>{" "}
            However, you play an important role in keeping your personal
            information secure. You should not share your username, password, or
            other security information for your account with anyone.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
