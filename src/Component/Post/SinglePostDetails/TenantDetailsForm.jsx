import React, { useEffect, useState } from "react";
import "./TenantDetailsForm.css";
import { useDispatch, useSelector } from "react-redux";

import { ViewOwnerDetailsAction } from "../../../Action/userAction";
import Loader from "../../Loader/Loader";
import { StoreDataInSession } from "../../../utils/SessionStorage";
import ViewOwnerDetails from "./ViewOwnerDetailsAlert";

const TenantsDetailsForm = ({ SetShow, SinglePostData }) => {
  const [TenantsDetails, setTenantsDetails] = useState({
    FamilyDetails: { Adults: 0, Children: 0, Pets: null },
    ProfessionDetails: { WorkType: "" },
  });
  const [showOwnerDetails, setshowOwnerDetails] = useState(false);
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });
  const dispatch = useDispatch();
  const {
    loading: AlertLoding,
    data: AlertData,
    LodingType: AlertType,
  } = useSelector((state) => {
    return state.userData;
  });
  useEffect(() => {
    const { ...TenantsDetailsCopyObj } = TenantsDetails;
    if (TenantsDetails.ProfessionDetails.WorkType == "Working Professional") {
      delete TenantsDetailsCopyObj.ProfessionDetails?.BusinessName;
    } else if (TenantsDetails.ProfessionDetails.WorkType == "Self Employed") {
      delete TenantsDetailsCopyObj.ProfessionDetails?.CompanyName;
      delete TenantsDetailsCopyObj.ProfessionDetails?.Designation;
      delete TenantsDetailsCopyObj.ProfessionDetails?.Linkedin;
    }
    setTenantsDetails(TenantsDetailsCopyObj);
  }, [TenantsDetails.ProfessionDetails.WorkType]);

  let SubmitTenantDetails = (e) => {
    e.preventDefault();

    // dispatch(
    //   ViewOwnerDetailsAction({
    //     TenantsDetails,
    //     PostId: SinglePostData?.SinglePost?._id,
    //   })
    // );
  };
   
  //  show Owner details
  // useEffect(() => {
  //   if (AlertData?.success && AlertType == "ViewOwnerDetailsRequest") {
  //     // setshowOwnerDetails(true);

  //     setTenantsDetails({
  //       FamilyDetails: { Adults: 0, Children: 0, Pets: null },
  //       ProfessionDetails: { WorkType: "" },
  //     });
  //   }
  // }, [AlertData, AlertType]);
  return (
    <>
      {AlertLoding && AlertType == "ViewOwnerDetailsRequest" ? (
        <Loader className={"componentloader"} />
      ) : //  {showOwnerDetails  ?"": }
      showOwnerDetails ? (
        <ViewOwnerDetails SetShow={SetShow} />
      ) : (
        <div className="tenant-details">
          <div className="tenant-details__container">
            <div className="tenant-details__header">
              <h2 className="tenant-details__title">Tenants Details Form</h2>
              <button
                className="tenant-details__close "
                onClick={() => {
                  SetShow(false);
                }}
              >
                &times;
              </button>
            </div>

            <form
              className="tenant-details__form"
              onSubmit={SubmitTenantDetails}
            >
              <div className="tenant-details__section-header">
                <h3 className="tenant-details__section-title">
                  Personal Details
                </h3>
              </div>
              {/* First Name  */}
              <div className="tenant-details__grid">
                <div className="tenant-details__field">
                  <label className="tenant-details__label">First Name</label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="tenant-details__input"
                    readOnly
                    value={medata?.user?.Name}
                  />
                </div>
                {/* LastName  */}
                <div className="tenant-details__field">
                  <label className="tenant-details__label">Last Name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="tenant-details__input"
                    readOnly
                    value={medata?.user?.Name}
                  />
                </div>
              </div>
              {/* ConstactNumber  */}
              <div className="tenant-details__grid">
                <div className="tenant-details__field">
                  <label className="tenant-details__label">Contact No*</label>
                  <input
                    type="text"
                    placeholder="Contact No"
                    className="tenant-details__input"
                    value={medata?.user?.ContactNumber}
                    readOnly
                  />
                </div>
                <div className="tenant-details__field">
                  <label className="tenant-details__label">Email</label>
                  <input
                    type="email"
                    placeholder="Email Id"
                    className="tenant-details__input"
                    readOnly
                    value={medata?.user?.email}
                  />
                </div>
              </div>

              {/* Family Member  */}
              <div className="tenant-details__counter-group">
                <label className="tenant-details__label">Family Members</label>
                {/* Adults  */}
                <div className="tenant-details__counter-container">
                  <span className="tenant-details__label">Adults</span>
                  <div className="tenant-details__counter-controls">
                    <button
                      type="button"
                      onClick={() => {
                        if (TenantsDetails.FamilyDetails.Adults > 0) {
                          setTenantsDetails({
                            ...TenantsDetails,
                            FamilyDetails: {
                              ...TenantsDetails.FamilyDetails,
                              Adults: TenantsDetails.FamilyDetails.Adults - 1,
                            },
                          });
                        }
                      }}
                      className="tenant-details__counter-button"
                    >
                      −
                    </button>
                    <span className="tenant-details__counter-value">
                      {TenantsDetails.FamilyDetails.Adults}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setTenantsDetails({
                          ...TenantsDetails,
                          FamilyDetails: {
                            ...TenantsDetails.FamilyDetails,
                            Adults: TenantsDetails.FamilyDetails.Adults + 1,
                          },
                        });
                      }}
                      className="tenant-details__counter-button"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children  */}
                <div className="tenant-details__counter-container">
                  <span className="tenant-details__label">Children</span>
                  <div className="tenant-details__counter-controls">
                    <button
                      type="button"
                      onClick={() => {
                        if (TenantsDetails.FamilyDetails.Children > 0) {
                          setTenantsDetails({
                            ...TenantsDetails,
                            FamilyDetails: {
                              ...TenantsDetails.FamilyDetails,
                              Children:
                                TenantsDetails.FamilyDetails.Children - 1,
                            },
                            // Children: TenantsDetails.Children - 1,
                          });
                        }
                      }}
                      className="tenant-details__counter-button"
                    >
                      −
                    </button>
                    <span className="tenant-details__counter-value">
                      {TenantsDetails.FamilyDetails.Children}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setTenantsDetails({
                          ...TenantsDetails,
                          FamilyDetails: {
                            ...TenantsDetails.FamilyDetails,
                            Children: TenantsDetails.FamilyDetails.Children + 1,
                          },
                        });
                      }}
                      className="tenant-details__counter-button"
                    >
                      +
                    </button>
                  </div>
                </div>
                {/* Pets  */}
                <div className="tenant-details__field">
                  <label className="tenant-details__label">Pets</label>
                  <div className="tenant-details__radio-group">
                    <label className="tenant-details__radio-label">
                      <input
                        type="radio"
                        name="pets"
                        checked={
                          TenantsDetails.FamilyDetails.Pets == true
                            ? true
                            : false
                        }
                        className="tenant-details__radio-input"
                        onChange={(e) => {
                          if (e.target.checked == true) {
                            setTenantsDetails({
                              ...TenantsDetails,

                              FamilyDetails: {
                                ...TenantsDetails.FamilyDetails,
                                Pets: true,
                              },
                            });
                          }
                        }}
                      />
                      Yes
                    </label>
                    <label className="tenant-details__radio-label">
                      <input
                        checked={
                          TenantsDetails.FamilyDetails.Pets == false
                            ? true
                            : false
                        }
                        type="radio"
                        name="pets"
                        className="tenant-details__radio-input"
                        required
                        onChange={(e) => {
                          // setTenantsDetails({
                          //   ...TenantsDetails,
                          //   Pets: false,
                          // });

                          if (e.target.checked == true) {
                            setTenantsDetails({
                              ...TenantsDetails,
                              FamilyDetails: {
                                ...TenantsDetails.FamilyDetails,
                                Pets: false,
                              },
                            });
                          }
                        }}
                      />
                      No
                    </label>
                  </div>
                </div>
              </div>

              <div className="tenant-details__divider"></div>

              <div className="tenant-details__section-header">
                <h3 className="tenant-details__section-title">
                  Profession & Others
                </h3>
              </div>

              <div className="tenant-details__grid">
                <div className="tenant-details__field">
                  <label className="tenant-details__label">Type of Work</label>
                  <div className="tenant-details__radio-group">
                    <label className="tenant-details__radio-label">
                      <input
                        required
                        checked={
                          TenantsDetails.ProfessionDetails.WorkType ==
                          "Self Employed"
                            ? true
                            : false
                        }
                        type="radio"
                        name="workType"
                        className="tenant-details__radio-input"
                        onChange={(e) => {
                          // setTenantsDetails({
                          //   ...TenantsDetails,
                          //   Pets: false,
                          // });

                          if (e.target.checked == true) {
                            setTenantsDetails({
                              ...TenantsDetails,
                              ProfessionDetails: {
                                ...TenantsDetails.ProfessionDetails,
                                WorkType: "Self Employed",
                              },
                            });
                          }
                        }}
                      />
                      Self Employed
                    </label>
                    <label className="tenant-details__radio-label">
                      <input
                        required
                        checked={
                          TenantsDetails.ProfessionDetails.WorkType ==
                          "Working Professional"
                            ? true
                            : false
                        }
                        type="radio"
                        name="workType"
                        className="tenant-details__radio-input"
                        onChange={(e) => {
                          if (e.target.checked == true) {
                            setTenantsDetails({
                              ...TenantsDetails,
                              // ProfessionDetails :{TenantsDetails.ProfessionDetails }
                              ProfessionDetails: {
                                ...TenantsDetails.ProfessionDetails,
                                WorkType: "Working Professional",
                              },
                            });
                          }
                        }}
                      />
                      Working Professional
                    </label>
                  </div>
                </div>

                {TenantsDetails.ProfessionDetails.WorkType ==
                  "Self Employed" && (
                  <>
                    <div className="tenant-details__field">
                      <label className="tenant-details__label">
                        Business Name
                      </label>
                      <input
                        value={
                          TenantsDetails?.ProfessionDetails?.BusinessName?.trimStart() ||
                          ""
                        }
                        type="text"
                        placeholder="Business Name"
                        className="tenant-details__input"
                        onChange={(e) => {
                          setTenantsDetails({
                            ...TenantsDetails,
                            ProfessionDetails: {
                              ...TenantsDetails.ProfessionDetails,

                              BusinessName: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                  </>
                )}
                {TenantsDetails.ProfessionDetails.WorkType ==
                  "Working Professional" && (
                  <>
                    <div className="tenant-details__field">
                      <label className="tenant-details__label">
                        Company Name
                      </label>
                      <input
                        required
                        value={
                          TenantsDetails?.ProfessionDetails?.CompanyName?.trimStart() ||
                          ""
                        }
                        type="text"
                        placeholder="Company Name"
                        className="tenant-details__input"
                        onChange={(e) => {
                          setTenantsDetails({
                            ...TenantsDetails,
                            ProfessionDetails: {
                              ...TenantsDetails.ProfessionDetails,
                              CompanyName: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>

                    <div className="tenant-details__grid">
                      <div className="tenant-details__field">
                        <label className="tenant-details__label">
                          Designation
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Designation"
                          className="tenant-details__input"
                          value={
                            TenantsDetails?.ProfessionDetails?.Designation?.trimStart() ||
                            ""
                          }
                          onChange={(e) => {
                            setTenantsDetails({
                              ...TenantsDetails,
                              ProfessionDetails: {
                                ...TenantsDetails.ProfessionDetails,
                                Designation: e.target.value,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>

                    {/* Socal Media  */}
                    <div className="tenant-details__field">
                      <label className="tenant-details__label">Linkedin</label>
                      <input
                        
                        type="text"
                        placeholder="Linkedin"
                        className="tenant-details__input"
                        value={
                          TenantsDetails?.ProfessionDetails?.Linkedin?.trimStart() ||
                          ""
                        }
                        onChange={(e) => {
                          setTenantsDetails({
                            ...TenantsDetails,
                            ProfessionDetails: {
                              ...TenantsDetails.ProfessionDetails,
                              Linkedin: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
              <button type="submit" className="tenant-details__submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TenantsDetailsForm;
