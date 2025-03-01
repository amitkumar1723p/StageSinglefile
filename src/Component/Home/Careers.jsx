import { useState } from "react";
import "./Careers.css";
// import "./Responsive.css";

function Career() {
  const [departmentOpen, setDepartmentOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [LinkedIn, setLinkedIn] = useState('');
  const [experienceOpen, setExperienceOpen] = useState(false);
  const [count, setCount] = useState(0);

  // const fullText = document.getElementById("full-text");

  // if(fullText.style.display === "none") {
  //   fullText.style.display = "block";
  //   this.textContent = "See Less";

  // } else {
  //   fullText.style.display="none";
  //   this.textContent = "See More";
  // }
  return (
    <>
      <>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Career Page</title>
        <link rel="stylesheet" href="style.css" />
        <link rel="stylesheet" href="responsive.css" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
        <header className="Career-Hero-Section">
          <div className="heading-container">
            <h1 className="Career-Hero-Heading">
              Discover your Role at
              <span> PropertyDekho247.com</span>
            </h1>
            <p className="Career-Subheading ">
              Step Into a Career of Innovation and Purpose as We Revolutionize
              Property Buying, Selling, and Renting with Transparency and Trust
            </p>
          </div>
          <div className="Career-Overlay">
            <div className="left-svg">
              {" "}
              <img src="/img/left-Vector.svg" alt="" srcSet="" />
            </div>
            <div className="right-svg">
              <img src="/img/right-Vector.svg" alt="" srcSet="" />
            </div>
          </div>
          <div className="career-search-container">
            <div className="career-search-main-option">
              <div
                className="career-search-filter career-search-department"
                onClick={() => setDepartmentOpen(!departmentOpen)}
              >
                <img
                  src="/img/mingcute_department-line.svg"
                  alt="Department icon"
                />
                <span>Department</span>
                <img
                  src="/img/heroicons-solid_chevron-up.svg"
                  alt="Toggle department dropdown"
                />
                {departmentOpen && (
                  <div className="dropdown-menu">
                    {/* Department options would go here */}
                    <div className="dropdown-item">Engineering</div>
                    <div className="dropdown-item">Marketing</div>
                    <div className="dropdown-item">Sales</div>
                    <div className="dropdown-item">Customer Service</div>
                  </div>
                )}
              </div>

              <div
                className="career-search-filter career-search-type"
                onClick={() => setTypeOpen(!typeOpen)}
              >
                <img src="/img/mage_dashboard-plus.svg" alt="Type icon" />
                <span>Type</span>
                <img
                  src="/img/heroicons-solid_chevron-up.svg"
                  alt="Toggle type dropdown"
                />
                {typeOpen && (
                  <div className="dropdown-menu">
                    {/* Type options would go here */}
                    <div className="dropdown-item">Full-time</div>
                    <div className="dropdown-item">Part-time</div>
                    <div className="dropdown-item">Contract</div>
                    <div className="dropdown-item">Internship</div>
                  </div>
                )}
              </div>

              <div
                className="career-search-filter career-search-experience"
                onClick={() => setExperienceOpen(!experienceOpen)}
              >
                <img src="/img/iconoir_page-star.svg" alt="Experience icon" />
                <span>Experience</span>
                <img
                  src="/img/heroicons-solid_chevron-up.svg"
                  alt="Toggle experience dropdown"
                />
                {experienceOpen && (
                  <div className="dropdown-menu">
                    {/* Experience options would go here */}
                    <div className="dropdown-item">Entry Level</div>
                    <div className="dropdown-item">Mid Level</div>
                    <div className="dropdown-item">Senior Level</div>
                    <div className="dropdown-item">Executive</div>
                  </div>
                )}
              </div>

              <button className="career-search-tab">
                <img src="/img/wpf_search.svg" alt="Search icon" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </header>
        <div className="Career-Join-Container">
          <div className="Career-Join-section ">
            <h3 className="Career-Heading">
              Why
              <span>
                <img src="/img/Group.svg" alt="" srcSet="" />
                Join
              </span>
              PropertyDekho247
            </h3>
            <p className="Career-subheading">
              Empowering Your Journey in Real Estate Tech: A Culture of
              Innovation, Collaboration, and Growth
            </p>
          </div>
        </div>
        <div className="accordion" id="accordionExample">
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
                Innovative Industry Leader
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse "
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Be
                part of india's first online Proptech platform , pioneering the
                resale and real estate market with cutting-edge technology and
                innovative services.
             
              </div>
            </div>
          </div>
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
                Collaborative Real Estate Network{" "}
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Be
                part of india's first online Proptech platform , pioneering the
                resale and real estate market with cutting-edge technology and
                innovative services.
               
              </div>
            </div>
          </div>
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
                Impactful Career Path
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
               Be
                part of india's first online Proptech platform , pioneering the
                resale and real estate market with cutting-edge technology and
                innovative services.
               
              </div>
            </div>
          </div>
        </div>
        <section className="life-at-property">
          <h2>
            <span className="highlight ">LIFE </span> at PropertyDekho247
          </h2>
          <p>
            Empowering Your Journey in Real Estate Tech: A Culture of
            Innovation, Collaboration, and Growth
          </p>
          <div className="gallery ">
            <div className="image">
              <img src="/img/Rectangle 264.png" alt="Team meeting" />
            </div>
            <div className="image">
              <img src="/img/Rectangle 265.png" alt="Team collaboration" />
            </div>
            <div className="image">
              <img src="/img/Rectangle 266.png" alt="Laptop workspace" />
            </div>
            <div className="image">
              <img src="/img/Rectangle 267.png" alt="Workshop session" />
            </div>
          </div>
        </section>
        <div className="Career-Application">
          <div className="Career-Application-Heading">
            <h3>
              <span>Application </span> Process
            </h3>
          </div>
          <p className="Career-Application-Sub-Heading ">
            Empowering Your Journey in Real Estate Tech: A Culture of
            Innovation, Collaboration, and Growth
          </p>
        </div>
        <div className="Career-Main-Container">
          <div className="gallery-layout ">
            <div className="gallery-img ">
              <div className="image-row">
                <div className="image-container">
                  <img src="/img/Rectangle 278.png" alt="Laptop workspace" />
                </div>
                <div className="image-container">
                  <img
                    src="/img/Rectangle 279.png"
                    alt="Notification on a tablet"
                  />
                </div>
              </div>
              <div className="image-row">
                <div className="image-container ">
                  <img src="/img/Rectangle 280.png" alt="Interview scene" />
                </div>
              </div>
            </div>
            <div className="steps-section">
              <div className="step">
                <div className="step-number">
                  1
                  <img src="img/Vector 128.svg" alt="stroke" srcSet="" />
                </div>
                <div className="step-content">
                  <h3>Submit Your Application</h3>
                  <ul>
                    <li> Explore open roles on our career page.</li>
                    <li>
                      {" "}
                      Complete the online application form and upload your
                      resume.
                    </li>
                    <li> Receive a confirmation email for your submission.</li>
                  </ul>
                </div>
              </div>
              <div className="step">
                <div className="step-number">
                  2
                  <img src="img/Vector 128.svg" alt="stroke" srcSet="" />
                </div>
                <div className="step-content">
                  <h3>Screening and Shortlisting</h3>
                  <ul>
                    <li>
                      Our team reviews applications to shortlist candidates
                      based on skills and <br /> experience.
                    </li>
                    <li>
                      Shortlisted candidates will be contacted for the next
                      steps.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="step">
                <div className="step-number">
                  3
                  <img src="img/Vector 128.svg" alt="stroke" srcSet="" />
                </div>
                <div className="step-content">
                  <h3>Interviews</h3>
                  <ul>
                    <li>
                      An HR representative will connect with you to discuss your
                      career goals <br /> and role alignment.
                    </li>
                    <li>
                      Discuss technical skills, experience, and problem-solving
                      abilities.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Offer and Joining</h3>
                  <ul>
                    <li>
                      Shortlisted candidates will receive an offer with role and
                      joining details.
                    </li>
                    <li>
                      Begin your journey with a smooth onboarding process to
                      integrate into our <br /> team.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Career-Current">
          <h3 className="Career-Current-Highlight ">
            <span>Current </span>Openings
          </h3>
          <p className="Career-Current-Sub-Highlight">
            Empowering Your Journey in Real Estate Tech: A Culture of
            Innovation, Collaboration, and Growth
          </p>
        </div>
        <div className="Career-Job-Container">
          <div className="job-main-container ">
            <div className="job-card">
              <div className="job-header">
                <h2>
                  Technology &amp; Development - Backend Systems - Developer
                </h2>
                <div className="tags">
                  <span className="tag">On-Site</span>
                  <span className="tag">Full Time</span>
                </div>
              </div>
              <div className="job-details">
                <div className="detail">
                  <div>
                    <img
                      src="/img/mynaui_briefcase.svg"
                      alt="briefcase"
                      srcSet=""
                    />
                  </div>
                  <span>2-5 Years</span>
                  <div className="detail-stroke">|</div>
                </div>
                <div className="detail">
                  <div>
                    <img
                      src="img/heroicons_currency-rupee.svg"
                      alt="currency"
                      srcSet=""
                    />
                  </div>
                  <span>Not disclosed</span>
                  <div className="detail-stroke">|</div>
                </div>
                <div className="detail">
                  <div>
                    <img
                      src="img/fluent_location-28-regular.svg"
                      alt="location"
                      srcSet=""
                    />
                  </div>
                  <span>Gurugram, Haryana</span>
                  <div className="detail-stroke">|</div>
                </div>
                <div className="detail">
                  <div>
                    <img
                      src="img/streamline_industry-innovation-and-infrastructure.svg"
                      alt="infrastructure"
                      srcSet=""
                    />
                  </div>
                  <span>Product Management</span>
                </div>
              </div>
              <hr className="dashed-2" />
              <div className="job-information">
                <div className="meta">
                  <span>Posted: 4 days ago</span>
                  <span>Total Openings: 5</span>
                  <span>Applicants: 5</span>
                </div>
                <div className="actions">
                  <button className="apply-now">Apply Now</button>
                  <button  onClick={() => setIsExpanded(!isExpanded)} className="see-more">
                  {isExpanded ? 'See Less' : 'See More'}
                    <img src="img/Icon placeholder.svg" alt="" srcSet="" />
                  </button>
                </div>
              </div>
              <div className={`job-description ${isExpanded ? 'expanded' : ''}`}>
        <h3>Job Description</h3>
        <p>
          We are looking for a skilled Backend Systems Developer with 2-5 years of experience to join our Technology & Development team. The ideal candidate will have strong knowledge of server-side programming, database design, and API development.
        </p>
        <h3>Requirements</h3>
        <ul>
          <li>Bachelor's degree in Computer Science or related field</li>
          <li>2-5 years of experience in backend development</li>
          <li>Proficiency in at least one backend language (Java, Python, Node.js)</li>
          <li>Experience with database systems (SQL, NoSQL)</li>
          <li>Knowledge of REST API design principles</li>
          <li>Experience with cloud services (AWS, Azure, GCP)</li>
        </ul>
        <h3>Benefits</h3>
        <p>
          Competitive salary, health insurance, flexible working hours, professional development opportunities, and a dynamic work environment.
        </p>
      </div>
            </div>
            <div className="job-card">
              <div className="job-header">
                <h2>
                  Design &amp; User Experience - Product Design - Senior
                  Designer
                </h2>
                <div className="tags">
                  <span className="tag">On-Site</span>
                  <span className="tag">Full Time</span>
                </div>
              </div>
              <div className="job-details">
                <div className="detail">
                  <div>
                    <img
                      src="/img/mynaui_briefcase.svg"
                      alt="briefcase"
                      srcSet=""
                    />
                  </div>
                  <span>2-5 Years</span>
                  <div className="detail-stroke">|</div>
                </div>
                <div className="detail">
                  <div>
                    <img
                      src="img/heroicons_currency-rupee.svg"
                      alt="currency"
                      srcSet=""
                    />
                  </div>
                  <span>Not disclosed</span>
                  <div className="detail-stroke">|</div>
                </div>
                <div className="detail">
                  <div>
                    <img
                      src="img/fluent_location-28-regular.svg"
                      alt="location"
                      srcSet=""
                    />
                  </div>
                  <span>Gurugram, Haryana</span>
                  <div className="detail-stroke">|</div>
                </div>
                <div className="detail">
                  <div>
                    <img
                      src="img/streamline_industry-innovation-and-infrastructure.svg"
                      alt="infrastructure"
                      srcSet=""
                    />
                  </div>
                  <span>Product Management</span>
                </div>
              </div>
              <hr className="dashed-2" />
              <div className="job-information">
                <div className="meta">
                  <span>Posted: 4 days ago</span>
                  <span>Total Openings: 5</span>
                  <span>Applicants: 5</span>
                </div>
                <div className="actions">
                  <button className="apply-now">Apply Now</button>
                  <div className="content">
                    <p id="full-text" style={{ display: "none" }}>
                      this is information
                    </p>
                  </div>
                  <button   onClick={() => setIsExpanded(!isExpanded)} className="see-more">
                  {isExpanded ? 'See Less' : 'See More'}
                    <img src="img/Icon placeholder.svg" alt="" srcSet="" />
                  </button>
                  
                </div>
              </div>
              <div className={`job-description ${isExpanded ? 'expanded' : ''}`}>
        <h3>Job Description</h3>
        <p>
          We are looking for a skilled Backend Systems Developer with 2-5 years of experience to join our Technology & Development team. The ideal candidate will have strong knowledge of server-side programming, database design, and API development.
        </p>
        <h3>Requirements</h3>
        <ul>
          <li>Bachelor's degree in Computer Science or related field</li>
          <li>2-5 years of experience in backend development</li>
          <li>Proficiency in at least one backend language (Java, Python, Node.js)</li>
          <li>Experience with database systems (SQL, NoSQL)</li>
          <li>Knowledge of REST API design principles</li>
          <li>Experience with cloud services (AWS, Azure, GCP)</li>
        </ul>
        <h3>Benefits</h3>
        <p>
          Competitive salary, health insurance, flexible working hours, professional development opportunities, and a dynamic work environment.
        </p>
      </div>
            </div>
            <div className="job-card">
              <div className="job-header">
                <h2>
                  Sales &amp; Marketing - Digital Campaigns - Marketing
                  Specialist
                </h2>
                <div className="tags">
                  <span className="tag">On-Site</span>
                  <span className="tag">Full Time</span>
                </div>
              </div>
              <div className="job-details">
                <div className="detail">
                  <div>
                    <img
                      src="/img/mynaui_briefcase.svg"
                      alt="briefcase"
                      srcSet=""
                    />
                  </div>
                  <span>2-5 Years</span>
                  <div className="detail-stroke">|</div>
                </div>
                <div className="detail">
                  <div>
                    <img
                      src="img/heroicons_currency-rupee.svg"
                      alt="currency"
                      srcSet=""
                    />
                  </div>
                  <span>Not disclosed</span>
                  <div className="detail-stroke">|</div>
                </div>
                <div className="detail">
                  <div>
                    <img
                      src="img/fluent_location-28-regular.svg"
                      alt="location"
                      srcSet=""
                    />
                  </div>
                  <span>Gurugram, Haryana</span>
                  <div className="detail-stroke">|</div>
                </div>
                <div className="detail">
                  <div>
                    <img
                      src="img/streamline_industry-innovation-and-infrastructure.svg"
                      alt="infrastructure"
                      srcSet=""
                    />
                  </div>
                  <span>Product Management</span>
                </div>
              </div>
              <hr className="dashed-2" />
              <div className="job-information">
                <div className="meta">
                  <span>Posted: 4 days ago</span>
                  <span>Total Openings: 5</span>
                  <span>Applicants: 5</span>
                </div>
                <div className="actions">
                  <button className="apply-now">Apply Now</button>
                  <div className="career-see-more-action">
                  <button onClick={() => setIsExpanded(!isExpanded)}  className="see-more">  {isExpanded ? 'See Less' : 'See More'}
                  
                    <img src="img/Icon placeholder.svg" alt="" srcSet="" />
                  </button>
                  </div>
                </div>
              </div>
              <div className={`job-description ${isExpanded ? 'expanded' : ''}`}>
        <h3>Job Description</h3>
        <p>
          We are looking for a skilled Backend Systems Developer with 2-5 years of experience to join our Technology & Development team. The ideal candidate will have strong knowledge of server-side programming, database design, and API development.
        </p>
        <h3>Requirements</h3>
        <ul>
          <li>Bachelor's degree in Computer Science or related field</li>
          <li>2-5 years of experience in backend development</li>
          <li>Proficiency in at least one backend language (Java, Python, Node.js)</li>
          <li>Experience with database systems (SQL, NoSQL)</li>
          <li>Knowledge of REST API design principles</li>
          <li>Experience with cloud services (AWS, Azure, GCP)</li>
        </ul>
        <h3>Benefits</h3>
        <p>
          Competitive salary, health insurance, flexible working hours, professional development opportunities, and a dynamic work environment.
        </p>
      </div>
            </div>
            <div className="job-card">
              <div className="job-header">
                <h2>
                  Operations &amp; Support - Customer Success - Support
                  Executive
                </h2>
                <div className="tags">
                  <span className="tag">On-Site</span>
                  <span className="tag">Full Time</span>
                </div>
              </div>
              <div className="job-details">
                <div className="detail">
                  <div>
                    <img
                      src="/img/mynaui_briefcase.svg"
                      alt="briefcase"
                      srcSet=""
                    />
                  </div>
                  <span>2-5 Years</span>
                  <div className="detail-stroke">|</div>
                </div>
                <div className="detail">
                  <div>
                    <img
                      src="img/heroicons_currency-rupee.svg"
                      alt="currency"
                      srcSet=""
                    />
                  </div>
                  <span>Not disclosed</span>
                  <div className="detail-stroke">|</div>
                </div>
                <div className="detail">
                  <div>
                    <img
                      src="img/fluent_location-28-regular.svg"
                      alt="location"
                      srcSet=""
                    />
                  </div>
                  <span>Gurugram, Haryana</span>
                  <div className="detail-stroke">|</div>
                </div>
                <div className="detail">
                  <div>
                    <img
                      src="img/streamline_industry-innovation-and-infrastructure.svg"
                      alt="infrastructure"
                      srcSet=""
                    />
                  </div>
                  <span>Product Management</span>
                </div>
              </div>
              <hr className="dashed-2" />
              <div className="job-information">
                <div className="meta">
                  <span>Posted: 4 days ago</span>
                  <span>Total Openings: 5</span>
                  <span>Applicants: 5</span>
                </div>
                <div className="actions">
                  <button className="apply-now">Apply Now</button>
                  <div className="career-see-more-action">
                  <button onClick={() => setIsExpanded(!isExpanded)}  className="see-more">   {isExpanded ? 'See Less' : 'See More'}
                    
                    <img
                      src="img/Icon placeholder.svg"
                      alt="down arrow"
                      srcSet=""
                    />
                  </button>
                  </div>
                </div>
              </div>
              <div className={`job-description ${isExpanded ? 'expanded' : ''}`}>
        <h3>Job Description</h3>
        <p>
          We are looking for a skilled Backend Systems Developer with 2-5 years of experience to join our Technology & Development team. The ideal candidate will have strong knowledge of server-side programming, database design, and API development.
        </p>
        <h3>Requirements</h3>
        <ul>
          <li>Bachelor's degree in Computer Science or related field</li>
          <li>2-5 years of experience in backend development</li>
          <li>Proficiency in at least one backend language (Java, Python, Node.js)</li>
          <li>Experience with database systems (SQL, NoSQL)</li>
          <li>Knowledge of REST API design principles</li>
          <li>Experience with cloud services (AWS, Azure, GCP)</li>
        </ul>
        <h3>Benefits</h3>
        <p>
          Competitive salary, health insurance, flexible working hours, professional development opportunities, and a dynamic work environment.
        </p>
      </div>
            </div>
            <div className="career-explore-page">
          <div className="first-explore-page">
            <div className="explore-text-section">
              <h3>WHAT WILL BUYERS GET?</h3>
              <div className="explore-page-list">
                <ul>
                  <li className="explore-page-items">
                    <img
                      src="img/mdi_tick-circle-outline.svg"
                      alt="checkmark"
                      srcSet=""
                    />
                    <span className="explore-page-text">
                      Verified Sellers Listing
                    </span>
                  </li>
                  <li className="explore-page-items">
                    <img
                      src="img/mdi_tick-circle-outline.svg"
                      alt="checkmark"
                      srcSet=""
                    />
                    <span className="explore-page-text">
                      Schedule property visit online
                    </span>
                  </li>
                  <li className="explore-page-items">
                    <img
                      src="img/mdi_tick-circle-outline.svg"
                      alt="checkmark"
                      srcSet=""
                    />
                    <span className="explore-page-text">Offer your price</span>
                  </li>
                  <li className="explore-page-items">
                    <img
                      src="img/mdi_tick-circle-outline.svg"
                      alt="checkmark"
                      srcSet=""
                    />
                    <span className="explore-page-text">
                      Price Transparency
                    </span>
                  </li>
                </ul>
              </div>
              <button className="Career-explore-button">
                <div className="explore-button-text">Explore</div>
                <div className="explore-arrow">
                  <img src="img/Vector.svg" alt="right-arrow" srcSet="" />
                </div>
              </button>
            </div>
            <div className="explore-svg">
              <div className="explore-message-svg">
                <img
                  src="img/Clip path group.svg"
                  alt="message svg"
                  srcSet=""
                />
              </div>
              <div className="explore-img">
                <div className="explore-page-svg">
                  <img src="img/Group 189.svg" alt="" srcSet=""  className="career-first-svg"/>
                </div>
              </div>
            </div>
          </div>
          <div className="second-explore-page">
            <div className="explore-text-section">
              <h3>WHAT WILL SELLERS GET?</h3>
              <div className="explore-page-list">
                <ul>
                  <li className="explore-page-items">
                    <img
                      src="img/mdi_tick-circle-outline.svg"
                      alt="checkmark"
                      srcSet=""
                    />
                    <span className="explore-page-text">Verified Buyers</span>
                  </li>
                  <li className="explore-page-items">
                    <img
                      src="img/mdi_tick-circle-outline.svg"
                      alt="checkmark"
                      srcSet=""
                    />
                    <span className="explore-page-text">
                      Price Offer Alerts
                    </span>
                  </li>
                  <li className="explore-page-items">
                    <img
                      src="img/mdi_tick-circle-outline.svg"
                      alt="checkmark"
                      srcSet=""
                    />
                    <span className="explore-page-text">
                      Choose Offer and Close
                    </span>
                  </li>
                  <li className="explore-page-items">
                    <img
                      src="img/mdi_tick-circle-outline.svg"
                      alt="checkmark"
                      srcSet=""
                    />
                    <span className="explore-page-text">
                      Single Point of Contact
                    </span>
                  </li>
                </ul>
              </div>
              <button className="Career-explore-button">
                <div className="explore-button-text">Explore</div>
                <div className="explore-arrow">
                  <img src="img/Vector.svg" alt="right-arrow" srcSet="" />
                </div>
              </button>
            </div>
            <div className="explore-svg">
              <div className="explore-message-svg">
                <img
                  src="img/Clip path group.svg"
                  alt="message svg"
                  srcSet=""
                />
              </div>
              <div className="explore-img">
                <div className="explore-page-svg">
                  <img src="img/Group 187.svg" alt="" srcSet="" className="career-second-svg"/>
                </div>
              </div>
            </div>
          </div>
        </div>
          </div>
          <div className="job-card-right-side-item">
            <div className="Career-Card-form">
              <div className="Career-Card-header">
                <h3>Join Our Team</h3>
                <div className="Career-Card-header-img">
                  {" "}
                  <img
                    src="img/iconoir_cancel.svg"
                    alt="cancel"
                    srcSet=""
                  />
                </div>
              </div>
              <div className="Career-Card-Form-content">
                <form>
                  <div className="Career-form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      className="form-input"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Sumit Sharma"
                    />
                  </div>
                  <div className="Career-form-group">
                    <label htmlFor="mobile">Mobile No</label>
                    <input
                      type="tel"
                      id="mobile"
                      className="form-input"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="e.g. 987xxxxxxx"
                    />
                  </div>
                  <div className="Career-form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      className="form-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. sharma@gmail.com"
                    />
                  </div>
                  <div className="Career-form-group">
                    <label htmlFor="linkedin">
                   
                      LinkedIn Id <span className="optional">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      id="linkedin"
                      className="form-input"
                       value={LinkedIn}
                    onChange={(e) => setLinkedIn(e.target.value)}
                      placeholder="e.g. ankit.sharma.dev"
                    />
                  </div>
                  <div className="Button-group">
                    <button type="button" className="attach-button">
                      <img
                        src="img/mdi_attachment-plus.svg"
                        alt="attachment-button"
                        srcSet=""
                      />
                      <input type="file" id="file" />
                      <label htmlFor="file">Attach File</label>
                    </button>
                    <button type="submit" className="submit-button">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="career-banner">
            <div className="first-banner">
            <img
              src="img/Modern Did You Know Fun Fact Instagram Post 1.png"
              alt="Banner"
              srcSet=""
              className="banner-img"
            /></div>
             <div className="first-banner">
            <img src="img/CareerBanner3png.png" alt="Banner" srcset="" /></div>
            <div className="first-banner">
            <img src="img/CareerBanner4.png" alt="Banner" srcset="" /></div>
            </div>
          </div>
        </div>
      
        <div className="Career-thankyoufor-applying-container">
          <div className="Career-thankyoufor-applying">
            <div className="heading-thankyoufor-applying">
              <h3>Thank you for applying.</h3>
              <div className="cancel-action">
            <img src="img/iconoir_cancel.svg" alt="cancel-action" srcSet="" />
          </div>
            </div>
            <div className="thankyoufor-applying-paragraph">
              Thank you for applying to Property Dekho 24/7! We receive many
              applications and carefully review each one. If shortlisted, we’ll
              reach out for the next steps. Otherwise, we’ll keep your profile
              for future opportunities. In the meantime, explore our website or
              follow us on LinkedIn (<span>@PropertyDekho247</span>) to stay
              updated!
            </div>
            <div className="view-more-button">
              <button>View More Jobs </button>
            </div>
          </div>
         
        </div>
      </>
    </>
  );
}

export default Career;
