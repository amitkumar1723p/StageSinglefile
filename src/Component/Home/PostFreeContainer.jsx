import React from "react";
import "./PostFreeContainer.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const PostFreeContainer = () => {
  const navigate = useNavigate();
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });
  return (
    <div className="post-free-container flex justify-center items-center bg-[var(--main-light-clr)] rounded-lg w-4/5 mx-auto my-5 shadow-[0px_0px_16px_0px_#c5dff3]">
      <div className="post-free-content flex gap-[18px] items-center p-[18px]">
        <div className="post-free-image flex-shrink-0 overflow-hidden">
          <img
            src="/img/postfreepost.svg"
            alt="Couple on device"
            className="post-free-img w-[100%] h-auto object-cover max-wp-[430px] ml-[30px]"
          />
        </div>
        <div className="post-free-text flex flex-col justify-around h-[420px]">
          <div className="Post-free-heading-box flex flex-col gap-[15px]">
            <h2 className="post-free-title text-[32px] font-bold m-0 text-[var(--main-white-light-clr)]">
              List Your Property with PropertyDekho247
            </h2>
           
            {/* <p className="post-free-description">
            Typically, when an owner seeks to sell their property, they rely on
            various stakeholders or property listing portals. However, due to
            limited options or a lack of market insight, sellers often struggle
            to achieve the best price. Our technology platform simplifies and
            enhances the selling process, ensuring sellers achieve the best
            price through direct buyer offers.
          </p> */}
          
            <p className="post-free-call text-[18px] text-[var(--main-white-light-clr)] mb-2.5 text-justify">
              PropertyDekho247.com India’s 1st Online Reselling platform with
              100% transparency
            </p>
          </div>
          <div className="point-in-post-free flex flex-col gap-[20px] ">
            <p className="post-free-p flex items-center text-[20px] text-white">
              <span className="mr-[10px] text-[16px] font-extrabold">&#x2713;</span> 100% Verified Buyer’s
            </p>
            <p className="post-free-p flex items-center text-[20px] text-white">
              <span className="mr-[10px] text-[16px] font-extrabold">&#x2713;</span> A real-time alert for scheduling a
              property visit’s
            </p>
            <p className="post-free-p flex items-center text-[20px] text-white">
              <span className="mr-[10px] text-[16px] font-extrabold">&#x2713;</span> Real time notification of Price offer by
              buyer's
            </p>
            <p className="post-free-p flex items-center text-[20px] text-white">
              <span className="mr-[10px] text-[16px] font-extrabold">&#x2713;</span> Sell Property at highest price offer
            </p>
          </div>
          <button
            className="post-free-button px-[30px] py-[20px] text-base text-[var(--main-light-clr)] bg-[var(--main-white-light-clr)] border-0 rounded-[5px] cursor-pointer transition-colors duration-300 font-semibold"
            onClick={() => {
              if (medata && medata.IsAuthenticated === true) {
                navigate("/user/post");
              } else {
                navigate("/login");
              }
            }}
          >
            Get Started !
          </button>
        </div>
      </div>
    </div>
  );
};
export default PostFreeContainer;
