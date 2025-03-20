import React, { useRef, useState } from "react";
import WindowComponent from "../../WindowComponent";
import OneImage from "./OneImage";
import MakeOfferSuccessAlert from "./MakeOfferSuccessAlert";
import { LucideRotateCw } from "lucide-react";

export default function SinglePostImageSlider({
  Images,
  SetShow,
  ZoomImageNumber,
}) {
  const [ImageCount, setImageCount] = useState(ZoomImageNumber);
  const [showFullImage, setshowFullImage] = useState(false);
  const showFullRefBtn = useRef(null);
  const [scale, setScale] = useState(1);
  const [ImageUrl, setImageUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [RunTransition, setRunTransition] = useState(true);
  const [transformOrigin, setTransformOrigin] = useState("center center");
  const [rotate, setRotate] = useState(null);
  return (
    <>
      <div className="img-zoom-slide" ref={showFullRefBtn}>


        <div className="Window-Image-Slider-Container">
          {Images.length > 1 && <div className="singlepost-imageslide-prev-next-btn-box window-imageslide-prev-next-btn-box">
            <button
              onClick={() => {
                if (ImageCount < 0) {
                  setImageCount(ImageCount + 1);
                  setScale(1); // Reset scale on image change
                  setRunTransition(true);
                } else {
                  let actualImageLength = Images.length - 1;

                  setImageCount(-actualImageLength);
                  setRunTransition(false);
                }
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
              onClick={() => {
                let actualImageLength = Images.length - 1;

                if (-actualImageLength < ImageCount) {
                  setImageCount(ImageCount - 1);
                  setScale(1); // Reset scale on image change
                  setRunTransition(true);
                } else {
                  setImageCount(0);
                  setRunTransition(false);
                }

                //   }
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
          </div>}




          {Images.map((Post, i) => {
            return (
              <div
                key={i}
                id={`${i}`}
                onMouseDown={(e) => {
                  e.preventDefault();

                  if (scale > 1 && Math.abs(ImageCount) == i) {
                    setIsDragging(true);
                    setRunTransition(false);
                  }
                }}
                onMouseMove={(e) => {
                  e.preventDefault();

                  if (isDragging && Math.abs(ImageCount) == i) {
                    const { left, top, width, height } =
                      e.target.getBoundingClientRect();

                    const x = ((e.clientX - left) / width) * 100; // X percentage
                    const y = ((e.clientY - top) / height) * 100; // Y percentage
                    setTransformOrigin(`${x}% ${y}%`);
                  }
                }}
                onMouseUp={() => {
                  if (Math.abs(ImageCount) == i) {
                    setIsDragging(false);
                    setRunTransition(true);
                  }
                }}
                onWheel={(e) => {
                  setRunTransition(true);
                  if (e.deltaY < 0) {
                    setScale((prevScale) => Math.min(prevScale + 0.5, 3));
                  } else if (e.deltaY > 0) {
                    setScale((prevScale) => Math.max(prevScale - 0.5, 1));
                  }
                }}
                className="single-post-largeimgslider-container"
                style={{
                  transition: `${RunTransition ? "all 0.3s ease-in-out" : ""}`,

                  transformOrigin:
                    Math.abs(ImageCount) == i ? transformOrigin : "center",
                  transform: `translateX(${ImageCount}00%) scale(${Math.abs(ImageCount) == i ? scale : 1
                    })`,

                  // transform: `translateX(${ImageCount}00%)`,
                }}
              >
                <div className="single-post-largeimgslider-background">
                  <img src={Post.url} alt="background" />
                </div>

                <div
                  className="single-post-largeimgslider-main-img-box"
                  key={i}

                // style={{ backgroundImage: `url(${Post.url})` }}
                >
                  <img style={{
                    transform: `${rotate ? `rotate(${rotate}deg)` : ""}`,
                  
                 
                  // transform: `translateX(${ImageCount}00%)`,
                }} src={Post.url} alt="PropertyPost" />
                  

                </div>
                {/* <img
                  // onMouseDown={(e) => {
                  //   e.preventDefault();

                  //   if (scale > 1 && Math.abs(ImageCount) == i) {
                  //     setIsDragging(true);
                  //   }
                  // }}
                  // onMouseMove={(e) => {
                  //   e.preventDefault();

                  //   if (isDragging && Math.abs(ImageCount) == i) {
                  //     const { left, top, width, height } =
                  //       e.target.getBoundingClientRect();

                  //     const x = ((e.clientX - left) / width) * 100; // X percentage
                  //     const y = ((e.clientY - top) / height) * 100; // Y percentage
                  //     setTransformOrigin(`${x}% ${y}%`);
                  //   }
                  // }}
                  // onMouseUp={() => {
                  //   if (Math.abs(ImageCount) == i) {
                  //     setIsDragging(false);
                  //   }
                  // }}
                  // onWheel={(e) => {
                  //   if (e.deltaY < 0) {
                  //     setScale((prevScale) => Math.min(prevScale + 0.5, 3));
                  //   } else if (e.deltaY > 0) {
                  //     setScale((prevScale) => Math.max(prevScale - 0.5, 1));
                  //   }
                  // }}
                  // id={`${i}`}
                  className="property-image1-img"
                  key={i}
                  src={Post.url}
                  alt="PropertyPost"
                /> */}
              </div>
            );
          })}
        </div>
        <div
          className="one-img-cross-btn"
          onClick={() => {
            SetShow(false);
          }}
        >
          X
        </div>
        <div className="zoom-in-zoom-out">


          <p

            onClick={() => {
              setRotate((prev) => {

                return prev + 90;
              })
            }}
          >
            <LucideRotateCw className="one-img-rotate-btn" />
          </p>


 


          {/* Zoom IN  */}
          
            <p
              onClick={(e) => {
                // scale < 3  
                //    if( scale < 3 ){
                // e.target.style = `visibility:hidden`
                //    } 
                setRunTransition(true);
                setTimeout(() => {
                  setScale((prevScale) => Math.min(prevScale + 0.5, 3));
                }, 0);

              }}
            >
              <img
                src={`data:image/svg+xml;utf8,${encodeURIComponent(`
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.6667 18.6667L27.3333 25.3333L25.3333 27.3333L18.6667 20.6667V19.6133L18.3067 19.24C16.7388 20.5919 14.7369 21.3349 12.6667 21.3333C10.3681 21.3333 8.16372 20.4202 6.53841 18.7949C4.91309 17.1696 4 14.9652 4 12.6667C4 10.3681 4.91309 8.16372 6.53841 6.53841C8.16372 4.91309 10.3681 4 12.6667 4C14.9652 4 17.1696 4.91309 18.7949 6.53841C20.4202 8.16372 21.3333 10.3681 21.3333 12.6667C21.3333 14.8133 20.5467 16.7867 19.24 18.3067L19.6133 18.6667H20.6667ZM12.6667 18.6667C16 18.6667 18.6667 16 18.6667 12.6667C18.6667 9.33333 16 6.66667 12.6667 6.66667C9.33333 6.66667 6.66667 9.33333 6.66667 12.6667C6.66667 16 9.33333 18.6667 12.6667 18.6667ZM16 13.3333H13.3333V16H12V13.3333H9.33333V12H12V9.33333H13.3333V12H16V13.3333Z" fill="#0078D4"/>
</svg>

`)}`}
                alt="zoom in"
              />
            </p>

          
                   {/* Zoom OUt  */}
                   <p
            onClick={() => {
              setRunTransition(true);
              setTimeout(() => {
                setScale((prevScale) => Math.max(prevScale - 0.5, 1));
              }, 0);

            }}
          >
            <img
              src={`data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.6667 18.6667H19.6133L19.24 18.3067C20.5919 16.7388 21.3349 14.7369 21.3333 12.6667C21.3333 10.3681 20.4202 8.16372 18.7949 6.53841C17.1696 4.91309 14.9652 4 12.6667 4C10.3681 4 8.16372 4.91309 6.53841 6.53841C4.91309 8.16372 4 10.3681 4 12.6667C4 14.9652 4.91309 17.1696 6.53841 18.7949C8.16372 20.4202 10.3681 21.3333 12.6667 21.3333C14.8133 21.3333 16.7867 20.5467 18.3067 19.24L18.6667 19.6133V20.6667L25.3333 27.3333L27.3333 25.3333L20.6667 18.6667ZM12.6667 18.6667C9.33333 18.6667 6.66667 16 6.66667 12.6667C6.66667 9.33333 9.33333 6.66667 12.6667 6.66667C16 6.66667 18.6667 9.33333 18.6667 12.6667C18.6667 16 16 18.6667 12.6667 18.6667ZM9.33333 12H16V13.3333H9.33333V12Z" fill="#0078D4"/>
</svg>

  `)}`}
              alt="zoom out"
            />
          </p>



        </div>
      </div>
    </>
  );
}
