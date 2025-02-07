import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function WindowComponent({
  Component,
  SetShow,
  BtnRef,
  ImageUrl,
  SinglePostData,
  PropertyAddress,
  ImageData,
  ZoomImageNumber ,
  className,
  Type // Type of Alert
}) {
  const MainBox = useRef(null);
  const navigate =useNavigate()


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (MainBox?.current && BtnRef?.current) {
        let hideElement = MainBox.current.contains(e.target);
        // let BtnElement = ;

        const BtnElement = Array.isArray(BtnRef.current)
          ? BtnRef.current.some(
              (btnRef) => btnRef.current && btnRef.current.contains(e.target)
            )
          : BtnRef.current.contains(e.target);

        if (hideElement == false && BtnElement == false) {
          
          SetShow(false);
          if(Type=="CreatePostSubmitAlert"){
            navigate("/user/my-listing")
            
          }
        }
      }
    };

    if (Component && MainBox) {
      document.addEventListener("click", handleClickOutside);

      // Disable scrolling when the form is open
      document.body.style.overflow = "hidden";

      // Re-enable scrolling when the form is closed
      // return () => {
      //   document.body.style.overflow = "auto";
      // };
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "auto";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Component, MainBox, BtnRef]);

  return (
    <>
      <div className={`window-component-main ${className}`}>
        <div ref={MainBox}>
          <Component
            SetShow={SetShow}
            ImageUrl={ImageUrl}
            SinglePostData={SinglePostData}
            Images={ImageData}
            PropertyAddress={PropertyAddress}
            ZoomImageNumber ={ ZoomImageNumber}
          />
        </div>
      </div>
    </>
  );
}
