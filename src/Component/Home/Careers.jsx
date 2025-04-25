import { useEffect, useState } from "react";
import "./Careers.css";
import { useDispatch, useSelector } from "react-redux";
import { ApplyJobAction } from "../../Action/postAction";
// import "./Responsive.css";

function Career() {
  const [departmentOpen, setDepartmentOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [applying, setApplying] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [jobName, setJobName] = useState("");
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [LinkedIn, setLinkedIn] = useState('');
  const [experienceOpen, setExperienceOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [expandedJobIndex, setExpandedJobIndex] = useState(null)
  const [resume, setResume] = useState(null);

  const dispatch = useDispatch()
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // console.log(file)
    if (file && file.type === "application/pdf") {
      setResume(file)
    } else {
      alert("Only PDF files are allowed.");
    }
  };

  const { data:AlertData, LodingType:AlertType } = useSelector((state) => {
    return state.userData;
  });
 
  useEffect(() => {
    if (AlertData&& ["ApplyJobActionRequest"].includes(AlertType)) {
      if (AlertData.success === true) {
        setSuccessOpen(true)
        // dispatch(GetDeletedPostsAction());
         
      }
    }

    // eslint-disable-next-line
  }, [AlertData]);


  const jobs = [
    {
      title: "Technology & Development - Backend Systems - Developer",
      experience: "2-5 Years",
      salary: "Not disclosed",
      location: "Gurugram, Haryana",
      category: "Product Management",
      posted: "4 days ago",
      openings: 5,
      applicants: 5,
      description:
        "We are looking for a skilled Backend Systems Developer with 2-5 years of experience to join our Technology & Development team. The ideal candidate will have strong knowledge of server-side programming, database design, and API development.",
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "2-5 years of experience in backend development",
        "Proficiency in at least one backend language (Java, Python, Node.js)",
        "Experience with database systems (SQL, NoSQL)",
        "Knowledge of REST API design principles",
        "Experience with cloud services (AWS, Azure, GCP)",
      ],
      benefits: [
        "Competitive salary",
        "Health insurance",
        "Flexible working hours",
        "Professional development opportunities",
        "Dynamic work environment",
      ],
    },
    {
      title: "Design & User Experience - Product Design - Senior Designer",
      experience: "2-5 Years",
      salary: "Not disclosed",
      location: "Gurugram, Haryana",
      category: "Product Management",
      posted: "4 days ago",
      openings: 5,
      applicants: 5,
      description:
        "We are looking for a skilled Product Designer with 2-5 years of experience to join our Design & User Experience team. The ideal candidate will have strong UI/UX design skills, experience with prototyping tools, and an understanding of user-centered design principles.",
      requirements: [
        "Bachelor's degree in Design, HCI, or related field",
        "2-5 years of experience in UI/UX design",
        "Proficiency in design tools (Figma, Adobe XD, Sketch)",
        "Strong knowledge of user-centered design principles",
        "Ability to create wireframes, mockups, and prototypes",
        "Experience in working with development teams for implementation",
      ],
      benefits: [
        "Competitive salary",
        "Health insurance",
        "Flexible working hours",
        "Professional development opportunities",
        "Dynamic work environment",
      ],
    },
    {
      title: "Sales & Marketing - Digital Campaigns - Marketing Specialist",
      experience: "2-5 Years",
      salary: "Not disclosed",
      location: "Gurugram, Haryana",
      category: "Product Management",
      posted: "4 days ago",
      openings: 5,
      applicants: 5,
      description:
        "We are looking for a skilled Marketing Specialist with 2-5 years of experience to manage digital campaigns and drive customer engagement. The ideal candidate will have expertise in SEO, social media marketing, and performance analytics.",
      requirements: [
        "Bachelor's degree in Marketing, Business, or related field",
        "2-5 years of experience in digital marketing",
        "Experience with SEO, Google Ads, and social media platforms",
        "Strong analytical skills to measure campaign performance",
        "Ability to develop and implement marketing strategies",
        "Excellent communication and creativity skills",
      ],
      benefits: [
        "Competitive salary",
        "Health insurance",
        "Flexible working hours",
        "Professional development opportunities",
        "Dynamic work environment",
      ],
    },
    {
      title: "Operations & Support - Customer Success - Support Executive",
      experience: "2-5 Years",
      salary: "Not disclosed",
      location: "Gurugram, Haryana",
      category: "Product Management",
      posted: "4 days ago",
      openings: 5,
      applicants: 5,
      description:
        "We are looking for a dedicated Support Executive with 2-5 years of experience in customer service and operations. The ideal candidate will be responsible for handling customer queries, resolving issues, and ensuring customer satisfaction.",
      requirements: [
        "Bachelor's degree in Business, Communication, or related field",
        "2-5 years of experience in customer support or operations",
        "Strong problem-solving and communication skills",
        "Ability to handle customer queries efficiently",
        "Experience with CRM tools and customer engagement strategies",
        "Ability to work in a fast-paced environment",
      ],
      benefits: [
        "Competitive salary",
        "Health insurance",
        "Flexible working hours",
        "Professional development opportunities",
        "Dynamic work environment",
      ],
    },
  ];

  const careerFAQs = [
    {
      question: "What is the application process for career opportunities at PropertyDekho247?",
      answer: "The application process includes exploring open roles, submitting your application along with your resume, screening and shortlisting by our team, followed by interviews, and then an offer and joining process."
    },
    {
      question: "How do I submit my application?",
      answer: "You can explore open roles on our career page, complete the online application form, and upload your resume. Once submitted, you will receive a confirmation email."
    },
    {
      question: "What happens after I submit my application?",
      answer: "After submission, our team reviews applications, shortlists candidates based on skills and experience, and will contact you for the next steps if you're selected."
    },
    {
      question: "What can I expect during the interview process?",
      answer: "During the interview, an HR representative will discuss your career goals, role alignment, technical skills, experience, and problem-solving abilities to determine if you're a good fit for the role."
    },
    {
      question: "How long does the interview process take?",
      answer: "The interview process typically takes one to two weeks, depending on availability and the number of interview stages required."
    },
    {
      question: "What type of roles do you offer at PropertyDekho247?",
      answer: "We offer a wide range of roles in tech, marketing, sales, operations, and customer support. You can find the list of current job openings on our career page."
    },
    {
      question: "What benefits do employees enjoy at PropertyDekho247?",
      answer: "We offer competitive salaries, flexible working hours, opportunities for career growth, and a collaborative, innovative work culture."
    },
    {
      question: "How will I be informed if I’m selected for the role?",
      answer: "If you're shortlisted, you will be contacted by our HR team for interviews. If you are offered the role, you will receive an official offer letter with details regarding the role and joining process."
    },

    {
      question: "How can I grow in my career at PropertyDekho247?",
      answer: "We believe in empowering our employees through continuous learning, mentoring, and career development opportunities. You'll have access to training and growth within the company, allowing you to advance in your career."
    }
  ];


  return (
    <>


      <div className="career-page-main-container">




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
              <img loading="lazy" src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/left-Vector.svg" alt="alt" srcSet="" />
            </div>
            <div className="right-svg">
              <img loading="lazy" src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/right-Vector.svg" alt="alt" srcSet="" />
            </div>
          </div>
          {/* <div className="career-search-container">
            <div className="career-search-main-option">
              <div
                className="career-search-filter career-search-department"
                onClick={() => setDepartmentOpen(!departmentOpen)}
              >
                <img
                loading="lazy"
                  src="/img/mingcute_department-line.svg"
                  alt="Department icon"
                />
                <span>Department</span>
                <img
                loading="lazy"
                  src="/img/heroicons-solid_chevron-up.svg"
                  alt="Toggle department dropdown"
                />
                {departmentOpen && (
                  <div className="dropdown-menu">
                    
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
                <img loading="lazy" src="/img/mage_dashboard-plus.svg" alt="Type icon" />
                <span>Type</span>
                <img
                loading="lazy"
                  src="/img/heroicons-solid_chevron-up.svg"
                  alt="Toggle type dropdown"
                />
                {typeOpen && (
                  <div className="dropdown-menu">
        
                    <div className="dropdown-item">Full-time</div>
                    <div className="dropdown-item">Part-time</div>
                    <div className="dropdown-item">Contract</div>
                    <div className="dropdown-item">Internship</div>
                  </div>
                )}
              </div>

              <div
                className="career-search-filter career-search-experience"
                onClick={() => {setExperienceOpen(!experienceOpen);
              
                }}
              >
                <img loading="lazy" src="/img/iconoir_page-star.svg" alt="Experience icon" />
                <span>Experience</span>
                <img
                loading="lazy"
                  src="/img/heroicons-solid_chevron-up.svg"
                  alt="Toggle experience dropdown"
                />
                {experienceOpen && (
                  <div className="dropdown-menu">
                   
                    <div className="dropdown-item">Entry Level</div>
                    <div className="dropdown-item">Mid Level</div>
                    <div className="dropdown-item">Senior Level</div>
                    <div className="dropdown-item">Executive</div>
                  </div>
                )}
              </div>

              <button className="career-search-tab">
                <img loading="lazy" src="/img/wpf_search.svg" alt="Search icon" />
                <span>Search</span>
              </button>
            </div>
          </div> */}
        </header>
        <div className="Career-Join-Container">
          <div className="Career-Join-section ">
            <h3 className="Career-Heading">
              Why
              <span>
                <img loading="lazy" src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/Group.svg" alt="" srcSet="" />
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
        {
          careerFAQs.map((e, ind) => {
            return <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header " id={
                  `heading${ind}`
                }>
                  <button
                    className="accordion-button custon-accordian-header"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${ind}`}
                    aria-expanded="true"
                    aria-controls={`collapse${ind}`}
                  >
                    {e.question}
                  </button>
                </h2>
                <div
                  id={`collapse${ind}`}
                  className="accordion-collapse collapse "
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    {e.answer}

                  </div>
                </div>
              </div>

            </div>
          })
        }



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
              <img loading="lazy" src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/Rectangle+264.png" alt="Team meeting" />
            </div>
            <div className="image">
              <img loading="lazy" src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/Rectangle+265.png" alt="Team collaboration" />
            </div>
            <div className="image">
              <img loading="lazy" src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/Rectangle+266.png" alt="Laptop workspace" />
            </div>
            <div className="image">
              <img loading="lazy" src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/Rectangle+267.png" alt="Workshop session" />
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
                  <img loading="lazy" src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/Rectangle+278.png" alt="Laptop workspace" />
                </div>
                <div className="image-container">
                  <img
                  loading="lazy"
                    src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/Rectangle+279.png"
                    alt="Notification on a tablet"
                  />
                </div>
              </div>
              <div className="image-row">
                <div className="image-container ">
                  <img  loading="lazy" src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/Rectangle+280.png" alt="Interview scene" />
                </div>
              </div>
            </div>
            <div className="steps-section">
              <div className="step">
                <div className="step-number">
                  1
                  <img loading="lazy" src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/Vector+128.svg" alt="stroke" srcSet="" />
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
                  <img loading="lazy" src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/Vector+128.svg" alt="stroke" srcSet="" />
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
                  <img loading="lazy" src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/Vector+128.svg" alt="stroke" srcSet="" />
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



            <>
              {jobs.map((job, index) => {


                return (
                  <div key={index} className="job-card">
                    <div className="job-header">
                      <h2>{job.title}</h2>
                      <div className="tags">
                        <span className="tag">On-Site</span>
                        <span className="tag">Full Time</span>
                      </div>
                    </div>
                    <div className="job-details">
                      <div className="detail">
                        <div>
                          <img loading="lazy" src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/mynaui_briefcase.svg" alt="briefcase" />
                        </div>
                        <span>{job.experience}</span>
                        <div className="detail-stroke">|</div>
                      </div>
                      <div className="detail">
                        <div>
                          <img loading="lazy" src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/heroicons_currency-rupee.svg" alt="currency" />
                        </div>
                        <span>{job.salary}</span>
                        <div className="detail-stroke">|</div>
                      </div>
                      <div className="detail">
                        <div>
                          <img loading="lazy" src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/fluent_location-28-regular.svg" alt="location" />
                        </div>
                        <span>{job.location}</span>
                        <div className="detail-stroke">|</div>
                      </div>
                      <div className="detail">
                        <div>
                          <img
                          loading="lazy"
                            src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/streamline_industry-innovation-and-infrastructure.svg"
                            alt="infrastructure"
                          />
                        </div>
                        <span>{job.category}</span>
                      </div>
                    </div>
                    <hr className="dashed-2" />
                    <div className="job-information">
                      <div className="meta">
                        <span>Posted: {job.posted}</span>
                        <span>Total Openings: {job.openings}</span>
                        <span>Applicants: {job.applicants}</span>
                      </div>
                      <div className="actions">
                        <button className="apply-now" onClick={() => {
                          setApplying(true)
                          setJobName(job.title)
                        }}>
                          Apply Now
                        </button>
                        <button
                          onClick={() => {
                            if (expandedJobIndex === index) {

                              setExpandedJobIndex(null)
                            } else {
                              setExpandedJobIndex(index)

                            }
                          }}
                          className="see-more"
                        >
                          {expandedJobIndex === index ? "See Less" : "See More"}
                          <img loading="lazy" src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/Icon+placeholder.svg" alt="" />
                        </button>
                      </div>
                    </div>
                    {expandedJobIndex === index && (
                      <div className="job-description expanded">
                        <h3>Job Description</h3>
                        <p>{job.description}</p>

                        <h3>Requirements</h3>
                        <ul>
                          {job.requirements.map((req, idx) => (
                            <li key={idx}>{req}</li>
                          ))}
                        </ul>

                        <h3>Benefits</h3>
                        <p>{job.benefits.join(", ")}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </>


            <div className="career-explore-page">
              <div className="first-explore-page">
                <div className="explore-text-section">
                  <h3>WHAT WILL BUYERS GET?</h3>
                  <div className="explore-page-list">
                    <ul>
                      <li className="explore-page-items">
                        <img loading="lazy"
                          src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/mdi_tick-circle-outline.svg"
                          alt="checkmark"
                          srcSet=""
                        />
                        <span className="explore-page-text">
                          Verified Sellers Listing
                        </span>
                      </li>
                      <li className="explore-page-items">
                        <img
                        loading="lazy"
                          src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/mdi_tick-circle-outline.svg"
                          alt="checkmark"
                          srcSet=""
                        />
                        <span className="explore-page-text">
                          Schedule property visit online
                        </span>
                      </li>
                      <li className="explore-page-items">
                        <img
                        loading="lazy"
                          src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/mdi_tick-circle-outline.svg"
                          alt="checkmark"
                          srcSet=""
                        />
                        <span className="explore-page-text">Offer your price</span>
                      </li>
                      <li className="explore-page-items">
                        <img
                        loading="lazy"
                          src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/mdi_tick-circle-outline.svg"
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
                      <img loading="lazy" src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/Vector.svg" alt="right-arrow" srcSet="" />
                    </div>
                  </button>
                </div>
                <div className="explore-svg">
                  <div className="explore-message-svg">
                    <img
                    loading="lazy"
                      src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/Clip+path+group.svg"
                      alt="message svg"
                      srcSet=""
                    />
                  </div>
                  <div className="explore-img">
                    <div className="explore-page-svg">
                      <img loading="lazy" src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/Group+189.svg" alt="" srcSet="" className="career-first-svg" />
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
                        loading="lazy"
                          src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/mdi_tick-circle-outline.svg"
                          alt="checkmark"
                          srcSet=""
                        />
                        <span className="explore-page-text">Verified Buyers</span>
                      </li>
                      <li className="explore-page-items">
                        <img
                        loading="lazy"
                          src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/mdi_tick-circle-outline.svg"
                          alt="checkmark"
                          srcSet=""
                        />
                        <span className="explore-page-text">
                          Price Offer Alerts
                        </span>
                      </li>
                      <li className="explore-page-items">
                        <img
                        loading="lazy"
                          src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/mdi_tick-circle-outline.svg"
                          alt="checkmark"
                          srcSet=""
                        />
                        <span className="explore-page-text">
                          Choose Offer and Close
                        </span>
                      </li>
                      <li className="explore-page-items">
                        <img
                        loading="lazy"
                          src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/mdi_tick-circle-outline.svg"
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
                      <img loading="lazy" src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/Vector.svg" alt="right-arrow" srcSet="" />
                    </div>
                  </button>
                </div>
                <div className="explore-svg">
                  <div className="explore-message-svg">
                    <img
                    loading="lazy"
                      src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/Clip+path+group.svg"
                      alt="message svg"
                      srcSet=""
                    />
                  </div>
                  <div className="explore-img">
                    <div className="explore-page-svg">
                      <img loading="lazy" src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/Group+187.svg" alt="" srcSet="" className="career-second-svg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="job-card-right-side-item">

            <div className="career-banner">
              <div className="first-banner">
                <img
                loading="lazy"
                  src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/Modern+Did+You+Know+Fun+Fact+Instagram+Post+1.png"
                  alt="Banner"
                  srcSet=""
                  className="banner-img"
                /></div>
              <div className="first-banner">
                <img loading="lazy" src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/CareerBanner3png.png" alt="Banner" srcset="" /></div>
              <div className="first-banner">
                <img loading="lazy" src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/CareerBanner4.png" alt="Banner" srcset="" /></div>
            </div>
          </div>
        </div>



       { successOpen &&  <div className="career-form-parent">


          <div className="Career-thankyoufor-applying-container  ">
            <div className="Career-thankyoufor-applying">
              <div className="heading-thankyoufor-applying">
                <h3>Thank you for applying.</h3>
                <div className="cancel-action" onClick={()=>{
                  setSuccessOpen(false)

                }} >
                  <img loading="lazy" src="img/iconoir_cancel.svg" alt="cancel-action" srcSet="" />
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
        </div>}
      </div>

      {
        applying && <div className="career-form-parent" >
          <div className="Career-Card-form">
            <div className="Career-Card-header">
              <h3>Join Our Team</h3>
              <div className="Career-Card-header-img" onClick={() => {
                setApplying(false)
                setJobName("")
              }}>
                {" "}
                <img
                loading="lazy"
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
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ankit Sharma"
                  />
                </div>
                <div className="Career-form-group">
                  <label htmlFor="mobile">Mobile No</label>
                  <input
                    type="tel"
                    id="mobile"
                    className="form-input"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="e.g. 782xxxxxxx"
                  />
                </div>
                <div className="Career-form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    required
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

                  <div className="attach-button">
                    <label htmlFor="file" className="file-label">
                      <img
                      loading="lazy"
                        src="img/mdi_attachment-plus.svg"
                        alt="attachment-button"
                      />
                      Attach File
                    </label>
                    <input
                      type="file"
                      id="file"
                      accept=".pdf"
                      required
                      onChange={handleFileChange}
                    />
                  </div>

                  <button type="submit" className="submit-button" onClick={


                    (e) => {
                      e.preventDefault()

                      if (!jobName || !fullName || !mobile || !email || !resume) {
                        alert("please fill all filed !!")
                        return;
                      }

                      dispatch(ApplyJobAction(
                        {
                          jobName,
                          fullName,
                          mobile,
                          email,
                          LinkedIn,
                          resume

                        }
                      ))

                      setJobName("");
                      setFullName("");
                      setMobile("");
                      setEmail("")
                      setLinkedIn("");
                      setResume(null);
                      setApplying(false)
                    }
                  }>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      }
    </>

  );
}

export default Career;
