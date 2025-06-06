import React, { useCallback, useEffect, useState } from "react";
import "./ScheduleVisit.css"; // Import the custom CSS for styling
import { useDispatch, useSelector } from "react-redux";
import {
  Admin_OwnerGetAllScheduleVisits,
  Admin_OwnerScheduleVisitDone,
} from "../../Action/postAction";
import HeaderCard from "./HeaderCard";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FormatDate } from "../../utils/CommonFunction";
const ScheduleVisit = () => {
  const { data: VisitStatusData, LodingType } = useSelector((state) => {
    return state.Post;
  });

  // const [count, setcount] = useState(0);
  //  const navigate
  const dispatch = useDispatch();
  const Params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  // const [VisitStatus, setVisitStatus] = useState({});
  const [VisitStatus, setVisitStatus] = useState({});

  const { data: ScheduleVisitsData } = useSelector((state) => {
    return state.ScheduleVisits;
  });

  useEffect(() => {
    if (location.pathname.includes("schedule-visit/deleted-post")) {
      dispatch(Admin_OwnerGetAllScheduleVisits(Params.PostId, true));
    } else {
      dispatch(Admin_OwnerGetAllScheduleVisits(Params.PostId));
    }
  }, []);

  useEffect(() => {
    if (
      VisitStatusData &&
      LodingType === "Admin_OwnerScheduleVisitDoneRequest"
    ) {
      if (VisitStatusData.success == true) {
        dispatch(Admin_OwnerGetAllScheduleVisits(Params.PostId));
      }
    }
  }, [VisitStatusData]);

  const formatTime = useCallback((time24) => {
    if (time24) {
      const [hours, minutes] = time24.split(":").map(Number);
      const period = hours >= 12 ? "PM" : "AM"; // Determine AM/PM
      const formattedHours = hours % 12 || 12; // Convert to 12-hour format
      return `${formattedHours}:${minutes
        .toString()
        .padStart(2, "0")} ${period}`;
    }

    return "N/A";
  }, []);

  useEffect(() => {
    if (ScheduleVisitsData?.success == false) {
      if (location.pathname.includes("schedule-visit/deleted-post")) {
        navigate("/admin/deleted-post");
      } else {
        navigate("/admin/allpost");
      }
    }
  }, [ScheduleVisitsData]);

  const { loading, data: getSinglePostData } = useSelector((state) => {
    return state.GetSinglePost;
  });
 

  return (
    <>
      <HeaderCard />
      {ScheduleVisitsData &&
        ScheduleVisitsData.success == true &&
        ScheduleVisitsData.ScheduleVisits.map((visitData, i) => {
          const { PostId } = visitData.PostData;
          let FullPropertyAddress = `${`${getSinglePostData?.SinglePost?.PropertyDetails?.BHKType} BHK`} ${
            getSinglePostData?.SinglePost?.BasicDetails?.ApartmentType
          } For ${
            getSinglePostData?.SinglePost?.BasicDetails?.PropertyAdType
          } In ${getSinglePostData?.SinglePost?.LocationDetails?.Locality}`;

          return (
            <div className="schedule-visit-card" key={i}>
              <div className="schedule-visit-header">
                <div className="schedule-visit-user-info">
                  <p className="schedule-visit-user-name">
                    {visitData.VisitUser?.Name}
                  </p>
                  <p className="schedule-visit-contact-details">
                    <span className="schedule-visit-phone-number">
                      {visitData.VisitUser?.ContactNumber}
                    </span>
                    <span className="schedule-visit-email">
                      {visitData.VisitUser?.email}
                    </span>
                  </p>
                </div>
                <div className="schedule-visit-property-info">
                  <p className="schedule-visit-property-details">
                    {FullPropertyAddress}
                  </p>
                  <p className="schedule-visit-pid">
                    PID:{" "}
                    <span className="schedule-visit-pid-number">
                      {PostId?._id}
                    </span>
                    {/* {} */}
                    {getSinglePostData?.SinglePost?.PostVerify ? (
                      <span className="schedule-visit-status">Active</span>
                    ) : (
                      <span className="schedule-visit-status">InActive</span>
                    )}
                  </p>
                </div>
                <div className="schedule-visit-footer">
                  <div className="schedule-visit-schedule-info ">
                    <div >
                      <p>
                        Schedule Visit:
                        <span className="schedule-visit-status">
                          {/*  ,setVisitStatus */}
                          <select
                            value={VisitStatus[visitData._id]}
                            // onChange={(e) => {
                            //   setVisitStatus(e.target.value);
                            // }}
                            onChange={(e) =>
                              setVisitStatus((prev) => ({
                                ...prev,
                                [visitData._id]: e.target.value,
                              }))
                            }
                          >
                            <option value="Re-Plan">Re-Plan</option>
                            <option value="Done">Done</option>
                          </select>
                          <span>{visitData.VisitStatusData.Status} </span>
                        </span>
                        <button
                          className="submit-schedule"
                          onClick={() => {
                            const status =
                              VisitStatus[visitData._id] || "Re-Plan";

                            dispatch(
                              Admin_OwnerScheduleVisitDone(
                                { VisitStatus: status },
                                visitData._id
                              )
                            );
                          }}
                        >
                          Submit
                        </button>
                      </p>
                    </div>
                    <div className="visit-admin-box">
                      <p className="visit-time-date">
                        Date:
                        <span className="schedule-visit-date">
                           {FormatDate(visitData.VisitDate)} 
                            
                        </span>
                      </p>
                      <p className="visit-time-date">
                        Time:
                         <span className="schedule-visit-time">
                           {formatTime(visitData.VisitTime.From)}
                         </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};
export default ScheduleVisit;
