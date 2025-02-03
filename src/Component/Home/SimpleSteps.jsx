import React, { useEffect } from "react";

const SimpleSteps = () => {
  useEffect(() => {
    const cards = document.querySelectorAll(".simple-step-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-card");
          }
        });
      },
      { threshold: 0.5 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, []);

  const steps = [
    {
      id: "step1",
      image: "/img/IntroduceyourProperty.png",
      title: "Introduce yourself and your property",
      description: "Discover your property's market value - Let's calculate and decide with confidence!"
    },
    {
      id: "step2",
      image: "/img/ListyourPropertyFree.png",
      title: "List Your Property Free",
      description: "List your property on our website with pictures, videos, and other important information like the price, size, location, etc."
    },
    {
      id: "step3",
      image: "/img/GetOffersOnline.png",
      title: "Get Real Time Offers",
      description: "Interested buyers will submit their offer prices online, and you'll get real-time notifications."
    },
    {
      id: "step4",
      image: "/img/AcceptOffer.png",
      title: "Get Close",
      description: "Let's accept the offer and invite the prospective buyer to finalize the transaction."
    }
  ];

  return (
    <section className="bg-[#e9f5ff]">
      <style jsx>{`
        .animate-card {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .simple-step-card {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.2s ease-out, transform 0.4s ease-in-out;
        }
        @keyframes moveArrow {
          0% { transform: translateX(0); }
          50% { transform: translateX(1.25rem); }
          100% { transform: translateX(0); }
        }
      `}</style>

<div className="w-4/5 mx-auto py-8 grid  gap-2.5 items-stretch justify-items-center 
  md:grid-cols-2 md:gap-3 xl:grid-cols-4
  max-768:w-[90%] max-768:gap-4
  max-480:grid-cols-1 max-480:gap-3 max-480:w-full max-480:px-4
  max-420:grid-cols-1 max-420:gap-3 max-420:w-full">
        
        {steps.map((step) => (
          <div
            key={step.id}
            id={step.id}
            className="simple-step-card w-full rounded bg-white shadow-[8px_8px_20px_0px_rgba(180,185,191,0.50)] 
              p-4 h-full text-left relative text-[#6a6a6a] flex justify-between
              opacity-0 translate-y-[30px] transition-[opacity_0.6s_ease-out,transform_0.6s_ease-out]
              
              max-768:border max-768:border-[var(--main-lighter-clr)]"
          >
            <div className="flex-1 flex flex-col justify-start">
              <img 
                src={step.image} 
                alt="Start Exploring" 
                className="w-[50px] mb-0 max-768:w-10 max-768:mb-1"
              />
              <h3 className="text-[#333] text-xl font-semibold tracking-[0.4px] 
                max-768:text-sm">
                {step.title}
              </h3>
              <p className="mt-3.5 text-[#333] font-inter text-sm font-medium leading-[22px] 
                max-768:text-xs">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SimpleSteps;