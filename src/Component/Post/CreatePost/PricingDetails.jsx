import React, { useCallback, useEffect, useState } from "react";
import { StoreDataInSession } from "../../../utils/SessionStorage";
import ScrollToTop from "../../../ScrollToTop";
import { ToWords } from "to-words";
export default function PricingDetails({
  PricingDetailsData,
  setPricingDetailsData,
  BasicDetailsData,
  AreaDetailsData,
  setshow_Maintenance_Charges,
  show_Maintenance_Charges,
  setnext,
  update,
  next,
  PricingDetailsRef,
  FormSubmitRef  
}) {
  const PostSubmitHandler = (e) => {
    e.preventDefault();

    //  validate price sqft and sqyd

    if (BasicDetailsData.ApartmentType == "Plot/Land") {
      if (
        !PricingDetailsData.PricePerSqYd ||
        PricingDetailsData.PricePerSqYd <= 0
      ) {
        return alert("Price Price Per Sq. Yd Is Required");
      }
    } else {
      if (
        BasicDetailsData.PropertyAdType == "Sale" &&
        (!PricingDetailsData.PricePerSqFt ||
          PricingDetailsData.PricePerSqYd <= 0)
      ) {
        return alert("Price Per SqFt Is Required");
      }
    }

    const CopyObj = { ...PricingDetailsData };
    if (show_Maintenance_Charges == false) {
      delete CopyObj.AdditionalDetails;
    }

    setPricingDetailsData(CopyObj);

    setnext(4);

    if (!update) {
      StoreDataInSession("next", 4);
      StoreDataInSession("PricingDetailsData", PricingDetailsData);
    }
  };
  const YesNoArray = [true, false];
  const PreferredTenantArray = ["Single", "Family", "Company", "Others"];
  const [showPrice, setshowPrice] = useState("");

  useEffect(() => {
    setTimeout(() => {
      const PricingDetailsCopyObj = { ...PricingDetailsData };

      if (PricingDetailsData.ExpectedPrice) {
        // get Price
        let numbricvalue = String(PricingDetailsData.ExpectedPrice).replace(
          /,/g,
          ""
        );

        let Area = null;

        const { SuperBuiltUpArea, CarpetArea, BuiltUpArea, PlotSize } =
          AreaDetailsData;

        if (BasicDetailsData.ApartmentType == "Plot/Land") {
          Area = PlotSize?.value;
        } else {
          // Area = PlotArea.value;
          if (SuperBuiltUpArea?.value) {
            Area = SuperBuiltUpArea?.value;
          } else if (CarpetArea?.value && !BuiltUpArea?.value) {
            Area = CarpetArea?.value;
          } else if (BuiltUpArea?.value && !CarpetArea?.value) {
            Area = BuiltUpArea?.value;
          } else if (BuiltUpArea?.value || CarpetArea?.value) {
            Area = Math.max(CarpetArea?.value, BuiltUpArea?.value);
          }
        }

        //  get Area and Price
        if (Area && numbricvalue) {
          let CalPricePer_SqFt_SqYd = Number(numbricvalue) / Area;
          let roundedPricePer_SqFt_Sqyd;
          const decimalPart =
            CalPricePer_SqFt_SqYd - Math.floor(CalPricePer_SqFt_SqYd);

          if (decimalPart <= 0.5) {
            roundedPricePer_SqFt_Sqyd = Math.floor(CalPricePer_SqFt_SqYd);
          } else {
            roundedPricePer_SqFt_Sqyd = Math.ceil(CalPricePer_SqFt_SqYd);
          }

          let Sqft_Sqyd_AdComa = String(
            roundedPricePer_SqFt_Sqyd
          ).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          if (BasicDetailsData.ApartmentType == "Plot/Land") {



            PricingDetailsCopyObj.PricePerSqYd = Sqft_Sqyd_AdComa;
          } else {

            PricingDetailsCopyObj.PricePerSqFt = Sqft_Sqyd_AdComa;
          }
        }
      }

      if (!PricingDetailsData.ExpectedPrice) {
        delete PricingDetailsCopyObj.PricePerSqFt;
        delete PricingDetailsCopyObj.PricePerSqYd;

        // const { PricePerSqFt, PricePerSqYd, ...PricingDetails_Rest } =
        //   PricingDetailsData; // Destructure to remove PropertyStatus
        // setPricingDetailsData(PricingDetails_Rest);
      }

      if (sessionStorage.getItem("PriceDetailsFirstLoad")) {
        if (BasicDetailsData.PropertyAdType == "Rent") {
          PricingDetailsCopyObj.AdditionalDetails = {
            ...PricingDetailsCopyObj.AdditionalDetails,
            PreferredTenant:
              PricingDetailsCopyObj.AdditionalDetails?.PreferredTenant || [],
          };

          //  Rent Price
          if (PricingDetailsCopyObj.ExpectedRent) {
            let AddComaPrice = String(
              PricingDetailsCopyObj.ExpectedRent
            ).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            PricingDetailsCopyObj.ExpectedRent = AddComaPrice;
          }
          if (PricingDetailsCopyObj.DepositePrice) {
            let AddComaPrice = String(
              PricingDetailsCopyObj.DepositePrice
            ).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            PricingDetailsCopyObj.DepositePrice = AddComaPrice;
          }
        }
        if (BasicDetailsData.PropertyAdType == "Sale") {
          if (PricingDetailsCopyObj.ExpectedPrice) {
            let AddComaPrice = String(
              PricingDetailsCopyObj.ExpectedPrice
            ).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            PricingDetailsCopyObj.ExpectedPrice = AddComaPrice;
          }

          if (PricingDetailsCopyObj.AdditionalDetails?.MonthlyExpectedRent) {
            let AddComaPrice = String(
              PricingDetailsCopyObj.AdditionalDetails.MonthlyExpectedRent
            ).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            PricingDetailsCopyObj.AdditionalDetails.MonthlyExpectedRent =
              AddComaPrice;
          }
        }
        //  Sale Price

        // Additional Details
        if (PricingDetailsCopyObj.AdditionalDetails?.MaintenanceCharges) {
          let AddComaPrice = String(
            PricingDetailsCopyObj.AdditionalDetails.MaintenanceCharges
          ).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          PricingDetailsCopyObj.AdditionalDetails.MaintenanceCharges =
            AddComaPrice;
        }

        if (PricingDetailsData.AdditionalDetails?.MaintenanceCharges) {
          setshow_Maintenance_Charges(true);
        }
      }
      setPricingDetailsData(PricingDetailsCopyObj);
    }, 0);
  }, [
    PricingDetailsData.ExpectedPrice,
    BasicDetailsData.ApartmentType,
    BasicDetailsData.PropertyAdType,
    AreaDetailsData,
  ]);

  useEffect(() => {
    sessionStorage.setItem("PriceDetailsFirstLoad", "true");
    return () => {
      sessionStorage.removeItem("PriceDetailsFirstLoad");
    };
  }, []);
  // useEffect(() => {
  //   setTimeout(() => {
  //     const PricingDetailsCopyObj = { ...PricingDetailsData };

  //     if (BasicDetailsData.PropertyAdType == "Rent") {
  //       PricingDetailsCopyObj.AdditionalDetails = {
  //         ...PricingDetailsCopyObj.AdditionalDetails,
  //         PreferredTenant:
  //           PricingDetailsCopyObj.AdditionalDetails?.PreferredTenant || [],
  //       };

  //       //  Rent Price
  //       if (PricingDetailsCopyObj.ExpectedRent) {
  //         let AddComaPrice = String(PricingDetailsCopyObj.ExpectedRent).replace(
  //           /\B(?=(\d{3})+(?!\d))/g,
  //           ","
  //         );
  //         PricingDetailsCopyObj.ExpectedRent = AddComaPrice;
  //       }
  //       if (PricingDetailsCopyObj.DepositePrice) {
  //         let AddComaPrice = String(
  //           PricingDetailsCopyObj.DepositePrice
  //         ).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //         PricingDetailsCopyObj.DepositePrice = AddComaPrice;
  //       }
  //     }
  //     if (BasicDetailsData.PropertyAdType == "Sale") {
  //       if (PricingDetailsCopyObj.ExpectedPrice) {
  //         let AddComaPrice = String(
  //           PricingDetailsCopyObj.ExpectedPrice
  //         ).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //         PricingDetailsCopyObj.ExpectedPrice = AddComaPrice;
  //       }

  //       if (PricingDetailsCopyObj.AdditionalDetails?.MonthlyExpectedRent) {
  //         let AddComaPrice = String(
  //           PricingDetailsCopyObj.AdditionalDetails.MonthlyExpectedRent
  //         ).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //         PricingDetailsCopyObj.AdditionalDetails.MonthlyExpectedRent =
  //           AddComaPrice;
  //       }
  //     }
  //     //  Sale Price

  //     // Additional Details
  //     if (PricingDetailsCopyObj.AdditionalDetails?.MaintenanceCharges) {
  //       let AddComaPrice = String(
  //         PricingDetailsCopyObj.AdditionalDetails.MaintenanceCharges
  //       ).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //       PricingDetailsCopyObj.AdditionalDetails.MaintenanceCharges =
  //         AddComaPrice;
  //     }

  //     setPricingDetailsData(PricingDetailsCopyObj);
  //     if (PricingDetailsData.AdditionalDetails?.MaintenanceCharges) {
  //       setshow_Maintenance_Charges(true);
  //     }
  //   }, 0);
  // }, []);

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

  // Alert
  const [priceAlert,setPriceAlert]= useState(false);
  const [expectedRentAlert,setExpectedRentAlert]= useState(false);
  const [depositeAlert, setDepositeAlert] = useState(false);
  const  HandlePricingAlert =()=>{
    


   

     if(BasicDetailsData.PropertyAdType === "Rent"){
      if(PricingDetailsData.ExpectedRent =="" || PricingDetailsData.ExpectedRent == undefined){
      
        setExpectedRentAlert(true);
        setTimeout(()=>setExpectedRentAlert(false),1500)
        return;
         }
  
     }else{

      if(!PricingDetailsData.ExpectedPrice){
        setPriceAlert(true);
        setTimeout(()=>setPriceAlert(false),1500)
        return;
         }
     }
  
 
     if(!PricingDetailsData.DepositePrice){
      
      setDepositeAlert(true);
      setTimeout(()=>setDepositeAlert(false),1500)
      return;
     }


  
  } 
  const transitionDuration = '0.3s'

  return (
    <>
      <ScrollToTop />
      {/* <div className="create-banner-box">
        <img src="/img/create-banner.svg" alt="create-banner" />
      </div> */}
      {/* <div className="create-banner-box">
        <img src="/img/create-banner.svg" alt="create-banner" />
      </div> */}
      <div className="property-details-main-box">
        <div className="property-details price-sectipn-main price-and-show">
          <h3 className="price-section-create-form"> Pricing Details</h3>
          <form
            id="property-form"
            onSubmit={PostSubmitHandler}
            ref={PricingDetailsRef}
          >
            {/* Sale Pricing  */}

            {BasicDetailsData.PropertyAdType === "Sale" && (
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expected-price"> Expected Price*</label>
                  <input
                  style={{transitionDuration}}
                  className={`${priceAlert? 'inputShake shake':''}`}
                    type="text"
                    id="expected-price"
                    placeholder="Expected Price ₹"
                    required
                    value={PricingDetailsData.ExpectedPrice || ""}
                    onChange={(e) => {
                      const numericValue = String(e.target.value).replace(
                        /[^0-9]/g,
                        ""
                      );

                      // Remove non-numeric characters
                      let AddComaPrice = numericValue.replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      );
                      setPricingDetailsData({
                        ...PricingDetailsData,
                        ExpectedPrice: AddComaPrice,
                      });
                    }}
                  />
                  <small className="number-to-word">
                    {PriceToSentence(PricingDetailsData.ExpectedPrice)}
                  </small>
                  <p
                    className="p
                  price-section-pointer"
                  >
                    Registration & Govt. charges are excluded.
                  </p>
                  <p
                    className="p
                  price-section-pointer"
                  >
                    Brokerage Applicable*
                  </p>
                </div>

                {BasicDetailsData.ApartmentType == "Plot/Land" ? (
                  <>

                    <div className="form-group">
                      <label htmlFor="price-per-sq.yd">

                        Price Per Sq. Yd.*
                      </label>
                      <input
                        type="text"
                        id="price-per-sq.yd"
                        placeholder=" Price Per Sq. Yd ₹ "
                        required
                        readOnly
                        value={PricingDetailsData.PricePerSqYd || 0}
                      />
                      <small className="number-to-word">
                        {PriceToSentence(PricingDetailsData.PricePerSqYd)}
                      </small>
                    </div>

                  </>
                ) : (
                  <div className="form-group">
                    <label htmlFor="price-per-sq.ft"> Price Per Sq.Ft*</label>
                    <input
                      type="text"
                      id="price-per-sq.ft"
                      placeholder="Price Per Sq.Ft ₹ "
                      required
                      readOnly
                      value={PricingDetailsData.PricePerSqFt || 0}
                    />
                    <small className="number-to-word">
                      {PriceToSentence(PricingDetailsData.PricePerSqFt)}
                    </small>

                  </div>
                )}
                {/* Price Per Sq.ft  */}

                {/* Price Per Sq. yd */}
              </div>
            )}

            {/* Rent Pricing  */}
            {BasicDetailsData.PropertyAdType === "Rent" && (
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expected-rent"> Expected Rent* </label>
                  <input
                  style={{transitionDuration}}
                   className={`${expectedRentAlert? 'inputShake shake':''}`}
                    type="text"
                    id="expected-rent"
                    placeholder="Expected Price"
                    required
                    value={PricingDetailsData.ExpectedRent || ''}
                    onChange={(e) => {
                      const numericValue = String(e.target.value).replace(
                        /[^0-9]/g,
                        ""
                      );

                      // Remove non-numeric characters
                      let AddComaPrice = numericValue.replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      );

                      setPricingDetailsData({
                        ...PricingDetailsData,
                        ExpectedRent: AddComaPrice,
                      });
                    }}
                  />
                  <small className="number-to-word">
                    {PriceToSentence(PricingDetailsData.ExpectedRent)}
                  </small>
                  <p
                    className="p
                  price-section-pointer"
                  >
                    Maintenance charges are excluded.
                  </p>
                  {/* <p className="p
                  price-section-pointer" >Brokerage Applicable*</p> */}
                </div>

                <div className="form-group">
                  <label htmlFor="deposite-price"> Deposite Price*</label>
                  <input
                  style={{transitionDuration}}
                   className={`${depositeAlert? 'inputShake shake':''}`}
                    type="text"
                    id="price"
                    placeholder="deposite-price"
                    required
                    value={PricingDetailsData.DepositePrice || ""}
                    onChange={(e) => {
                      const numericValue = String(e.target.value).replace(
                        /[^0-9]/g,
                        ""
                      );
                      // Remove non-numeric characters
                      let AddComaPrice = numericValue.replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      );

                      setPricingDetailsData({
                        ...PricingDetailsData,
                        DepositePrice: AddComaPrice,
                      });
                      // }
                    }}
                  />
                  <small className="number-to-word">
                    {PriceToSentence(PricingDetailsData.DepositePrice)}
                  </small>
                </div>
              </div>
            )}

            {/* Additional Details  */}
            <div className="additional-detals-main">
              <h3 className="additional-detals-main-h3">
                Additional Details{" "}
                {BasicDetailsData.PropertyAdType == "Sale" && (
                  <span
                    onClick={() => {
                      setshow_Maintenance_Charges(!show_Maintenance_Charges);

                      if (
                        show_Maintenance_Charges == false &&
                        PricingDetailsData.AdditionalDetails
                      ) {
                        // const { AdditionalDetails, ...rest } =
                        //   PricingDetailsData;

                        const CopyObj = { ...PricingDetailsData };
                        if (!update) {
                          delete CopyObj.AdditionalDetails;
                        }
                        setPricingDetailsData(CopyObj);
                        //  Destructure to remove PropertyStatus

                        // setPricingDetailsData({
                        //   ...rest,
                        //   AdditionalDetails: update ? AdditionalDetails : {},
                        // });

                        // setPricingDetailsData((prevData) => ({
                        //   ...rest,
                        //   AdditionalDetails: update
                        //     ? prevData.AdditionalDetails
                        //     : {},
                        // }));
                        // setPricingDetailsData((prevData) => ({
                        //   ...prevData,
                        //   AdditionalDetails: {
                        //     ...rest,
                        //     MaintenanceCharges: update
                        //       ? prevData.AdditionalDetails?.MaintenanceCharges
                        //       : "",
                        //   },
                        // }));
                      }
                    }}
                  >
                    <span className="Click-here">
                      {show_Maintenance_Charges ? "Close" : "Show"}
                    </span>
                  </span>
                )}
              </h3>
              {show_Maintenance_Charges && (
                <>
                  {" "}
                  <div className="row">
                    <div>
                      <p className="montly-chnagse-in-price-section">
                        Maintenance charges<span>/Monthly</span>
                      </p>
                      <input
                        className="expacted-rent"
                        type="text"
                        id="maintenance-charge"
                        placeholder="Maintenance Charge"
                        value={
                          PricingDetailsData.AdditionalDetails
                            ?.MaintenanceCharges || ""
                        }
                        onChange={(e) => {
                          const numericValue = String(e.target.value).replace(
                            /[^0-9]/g,
                            ""
                          );
                          // Remove non-numeric characters
                          let AddComaPrice = numericValue.replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ","
                          );
                          setPricingDetailsData({
                            ...PricingDetailsData,
                            AdditionalDetails: {
                              ...PricingDetailsData.AdditionalDetails,
                              MaintenanceCharges: AddComaPrice,
                            },
                          });
                          // }
                        }}
                      />
                      <br />
                      <small className="number-to-word">
                        {PriceToSentence(
                          PricingDetailsData.AdditionalDetails
                            ?.MaintenanceCharges
                        )}
                      </small>
                    </div>

                    <>
                      {/* {BasicDetailsData.PropertyAdType === "Rent" && (
                        <div>
                          <p>Electricity And Water Charges  </p>
                          {YesNoArray.map((text, i) => {
                            return (
                              <div className="main-box" key={i}>
                                <div className="yes-no">
                                  <input
                                    type="radio"
                                    id={`modular-kitchen-${i}`}
                                    name="modular-kitchen"
                                    value={text}
                                    checked={
                                      PricingDetailsData.AdditionalDetails
                                        ?.ElectrictyAndWaterCharges == text
                                    }
                                    onChange={() => {
                                     

                                      setPricingDetailsData({
                                        ...PricingDetailsData,
                                        AdditionalDetails: {
                                          ...PricingDetailsData.AdditionalDetails,
                                          ElectrictyAndWaterCharges: text,
                                        },
                                      });
                                    }}
                                  />

                                  <label htmlFor={`modular-kitchen-${i}`}>
                                    {text == true ? "Yes" : "No"}
                                  </label>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )} */}
                      {/* Monthly Expected Rent  */}
                      {BasicDetailsData.PropertyAdType === "Sale" &&
                        BasicDetailsData.ApartmentType != "Plot/Land" && (
                          <div className="form-group">
                            <label
                              className="montly-chnagse-in-price-section"
                              htmlFor="monthly-expected-rent"
                            >
                              <p>
                                {" "}
                                Expected Rent<span>/Monthly</span>{" "}
                              </p>
                            </label>
                            <input
                              type="text"
                              id="monthly-expected-rent"
                              placeholder="Monthly Expected Price"
                              value={
                                PricingDetailsData.AdditionalDetails
                                  ?.MonthlyExpectedRent || ""
                              }
                              onChange={(e) => {
                                const numericValue = String(
                                  e.target.value
                                ).replace(/[^0-9]/g, "");

                                // Remove non-numeric characters
                                let AddComaPrice = numericValue.replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  ","
                                );
                                setPricingDetailsData({
                                  ...PricingDetailsData,
                                  AdditionalDetails: {
                                    ...PricingDetailsData.AdditionalDetails,
                                    MonthlyExpectedRent: AddComaPrice,
                                  },
                                });
                                // }
                              }}
                            />
                            <small className="number-to-word">
                              {PriceToSentence(
                                PricingDetailsData.AdditionalDetails
                                  ?.MonthlyExpectedRent
                              )}
                            </small>
                          </div>
                        )}
                    </>
                  </div>
                  {/* Preferred Tenant  */}
                  {BasicDetailsData.PropertyAdType == "Rent" && (
                    <div className="prefferd">
                      <h3 className="basic-details-heading">
                        Preferred Tenant
                      </h3>
                      <div className="flex gap-5 items-center tenant-checkbox ">
                        {PreferredTenantArray.map((text, i) => {
                          return (
                            <div
                              className="PropertyStatus-box-content items-center   "
                              key={i}
                            >
                              <label htmlFor="">{text}</label>

                              <input
                                type="checkbox"
                                name=""
                                id=""
                                checked={
                                  PricingDetailsData.AdditionalDetails?.PreferredTenant?.includes(
                                    text
                                  )
                                    ? true
                                    : false
                                }
                                onChange={(event) => {
                                  if (event.target.checked === true) {
                                    // setPricingDetailsData({
                                    //   ...PricingDetailsData,

                                    //   PreferredTenant: [
                                    //     ...PricingDetailsData.PreferredTenant,
                                    //     text,
                                    //   ],
                                    // });

                                    setPricingDetailsData({
                                      ...PricingDetailsData,
                                      AdditionalDetails: {
                                        ...PricingDetailsData.AdditionalDetails,
                                        PreferredTenant: [
                                          ...PricingDetailsData
                                            .AdditionalDetails?.PreferredTenant,
                                          text,
                                        ],
                                      },
                                    });
                                  }
                                  if (event.target.checked === false) {
                                    setPricingDetailsData({
                                      ...PricingDetailsData,
                                      AdditionalDetails: {
                                        ...PricingDetailsData.AdditionalDetails,
                                        PreferredTenant:
                                          PricingDetailsData.AdditionalDetails?.PreferredTenant?.filter(
                                            (item) => {
                                              return item !== text;
                                            }
                                          ),
                                      },
                                    });
                                  }
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="next-prev-box">
              <>
              {update == true && (
              <div
                onClick={() => {
                  FormSubmitRef?.current?.requestSubmit();
                }}
              >
                Update Post
              </div>
            )}
                <div
                  className="Submit-prev"
                  onClick={() => {
                    setnext(2);
                    if (!update) {
                      StoreDataInSession("next", 2);
                    }
                  }}
                >
                  {" "}
                  Previous
                </div>{" "}
              </>

              <button onClick={HandlePricingAlert} type="Submit-next"> Next</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
