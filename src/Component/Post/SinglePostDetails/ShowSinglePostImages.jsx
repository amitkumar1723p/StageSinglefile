// import React from 'react'

// export default function ShowSinglePostImages() {
//   return (
//     <div>ShowSinglePostImages</div>
//   )
// }

import React, { useEffect, useRef, useState } from "react";
import WindowComponent from "../../WindowComponent";
import OneImage from "./OneImage";
import MakeOfferSuccessAlert from "./MakeOfferSuccessAlert";
import SinglePostImageSlider from "./SinglePostImageSlider";

export default function ShowSinglePostImages({ Images }) {
  const [ImageCount, setImageCount] = useState(0);
  const [showFullImage, setshowFullImage] = useState(false);
  const showFullRefBtn = useRef(null);
   
  const [ImageUrl, setImageUrl] = useState("");
  const [ImageData, setImageData] = useState({
    FistImage: [],
    OtherImages: [],
  });
  useEffect(() => {
    // setImageData
    if (Images) {
      const AllImages = [...Images];
      let firstElement = AllImages.shift();
      setImageData({ FistImage: firstElement, OtherImages: AllImages.slice(0, 3) });
    }
    
  }, []);
  
  return (
    <>
      <div className="property-image1" ref={showFullRefBtn} onClick={()=>{   setshowFullImage(true);}}>
        
        <div className="main-img-box">
          <div className="main-img">
            {" "}
            <img src={ImageData.FistImage.url} alt=""   />
          </div>
          {
            ImageData.OtherImages.length>0  &&    <div className="other-image">
          
            {ImageData.OtherImages.map((Post, i) => {
              // return <img key={i} src={e.url} alt="PropertyPost" />;
              return (
                <img src={Post.url} alt=""  key={i} />
                // <img
                //   className="property-image1-img"
                //   onClick={(e) => {
                //     setImageUrl(Post.url);

                //     setshowFullImage(true);
                //   }}
                //   key={i}
                //   src={Post.url}
                //   alt="PropertyPost"
                //   style={{
                //     transform: `translateX(${ImageCount}00%)`,

                //   }}
                // />
              );
            })}
          </div>
          }
       
        </div>

        {/* {Images.map((Post, i) => {
          // return <img key={i} src={e.url} alt="PropertyPost" />;
          return (
            <img
              className="property-image1-img"
              onClick={(e) => {
                setImageUrl(Post.url);

                setshowFullImage(true);
              }}
              key={i}
              src={Post.url}
              alt="PropertyPost"
              style={{
                transform: `translateX(${ImageCount}00%)`,
   
              }}
            />
          );
        })} */}
      </div>
       
      {showFullImage && (
        <WindowComponent
          ImageData={Images}
          Component={SinglePostImageSlider}
          //   Component={OneImage}
          SetShow={setshowFullImage}
          BtnRef={showFullRefBtn}
          ImageUrl={ImageUrl}
        />
      )}
    </>
  );
}
