import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreatePostAction, UpdatePostAction } from "../../../Action/postAction";
import { StoreDataInSession } from "../../../utils/SessionStorage";
// import BackupIcon from "@mui/icons-material/Backup";

import ScrollToTop from "../../../ScrollToTop";
import { Equal } from "lucide-react";

const imagePath = "your-image.png"; // Replace with your image path

export default function CreatePostImageUpload({
  setnext,
  next,
  previewImage,
  setpreviewImage,
  uploadimages,
  setuploadimages,
  update,
  PostId,
  update_RemoveImage,
  setupdate_RemoveImage,
  uploadimagesName,
  setuploadimagesName,

  //  new form boject

  BasicDetailsData,
  LocationDetailsData,
  PropertyDetailsData,
  AreaDetailsData,
  FloorDetailsData,
  AmenitiesDetailsData,
  PricingDetailsData,
  setPricingDetailsData,
  OtherDetailsData,
  // show subit alert
  setshowCreatePostSubmitAlert,
  CreatePostRef,
  FormSubmitRef,
}) {
  const dispatch = useDispatch();

  const [singlepreviewImage, setsinglepreviewImage] = useState("");
  const [defaultImg, setDefaultImg] = useState(null);
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });

  useEffect(() => {
    if (update) {
      setuploadimagesName(
        uploadimages.map((file) => {
          return file.name;
        })
      );
    }
    // eslint-disable-next-line
  }, [uploadimages, update]);

  // If you want to log the PricingDetailsData after it is updated, use another useEffect to listen for state changes

  const CratePostHandler = (e) => {
    e.preventDefault();
    // if (update && previewImage.length === 0) {
    //   setnext(4);
    //   return alert("one image is required");
    // }
    let formData = new FormData(e.target);

    const PricingDetailsCopyObj = { ...PricingDetailsData };
    //  Remove Coma  ---------------- >
    if (BasicDetailsData.PropertyAdType === "Rent") {
      // Remove commas from ExpectedRent and DepositePrice for Rent
      const ExpectedRentRemoveComa = String(
        PricingDetailsCopyObj?.ExpectedRent
      )?.replace(/,/g, "");
      PricingDetailsCopyObj.ExpectedRent = parseInt(ExpectedRentRemoveComa);

      const DepositePriceRemoveComa = String(
        PricingDetailsCopyObj?.DepositePrice
      )?.replace(/,/g, "");
      PricingDetailsCopyObj.DepositePrice = parseInt(DepositePriceRemoveComa);
    }

    if (BasicDetailsData.PropertyAdType === "Sale") {
      // Remove commas from ExpectedPrice for Sale
      const ExpectedPriceRemoveComa = String(
        PricingDetailsCopyObj?.ExpectedPrice
      )?.replace(/,/g, "");
      if (BasicDetailsData.ApartmentType == "Plot/Land") {
        const PricePerSqYdRemoveComa = String(
          PricingDetailsCopyObj?.PricePerSqYd
        )?.replace(/,/g, "");
        PricingDetailsCopyObj.PricePerSqYd = parseInt(PricePerSqYdRemoveComa);
      } else {
        const PricePerSqFtRemoveComa = String(
          PricingDetailsCopyObj?.PricePerSqFt
        )?.replace(/,/g, "");
        PricingDetailsCopyObj.PricePerSqFt = parseInt(PricePerSqFtRemoveComa);
      }

      PricingDetailsCopyObj.ExpectedPrice = parseInt(ExpectedPriceRemoveComa);

      // Check and remove commas from MonthlyExpectedRent if it exists
      if (PricingDetailsCopyObj.AdditionalDetails?.MonthlyExpectedRent) {
        const MonthlyExpectedRentRemoveComa = String(
          PricingDetailsCopyObj?.AdditionalDetails?.MonthlyExpectedRent
        )?.replace(/,/g, "");
        PricingDetailsCopyObj.AdditionalDetails.MonthlyExpectedRent = parseInt(
          MonthlyExpectedRentRemoveComa
        );
      }
    }

    // Remove commas from MaintenanceCharges if it exists
    if (PricingDetailsCopyObj.AdditionalDetails?.MaintenanceCharges) {
      const MaintenanceChargesRemoveComa = String(
        PricingDetailsCopyObj.AdditionalDetails.MaintenanceCharges
      )?.replace(/,/g, "");
      PricingDetailsCopyObj.AdditionalDetails.MaintenanceCharges = parseInt(
        MaintenanceChargesRemoveComa
      );
    }

    // Remove Coma End  ------------------->

    formData.append("BasicDetails", `${JSON.stringify(BasicDetailsData)}`);
    formData.append(
      "LocationDetails",
      `${JSON.stringify(LocationDetailsData)}`
    );

    formData.append("AreaDetails", `${JSON.stringify(AreaDetailsData)}`);

    if (BasicDetailsData.ApartmentType == "Plot/Land") {
      //  alert("form details")
      formData.append("OtherDetails", `${JSON.stringify(OtherDetailsData)}`);
    } else {
      formData.append(
        "PropertyDetails",
        `${JSON.stringify(PropertyDetailsData)}`
      );

      formData.append("FloorDetails", `${JSON.stringify(FloorDetailsData)}`);
    }

    formData.append(
      "AmenitiesDetails",
      `${JSON.stringify(AmenitiesDetailsData)}`
    );
    formData.append(
      "PricingDetails",
      `${JSON.stringify(PricingDetailsCopyObj)}`
    );
   

    if (update) {
      if (update_RemoveImage.length === 0 && uploadimages.length === 0) {
        uploadimages.forEach((e) => {
          formData.append("PropertyImages", e, e.name);
        });
      }
      if (update_RemoveImage.length > 0 && uploadimages.length === 0) {
        // if(update_RemoveImage.length>0){
        formData.append(
          "PropertyImages",
          `${JSON.stringify(update_RemoveImage)}`
        );
      }
      if (defaultImg) {
        formData.append("PreviewDefaultImage", defaultImg);
      }

      if (uploadimages.length > 0) {
        uploadimages.forEach((e) => {
          formData.append("PropertyImages", e, e.name);
        });
        if (update_RemoveImage.length > 0) {
          formData.append(
            "PropertyImages",
            `${JSON.stringify(update_RemoveImage)}`
          );
        }
      }
    } else {
      uploadimages.forEach((e) => {
        formData.append("PropertyImages", e, e.name);
      });
    }

    if (update) {
      let confrim = window.confirm("Are Your Sure ???");
      if (confrim) {
        dispatch(UpdatePostAction(formData, PostId));
      }
    } else {
      dispatch(CreatePostAction(formData));

      if (!["Admin", "Owner"].includes(medata?.user?.Role)) {
        setshowCreatePostSubmitAlert("showLoading");
      }
    }
  };

  // Alert
  const [imageAlert, setImageAlert] = useState(false);

  const HandleImageAlert = () => {
    if (previewImage.length <= 0 && update) {
      setImageAlert(true);
      setTimeout(() => setImageAlert(false), 1500);
      return;
    }
  };

  return (
    <>
      <ScrollToTop />
      {/* <div className="create-banner-box">
        <img src="/img/create-banner.svg" alt="create-banner" />
      </div> */}

      <div
        className="property-details-main-box"
        style={{ display: next == 4 ? "" : "none" }}
      >
        <div className="postImage post-img-upload">
          <form
            ref={FormSubmitRef}
            onSubmit={CratePostHandler}
            encType="multipart/form-data"
            id="myform"
          >
            <div
              htmlFor=""
              className={`uploadfile-input ${imageAlert ? "shakeShake" : ""}`}
            >
              <div className="file-label">
                {/* Backup Icon  */}
                <svg
                  width="42"
                  height="38"
                  viewBox="0 0 42 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.96289 16.4375L6.76363 9.23711C6.90583 8.66947 7.23363 8.16561 7.69496 7.80558C8.15629 7.44556 8.72469 7.25001 9.30988 7.24999H38.0221C38.4211 7.25 38.8149 7.34098 39.1734 7.516C39.532 7.69102 39.846 7.94549 40.0915 8.26005C40.3369 8.57462 40.5075 8.94101 40.5901 9.33138C40.6727 9.72174 40.6653 10.1258 40.5683 10.5129L39.7415 13.8204M15.791 30.875H5.30151C4.78355 30.8763 4.2704 30.7755 3.79147 30.5782C3.31254 30.381 2.87723 30.0912 2.51049 29.7254C2.14375 29.3596 1.85277 28.9251 1.65424 28.4467C1.45571 27.9683 1.35351 27.4554 1.35352 26.9375V4.625C1.35352 3.9288 1.63008 3.26113 2.12236 2.76884C2.61464 2.27656 3.28232 2 3.97851 2H17.1035C17.7997 2 18.4674 2.27656 18.9596 2.76884C19.4519 3.26113 19.7285 3.9288 19.7285 4.625V7.24999"
                    stroke="#9F9F9F"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M24.9785 36.125H35.4785M30.2285 30.875V17.7501M30.2285 17.7501L24.9785 23.0001M30.2285 17.7501L35.4785 23.0001"
                    stroke="#9F9F9F"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <p className={`p-img-upload ${imageAlert ? "shake" : ""}`}>
                  Drag and drop or click to choose file
                </p>
                <p className="p-img-upload-i">
                  {" "}
                  <img
                    className="icon-img"
                    src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/i-icon.png"
                    alt="i-icon"
                  />{" "}
                  Supported Format: JPEG, PNG{" "}
                </p>
              </div>

              <input
                className="RemoveCusImg"
                type="file"
                name=""
                id=""
                multiple
                accept=".jpg,.jpeg,.png,.webp,.avif"
                // required={update && previewImage.length === 0 ? true : false}
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
                      if (update === true) {
                        setuploadimages((old) => {
                          let alluploadimages = [...old, file];

                          const uniqueArray = alluploadimages.filter(
                            (value, index, self) =>
                              index ===
                              self.findIndex((t) => t.name === value.name)
                          );
                          return uniqueArray;
                        });
                      } else {
                        setuploadimages((old) => {
                          let alluploadimages = [...old, file];

                          const uniqueArray = alluploadimages.filter(
                            (value, index, self) =>
                              index ===
                              self.findIndex((t) => t.name === value.name)
                          );
                          return uniqueArray;
                        });
                      }
                    };
                  });
                }}
              />
            </div>
            <p className="upload-image-defaultimage">
            Check the box on an image to make it Property-Profile picture* (By default, the first image will be set as your profile picture)
            </p>
            <div className="showpreviewImage-Container upload-img-section">
              {previewImage.map((image) => {
                return (
                  <div className="showpreviewImage-box" key={image.name}>
                    {/* Default Image Checkbox */}
                    <input
                      type="checkbox"
                      checked={defaultImg === image.name} // Compare by image name
                      className="default-image"
                      onClick={() => {
                        setDefaultImg(image.name); // Store image name instead of index

                     

                        // Find the image in uploadimages
                        let selectedImage = uploadimages.find(
                          (img) => img.name === image.name
                        );
                        if (!selectedImage) return;

                        // Filter out the selected image and move it to the beginning
                        let newArr = [
                          selectedImage,
                          ...uploadimages.filter(
                            (img) => img.name !== image.name
                          ),
                        ];

                        setuploadimages(newArr);
                        console.log("Updated uploadimages:", newArr);
                      }}
                    />

                    {/* Preview Image */}
                    <img
                      className="showpreviewImage"
                      src={image.url}
                      alt="PropertyPost"
                      onClick={() =>
                        setsinglepreviewImage({
                          name: image.name,
                          url: image.url,
                        })
                      }
                    />

                    {/* Remove Image Button */}
                    <span
                      className="cut-image"
                      onClick={() => {
                        // Remove from previewImage
                        setpreviewImage((prev) =>
                          prev.filter((e) => e.name !== image.name)
                        );

                        if (update) {
                          setupdate_RemoveImage((old) => [
                            ...old,
                            ...previewImage.filter(
                              (e) =>
                                !uploadimagesName.includes(e.name) &&
                                e.name === image.name
                            ),
                          ]);
                        }

                        // Remove from uploadimages
                        setuploadimages((prev) =>
                          prev.filter((e) => e.name !== image.name)
                        );

                        // Reset singlepreviewImage if the removed image was selected
                        if (singlepreviewImage?.name === image.name) {
                          setsinglepreviewImage(null);
                        }

                        // Default Save Image Default image
                        if (image.name === defaultImg) {
                        
                          setDefaultImg(null);
                        }
                      }}
                    >
                      X
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="next-prev-box">
              <div
                className="Submit-prev"
                onClick={(e) => {
                  if (!update) {
                    StoreDataInSession("next", 3);
                  }
                  setnext(3);
                }}
              >
                Previous
              </div>
              <button className="Submit-Next" ref={CreatePostRef}>
                {update ? "Update Post" : "Create Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
