import React, { useEffect } from "react";

const SimpleStepsBuyer = () => {
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

  return (
    <section className="bg-[#e9f5ff]">
      <style jsx>{`
        .simple-step-card {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.2s ease-out, transform 0.4s ease-in-out;
        }

        .animate-card {
          opacity: 1 !important;
          transform: translateY(0) !important;
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
        <div className="simple-step-card bg-white rounded shadow-lg p-6 flex flex-col items-center">
          <div className=" ">
            <img src="/img/StartExploring.png" alt="Start Exploring" className="w-[50px] mb-4" />
            <h3 className="text-xl font-semibold text-[#333] mb-2">Start Exploring</h3>
            <p className="text-sm text-[#6a6a6a]">
              Start exploring our verified listings & select a property that meets your requirements.
            </p>
          </div>
        </div>

        <div className="simple-step-card bg-white rounded shadow-lg p-6 flex flex-col items-center">
          <div className="">
            <img src="/img/ConnectwithUs.png" alt="Lets Connect" className="w-[50px] mb-4" />
            <h3 className="text-xl font-semibold text-[#333] mb-2">Lets Connect</h3>
            <p className="text-sm text-[#6a6a6a]">
              For more details about the property, speak to our representative.
            </p>
          </div>
        </div>

        <div className="simple-step-card bg-white rounded shadow-lg p-6 flex flex-col items-center">
          <div className="">
            <img src="/img/ScheduleyourVisit.png" alt="Schedule your Visit" className="w-[50px] mb-4" />
            <h3 className="text-xl font-semibold text-[#333] mb-2">Schedule Property Visit</h3>
            <p className="text-sm text-[#6a6a6a]">
              Give us the opportunity to showcase your selected property in person.
            </p>
          </div>
        </div>

        <div className="simple-step-card bg-white rounded shadow-lg p-6 flex flex-col items-center">
          <div className="">
            <img src="/img/SubmityourOffer.png" alt="Submit your Offer" className="w-[50px] mb-4" />
            <h3 className="text-xl font-semibold text-[#333] mb-2">Submit your Offer</h3>
            <p className="text-sm text-[#6a6a6a]">
              Offer your best price online by researching the current market value, considering the property's conditions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleStepsBuyer;
