import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetMyVisitsAction } from "../../../Action/userAction";
import { useLinkClickHandler } from "react-router-dom";

export default function MyVisits() {
  const { data: MyVisitsData } = useSelector((state) => {
    return state.MyVisits;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetMyVisitsAction());
  }, []);

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
  //  const formatTime = useCallback((time24) => {
  //      if (time24) {
  //        const [hours, minutes] = time24.split(":").map(Number);
  //        const period = hours >= 12 ? "PM" : "AM"; // Determine AM/PM
  //        const formattedHours = hours % 12 || 12; // Convert to 12-hour format
  //        return `${formattedHours}:${minutes
  //          .toString()
  //          .padStart(2, "0")} ${period}`;
  //      }

  //      return "N/A";
  //    }, []);
  return (
    MyVisitsData &&
    MyVisitsData.success == true && (
      <>
        <div>
          {MyVisitsData.ScheduleVisits?.map((visit ,i) => {
            const PostData = visit.PostData.PostId;
            const PostName = `${PostData?.PropertyDetails?.BHKType} BHk ${PostData?.BasicDetails?.ApartmentType} For ${PostData?.BasicDetails?.PropertyAdType} In ${PostData?.LocationDetails?.Landmark} ${PostData?.LocationDetails?.City}`

            return (
              <div key={i}>
                <p>
                  Date
                  {new Date(visit.VisitDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <p>
                  {formatTime(visit.VisitTime.From)} to{" "}
                  {formatTime(visit.VisitTime.To)} on{" "}

                </p>
                <p> Property Name :- {PostName}</p>
                <p>Property Id :- {PostData?._id}</p>
              </div>
            );
          })}
        </div>
      </>
    )
  );
}
