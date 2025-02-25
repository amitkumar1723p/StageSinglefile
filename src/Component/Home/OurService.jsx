import { useState } from "react";
import "./OurService.css";

function OurService() {
 

  const [activeTab, setActiveTab] = useState("PropertyOwner");

  const openTab = (tabName) => {
    setActiveTab(tabName);

    // const activeStyle = {
    // //   backgroundColor: cssVariables.mainDarkClr,
    //   color: "white",
    // };
  };

  return (
    <>
      <header>
      <div className="hero-container">
          <div className="hero-img">
            <img src="/img/service-hero-img3.png" alt="Hero background" />
          </div>
          <div className="hero-img-inside-container">
            <div className="hero-img-text">
              <div className="img-heading">
                <h1 className="img-heading-h1">
                  Seamless Property Solutions – Verified, Transparent &
                  Hassle-Free!
                </h1>
              </div>
              <div className="hero-img-paragraph">
                <p className="hero-img-p">
                  Unlock a smooth property experience with real-time alerts,
                  verified buyers, fair pricing, and end-to-end support. Whether
                  you're buying, selling, or renting – we've got you covered!
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="Our-service">
        <h1 className="our-service-heading">
          Our<span className="our-service-heading-span"> Service</span>
        </h1>
        <div>
          <h2 className="our-service-h2">
            Seamless Real Estate Solutions – Providing Expert Support and
            Hassle-Free Services for a Smooth Buying, Selling, and Renting
            Experience
          </h2>
        </div>
      </div>

      <div className="offer-card-container">
    
        <div className="offer-card">
          <div className="offer-card-img">
            <img src="/img/house-green.svg" alt="house" />
          </div>
          <div className="offer-card-text">
            <h2 className="offer-card-text-h2">
              PROPERTY MANAGEMENT
            </h2>
            <h3 className="offer-card-h3">
              Effortless Property Management – We Handle Everything for You.
            </h3>
          </div>
        </div>
        <div className="offer-card">
          <div className="offer-card-img">
            <img src="/img/house-orange.svg" alt="house" />
          </div>
          <div className="offer-card-text">
            <h2 className="offer-card-text-h2">RESALE SERVICES</h2>
            <h3 className="offer-card-h3">
              Maximize Your Property's Value with Our Expert Resale Services.
            </h3>
          </div>
        </div>
        <div className="offer-card">
          <div className="offer-card-img">
            <img src="/img/Group 284.svg" alt="house" />
          </div>
          <div className="offer-card-text">
            <h2 className="offer-card-text-h2">RENTAL SERVICES</h2>
            <h3 className="offer-card-h3">
              Find the Perfect Tenant or Rental Home – Fast, and Verified.
            </h3>
          </div>
        </div>
   
     
        <div className="offer-card">
          <div className="offer-card-img">
            <img src="/img/house-purple.svg" alt="house" />
          </div>
          <div className="offer-card-text">
            <h2 className="offer-card-text-h2">
              NRI PROPERTY MANAGEMENT
            </h2>
            <h3 className="offer-card-h3">
              Seamless Property Management for NRIs Across the Globe.
            </h3>
          </div>
        </div>
        <div className="offer-card">
          <div className="offer-card-img">
            <img src="/img/document.svg" alt="house" />
          </div>
          <div className="offer-card-text">
            <h2 className="offer-card-text-h2">LEGAL CONSULTATION</h2>
            <h3 className="offer-card-h3">
              Secure Your Real Estate Investments with Trusted Legal Advice
            </h3>
          </div>
        </div>
        <div className="offer-card">
          <div className="offer-card-img">
            <img src="/img/loan.svg" alt="house" />
          </div>
          <div className="offer-card-text">
            <h2 className="offer-card-text-h2">LOAN ASSISTANCE</h2>
            <h3 className="offer-card-h3">
              Expert Guidance for the Best Loan Deals
            </h3>
          </div>
        </div>
        
   
    </div>
        <div className="main-layout-container"></div>
    <div className="service-what-we-offer-container">
              <div className="what-we-offer-heading">
                <h2 className="what-we-offer-h2">
                  What We <span className="what-we-offer-span">Offer</span>
                </h2>
              </div>
              <div className="what-we-offer-description">
                <h3 className="what-we-offer-h3">
                  Tailored Real Estate Solutions – Dedicated Services Designed
                  to Benefit Tenants, Empower Channel Partners, and Support
                  Property Owners Seamlessly"
                </h3>
              </div>
            </div>

      <div className="tab-container">
       
          
        
        {activeTab === "PropertyOwner" && (
          <div className="tab-content active">
            {/* <div className="service-card-container">
              <div className="service-card">
                <div className="service-card-img">
                  <img src="/img/Group 276.svg" alt="" srcset="" />
                </div>
                <div className="service-card-text">
                  <h2>100% Verified Sellers</h2>
                  <h3>
                    Start your search with our verified listings and find your
                    ideal property.
                  </h3>
                </div>
              </div>

              <div className="service-card">
                <div className="service-card-img">
                  <img src="/img/Group 280.svg" alt="" srcset="" />
                </div>
                <div className="service-card-text">
                  <h2>Dedicated Relationship Manager</h2>
                  <h3>
                    Start your search with our verified listings and find your
                    ideal property.
                  </h3>
                </div>
              </div>
              <div className="service-card">
                <div className="service-card-img">
                  <img src="/img/Group 281.svg" alt="" srcset="" />
                </div>
                <div className="service-card-text">
                  <h2>Transparency, Trust and Fair Price</h2>
                  <h3>
                    Start your search with our verified listings and find your
                    ideal property.
                  </h3>
                </div>
              </div>
              <div className="service-card">
                <div className="service-card-img">
                  <img src="/img/Group 282.svg" alt="" srcset="" />
                </div>
                <div className="service-card-text">
                  <h2>Single Point of contact for Dealing</h2>
                  <h3>
                    Start your search with our verified listings and find your
                    ideal property.
                  </h3>
                </div>
              </div>
            </div> */}

                
            <div className="selling-card-main">
              
      <div className="selling-card-container">
            <div className="tab-buttons">
          <div
            className={`tab-button ${
              activeTab === "PropertyOwner" ? "active" : ""
            }`}
            onClick={() => openTab("PropertyOwner")}
          >
            <div className="tab-button-text">For Property Owner</div>
          </div>
          <div
            className={`tab-button ${activeTab === "buying" ? "active" : ""}`}
            onClick={() => openTab("buying")}
          >
            <div className="tab-button-text">For Buyers</div>
          </div>
          <div
            className={`tab-button ${activeTab === "tenant" ? "active" : ""}`}
            onClick={() => openTab("tenant")}
          >
            <div className="tab-button-text">For Tenants</div>
          </div>
        </div>
        <div className="selling-offer-card">
          <div className="selling-offer-card-img">
            <img
              src="/img/Group 297.svg"
              alt="verified buyer"
            />
          </div>
          <div className="selling-offer-card-text">
            <h2 className="selling-offer-card-text-h2">
              100% VERIFIED BUYERS
            </h2>
            <h3 className="selling-offer-card-text-h3">
              Connect with 100% Verified Buyers for a Transparent
              Selling Experience.
            </h3>
          </div>
        </div>
        <div className="selling-offer-card">
          <div className="selling-offer-card-img">
            <img src="/img/Group 298.svg" alt="schedule" />
          </div>
          <div className="selling-offer-card-text">
            <h2 className="selling-offer-card-text-h2">
              SCHEDULE VISIT ALERTS
            </h2>
            <h3 className="selling-offer-card-text-h3">
              Get real-time updates on your scheduled property visits,
              including confirmations and reminders for a hassle-free
              experience.
            </h3>
          </div>
        </div>
        <div className="selling-offer-card">
          <div className="selling-offer-card-img">
            <img src="/img/Group 299.svg" alt="house" />
          </div>
          <div className="selling-offer-card-text">
            <h2 className="selling-offer-card-text-h2">
              REAL-TIME PRICE OFFER ALERTS
            </h2>
            <h3 className="selling-offer-card-text-h3">
              Receive instant alerts whenever a new offer is made,
              keeping you updated on the best price opportunities.
            </h3>
          </div>
        </div>
        <div className="selling-offer-card">
          <div className="selling-offer-card-img">
            <img src="/img/Group 300.svg" alt="house" />
          </div>
          <div className="selling-offer-card-text">
            <h2 className="selling-offer-card-text-h2">
              HASSLE FREE DOCUMENTATION
            </h2>
            <h3 className="selling-offer-card-text-h3">
              Effortless Documentation – Complete Support for All
              Required Documents in Property Transactions.
            </h3>
          </div>
        </div>
      </div>
      <div className="selling-card-banner">
        <img src="/img/Real Estate Retractable Banner2.png" alt="banner" />
      </div>
    </div>
          </div>
        )}
        {activeTab === "buying" && (
          <div className="tab-content active">
            {/* <div className="service-card-container">
              <div className="service-card">
                <div className="service-card-img">
                  <img src="/img/Group 276.svg" alt="" srcset="" />
                </div>
                <div className="service-card-text">
                  <h2>100% Verified Sellers</h2>
                  <h3>
                    Start your search with our verified listings and find your
                    ideal property.
                  </h3>
                </div>
              </div>

              <div className="service-card">
                <div className="service-card-img">
                  <img src="/img/Group 280.svg" alt="" srcset="" />
                </div>
                <div className="service-card-text">
                  <h2>Dedicated Relationship Manager</h2>
                  <h3>
                    Start your search with our verified listings and find your
                    ideal property.
                  </h3>
                </div>
              </div>
              <div className="service-card">
                <div className="service-card-img">
                  <img src="/img/Group 281.svg" alt="" srcset="" />
                </div>
                <div className="service-card-text">
                  <h2>Transparency, Trust and Fair Price</h2>
                  <h3>
                    Start your search with our verified listings and find your
                    ideal property.
                  </h3>
                </div>
              </div>
              <div className="service-card">
                <div className="service-card-img">
                  <img src="/img/Group 282.svg" alt="" srcset="" />
                </div>
                <div className="service-card-text">
                  <h2>Single Point of contact for Dealing</h2>
                  <h3>
                    Start your search with our verified listings and find your
                    ideal property.
                  </h3>
                </div>
              </div>
            </div> */}
            {/* <div className="service-what-we-offer-container">
              <div className="what-we-offer-heading">
                <h2 className="what-we-offer-h2">
                  What We <span className="what-we-offer-span">Offer</span>
                </h2>
              </div>
              <div className="what-we-offer-description">
                <h3 className="what-we-offer-h3">
                  Tailored Real Estate Solutions – Dedicated Services Designed
                  to Benefit Tenants, Empower Channel Partners, and Support
                  Property Owners Seamlessly"
                </h3>
              </div>
            </div> */}
            <div className="buying-main-card">
              <div className="buying-card-container">
              <div className="tab-buttons">
          <div
            className={`tab-button ${
              activeTab === "PropertyOwner" ? "active" : ""
            }`}
            onClick={() => openTab("PropertyOwner")}
          >
            <div className="tab-button-text">For Property Owner</div>
          </div>
          <div
            className={`tab-button ${activeTab === "buying" ? "active" : ""}`}
            onClick={() => openTab("buying")}
          >
            <div className="tab-button-text">For Buyers</div>
          </div>
          <div
            className={`tab-button ${activeTab === "tenant" ? "active" : ""}`}
            onClick={() => openTab("tenant")}
          >
            <div className="tab-button-text">For Tenants</div>
          </div>
        </div>
                <div className="buying-offer-card">
                  <div className="buying-offer-card-img">
                    <img
                      src="/img/Group 289.svg"
                      alt="verified seller"
                      srcset=""
                    />
                  </div>
                  <div className="buying-offer-card-text">
                    <h2 className="buying-offer-card-h2">
                      100% VERIFIED SELLERS
                    </h2>
                    <h3 className="buying-offer-card-h3">
                      100% verified sellers for secure and trustworthy property
                      deals.
                    </h3>
                  </div>
                </div>
                <div className="buying-offer-card">
                  <div className="buying-offer-card-img">
                    <img
                      src="/img/Group 290.svg"
                      alt="relationship"
                      srcset=""
                    />
                  </div>
                  <div className="buying-offer-card-text">
                    <h2 className="buying-offer-card-h2">
                      DEDICATED RELATIONSHIP MANAGER
                    </h2>
                    <h3 className="buying-offer-card-h3">
                      Your Personal Dedicated Relationship Manager for Seamless
                      Real Estate Support.
                    </h3>
                  </div>
                </div>
                <div className="buying-offer-card">
                  <div className="buying-offer-card-img">
                    <img src="/img/Group 291.svg" alt="trust&fair" srcset="" />
                  </div>
                  <div className="buying-offer-card-text">
                    <h2 className="buying-offer-card-h2">
                      TRANSPARENCY, TRUST AND FAIR PRICE
                    </h2>
                    <h3 className="buying-offer-card-h3">
                      Complete Transparency – The Buyer Determines the Price,
                      Ensuring Fair and Honest Real Estate Deals"
                    </h3>
                  </div>
                </div>
                <div className="buying-offer-card">
                  <div className="buying-offer-card-img">
                    <img
                      src="/img/Group 292.svg"
                      alt="contact&dealing"
                      srcset=""
                    />
                  </div>
                  <div className="buying-offer-card-text">
                    <h2 className="buying-offer-card-h2">
                      SINGLE POINT OF CONTACT FOR DEALING
                    </h2>
                    <h3 className="buying-offer-card-h3">
                      A Single Point of Contact for All Your Real Estate Needs –
                      From Documentation to Possession.
                    </h3>
                  </div>
                </div>
              </div>
              <div className="buying-card-banner">
                <img src="/img/banner3.png" alt="banner" srcset="" />
              </div>
            </div>
          </div>
        )}
        {activeTab === "tenant" && (
          <div className="tab-content active">
            {/* <div className="service-card-container">
              <div className="service-card">
                <div className="service-card-img">
                  <img src="/img/Group 276.svg" alt="" srcset="" />
                </div>
                <div className="service-card-text">
                  <h2>100% Verified Sellers</h2>
                  <h3>
                    Start your search with our verified listings and find your
                    ideal property.
                  </h3>
                </div>
              </div>
              <div className="service-card">
                <div className="service-card-img">
                  <img src="/img/Group 280.svg" alt="" srcset="" />
                </div>
                <div className="service-card-text">
                  <h2>Dedicated Relationship Manager</h2>
                  <h3>
                    Start your search with our verified listings and find your
                    ideal property.
                  </h3>
                </div>
              </div>
              <div className="service-card">
                <div className="service-card-img">
                  <img src="/img/Group 281.svg" alt="" srcset="" />
                </div>
                <div className="service-card-text">
                  <h2>Transparency, Trust and Fair Price</h2>
                  <h3>
                    Start your search with our verified listings and find your
                    ideal property.
                  </h3>
                </div>
              </div>
              <div className="service-card">
                <div className="service-card-img">
                  <img src="/img/Group 282.svg" alt="" srcset="" />
                </div>
                <div className="service-card-text">
                  <h2>Single Point of contact for Dealing</h2>
                  <h3>
                    Start your search with our verified listings and find your
                    ideal property.
                  </h3>
                </div>
              </div>
            </div> */}
            {/* <div className="service-what-we-offer-container">
              <div className="what-we-offer-heading">
                <h2 className="what-we-offer-h2">
                  What We <span className="what-we-offer-span">Offer</span>
                </h2>
              </div>
              <div className="what-we-offer-description">
                <h3 className="what-we-offer-h3">
                  Tailored Real Estate Solutions – Dedicated Services Designed
                  to Benefit Tenants, Empower Channel Partners, and Support
                  Property Owners Seamlessly"
                </h3>
              </div>
            </div> */}
                <div className="tab-buttons">
          <div
            className={`tab-button ${
              activeTab === "PropertyOwner" ? "active" : ""
            }`}
            onClick={() => openTab("PropertyOwner")}
          >
            <div className="tab-button-text">For Property Owner</div>
          </div>
          <div
            className={`tab-button ${activeTab === "buying" ? "active" : ""}`}
            onClick={() => openTab("buying")}
          >
            <div className="tab-button-text">For Buyers</div>
          </div>
          <div
            className={`tab-button ${activeTab === "tenant" ? "active" : ""}`}
            onClick={() => openTab("tenant")}
          >
            <div className="tab-button-text">For Tenants</div>
          </div>
        </div>
            
          </div>
        )}
      </div>
    </>
  );
}

export default OurService;


