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
  const [RunImageSlider, setRunImageSlider] = useState(true);
  const [RunInterval, setRunInterval] = useState(false);
  const [RunTransition, setRunTransition] = useState(true);
  const [ImageUrl, setImageUrl] = useState("");

 ;
  const BtnRefs = useRef([]);

  useEffect(() => {
    BtnRefs.current[0] = React.createRef();
    BtnRefs.current[1] = React.createRef();
  }, []);

  useEffect(() => {
    let slider;
    if (RunImageSlider == true) {
      slider = setInterval(() => {
        let actualImageLength = Images.length - 1;

        if (-actualImageLength < ImageCount) {
          setRunTransition(true);
          setImageCount(ImageCount - 1);
        } else {
          setRunTransition(false);
          setImageCount(0);
        }
      }, 3000);
    }

    if (RunImageSlider == false) {
      clearInterval(slider);
    }

    // Cleanup function
    return () => {
      clearInterval(slider);
    };
  }, [ImageCount, RunImageSlider]);

  return (
    <>
      <div
        onMouseEnter={() => {
          setRunImageSlider(false);
        }}
        onMouseLeave={() => {
          setRunImageSlider(true);
        }}
        className="property-image1 singlePost-image-slider"
        ref={showFullRefBtn}
        onClick={(e) => {
          let BtnElement = BtnRefs.current.some(
            (btnRef) => btnRef.current && btnRef.current.contains(e.target)
          );
          if (BtnElement == false) {
            setshowFullImage(true);
          }
        }}
      >
        {Images.map((Post, i) => {
          // return <img key={i} src={e.url} alt="PropertyPost" />;
          return (
            <div key={i}
              className="single-post-smallimgslider-container"
              style={{
                transform: `translateX(${ImageCount}00%)`,
                transition: `${RunTransition ? "all 0.3s ease-in-out" : ""}`,
              }}
            >
              <div className="single-post-smallimgslider-background">
                <img src={Post.url} alt="background" />
              </div>

              <div
                className="single-post-smallimgslider-main-img-box"
                key={i}

                // style={{ backgroundImage: `url(${Post.url})` }}
              >
                <img src={Post.url} alt="PropertyPost" />
              </div>
            </div>
          );
        })}
         {
          Images.length> 1 &&  <div className="singlepost-imageslide-prev-next-btn-box component-imageslide-prev-next-btn-box">
          <button
            ref={BtnRefs.current[0]}
            onClick={() => {
              if (ImageCount < 0) {
                setImageCount(ImageCount + 1);
                setRunTransition(true);
              } else {
                let actualImageLength = Images.length - 1;

                setImageCount(-actualImageLength);
                setRunTransition(false);
              }

              setshowFullImage(false);
            }}
          >
            <img
              className="next-prev-img-lending-page"
              src={`data:image/svg+xml;utf8,${encodeURIComponent(`
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="20" transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 0 40)" fill="white"/>
<path d="M24.4055 29.8001C23.7568 30.4502 22.7038 30.4508 22.0544 29.8014L13.4292 21.1762L12.9663 20.6903C12.5981 20.3039 12.5983 19.6964 12.9668 19.3102L13.4308 18.8239L22.0563 10.1984C22.7057 9.549 23.7587 9.549 24.4081 10.1984C25.0578 10.8481 25.0576 11.9014 24.4077 12.5508L17.9119 19.0417C17.3823 19.5709 17.3821 20.4293 17.9115 20.9587L24.4043 27.4515C25.0527 28.0999 25.0533 29.1511 24.4055 29.8001Z" fill="#0078D4"/>
</svg>

                      `)}`}
              alt="Prev-btn"
            />
          </button>
          <button
            ref={BtnRefs.current[1]}
            onClick={() => {
              let actualImageLength = Images.length - 1;
              setRunTransition(true);
              if (-actualImageLength < ImageCount) {
                setImageCount(ImageCount - 1);
              } else {
                setImageCount(0);
                setRunTransition(false);
              }

              setshowFullImage(false);
            }}
          >
            <img
              className="next-prev-img-lending-page"
              src={`data:image/svg+xml;utf8,${encodeURIComponent(`
                        <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="40.8408" y="40" width="40" height="40" rx="20" transform="rotate(-180 40.8408 40)" fill="white"/>
<path d="M16.4353 29.8001C17.084 30.4502 18.137 30.4508 18.7864 29.8014L27.4116 21.1762L27.8745 20.6903C28.2427 20.3039 28.2425 19.6964 27.874 19.3102L27.41 18.8239L18.7846 10.1984C18.1351 9.549 17.0821 9.549 16.4327 10.1984V10.1984C15.7831 10.8481 15.7833 11.9014 16.4331 12.5508L22.9289 19.0417C23.4586 19.5709 23.4587 20.4293 22.9293 20.9587L16.4365 27.4515C15.7881 28.0999 15.7876 29.1511 16.4353 29.8001V29.8001Z" fill="#0078D4"/>
</svg>


                      `)}`}
              alt="Prev-btn"
            />
          </button>
        </div>
         }
       

      </div>

      {showFullImage && (
        <WindowComponent
          ImageData={Images}
          Component={SinglePostImageSlider}
          //   Component={OneImage}
          SetShow={setshowFullImage}
          BtnRef={showFullRefBtn}
          ImageUrl={ImageUrl}
          ZoomImageNumber={ImageCount}
        />
      )}
    </>
  );
}
