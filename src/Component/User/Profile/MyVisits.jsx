import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetMyVisitsAction } from "../../../Action/userAction";
import "./MyVisits.css"; // Import the vanilla CSS file
import { useNavigate } from "react-router-dom";

export default function MyVisits() {
  const { data: MyVisitsData } = useSelector((state) => {
    return state.MyVisits;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetMyVisitsAction());
  }, []);
 const navigate =useNavigate()
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

  return (
    MyVisitsData &&
    MyVisitsData.success === true && (
      <div className="myvisit-overflow-x-auto">
        <p className="myvisit-schedule-visit">My Schedule Visit</p>
        <table className="myvisit-table">
          <thead>
            <tr className="myvisit-table-header">
              <th className="myvisit-table-cell">Date</th>
              <th className="myvisit-table-cell">Visit Time</th>
              <th className="myvisit-table-cell">Property Name</th>
              <th className="myvisit-table-cell">Property ID</th>
            </tr>
          </thead>
          <tbody>
            {MyVisitsData.ScheduleVisits?.map((visit) => {
              const PostData = visit.PostData.PostId;
              const PostName = `${PostData?.PropertyDetails?.BHKType} BHk ${PostData?.BasicDetails?.ApartmentType} For ${PostData?.BasicDetails?.PropertyAdType} In ${PostData?.LocationDetails?.Landmark} ${PostData?.LocationDetails?.City}`;

              return (
                <tr key={visit._id}>
                  <td className="myvisit-table-cell">
                    {new Date(visit.VisitDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="myvisit-table-cell">
                    {formatTime(visit.VisitTime.From)} to{" "}
                    {formatTime(visit.VisitTime.To)}
                  </td>
                  <td className="myvisit-table-cell">{PostName}</td>
                  <td className="myvisit-table-cell"  > <span className="myvisit-post-id-btn" onClick={(e) => {
                        let url = `/post-detail/${PostName.toLowerCase()
                          .replaceAll(" ", "-")
                          .replace(",", "")
                          .replaceAll("/", "-")}-${PostData._id}`;

                        navigate(`${url}`);
                      }}>{PostData?._id} </span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
  );
}
