import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateChannelPartnerAction } from "../../Action/userAction";
import { Link } from "react-router-dom";
import "./ChannelPartner.css";
import Loader from "../Loader/Loader";

export default function PostPropertyRequirement({ SetShow }) {
  const dispatch = useDispatch();
  const [ChannelPartnerData, setChannelPartnerData] = useState({
    Name: "",
    ContactNumber: "",
    Email: "",
    CompanyName: "",
    WhatsAppUpdate: false,
    AcceptPolicy: false,
  });

  const { loading, data, LodingType } = useSelector((state) => {
    return state.userData;
  });

  useEffect(() => {
    if (data) {
      if (data.success === true) {
        setChannelPartnerData({
          Name: "",
          ContactNumber: "",
          Email: "",
          CompanyName: "",
          AcceptPolicy: "",
          WhatsAppUpdate: false,
        });
        SetShow(false);
      }
    }
    // eslint-disable-next-line
  }, [data]);

  

  const CreateQueryFormHandler = (e) => {
    e.preventDefault();
    if (ChannelPartnerData.AcceptPolicy === false) {
      return alert("Accept Terms & Conditions");
    }

    dispatch(CreateChannelPartnerAction(ChannelPartnerData));
  };

  return (
    <>
      {LodingType && LodingType === "CreateChannelPartnerRequest" && loading ? (
        <Loader className={"componentloader"} />
      ) : (
        <div className="ChannelPartner-box">
          <p
            className="cross-btn"
            onClick={() => {
              SetShow(false);
              // document.body.style.overflow = "auto"; // Re-enable scrolling on close
            }}
          >
            X
          </p>
          <div className="main-channel-box">
            <div className="img-right-channel">
              <img src="/img/channelpartner.svg" alt="img" />
            </div>

            <div className="ChannelPartner-container">
              <h2> Channel Partner Form </h2>
              <div></div>
              <form onSubmit={CreateQueryFormHandler}>
                {/* Form Fields */}
                <div className="ChannelPartner-group">
                  <label htmlFor="ChannelPartner-name">Name</label>
                  <input
                    type="text"
                    id="ChannelPartner-name"
                    placeholder="Name"
                    required
                    value={ChannelPartnerData.Name.trimStart()}
                    onChange={(e) =>
                      setChannelPartnerData({
                        ...ChannelPartnerData,
                        Name: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="ChannelPartner-group">
                  <label htmlFor="ChannelPartner-contact">Contact Number</label>
                  <input
                    type="number"
                    id="ChannelPartner-contact"
                    placeholder="Contact Number"
                    required
                    minLength={10}
                    value={ChannelPartnerData.ContactNumber.trimStart()}
                    onWheel={(event) => {
                      event.target.blur();
                      setTimeout(() => event.target.focus(), 0);
                    }}
                    onChange={(e) => {
                      if (e.target.value.length <= 10) {
                        setChannelPartnerData({
                          ...ChannelPartnerData,
                          ContactNumber: e.target.value,
                        });
                      }
                    }}
                  />
                </div>

                <div className="ChannelPartner-group">
                  <label htmlFor="ChannelPartner-email"> Email </label>
                  <input
                    type="email"
                    id="ChannelPartner-email"
                    placeholder="Enter Email"
                    required
                    value={ChannelPartnerData.Email.trimStart()}
                    onChange={(e) =>
                      setChannelPartnerData({
                        ...ChannelPartnerData,
                        Email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="ChannelPartner-group">
                  <label htmlFor="ChannelPartner-company">Company Name</label>
                  <input
                    type="text"
                    id="ChannelPartner-company"
                    placeholder="Enter Company Name"
                    value={ChannelPartnerData.CompanyName.trimStart()}
                    required
                    onChange={(e) =>
                      setChannelPartnerData({
                        ...ChannelPartnerData,
                        CompanyName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="tc-box">
                  <div className="ChannelPartner-checkbox">
                    <input
                      type="checkbox"
                      id="ChannelPartner-policy"
                      checked={ChannelPartnerData.AcceptPolicy}
                      onChange={(e) => {
                        setChannelPartnerData({
                          ...ChannelPartnerData,
                          AcceptPolicy: e.target.checked,
                        });
                      }}
                    />
                    <label htmlFor="ChannelPartner-policy">
                      I confirm that I have reviewed and accept the and{" "}
                      <Link to="#" className="ChannelPartner-upload-link">
                        Terms and Conditions.
                      </Link>
                    </label>
                  </div>
                  <div className="ChannelPartner-checkbox">
                    <input
                      type="checkbox"
                      id="ChannelPartner-whatsapp"
                      checked={ChannelPartnerData.WhatsAppUpdate}
                      onChange={(e) => {
                        setChannelPartnerData({
                          ...ChannelPartnerData,
                          WhatsAppUpdate: e.target.checked,
                        });
                      }}
                    />
                    <label htmlFor="ChannelPartner-whatsapp">
                      Receive updates on WhatsApp.
                    </label>
                  </div>
                </div>
                <button type="submit" className="ChannelPartner-submit-btn">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
