import React, { useEffect, useState } from "react";
import "./ScheduleYourVisit.css";
import Loader from "../../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { CreateScheduleVisitAction } from "../../../Action/userAction";
import { useNavigate } from "react-router-dom";
import ScheduleYourVisitSubmit from "./ScheduleYourVisitSubmit";
import TimePicker from "./TimePicker";

function ScheduleYourVisit({ SinglePostData, SetShow }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, data, LodingType } = useSelector((state) => {
    return state.userData;
  });
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });

  const [ScheduleVistData, setScheduleVistData] = useState({
    VisitDate: "",
    // VisitTime: ,
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

    //  alert(`${ScheduleVistData.VisitTime.From} to ${ScheduleVistData.VisitTime.To}`)
    dispatch(CreateScheduleVisitAction(vistobj));

    setshowScheduleVistAlert("LodingTrue");
    const id = setTimeout(() => {
      setshowScheduleVistAlert(true);
    }, 1000);
    setTimeoutId(id);
  };

  useEffect(() => {
    if (data && LodingType == "CreateScheduleVisitRequest") {
      if (data.success == false) {
        if (data.IsAuthenticated == false) {
          navigate("/");
        }
        clearTimeout(timeoutId);
        setshowScheduleVistAlert(false);
        setTimeoutId(null);
      }
    }
  }, [data]);

  return (
    <>
      {/* {LodingType && LodingType == "CreateScheduleVisitRequest" && loading ? (
        <Loader className={"componentloader"} />
      ) : ( */}
      {showScheduleVistAlert == false && (
        <form className="schedule-your-visit-form" onSubmit={SubmitHandler}>
          <div className="cross-div">
            <span
              className="cross-btn"
              onClick={() => {
                SetShow(false);
              }}
            >
              X
            </span>
          </div>

          <div className="main-box-of-schedule">
            <div className="left-box-of-schedule">
              <img src="/img/schedule-form.svg" alt="schedule" />
            </div>
            <div className="right-box-of-schedule">
              <p className="schedule-your-visit-title">Schedule your Visit</p>
              <div className="schedule-your-visit-group-data">
                <label className="schedule-your-visit-label">Select Date</label>

                <input
                  type="date"
                  className="schedule-your-visit-input-date"
                  required
                  value={ScheduleVistData.VisitDate || ""}
                  onChange={(e) => {
                    const currentDate = new Date().toISOString().split("T")[0];
                    const selectedDate = e.target.value;

                    if (selectedDate >= currentDate) {
                      setScheduleVistData({
                        ...ScheduleVistData,
                        VisitDate: e.target.value,
                      });
                    }
                  }}
                />
              </div>

              <div className="schedule-your-visit-time-group">
                <label className="schedule-your-visit-label">Select Time</label>
                <div className="schedule-your-visit-time-container">
                  <TimePicker
                    onChange={(e) => {
                      setScheduleVistData({
                        ...ScheduleVistData,
                        VisitTime: {
                          ...ScheduleVistData.VisitTime,
                          From: e,
                        },
                      });
                    }}
                  />
                </div>
                {/* <small>available time 10:00 Am to 7:00 PM</small> */}
              </div>

              <button
                type="submit"
                className="schedule-your-visit-submit-button"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      )}

      {showScheduleVistAlert === "LodingTrue" && (
        <Loader className={"componentloader"} />
      )}
      {showScheduleVistAlert == true && (
        <ScheduleYourVisitSubmit
          SetShow={SetShow}
          ScheduleVistData={ScheduleVistData}
        />
      )}
    </>
  );
}

export default ScheduleYourVisit;
