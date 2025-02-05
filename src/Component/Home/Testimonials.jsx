import React from "react";
import "./TestimonialsStyles.css"; // Your updated CSS file

const testimonials = [
  {
    name: "Ananya Sharma",
    location: "Delhi ",
    type: "Buyer",
    feedback:
      "I appreciated PropertyDekho247's transparency throughout the process. Their honest advice helped me make informed decisions without any hidden surprises.",
    // image: "https://randomuser.me/api/portraits/women/1.jpg", // Placeholder for user image
  },
  {
    name: "Devender Singh",
    location: "Gurgaon",
    type: "Buyer",
    feedback:
      "As a first-time buyer, PropertyDekho247 guided me clearly, offering honest insights and never pushing me into decisions. Truly professional and transparent.",
    // image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Sahil",
    location: "Gurgaon",
    type: "Owner",
    feedback:
      "I trust PropertyDekho247 because of their transparent approach. They provided honest, clear guidance without any pressure to make quick decisions.",
    // image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Naveen",
    location: "Delhi",
    type: "Owner",
    feedback:
      "PropertyDekho247 was straightforward and transparent, providing clear advice and helping me navigate the real estate market with confidence and ease",
    // image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
];

const Testimonials = () => {
  return (
    <div className="feedback-section">
      <h2 className="feedback-header">
        Client <span>Feedback</span>
      </h2>

      <div className="feedback-list">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="feedback-item">
            <div className="collan">
              <img src="/img/Double-colon.svg" alt="double" />
              <img src="/img/Double-colon.svg" alt="double" />
            </div>
            <p className="feedback-quote"> {testimonial.feedback} </p>
            <div className="feedback-user-info">
              {/* <img
                className="feedback-image"
                src={testimonial.image}
                alt={testimonial.name}
              /> */}

              <p className="feedback-name">
                {testimonial.name}, {testimonial.location} <br />{" "}
                {testimonial.type}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
