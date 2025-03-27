import React, { useEffect, useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToWords } from "to-words";
import { BiddingFormAction } from "../../../Action/userAction";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";
import { GetSinglePostAction } from "../../../Action/postAction";
import "./OfferForm.css";
import MakeOfferSuccessAlert from "./MakeOfferSuccessAlert";
export default function BiddingFormForm({
  SetShow,
  SinglePostData,
  PropertyAddress,
}) {
  const dispatch = useDispatch();
  const { loading, data, LodingType } = useSelector((state) => {
    return state.userData;
  });
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });
  const [uploadimages, setuploadimages] = useState([]);
  const [previewImage, setpreviewImage] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null);
  const [BiddingFormData, setBiddingFormData] = useState({
    Name: "",
    Email: medata.user.email,
    BidPrice: "",
    AcceptPolicy: false,
    WhatsAppUpdate: false,
  });

  const [standardPrices, setstandardPrices] = useState([]);
  const [lowerPrices, setlowerPrices] = useState([]);


  const [isLowerOffer, setIsLowerOffer] = useState(null); // State for toggling
  
  const [showMakeOfferAlert, setshowMakeOfferAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setBiddingFormData({ ...BiddingFormData, images: uploadimages });
  }, [uploadimages]);

  // const handleToggleLowerOffer = () => {
  //   setBiddingFormData({ ...BiddingFormData, BidPrice: "" });
  //   setIsLowerOffer((prev) => !prev); // Toggle between standard and lower offers
  // };

  const formatReservePrice = (price) => {
    if (price >= 10000000) {
      return `₹ ${(Math.floor(price / 100000) / 100).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹ ${(Math.floor(price / 1000) / 100).toFixed(2)} L`;
    } else if (price >= 1000) {
      return `₹ ${(Math.floor(price / 10) / 100).toFixed(2)} K`;
    } else {
      return `₹ ${price.toFixed(2)}`;
    }
  };

  useEffect(() => {
    if (data) {
      if (data.success == true && LodingType == "BiddingFormRequest") {
        setBiddingFormData({
          AcceptPolicy: false,

          BidPrice: "",
        });

        setpreviewImage([]);
        setuploadimages([]);
      }
      if (data.success == false) {
        if (data.IsAuthenticated == false) {
          navigate("/");
        }

        clearTimeout(timeoutId);
        setshowMakeOfferAlert(false);
        setTimeoutId(null);
      }
    }
  }, [data]);

  useEffect(() => {
    let standardPrices = [];
    let lowerprice = [];

    let initialstandardBidvalue = SinglePostData.BidData.BidHighPrice
      ? SinglePostData.BidData.BidHighPrice
      : SinglePostData.SinglePost.PricingDetails.ExpectedPrice;

    let initiallowerdBidvalue =
      SinglePostData.SinglePost.PricingDetails.ExpectedPrice;
    for (let i = 0; i < 8; i++) {
      initialstandardBidvalue = initialstandardBidvalue + 100000;
      initiallowerdBidvalue = initiallowerdBidvalue - 100000;
      standardPrices.push(initialstandardBidvalue);
      lowerprice.push(initiallowerdBidvalue);
    }

    setstandardPrices(standardPrices);
    setlowerPrices(lowerprice);
  }, [SinglePostData]);
  const BiddingFormSubmitHandler = (e) => {
    e.preventDefault();
    if (!BiddingFormData.BidPrice) {
      return alert("enter bid price");
    }
    // if (previewImage.length <= 0) {
    //   return alert("image field is required");
    // }
    if (BiddingFormData.AcceptPolicy == false) {
      return alert("Accept Terms & Conditions");
    }

    let BiddingObj = {
      ...BiddingFormData,
      PostData: {
        PostId: SinglePostData.SinglePost._id,
      },
    };
    let formData = new FormData(e.target);
    formData.append("BiddingFormData", `${JSON.stringify(BiddingObj)}`);
    formData.append("Email", BiddingObj.Email);

    uploadimages.forEach((e) => {
      formData.append("images", e, e.name);
    });

    dispatch(BiddingFormAction(formData));

    setshowMakeOfferAlert("LodingTrue");
    const id = setTimeout(() => {
      setshowMakeOfferAlert(true);
    }, 1000);
    setTimeoutId(id);
  };

  const [price, setPrice] = useState("");
  const [convertedPrice, setConvertedPrice] = useState("");

  const PriceToSentence = useCallback((price) => {
    if (price) {
      // Convert price to string, remove commas, and parse as integer
      const numericPrice = parseInt(String(price).replace(/,/g, ""), 10);

      // Check if the parsed number is valid
      if (isNaN(numericPrice)) {
        return "Invalid Price";
      }

      // Initialize the ToWords instance
      const toWords = new ToWords();

      // Convert the number to words
      const words = toWords.convert(numericPrice, { currency: true });

      // Capitalize the first letter and return the result
      return words.charAt(0).toUpperCase() + words.slice(1);
    }

    return "";
  }, []);

  const formatNumberWithCommas = (value) => {
    // Format the number with commas
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChange = (event) => {
    let inputValue = event.target.value;

    // Allow only numeric values (remove non-numeric characters except comma)
    inputValue = inputValue.replace(/[^0-9]/g, "");

    // Set price without commas for calculation
    setPrice(inputValue);

    // Format the input value with commas and set the converted price
    const formattedPrice = formatNumberWithCommas(inputValue);

    // Remove commas before converting to a number
    const cleanPrice = Number(formattedPrice.replace(/,/g, ""));

    setBiddingFormData({
      ...BiddingFormData,
      BidPrice: cleanPrice,
    });
    setConvertedPrice(PriceToSentence(inputValue));

    // Update the input value to display with commas
    event.target.value = formattedPrice;
  };
console.log(PropertyAddress)
  return (
    <>
      {/* <div className="bidding-form-container"> */}

      {showMakeOfferAlert == false && (
        <form
          // ref={BiddingFormRef}
          className="mke-you-offer-form"
          onSubmit={BiddingFormSubmitHandler}
          encType="multipart/form-data"
        >
          <div className="make-your-offer-top">
          

          <div>
          <h2 className="mke-you-offer-title">Make your Offer</h2>
          </div>
          <div   className="make-your-offer-crozz-btn">
          <img
          onClick={() => {
            SetShow(false);
          }}
              className=" make-your-offer-cross-btn"
              src="/img/mke-offer-cross.svg"
             
            />
            
          </div>
            
          
          
          </div>
         
         
          <div className="main-box-content">


           
          <div className="make-offer-reserved-price">
              <div className="reserve-price-section-form">
                <div>
                  <p className="price-que-form">
                    Reserved price :{" "}
                    <span className="price-ans-form">
                      {" "}
                      {formatReservePrice(
                        SinglePostData.SinglePost.PricingDetails.ExpectedPrice
                      )}{" "}
                    </span><span className="area-section-from pt-1">{" ₹"}{SinglePostData.SinglePost.PricingDetails.PricePerSqFt}
                    /sqft{" "}</span>
                  </p>

                  {/* <p className="area-section-from pt-1">
                    {SinglePostData.SinglePost.PricingDetails.PricePerSqFt} per
                    sqft
                  </p> */}
                </div>
                <div className="make-offer-property-id space-y-1">
                  <p className="prop-id-from">Property Id:  <span>{SinglePostData.SinglePost._id}</span> </p>
                  <p className="prop-id-number ">
                    
                  </p>
                </div>
              </div>
            </div>

            <div className="make-offer-data-container">

              <div className="make-offer-table-container">

              <div className="mke-you-offer-prperty-address-box">
              <div className="apart-prop-id-box">
                <p className="form-heading-name">{PropertyAddress}</p>
               
                
              </div>
            </div>
            {/* <div className="priceNoffer">
              <div className="highest-price-container"> 
                <div className="highest-price-img-container"><img src="/img/highestprice.svg" alt="highest-price" /></div>
                <div className="highest-price-text"><p>Highest Price recieved: <span>₹ 500 CR</span></p></div>
              </div>
              <div className="total-offer">
              <div className="total-offer-img-container"><img src="/img/Totaloffer.svg" alt="total-offer"/></div>
              <div className="total-price-text"><p>Total Offer: <span>100</span></p></div>
              </div>
            </div> */}

            

            {/* <div className="mke-you-offer-bids-info">
            <p className="mke-you-offer-bids-text">
              Total no of Bids:
              <span className="mke-you-offer-bids-count">
                {SinglePostData.BidData.NumberOfBid}
              </span>
            </p>

            <p className="mke-you-offer-bids-text">
              Last Bid:
              <span className="mke-you-offer-last-bid">
                {SinglePostData.BidData.BidHighPrice &&
                  SinglePostData.BidData.BidHighPrice}
              </span>
            </p>
          </div> */}

            {/* Bid Price */}

            <div className="mke-you-offer-offer-group">
              <p className="mke-offer-p">See Offer Table</p>
              <select
                className="offer-select-section"
                name=""
                id=""
                onChange={(e) => {
                  if (e.target.value == "HighValue") {
                    setBiddingFormData({ ...BiddingFormData, BidPrice: "" });
                    setIsLowerOffer("HighValue");
                  } else if (e.target.value == "LowerValue") {
                    setBiddingFormData({ ...BiddingFormData, BidPrice: "" });
                    setIsLowerOffer("LowerValue");
                  } else if (e.target.value === "CustomValue") {
                    setIsLowerOffer("CustomValue"); // or adjust according to your needs
                  }
                }}
              >
                <option value="">Select</option>
                <option value="HighValue">High-Value</option>
                <option value="LowerValue">Lower-Value</option>
                <option value="CustomValue">Custom Value</option>
              </select>

              {isLowerOffer === "CustomValue" && (
                <div>
                  <input
                    className="py-1 rounded-2 px-2 border text-[#333]"
                    type="text"
                    value={formatNumberWithCommas(price)}
                    onChange={handleChange}
                    placeholder="Enter Offer Price"
                  />
                  {convertedPrice && (
                    <p className="mke-offer-p">{convertedPrice}</p>
                  )}
                </div>
              )}

              {/* <div
              type="button"
              className="mke-you-offer-lower-toggle"
              onClick={handleToggleLowerOffer}
            >
              {isLowerOffer
                ? "Click here to view standard offers"
                : "Click here to wish lower offer"}
            </div> */}

              <div className="mke-you-offer-offer-options">
                {
                  (isLowerOffer === "HighValue" && (
                    <>
                      {(isLowerOffer == "LowerValue"
                        ? lowerPrices
                        : standardPrices
                      ).map((price, index) => (
                        <button
                          type="button"
                          className={`mke-you-offer-option ${
                            price == BiddingFormData.BidPrice ? "select" : ""
                          }`}
                          key={
                            isLowerOffer
                              ? `lower-${index}`
                              : `standard-${index}`
                          } // Unique key for each button
                          // onClick={() => setFormData({...formData, offer: price})}
                          onClick={() => {
                            setBiddingFormData({
                              ...BiddingFormData,
                              BidPrice: price,
                            });
                          }}
                        >
                          {/* {from} */}
                          {/* ₹ {price.toFixed(2)} Cr₹ {price} Cr */}
                          {formatReservePrice(price)}
                        </button>
                      ))}{" "}
                    </>
                  ))}

{
                  (isLowerOffer === "LowerValue" && (
                    <>
                      {(isLowerOffer == "LowerValue"
                        ? lowerPrices
                        : standardPrices
                      ).map((price, index) => (
                        <button
                          type="button"
                          className={`mke-you-offer-option ${
                            price == BiddingFormData.BidPrice ? "select" : ""
                          }`}
                          key={
                            isLowerOffer
                              ? `lower-${index}`
                              : `standard-${index}`
                          } // Unique key for each button
                          // onClick={() => setFormData({...formData, offer: price})}
                          onClick={() => {
                            setBiddingFormData({
                              ...BiddingFormData,
                              BidPrice: price,
                            });
                          }}
                        >
                          {/* {from} */}
                          {/* ₹ {price.toFixed(2)} Cr₹ {price} Cr */}
                          {formatReservePrice(price)}
                        </button>
                      ))}{" "}
                    </>
                  ))}
              </div>
            </div>

            {/* <div className="eoi-form-group">
                <label htmlFor="eoi-bidprice"> BidPrice </label>
                <input
                  type="number"
                  id="eoi-bidprice"
                  placeholder="BidPrice"
                  required
                  // value={BiddingFormData.BidPrice.value.trimStart()}
                  value={BiddingFormData.BidPrice.trimStart()}
                  onChange={(e) =>
                    setBiddingFormData({
                      ...BiddingFormData,
                      BidPrice: e.target.value,
                      // BidPrice: { ...BiddingFormData.BidPrice ,value:e.target.value},
                    })
                  }
                />
              </div> */}

            {/* Images  */}
            {/* <div></div> */}
            {/* <div></div> */}

            {/* <div className="uploadfile-input">
              <div className="file-label">
                <img src="/img/upload.png" alt="upload" />
                <p className="name-upload">Choose File</p>
                <p className="upload-section">
                 
                  Supported Format: JPEG, PNG,SVG
                </p>
              </div>

              <input
                type="file"
                name=""
                id=""
                multiple
                accept="image/*"
                required={previewImage.length === 0 ? true : false}
                onChange={(e) => {
                  const files = Array.from(e.target.files);

                  files.forEach((file) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                      if (reader.readyState === 2) {
                        setpreviewImage((old) => {
                          let allpreviewImage = [
                            ...old,
                            { name: file.name, url: reader.result },
                          ];
                          const uniqueArray = allpreviewImage.filter(
                            (value, index, self) =>
                              index ===
                              self.findIndex((t) => t.name === value.name)
                          );

                          return uniqueArray;
                        });
                      }

                      setuploadimages((old) => {
                        let alluploadimages = [...old, file];
                        const uniqueArray = alluploadimages.filter(
                          (value, index, self) =>
                            index ===
                            self.findIndex((t) => t.name === value.name)
                        );
                        return uniqueArray;
                      });
                    };
                  });
                }}
              />
            </div> */}

            {/* <div className="showpreviewImage-Container">
              {previewImage.map((image, index) => {
                return (
                  <div className="showpreviewImage-box" key={index}>
                    <img
                      style={{ width: "100px" }}
                      className="showpreviewImage"
                      key={index}
                      src={image.url}
                      alt="PropertyPost"
                    />
                    {}
                    <span
                      className="cut-image"
                      onClick={() => {
                        setTimeout(() => {
                          setpreviewImage(
                            previewImage.filter((e) => {
                              return e.name !== image.name;
                            })
                          );
                          setuploadimages(
                            uploadimages.filter((e) => {
                              return e.name !== image.name;
                            })
                          );
                        }, 0);
                      }}
                    >
                      X
                    </span>
                  </div>
                );
              })}
            </div> */}

            <div className="ke-you-offer-checkbox-group">
              <label className="mke-you-offer-checkbox-label">
                <input
                  type="checkbox"
                  className="mke-you-offer-checkbox-input"
                  name="termsAgreed"
                  checked={BiddingFormData.AcceptPolicy}
                  onChange={(e) => {
                    if (e.target.checked === true) {
                      setBiddingFormData({
                        ...BiddingFormData,
                        AcceptPolicy: true,
                      });
                    }
                    if (e.target.checked === false) {
                      setBiddingFormData({
                        ...BiddingFormData,
                        AcceptPolicy: false,
                      });
                    }
                  }}
                />
                I express interest to purchase the aforementioned property. I
                agree with the{" "}
                <span
                  className="offer-tc-p-p"
                  onClick={() => {
                    navigate("/privacy-policy");
                  }}
                >
                  Privacy Policy
                </span>{" "}
                and{" "}
                <span
                  className="offer-tc-p-p"
                  onClick={() => {
                    navigate("/terms-and-conditions");
                  }}
                >
                  {" "}
                  Terms & Conditions.{" "}
                </span>
              </label>

              <label className="mke-you-offer-checkbox-label">
                <input
                  type="checkbox"
                  name="whatsappUpdates"
                  checked={BiddingFormData.WhatsAppUpdate}
                  onChange={(e) => {
                    if (e.target.checked === true) {
                      setBiddingFormData({
                        ...BiddingFormData,
                        WhatsAppUpdate: true,
                      });
                    }
                    if (e.target.checked === false) {
                      setBiddingFormData({
                        ...BiddingFormData,
                        WhatsAppUpdate: false,
                      });
                    }
                  }}
                  className="mke-you-offer-checkbox-input"
                />
                Receive updates on WhatsApp <img src="/img/make-offer-whatsapp.svg" alt="whatsapp" />
              </label>
            </div>
              </div>
              <div className="make-offer-image-container">
                <img src="/img/make-offer-image.svg" alt="img" />
              </div>

            
            </div>
            

            <button type="submit" className="mke-you-offer-submit-button">
              Submit Offer
            </button>
          </div>
        </form>
      )}

      {showMakeOfferAlert === "LodingTrue" && (
        <Loader className={"componentloader"} />
      )}
      {showMakeOfferAlert == true && (
        <MakeOfferSuccessAlert SetShow={SetShow} />
      )}
    </>
  );
}
