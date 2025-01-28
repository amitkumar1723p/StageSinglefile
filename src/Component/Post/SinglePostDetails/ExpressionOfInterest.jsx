import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateExpressionOfInterestAction } from "../../../Action/userAction";
import { Link } from "react-router-dom";

import Loader from "../../Loader/Loader";
export default function ExpressionOfInterestForm( ) {
  const dispatch = useDispatch();
  
  const [ExpressionOfInterestData, setExpressionOfInterestData] = useState({
    Name: "",
    ContactNumber: "",
    Email: "",
    Message: "",
    AcceptPolicy: false,
    WhatsAppUpdate: false,
  });

  const { loading, data ,LodingType } = useSelector((state) => {
    
    return state.userData;
  });
   
  useEffect(() => {
    if (data) {
      if (data.success == true) {
        setExpressionOfInterestData({
          Name: "",
          ContactNumber: "",
          Email: "",
          Message: "",
          AcceptPolicy: false,
          WhatsAppUpdate: false,
        });
      }
    }
  }, [data]);
   
  const CreateQuerryFormHandler = (e) => {
    e.preventDefault();
     if(ExpressionOfInterestData.AcceptPolicy==false){
      return alert("Accept Terms & Conditions")
     }

    dispatch(CreateExpressionOfInterestAction(ExpressionOfInterestData));
  };
  return (
    <>
   
    
       { LodingType&& LodingType ==="CreateExpressionOfInterestRequest" && loading     ?    <Loader className={"componentloader"} /> : <div className="eoi-from-box">
        <div className="eoi-container">
          <div className="eoi-form-container">
            <h2>Expression of Interest</h2>
            <form onSubmit={CreateQuerryFormHandler}>
              <div className="eoi-form-group">
                <label htmlFor="eoi-name">Name*</label>
                <input
                  type="text"
                  id="eoi-name"
                  placeholder="Name"
                  required
                  value={ExpressionOfInterestData.Name.trimStart()}
                  onChange={(e) =>
                    setExpressionOfInterestData({
                      ...ExpressionOfInterestData,
                      Name: e.target.value,
                    })
                  }
                />
              </div>

              <div className="eoi-form-group">
                <label htmlFor="eoi-contact">Contact Number*</label>
                <input
                  type="number"
                  id="eoi-contact"
                  placeholder="Contact Number"
                  required
                  value={ExpressionOfInterestData.ContactNumber.trimStart()}
                  onChange={(e) => {
                    if (e.target.value.length <= 10) {
                      setExpressionOfInterestData({
                        ...ExpressionOfInterestData,
                        ContactNumber: e.target.value,
                      });
                    }
                  }}

                  // onChange={(e) =>

                  //   setExpressionOfInterestData({
                  //     ...ExpressionOfInterestData,
                  //     ContactNumber: e.target.value,
                  //   })
                  // }
                />
              </div>

              <div className="eoi-form-group">
                <label htmlFor="eoi-email">Email Address*</label>
                <input
                  type="email"
                  id="eoi-email"
                  placeholder="Email Address"
                  required
                  value={ExpressionOfInterestData.Email.trimStart()}
                  onChange={(e) =>
                    setExpressionOfInterestData({
                      ...ExpressionOfInterestData,
                      Email: e.target.value,
                    })
                  }
                />
              </div>

              <div className="eoi-form-group">
                <label htmlFor="eoi-message">Message</label>
                <textarea
                  id="eoi-message"
                  placeholder="Request for property visit, additional property information, etc."
                  value={ExpressionOfInterestData.Message.trimStart()}
                  required
                  minLength={10}
                  onChange={(e) =>
                    setExpressionOfInterestData({
                      ...ExpressionOfInterestData,
                      Message: e.target.value,
                    })
                  }
                ></textarea>
              </div>

              <div className="eoi-form-checkbox">
                <input
                  type="checkbox"
                  id="eoi-interest"
                  checked={ExpressionOfInterestData.AcceptPolicy}
                  onChange={(e) => {
                    if (e.target.checked === true) {
                      setExpressionOfInterestData({
                        ...ExpressionOfInterestData,
                        AcceptPolicy: true,
                      });
                    }
                    if (e.target.checked === false) {
                      setExpressionOfInterestData({
                        ...ExpressionOfInterestData,
                        AcceptPolicy: false,
                      });
                    }
                  }}
                />
                <label htmlFor="eoi-interest">
                  I express interest to purchase the aforementioned property. I
                  agree with the
                  <Link to="#" className="eoi-upload-link">
                    Privacy Policy
                  </Link>{" "}
                  and
                  <Link to="#" className="eoi-upload-link">
                    Terms & Conditions
                  </Link>
                  .
                </label>
              </div>

              <div className="eoi-form-checkbox">
                <input
                  type="checkbox"
                  id="eoi-whatsapp"
                  checked={ExpressionOfInterestData.WhatsAppUpdate}
                  onChange={(e) => {
                    if (e.target.checked === true) {
                      setExpressionOfInterestData({
                        ...ExpressionOfInterestData,
                        WhatsAppUpdate: true,
                      });
                    }
                    if (e.target.checked === false) {
                      setExpressionOfInterestData({
                        ...ExpressionOfInterestData,
                        WhatsAppUpdate: false,
                      });
                    }
                  }}
                />
                <label htmlFor="eoi-whatsapp">
                  Receive updates on WhatsApp.
                </label>
              </div>

              <button type="submit" className="eoi-submit-btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>}

      
    </>
  );
}
