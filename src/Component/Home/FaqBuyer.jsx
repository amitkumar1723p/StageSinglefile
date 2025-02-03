import React from "react";
import "./FAQ.css";

const FAQ = () => {
  return (
    <div className="container-fluid">
      <div className="accordion" id="accordionPanelsStayOpenExample">
        <div className="heading-faq">
          <h2 className="heading-section-faq text-[32px]">
            Frequently Asked <span>Questions</span>
          </h2>
          <p className="faq-heading">
            Get Quick Solutions and Expert Advice for All Your Real Estate Needs
          </p>
        </div>

        {/* FAQ Item 1 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              What do you mean by Verified Property?
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionPanelsStayOpenExample"
          >
            <div className="accordion-body">
              We will list the property only after verification. In relation to
              the verification of ownership of property, etc., the same will be
              limited to the limited verification conducted on the basis of the
              documents made available to us and our knowledge and expertise.
            </div>
          </div>
        </div>

        {/* FAQ Item 2 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              How I can schedule a property visit?
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionPanelsStayOpenExample"
          >
            <div className="accordion-body">
              Once you shortlist the property that meets your requirements and
              which you intend to buy, you can schedule a visit by simply
              clicking the ‘SCHEDULE VISIT’ tab. Our dedicated RM will make
              necessary arrangements for the property visit.
            </div>
          </div>
        </div>

        {/* FAQ Item 3 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              If I am interested to close the deal, what is the next step?
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionPanelsStayOpenExample"
          >
            <div className="accordion-body">
              To initiate the process, you need to submit your best offer,
              taking into account the owner's reserve price. If the seller/owner
              accepts your offer, our dedicated RM will contact you and guide
              you through the next steps.
            </div>
          </div>
        </div>

        {/* FAQ Item 4 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFour">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              How can I see how many others have placed offers and their amount?
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="headingFour"
            data-bs-parent="#accordionPanelsStayOpenExample"
          >
            <div className="accordion-body">
              You will receive notifications if someone places a higher offer
              than yours. Additionally, on our platform, you can see the offers
              against each listing.
            </div>
          </div>
        </div>

        {/* FAQ Item 5 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFive">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFive"
            >
              Can I modify my offer when someone exceeds my offered Price?
            </button>
          </h2>
          <div
            id="collapseFive"
            className="accordion-collapse collapse"
            aria-labelledby="headingFive"
            data-bs-parent="#accordionPanelsStayOpenExample"
          >
            <div className="accordion-body">
              Yes, you can revise your offer at any time by visiting the
              property listing.
            </div>
          </div>
        </div>

        {/* FAQ Item 6 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingSix">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSix"
              aria-expanded="false"
              aria-controls="collapseSix"
            >
              Who will help me, if I will need assistance or I will get stuck
              somewhere?
            </button>
          </h2>
          <div
            id="collapseSix"
            className="accordion-collapse collapse"
            aria-labelledby="headingSix"
            data-bs-parent="#accordionPanelsStayOpenExample"
          >
            <div className="accordion-body">
              Our dedicated RM will assist you throughout the process, from
              start to finish. They will be in touch with you, provide guidance,
              and coordinate all necessary steps.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
