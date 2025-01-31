import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CreatePostAction, UpdatePostAction } from "../../../Action/postAction";
import { StoreDataInSession } from "../../../utils/SessionStorage";
// import BackupIcon from "@mui/icons-material/Backup";

import ScrollToTop from "../../../ScrollToTop";

export default function CreatePostImageUpload({
  setnext,

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
}) {
  const dispatch = useDispatch();
  const [singlepreviewImage, setsinglepreviewImage] = useState("");

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

  const CratePostHandler = (e) => {
    e.preventDefault();
    if (previewImage.length <= 0) {
      alert("image field is required");
    } else {
      let formData = new FormData(e.target);

      formData.append("BasicDetails", `${JSON.stringify(BasicDetailsData)}`);
      formData.append(
        "LocationDetails",
        `${JSON.stringify(LocationDetailsData)}`
      );
      formData.append(
        "PropertyDetails",
        `${JSON.stringify(PropertyDetailsData)}`
      );
      formData.append("AreaDetails", `${JSON.stringify(AreaDetailsData)}`);
      formData.append("FloorDetails", `${JSON.stringify(FloorDetailsData)}`);
      formData.append(
        "AmenitiesDetails",
        `${JSON.stringify(AmenitiesDetailsData)}`
      );
      formData.append(
        "PricingDetails",
        `${JSON.stringify(PricingDetailsData)}`
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
        let confrim = window.confirm("Are you update this Post");
        if (confrim) {
          dispatch(UpdatePostAction(formData, PostId));
          // dispatch(CreatePostAction(formData));
        }
      } else {
        dispatch(CreatePostAction(formData));

      }
    }
  };

  return (
    <>
      <ScrollToTop />
      {/* <div className="create-banner-box">
        <img src="/img/create-banner.svg" alt="create-banner" />
      </div> */}

      <div className="property-details-main-box">
        <div className="postImage post-img-upload">
          <form
            onSubmit={CratePostHandler}
            encType="multipart/form-data"
            id="myform"
          >
            <div htmlFor="" className="uploadfile-input">
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

                <p className="p-img-upload">
                  Drag and drop or click to choose file
                </p>
                <p className="p-img-upload-i">
                  {" "}
                  <img
                    className="icon-img"
                    src="/img/i-icon.png"
                    alt="i-icon"
                  />{" "}
                  Supported Format: JPEG, PNG,SVG{" "}
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

            <div className="showpreviewImage-Container upload-img-section">
              {previewImage.map((image, index) => {
                return (
                  <div className="showpreviewImage-box" key={index}>
                    <img
                      className="showpreviewImage"
                      key={index}
                      src={image.url}
                      alt="PropertyPost"
                      onClick={(e) => {
                        setsinglepreviewImage({
                          name: image.name,
                          url: image.url,
                        });
                      }}
                    />
                    <span
                      className="cut-image"
                      onClick={(button, buttonindex) => {
                        setpreviewImage(
                          previewImage.filter((e) => {
                            return e.name !== image.name;
                          })
                        );

                        if (update) {
                          let removeImage = setupdate_RemoveImage((old) => {
                            removeImage = previewImage.filter((e, i) => {
                              return (
                                !uploadimagesName.includes(e.name) &&
                                e.name === image.name
                              );
                              // if (uploadimagesName.includes(e.name) === false) {
                              //   return e.name === image.name;
                              // }
                            });

                            return [...old, ...removeImage];
                          });
                          setuploadimages(
                            uploadimages.filter((e) => {
                              return e.name !== image.name;
                            })
                          );
                        } else {
                          setuploadimages(
                            uploadimages.filter((e) => {
                              return e.name !== image.name;
                            })
                          );
                        }

                        if (singlepreviewImage) {
                          if (singlepreviewImage.name === image.name) {
                            setsinglepreviewImage();
                          }
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
                Preview
              </div>
              <button className="Submit-Next">
                {update ? "Update Post" : "Create Post"}
              </button>
            </div>
          </form>
        </div>
      </div>

      
    </>
  );
}
