import React, { useEffect, useState } from "react";
import "./ScheduleYourVisit.css";
import Loader from "../../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateScheduleVisitAction,
  SentTokenForEmailVerification,
} from "../../../Action/userAction";
import { useLocation, useNavigate } from "react-router-dom";
import ScheduleYourVisitSubmit from "./ScheduleYourVisitSubmit";
import TimePicker from "./TimePicker";

function ScheduleYourVisit({ SinglePostData, SetShow }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  //  This Data required for Email Verificiaton
  const origin = window.location.origin; // domain
  const pathname = location.pathname; // current path
  const querry = location.search;
  // const [emailVerify,setEmailVerify]=useState()
  const { loading, data, LodingType } = useSelector((state) => {
    return state.userData;
  });
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });

  const [ScheduleVistData, setScheduleVistData] = useState({
    VisitDate: "",
    VisitTime: { From: "09:00" },
  });

  const [showScheduleVistAlert, setshowScheduleVistAlert] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const SubmitHandler = (e) => {
    e.preventDefault();

    let vistobj = {
      ...ScheduleVistData,
      PostData: { PostId: SinglePostData.SinglePost._id },
    };

    dispatch(CreateScheduleVisitAction(vistobj));

    setshowScheduleVistAlert("LodingTrue");
    const id = setTimeout(() => {
      setshowScheduleVistAlert(true);
    }, 1000);
    setTimeoutId(id);

    // if(emailVerify===true){
    //   // const obj={
    //   //   formData:data,
    //   //   emailtoken:token
    //   // }
    //   // dispatch email verify and then store into localstorage data
    //   // localStorage.setItem("EmailData",obj)
    // }
  };

  useEffect(() => {
    if (data && LodingType === "CreateScheduleVisitRequest") {
      if (data.success === false) {
        if (data.IsAuthenticated === false) {
          navigate("/");
        }
        clearTimeout(timeoutId);
        setshowScheduleVistAlert(false);
        setTimeoutId(null);
      }
    }
  }, [data]);

  // user After email verify some condition is run

  useEffect(() => {
    const PendingFormString = sessionStorage.getItem("PendingForm");

    if (!PendingFormString) return;

    let PendingForm;
    try {
      PendingForm = JSON.parse(PendingFormString);
    } catch (err) {
      console.error("Error parsing PendingForm", err);
      return;
    }

    if (PendingForm?.Type === "ScheduleVisit") {
      setScheduleVistData({ ...PendingForm?.data });
    }

    return () => {
      if (PendingForm?.Type === "ScheduleVisit") {
        sessionStorage.removeItem("PendingForm");
      }
    };
  }, [sessionStorage.getItem("PendingForm")]);

  return (
    <>
      {showScheduleVistAlert === false && (
        <div className="schedule-your-visit-wrapper">
          <div className="schedule-your-visit-card">
            <div className="schedule-your-visit-header">
              <h2>Live the Life You Deserve – Schedule a Visit!</h2>
              <span
                className="schedule-your-visit-close"
                onClick={() => SetShow(false)}
              >
                ×
              </span>
            </div>



       
            <div className="schedule-your-visit-body">
              <form onSubmit={SubmitHandler} className="schedule-your-visit-form">
                <div className="schedule-your-visit-form-group">
                  <label className="schedule-your-visit-label">Select Date</label>
                  <div className="schedule-your-visit-date-wrapper">
                    <input
                      type="date"
                      className="schedule-your-visit-input custom-date-input"
                      required
                      value={ScheduleVistData.VisitDate || ""}
                      onChange={(e) => {
                        const currentDate = new Date().toISOString().split("T")[0];
                        const selectedDate = e.target.value;

                        if (selectedDate >= currentDate) {
                          setScheduleVistData({
                            ...ScheduleVistData,
                            VisitDate: selectedDate,
                          });
                        }
                      }}
                    />
                    <span className="custom-date-icon">
                     <img src="/img/schedule-your-visit-datepicker.svg" alt="datepicker" />
                    </span>
                  </div>
                </div>

                <div className="schedule-your-visit-form-group">
                  <label className="schedule-your-visit-label">Select Time</label>
                  <TimePicker
                    onChange={(e) =>
                      setScheduleVistData({
                        ...ScheduleVistData,
                        VisitTime: { ...ScheduleVistData.VisitTime, From: e },
                      })
                    }
                    selectedDate={ScheduleVistData.VisitDate || ""}
                  />
                </div>
                {
                  !medata?.user?.EmailVerify && 
                  <p className="sc-visit-veify-label">We’ll send you updates about your visit — just verify your email! 📩 <span     onClick={(e) => {
                          const Url = `${origin}${pathname}`;
        
                          if (!loading && LodingType!="SentTokenForEmailVerificationRequest"   ) {
                            dispatch(
                              SentTokenForEmailVerification({
                                email: medata?.user?.email,
                                Url: { pathname: Url, querry: querry },
                                PendingForm: {
                                  Type: "ScheduleVisit",
                                  data: { ...ScheduleVistData },
                                },
                              })
                            );
                          }
                        }} 
                         className="bidding-form-verify">Verify</span> </p>
                }
          



               <button type="submit" className="schedule-your-visit-submit-btn">
                  Click to Schedule
                </button>

                  
              
         
              </form>

              <div className="schedule-your-visit-image">
                <img
                  src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/new-schedule-visit-form.png "
                  alt="schedule"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {showScheduleVistAlert === "LodingTrue" && (
        <Loader className={"componentloader"} />
      )}

      {showScheduleVistAlert === true && (
        <ScheduleYourVisitSubmit
          SetShow={SetShow}
          ScheduleVistData={ScheduleVistData}
        />
      )}
    </>
  );
}

export default ScheduleYourVisit;
