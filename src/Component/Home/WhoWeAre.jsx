import React from "react";
import "./WhoWeAre.css"; // Importing the updated CSS file

const WhoWeAre = () => {
  return (
   
      <div className="who-we-are px-16 py-5 bg-[var(--main-light-clr)] text-center  ">
        <div className="text-center h-15">
          <h2 className="whoweare-h2 font-bold relative inline-block mb-5 text-[var(--main-white-light-clr)] text-3xl">Who We Are</h2>
          {/* <p className="whoweare-p text-white text-center mb-42px text-[18px] font-medium leading-normal tracking-[1px]">
            A Seamless and Reliable Path to Your New Home, with Services
            Designed for Your Confidence and Convenience.
          </p> */}
        </div>
        <div className=" w-[90%] mx-auto relative">
          <div className="top-[-15px] left-[-20px] text-[var(--main-white-light-clr)] font-extrabold text-[4rem] text-white absolute">“</div>
          <p className=" who-we-are-section description max-480:text-[12px]  text-[16px] text-[var(--main-white-light-clr)] leading-[1.8] mx-auto max-w-[1000px] text-center ">
            PropertyDekho247.com is an innovative Proptech platform that
            transforms the traditional property buying and selling process into
            a fully digital experience. As the first online platform to provide
            real-time price alerts to property owners, we ensure complete
            transparency and a seamless user journey. Our platform targets to ensure the best market prices and offers comprehensive transaction support,
            including legal documentation and property registration, ensuring a
            smooth and hassle-free process from start to finish.
          </p>
          <div className="bottom-[-30px] right-[-20px] text-[var(--main-white-light-clr)] font-extrabold text-[4rem] text-white absolute">”</div>
        </div>
      </div>
    
  );
};

export default WhoWeAre;
