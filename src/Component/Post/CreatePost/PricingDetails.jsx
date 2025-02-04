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
}) {
  const PostSubmitHandler = (e) => {
    e.preventDefault();

    if (
      BasicDetailsData.PropertyAdType == "Sale" &&
      !PricingDetailsData.PricePerSqFt
    ) {
      return alert("Price Per SqFt Is Required");
    }

    const CopyObj = { ...PricingDetailsData };
    if (show_Maintenance_Charges == false) {
      delete CopyObj.AdditionalDetails;
    }
    // Remove Coma  (Rent Field)
    if (BasicDetailsData.PropertyAdType == "Rent") {
      const ExpectedRentRemoveComa = CopyObj.ExpectedRent.replace(/,/g, "");
      CopyObj.ExpectedRent = ExpectedRentRemoveComa;

      const DepositePriceRemoveComa = CopyObj.DepositePrice.replace(/,/g, "");
      CopyObj.DepositePrice = DepositePriceRemoveComa;
    }

    if (BasicDetailsData.PropertyAdType == "Sale") {
      const ExpectedPriceRemoveComa = CopyObj.ExpectedPrice.replace(/,/g, "");
      CopyObj.ExpectedPrice = ExpectedPriceRemoveComa;

      if (CopyObj.AdditionalDetails?.MonthlyExpectedRent) {
        const MonthlyExpectedRentRemoveComa =
          CopyObj.AdditionalDetails.MonthlyExpectedRent.replace(/,/g, "");
        CopyObj.AdditionalDetails.MonthlyExpectedRent =
          MonthlyExpectedRentRemoveComa;
      }
    }

    if (CopyObj.AdditionalDetails?.MaintenanceCharges) {
      const MaintenanceChargesRemoveComa =
        CopyObj.AdditionalDetails.MaintenanceCharges.replace(/,/g, "");
      CopyObj.AdditionalDetails.MaintenanceCharges =
        MaintenanceChargesRemoveComa;
    }

    // const ExpectedPriceRemoveComa = CopyObj.ExpectedPrice.replace(/,/g, "");
    // const MaintenanceChargesRemoveComa =
    //   CopyObj.AdditionalDetails.MaintenanceCharges.replace(/,/g, "");

    // CopyObj.ExpectedPrice = ExpectedPriceRemoveComa;
    // CopyObj.AdditionalDetails.MaintenanceCharges = MaintenanceChargesRemoveComa;

    setPricingDetailsData(CopyObj);

    setnext(4);

    if (!update) {
      StoreDataInSession("next", 4);
      StoreDataInSession("PricingDetailsData", PricingDetailsData);
    }
  };
  const YesNoArray = [true, false];
  const PreferredTenantArray = ["Single", "Family", "Married", "Others"];
  const [showPrice, setshowPrice] = useState("");

  useEffect(() => {
    if (PricingDetailsData.ExpectedPrice) {
      let numbricvalue = String(PricingDetailsData.ExpectedPrice).replace(
        /,/g,
        ""
      );

      let Area = null;

      const { SuperBuiltUpArea, CarpetArea, BuiltUpArea } = AreaDetailsData;

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

      if (Area && numbricvalue) {
        let CalPricePerSqFt = Number(numbricvalue) / Area;

        let roundedPricePerSqFt;
        const decimalPart = CalPricePerSqFt - Math.floor(CalPricePerSqFt);
        if (decimalPart <= 0.5) {
          roundedPricePerSqFt = Math.floor(CalPricePerSqFt);
        } else {
          roundedPricePerSqFt = Math.ceil(CalPricePerSqFt);
        }

        setPricingDetailsData({
          ...PricingDetailsData,

          PricePerSqFt: roundedPricePerSqFt,
        });
      }
    }

    if (!PricingDetailsData.ExpectedPrice) {
      const { PricePerSqFt, ...PricingDetails_Rest } = PricingDetailsData; // Destructure to remove PropertyStatus
      setPricingDetailsData(PricingDetails_Rest);
    }
  }, [PricingDetailsData.ExpectedPrice]);
  useEffect(() => {
    const PricingDetailsCopyObj = { ...PricingDetailsData };

    if (BasicDetailsData.PropertyAdType == "Rent") {
      PricingDetailsCopyObj.AdditionalDetails = {
        ...PricingDetailsCopyObj.AdditionalDetails,
        PreferredTenant:
          PricingDetailsCopyObj.AdditionalDetails?.PreferredTenant || [],
      };

      //  Rent Price
      if (PricingDetailsCopyObj.ExpectedRent) {
        let AddComaPrice = String(PricingDetailsCopyObj.ExpectedRent).replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        );
        PricingDetailsCopyObj.ExpectedRent = AddComaPrice;
      }
      if (PricingDetailsCopyObj.DepositePrice) {
        let AddComaPrice = String(PricingDetailsCopyObj.DepositePrice).replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        );
        PricingDetailsCopyObj.DepositePrice = AddComaPrice;
      }
    }
    if (BasicDetailsData.PropertyAdType == "Sale") {
      if (PricingDetailsCopyObj.ExpectedPrice) {
        let AddComaPrice = String(PricingDetailsCopyObj.ExpectedPrice).replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        );
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
      PricingDetailsCopyObj.AdditionalDetails.MaintenanceCharges = AddComaPrice;
    }

    setPricingDetailsData(PricingDetailsCopyObj);
    if (PricingDetailsData.AdditionalDetails?.MaintenanceCharges) {
      setshow_Maintenance_Charges(true);
    }
  }, []);

  // const PriceToSentence = useCallback((price) => {
  //   try {
  //     // Convert price to string, remove commas, and parse as integer
  //     const numericPrice = parseInt(String(price).replace(/,/g, ""), 10);

  //     // Check if the parsed number is valid
  //     if (isNaN(numericPrice)) {
  //       return "Invalid price";
  //     }

  //     // Convert the number to words
  //     const words = numWords(numericPrice);

  //     // Capitalize the first letter and return the result
  //     return words.charAt(0).toUpperCase() + words.slice(1);
  //   } catch (error) {
  //     console.error("Error converting price to sentence:", error);
  //     return "Error processing the price";
  //   }
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
          <form id="property-form" onSubmit={PostSubmitHandler}>
            {/* Sale Pricing  */}

            {BasicDetailsData.PropertyAdType === "Sale" && (
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expected-price"> Expected Price*</label>
                  <input
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

                <div className="form-group">
                  <label htmlFor="price-per-sq.ft"> Price Per Sq.Ft*</label>
                  <input
                    type="text"
                    id="price-per-sq.ft"
                    placeholder="Price Per Sq.Ft ₹ "
                    required
                    readOnly
                    value={PricingDetailsData.PricePerSqFt || ""}
                    // onChange={(e) => {
                    //   // const regex = /^[1-9][0-9]*$/;
                    //   // let test = regex.test(e.target.value);
                    //   // if (e.target.value == "" || test) {
                    //   // if (e.target.value == "" || test) {
                    //   //   setPricingDetailsData({
                    //   //     ...PricingDetailsData,
                    //   //     PricePerSqFt: e.target.value,
                    //   //   });
                    //   // }
                    // }}
                  />
                </div>
              </div>
            )}

            {/* Rent Pricing  */}
            {BasicDetailsData.PropertyAdType === "Rent" && (
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expected-rent"> Expected Rent* </label>
                  <input
                    type="text"
                    id="expected-rent"
                    placeholder="Expected Price"
                    required
                    value={PricingDetailsData.ExpectedRent || ""}
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
                      {BasicDetailsData.PropertyAdType === "Sale" && (
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

                      {PreferredTenantArray.map((text, i) => {
                        return (
                          <div className="PropertyStatus-box-content" key={i}>
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
                                        ...PricingDetailsData.AdditionalDetails
                                          ?.PreferredTenant,
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
                                  // setPricingDetailsData({
                                  //   ...PricingDetailsData,
                                  //   PreferredTenant:
                                  //     PricingDetailsData.PreferredTenant?.filter(
                                  //       (item) => {
                                  //         return item !== text;
                                  //       }
                                  //     ),
                                  // });
                                }
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="next-prev-box">
              <>
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

              <button type="Submit-next"> Next</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
