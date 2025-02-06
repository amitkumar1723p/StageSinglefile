import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetMyVisitsAction } from "../../../Action/userAction";
import "./MyVisits.css"
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

  return (
    MyVisitsData &&
    MyVisitsData.success === true && (
      <div className="overflow-x-auto">
        <p className="My-Schedule-Visit" >My Schedule Visit </p>
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-300">
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Visit Time</th>
              <th className="py-2 px-4 border-b">Property Name</th>
              <th className="py-2 px-4 border-b">Property ID</th>
            </tr>
          </thead>
          <tbody>
            {MyVisitsData.ScheduleVisits?.map((visit) => {
              const PostData = visit.PostData.PostId;
              const PostName = `${PostData?.PropertyDetails?.BHKType} BHk ${PostData?.BasicDetails?.ApartmentType} For ${PostData?.BasicDetails?.PropertyAdType} In ${PostData?.LocationDetails?.Landmark} ${PostData?.LocationDetails?.City}`;

              return (
                <tr key={visit._id}>
                  <td className="py-2 px-4 border-b text-start">
                    {new Date(visit.VisitDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-2 px-4 border-b text-start">
                    {formatTime(visit.VisitTime.From)} to {formatTime(visit.VisitTime.To)}
                  </td>
                  <td className="py-2 px-4 border-b">{PostName}</td>
                  <td className="py-2 px-4 border-b text-start">{PostData?._id}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
  );
}
