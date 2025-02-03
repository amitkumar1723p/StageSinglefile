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
      "PropertyDekho247 was straightforward and transparent, providing clear advice and helping me navigate the real estate market with confidence and ease.",
    // image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
];

const Testimonials = () => {
  return (
    <div className="feedback-section bg-white py-10 px-5 text-center max-w-screen-xl mx-auto">
      <h2 className="feedback-header">
        Client <span>Feedback</span>
      </h2>

      <div className="feedback-list grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[20px] justify-items-center mt-[15px]">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="feedback-item bg-white shadow-[0px_0px_16px_0px_#c5dff3] flex flex-col justify-between rounded-lg px-[20px] py-[15px] text-center   transition-all duration-300 ease-in-out feedback-item hover:-translate-y-[10px] hover:shadow-[0px_10px_20px_rgba(0,0,0,0.1)]">
            <div className="collan">
              <img src="/img/Double-colon.svg" alt="double" />
              <img src="/img/Double-colon.svg" alt="double" />
            </div>
            <p className="feedback-quote text-[#4b5563] text-sm font-medium leading-[18px] text-left my-2"> {testimonial.feedback} </p>
            <div className="feedback-user-info flex flex-row items-center mt-[10px]">
              {/* <img
                className="feedback-image w-[40px] h-[40px] rounded-full object-cover mr-2"
                src={testimonial.image}
                alt={testimonial.name}
              /> */}

              <p className="feedback-name text-sm font-medium leading-[17px] text-left my-2 text-[var(--main-light-clr)]">
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
